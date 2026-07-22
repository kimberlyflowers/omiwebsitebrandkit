import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;

export const stripe = secret
  ? new Stripe(secret, { apiVersion: "2026-06-24.dahlia" })
  : null;

export const hasStripeConfigured = Boolean(secret);
