"use client";

import { loadStripe, type StripeCheckoutElementsSdk, type StripePaymentElement } from "@stripe/stripe-js";
import { useEffect, useRef, useState } from "react";

const amounts = [25, 50, 100, 250];

export default function DonationPopup() {
  const [open, setOpen] = useState(false);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<StripeCheckoutElementsSdk | null>(null);
  const paymentElementRef = useRef<StripePaymentElement | null>(null);
  const actionsRef = useRef<null | {
    confirm: (args?: { email?: string; returnUrl?: string; redirect?: "always" | "if_required" }) => Promise<{ type: "success" } | { type: "error"; error: { message: string } }>;
  }>(null);

  useEffect(() => {
    function syncFromHash() {
      const monthly = window.location.hash === "#give-monthly";
      const shouldOpen = monthly || window.location.hash === "#give";
      if (monthly) setFrequency("monthly");
      setOpen(shouldOpen);
    }
    function openFromLink(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>('a[href="#give"], a[href="#give-monthly"]')
        : null;
      if (!target) return;
      event.preventDefault();
      const monthly = target.getAttribute("href") === "#give-monthly";
      setFrequency(monthly ? "monthly" : "one-time");
      setOpen(true);
      window.history.replaceState(null, "", monthly ? "#give-monthly" : "#give");
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    document.addEventListener("click", openFromLink);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      document.removeEventListener("click", openFromLink);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setCanConfirm(false);
      setComplete(false);
      setError(null);
      paymentElementRef.current?.destroy();
      paymentElementRef.current = null;
      checkoutRef.current = null;
      actionsRef.current = null;
      mountRef.current?.replaceChildren();
      try {
        const response = await fetch("/api/donate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, frequency }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Giving form could not be started");
        const stripe = await loadStripe(data.publishableKey);
        if (!stripe || cancelled) return;
        const checkout = stripe.initCheckoutElementsSdk({
          clientSecret: data.clientSecret,
          elementsOptions: {
            appearance: {
              theme: "flat",
              variables: {
                colorPrimary: "#0B1F3D",
                colorText: "#0B1F3D",
                colorDanger: "#B42318",
                colorBackground: "#FFFFFF",
                colorTextSecondary: "#586174",
                borderRadius: "8px",
                fontFamily: "Inter, Arial, sans-serif",
                spacingUnit: "5px",
              },
              rules: {
                ".Input": { border: "1px solid #D9DEE8", boxShadow: "none", padding: "14px" },
                ".Input:focus": { border: "1px solid #D4A24C", boxShadow: "0 0 0 2px rgba(212,162,76,.15)" },
                ".Tab": { border: "1px solid #D9DEE8", boxShadow: "none" },
                ".Tab--selected": { border: "1px solid #D4A24C", backgroundColor: "#FBF7EF" },
                ".Label": { fontWeight: "600" },
              },
            },
            savedPaymentMethod: { enableSave: "never", enableRedisplay: "never" },
          },
        });
        const paymentElement = checkout.createPaymentElement({
          layout: "accordion",
          fields: { billingDetails: { email: "never", name: "auto", address: "if_required" } },
        });
        if (cancelled) return paymentElement.destroy();
        checkoutRef.current = checkout;
        paymentElementRef.current = paymentElement;
        checkout.on("change", (session) => { if (!cancelled) setCanConfirm(session.canConfirm); });
        const actionsResult = await checkout.loadActions();
        if (actionsResult.type === "error") throw new Error(actionsResult.error.message);
        actionsRef.current = actionsResult.actions;
        if (mountRef.current) paymentElement.mount(mountRef.current);
      } catch (reason) {
        if (!cancelled) setError(reason instanceof Error ? reason.message : "Giving form could not be started");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 450);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      paymentElementRef.current?.destroy();
      paymentElementRef.current = null;
      checkoutRef.current = null;
      actionsRef.current = null;
    };
  }, [open, amount, frequency]);

  function close() {
    setOpen(false);
    paymentElementRef.current?.destroy();
    paymentElementRef.current = null;
    checkoutRef.current = null;
    actionsRef.current = null;
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  async function submitDonation(event: React.FormEvent) {
    event.preventDefault();
    const donorEmail = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(donorEmail)) {
      setError("Enter a valid email address");
      return;
    }
    if (!actionsRef.current || !canConfirm) {
      setError("Complete the payment details before donating");
      return;
    }
    setSubmitting(true);
    setError(null);
    const result = await actionsRef.current.confirm({
      email: donorEmail,
      returnUrl: `${window.location.origin}/give?donation=complete`,
      redirect: "if_required",
    });
    if (result.type === "error") setError(result.error.message);
    else setComplete(true);
    setSubmitting(false);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-labelledby="give-title">
      <button type="button" className="absolute inset-0 bg-indigo-deep/85 backdrop-blur-sm" onClick={close} aria-label="Close giving form" />
      <div className="relative max-h-[94dvh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-omi-lg md:m-4 md:flex md:h-[calc(100dvh-2rem)] md:max-h-none md:max-w-[1240px] md:flex-col md:overflow-hidden md:rounded-xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-mist bg-white px-6 py-4 md:static md:px-8">
          <div><div className="eyebrow text-gold-heritage">Secure giving</div><h2 id="give-title" className="mt-1 font-display text-2xl font-black text-indigo-deep">Partner with OMI</h2></div>
          <button type="button" onClick={close} className="rounded-full border border-mist px-3 py-1.5 text-sm text-graphite hover:border-gold-heritage" aria-label="Close">Close</button>
        </div>
        <div className="popup-grid p-6 md:grid md:min-h-0 md:flex-1 md:grid-cols-[minmax(0,1fr)_560px] md:p-0">
          <div className="min-w-0 md:border-r md:border-mist md:bg-offwhite/60 md:p-8">
            <p className="mb-5 hidden text-sm leading-relaxed text-graphite/70 md:block">Choose your gift. The secure payment form stays right here—no redirect and no separate checkout page.</p>
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-offwhite p-1 md:bg-white">
              {(["one-time", "monthly"] as const).map((option) => <button key={option} type="button" onClick={() => setFrequency(option)} className={`rounded-md px-3 py-3 font-display text-sm font-semibold ${frequency === option ? "bg-indigo-deep text-white shadow" : "text-indigo-deep"}`}>{option === "one-time" ? "One-time" : "Monthly"}</button>)}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {amounts.map((value) => <button key={value} type="button" onClick={() => { setAmount(value); setCustomAmount(""); }} className={`rounded-md border px-2 py-3 font-display font-bold ${amount === value && !customAmount ? "border-gold-heritage bg-gold-heritage/10 text-indigo-deep" : "border-mist bg-white text-graphite"}`}>${value}</button>)}
            </div>
            <label className="mt-5 block text-sm font-semibold text-indigo-deep">Custom amount
              <div className="mt-2 grid grid-cols-[44px_minmax(0,1fr)] overflow-hidden rounded-md border border-mist bg-white shadow-sm focus-within:border-gold-heritage focus-within:ring-2 focus-within:ring-gold-heritage/15"><span className="flex items-center justify-center border-r border-mist bg-offwhite text-base font-semibold text-graphite/70">$</span><input inputMode="decimal" value={customAmount} onChange={(event) => { const value = event.target.value; setCustomAmount(value); const parsed = Number(value); if (parsed >= 1) setAmount(parsed); }} placeholder="Enter any amount" className="min-w-0 w-full bg-transparent px-4 py-3.5 text-base text-indigo-deep outline-none placeholder:text-graphite/45" /></div>
              <span className="mt-1.5 block text-xs font-normal text-graphite/55">Minimum gift: $1</span>
            </label>
            <div className="mt-5 rounded-md border border-gold-heritage/20 bg-gold-heritage/5 p-4 text-xs leading-relaxed text-graphite/70">Your gift supports OMI programs and ministries. Payment details are handled securely by Stripe.</div>
          </div>
          <form onSubmit={submitDonation} className="mt-6 min-w-0 border-t border-mist pt-5 md:mt-0 md:flex md:h-full md:flex-col md:overflow-hidden md:border-0 md:px-7 md:pb-5 md:pt-5">
            <div className="mb-4">
              <div className="eyebrow text-gold-heritage">Secure Stripe payment</div>
              <div className="mt-1 flex items-end justify-between gap-4"><h3 className="font-display text-xl font-black text-indigo-deep">{frequency === "monthly" ? "Monthly partnership" : "One-time gift"}</h3><div className="font-display text-2xl font-black text-indigo-deep">${amount.toLocaleString()}</div></div>
            </div>
            {loading && <div className="flex min-h-[320px] items-center justify-center text-sm text-graphite/60">Loading secure giving form…</div>}
            {error && <div className="mb-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            {complete && <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">Thank you. Your donation was completed securely.</div>}
            <div className="relative min-h-0 flex-1">
              {!complete && <><label className="mb-4 block text-sm font-semibold text-indigo-deep">Email receipt<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-md border border-mist bg-white px-4 py-3 text-base text-indigo-deep outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/15" /></label><div ref={mountRef} className={loading ? "hidden" : "w-full"} aria-label="Secure Stripe payment details" /></>}
            </div>
            {!complete && <button type="submit" disabled={loading || submitting || !canConfirm} className="mt-4 w-full rounded-md bg-black px-5 py-4 font-display text-base font-bold text-white transition hover:bg-indigo-deep disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Processing securely…" : frequency === "monthly" ? `Donate $${amount.toLocaleString()} monthly` : `Donate $${amount.toLocaleString()}`}</button>}
            <p className="mt-2 text-center text-[11px] text-graphite/55">Payment details are encrypted and handled securely by Stripe.</p>
          </form>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) and (max-height: 980px) {
          .popup-grid {
            grid-template-columns: minmax(0, 1fr) 500px;
          }
          .checkout-scaler {
            position: absolute;
            left: 50%;
            top: 0;
            width: 113.636%;
            transform: translateX(-50%) scale(0.88);
            transform-origin: top center;
          }
        }
      `}</style>
    </div>
  );
}
