import { NextResponse } from "next/server";
import { stripe, hasStripeConfigured } from "@/lib/stripe";
import { getEventBySlug } from "@/lib/eventSource";

export const runtime = "nodejs";

type Body = {
  eventSlug: string;
  tierLabel: string;
  quantity: number;
};

export async function POST(req: Request) {
  if (!hasStripeConfigured || !stripe) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to the environment and redeploy.",
      },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { eventSlug, tierLabel, quantity } = body ?? {};
  if (!eventSlug || !tierLabel) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Resolve pricing from the same Sanity-backed source used by the public
  // event page. The browser never gets to choose the authoritative amount.
  const event = await getEventBySlug(eventSlug);
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const tier = event.priceTiers.find((t) => t.label === tierLabel);
  if (!tier) {
    return NextResponse.json({ error: "Tier not found" }, { status: 400 });
  }
  if (tier.soldOut) {
    return NextResponse.json({ error: "Tier is sold out" }, { status: 409 });
  }

  const qty = Math.max(1, Math.min(10, Math.floor(Number(quantity) || 1)));

  const requestOrigin = req.headers.get("origin");
  const origin =
    requestOrigin === "https://outpouringmissions.live" ||
    requestOrigin === "https://www.outpouringmissions.live"
      ? requestOrigin
      : "https://outpouringmissions.live";

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    mode: "payment",
    integration_identifier: "omi_events_kfjqzvpt",
    client_reference_id: event.slug,
    line_items: [
      {
        quantity: qty,
        price_data: {
          currency: "usd",
          unit_amount: tier.priceCents,
          product_data: {
            name: `${event.title} · ${tier.label}`,
            description: tier.description ?? undefined,
            metadata: { eventSlug: event.slug, tierLabel: tier.label },
          },
        },
      },
    ],
    metadata: {
      eventSlug: event.slug,
      eventTitle: event.title,
      site: "omi",
      tierLabel: tier.label,
      quantity: String(qty),
    },
    phone_number_collection: { enabled: true },
    return_url: `${origin}/events/${event.slug}/success?session_id={CHECKOUT_SESSION_ID}`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({
    clientSecret: session.client_secret,
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });
}
