import { NextResponse } from "next/server";
import { stripe, hasStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

const allowedOrigins = new Set([
  "https://youthempowerment.live",
  "https://www.youthempowerment.live",
  "https://youth-empowerment-school.vercel.app",
]);

function headers(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  return allowedOrigins.has(origin)
    ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" }
    : {};
}

function siteOrigin(req: Request) {
  const origin = req.headers.get("origin") || "";
  return allowedOrigins.has(origin) ? origin : "https://youthempowerment.live";
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: { ...headers(req), "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "GET,POST,OPTIONS" } });
}

async function yesEvent(slug: string) {
  const query = `*[_type == "event" && site == "yes" && slug.current == $slug][0]{title,"slug":slug.current,priceTiers[]{label,priceCents,description,soldOut}}`;
  const url = new URL("https://tnmhhac3.api.sanity.io/v2024-09-30/data/query/production");
  url.searchParams.set("query", query);
  url.searchParams.set("$slug", JSON.stringify(slug));
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error("Event lookup failed");
  return (await response.json()).result;
}

export async function POST(req: Request) {
  if (!hasStripeConfigured || !stripe) return NextResponse.json({ error: "Payments are unavailable" }, { status: 503, headers: headers(req) });
  try {
    const body = await req.json();
    const origin = siteOrigin(req);
    if (body.action === "donation") {
      const amount = Math.round(Number(body.amount) * 100);
      if (!Number.isInteger(amount) || amount < 100 || amount > 10000000) return NextResponse.json({ error: "Enter a donation between $1 and $100,000" }, { status: 400, headers: headers(req) });
      const frequency = body.frequency || "one-time";
      const recurring = frequency === "monthly" ? { interval: "month" as const } : frequency === "annually" ? { interval: "year" as const } : undefined;
      const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded_page",
        mode: recurring ? "subscription" : "payment",
        integration_identifier: "yes_donations_qmtzafke",
        customer_email: body.email || undefined,
        line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: amount, recurring, product_data: { name: "Youth Empowerment School Scholarship Fund" } } }],
        metadata: { site: "yes", purpose: "scholarship-donation", frequency, donorName: body.name || "" },
        return_url: `${origin}/donate.html?session_id={CHECKOUT_SESSION_ID}`,
      });
      return NextResponse.json({ clientSecret: session.client_secret, publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY }, { headers: headers(req) });
    }

    const event = await yesEvent(String(body.eventSlug || ""));
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404, headers: headers(req) });
    const tier = event.priceTiers?.find((item: { label: string }) => item.label === body.tierLabel);
    if (!tier || tier.soldOut || !Number.isInteger(tier.priceCents) || tier.priceCents <= 0) return NextResponse.json({ error: "Ticket is unavailable" }, { status: 400, headers: headers(req) });
    const quantity = Math.max(1, Math.min(10, Math.floor(Number(body.quantity) || 1)));
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "payment",
      integration_identifier: "yes_events_brvnshke",
      client_reference_id: event.slug,
      line_items: [{ quantity, price_data: { currency: "usd", unit_amount: tier.priceCents, product_data: { name: `${event.title} · ${tier.label}`, description: tier.description || undefined } } }],
      metadata: { site: "yes", eventSlug: event.slug, eventTitle: event.title, tierLabel: tier.label, quantity: String(quantity) },
      return_url: `${origin}/event.html?slug=${encodeURIComponent(event.slug)}&session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ clientSecret: session.client_secret, publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY }, { headers: headers(req) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Checkout could not be started" }, { status: 500, headers: headers(req) });
  }
}

export async function GET(req: Request) {
  if (!hasStripeConfigured || !stripe) return NextResponse.json({ error: "Payments are unavailable" }, { status: 503, headers: headers(req) });
  const id = new URL(req.url).searchParams.get("session_id");
  if (!id) return NextResponse.json({ error: "Missing session" }, { status: 400, headers: headers(req) });
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    return NextResponse.json({ confirmed: session.status === "complete" && session.payment_status !== "unpaid", metadata: session.metadata }, { headers: headers(req) });
  } catch {
    return NextResponse.json({ error: "Session not found" }, { status: 404, headers: headers(req) });
  }
}
