import { NextResponse } from "next/server";
import { stripe, hasStripeConfigured } from "@/lib/stripe";
import { getEventBySlug } from "@/lib/eventSource";

export const runtime = "nodejs";

type Body = {
  eventSlug: string;
  tierLabel: string;
  quantity: number;
  attendee: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    notes?: string;
  };
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

  const { eventSlug, tierLabel, quantity, attendee } = body ?? {};
  if (!eventSlug || !tierLabel || !attendee?.email) {
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
    mode: "payment",
    integration_identifier: "omi_events_kfjqzvpt",
    client_reference_id: event.slug,
    customer_email: attendee.email,
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
      tierLabel: tier.label,
      quantity: String(qty),
      firstName: attendee.firstName ?? "",
      lastName: attendee.lastName ?? "",
      phone: attendee.phone ?? "",
      notes: attendee.notes ?? "",
    },
    success_url: `${origin}/events/${event.slug}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/events/${event.slug}`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
