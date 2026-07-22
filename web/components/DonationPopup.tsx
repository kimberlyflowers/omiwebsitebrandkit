"use client";

import { loadStripe, type StripeEmbeddedCheckout } from "@stripe/stripe-js";
import { useEffect, useRef, useState } from "react";

const amounts = [25, 50, 100, 250];

export default function DonationPopup() {
  const [open, setOpen] = useState(false);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<StripeEmbeddedCheckout | null>(null);

  useEffect(() => {
    function syncFromHash() {
      const monthly = window.location.hash === "#give-monthly";
      const shouldOpen = monthly || window.location.hash === "#give";
      if (monthly) setFrequency("monthly");
      setOpen(shouldOpen);
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError(null);
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
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
        const checkout = await stripe.createEmbeddedCheckoutPage({ clientSecret: data.clientSecret });
        if (cancelled) return checkout.destroy();
        checkoutRef.current = checkout;
        if (mountRef.current) checkout.mount(mountRef.current);
      } catch (reason) {
        if (!cancelled) setError(reason instanceof Error ? reason.message : "Giving form could not be started");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 450);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
    };
  }, [open, amount, frequency]);

  function close() {
    setOpen(false);
    checkoutRef.current?.destroy();
    checkoutRef.current = null;
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-labelledby="give-title">
      <button type="button" className="absolute inset-0 bg-indigo-deep/85 backdrop-blur-sm" onClick={close} aria-label="Close giving form" />
      <div className="relative max-h-[94vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-omi-lg md:m-6 md:max-w-3xl md:rounded-xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-mist bg-white px-6 py-5 md:px-8">
          <div><div className="eyebrow text-gold-heritage">Secure giving</div><h2 id="give-title" className="mt-1 font-display text-2xl font-black text-indigo-deep">Partner with OMI</h2></div>
          <button type="button" onClick={close} className="rounded-full border border-mist px-3 py-1.5 text-sm text-graphite hover:border-gold-heritage" aria-label="Close">Close</button>
        </div>
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-offwhite p-1">
            {(["one-time", "monthly"] as const).map((option) => <button key={option} type="button" onClick={() => setFrequency(option)} className={`rounded-md px-4 py-3 font-display text-sm font-semibold ${frequency === option ? "bg-indigo-deep text-white shadow" : "text-indigo-deep"}`}>{option === "one-time" ? "One-time gift" : "Monthly partner"}</button>)}
          </div>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {amounts.map((value) => <button key={value} type="button" onClick={() => { setAmount(value); setCustomAmount(""); }} className={`rounded-md border px-2 py-3 font-display font-bold ${amount === value && !customAmount ? "border-gold-heritage bg-gold-heritage/10 text-indigo-deep" : "border-mist text-graphite"}`}>${value}</button>)}
          </div>
          <label className="mt-3 block text-sm font-semibold text-indigo-deep">Custom amount
            <div className="mt-1 flex rounded-md border border-mist bg-white focus-within:border-gold-heritage"><span className="px-3 py-3 text-graphite/60">$</span><input inputMode="decimal" value={customAmount} onChange={(event) => { const value = event.target.value; setCustomAmount(value); const parsed = Number(value); if (parsed >= 1) setAmount(parsed); }} placeholder="Other amount" className="w-full bg-transparent py-3 pr-3 outline-none" /></div>
          </label>
          <div className="mt-6 border-t border-mist pt-5">
            <div className="mb-3 text-center"><div className="eyebrow text-gold-heritage">Embedded Stripe checkout</div><p className="mt-1 text-xs text-graphite/60">Your secure payment stays on this page.</p></div>
            {loading && <div className="flex min-h-[320px] items-center justify-center text-sm text-graphite/60">Loading secure giving form…</div>}
            {error && <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
            <div ref={mountRef} className={loading || error ? "hidden" : "min-h-[620px] w-full"} aria-label="Embedded Stripe giving form" />
          </div>
        </div>
      </div>
    </div>
  );
}
