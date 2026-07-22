import { NextResponse } from "next/server";
import { stripe, hasStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

async function sabwbEvent(slug: string) {
  const query = `*[_type == "event" && site == "sabwb" && slug.current == $slug][0]{title,"slug":slug.current,priceTiers[]{label,priceCents,description,soldOut}}`;
  const url = new URL("https://tnmhhac3.api.sanity.io/v2024-09-30/data/query/production");
  url.searchParams.set("query", query);
  url.searchParams.set("$slug", JSON.stringify(slug));
  const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
  if (!response.ok) throw new Error("Event lookup failed");
  return (await response.json()).result;
}

export async function POST(req: Request) {
  if (!hasStripeConfigured || !stripe) return NextResponse.json({ error: "Payments are unavailable" }, { status: 503 });
  try {
    const body = await req.json();
    const event = await sabwbEvent(String(body.eventSlug || ""));
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });
    const tier = event.priceTiers?.find((item: { label: string }) => item.label === body.tierLabel);
    if (!tier || tier.soldOut || !Number.isInteger(tier.priceCents) || tier.priceCents <= 0) return NextResponse.json({ error: "Ticket is unavailable" }, { status: 400 });
    const quantity = Math.max(1, Math.min(10, Math.floor(Number(body.quantity) || 1)));
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      branding_settings: { background_color: "#ffffff", button_color: "#000000", border_style: "rounded", display_name: "SABWB" },
      integration_identifier: "sabwb_events_hkzpcxav",
      client_reference_id: event.slug,
      line_items: [{ quantity, price_data: { currency: "usd", unit_amount: tier.priceCents, product_data: { name: `${event.title} · ${tier.label}`, description: tier.description || undefined } } }],
      metadata: { site: "sabwb", eventSlug: event.slug, eventTitle: event.title, tierLabel: tier.label, quantity: String(quantity) },
      return_url: `https://sabwb.org/event.html?slug=${encodeURIComponent(event.slug)}&session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ clientSecret: session.client_secret, publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Checkout could not be started" }, { status: 500 });
  }
}
