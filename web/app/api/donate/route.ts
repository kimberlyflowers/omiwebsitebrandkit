import { NextResponse } from "next/server";
import { hasStripeConfigured, stripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!hasStripeConfigured || !stripe) {
    return NextResponse.json({ error: "Giving is temporarily unavailable" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const amount = Math.round(Number(body.amount) * 100);
    const frequency = body.frequency === "monthly" ? "monthly" : "one-time";
    if (!Number.isInteger(amount) || amount < 100 || amount > 10_000_000) {
      return NextResponse.json({ error: "Enter a gift between $1 and $100,000" }, { status: 400 });
    }

    const requestOrigin = req.headers.get("origin");
    const origin = requestOrigin === "https://www.outpouringmissions.live"
      ? requestOrigin
      : "https://outpouringmissions.live";
    const recurring = frequency === "monthly" ? { interval: "month" as const } : undefined;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: recurring ? "subscription" : "payment",
    payment_method_types: ["card"],
    wallet_options: {
      link: { display: "never" },
    },
      branding_settings: {
        background_color: "#ffffff",
        button_color: "#000000",
        border_style: "rounded",
        display_name: "Outpouring Missions International",
        font_family: "inter",
      },
      submit_type: "donate",
      integration_identifier: "omi_giving_wqjxnrta",
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amount,
          recurring,
          product_data: { name: frequency === "monthly" ? "OMI Monthly Partnership" : "Gift to Outpouring Missions International" },
        },
      }],
      custom_fields: [{
        key: "donor_name",
        label: { type: "custom", custom: "Donor name" },
        type: "text",
        optional: false,
      }],
      metadata: { site: "omi", source: "omi-give-page", purpose: "general-donation", frequency },
      return_url: `${origin}/give?donation=complete&session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Giving form could not be started" }, { status: 500 });
  }
}
