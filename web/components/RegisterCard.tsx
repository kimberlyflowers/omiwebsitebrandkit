"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { loadStripe, type StripeEmbeddedCheckout } from "@stripe/stripe-js";
import type { EventDetail } from "@/lib/events";

function Icon({ name, className = "w-4 h-4" }: { name: "calendar" | "pin" | "check"; className?: string }) {
  const paths = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
    pin: <><path d="M12 22s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
    check: <path d="M5 13l4 4L19 7" />,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

type Props = { event: EventDetail; dateLabel: string; timeLabel: string };

export default function RegisterCard({ event, dateLabel, timeLabel }: Props) {
  const firstAvailable = event.priceTiers.find((tier) => !tier.soldOut);
  const [selectedTier, setSelectedTier] = useState(firstAvailable?.label ?? "");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const mountRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<StripeEmbeddedCheckout | null>(null);
  const requestKey = useMemo(() => `${event.slug}:${selectedTier}:${quantity}`, [event.slug, selectedTier, quantity]);

  useEffect(() => {
    let cancelled = false;

    async function mountCheckout() {
      setLoading(true);
      setError(null);
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
      if (mountRef.current) mountRef.current.replaceChildren();

      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventSlug: event.slug, tierLabel: selectedTier, quantity }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || "Checkout could not be started");

        const stripe = await loadStripe(data.publishableKey);
        if (!stripe || cancelled) return;
        const checkout = await stripe.createEmbeddedCheckoutPage({ clientSecret: data.clientSecret });
        if (cancelled) {
          checkout.destroy();
          return;
        }
        checkoutRef.current = checkout;
        if (mountRef.current) checkout.mount(mountRef.current);
        setLoading(false);
      } catch (reason) {
        if (!cancelled) {
          setError(reason instanceof Error ? reason.message : "Checkout could not be started");
          setLoading(false);
        }
      }
    }

    if (selectedTier) void mountCheckout();
    return () => {
      cancelled = true;
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
    };
  }, [requestKey, event.slug, selectedTier, quantity]);

  return (
    <aside className="self-start lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-lg border border-mist bg-white shadow-omi-md">
        <div className="h-1 bg-gradient-to-r from-gold-heritage to-gold-bright" />
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-3">
            <Icon name="calendar" className="mt-0.5 h-5 w-5 shrink-0 text-gold-heritage" />
            <div><div className="font-display text-sm font-semibold text-indigo-deep">{dateLabel}</div><div className="mt-0.5 text-xs text-graphite/70">{timeLabel}</div></div>
          </div>
          <div className="mt-4 flex items-start gap-3">
            <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-gold-heritage" />
            <div><div className="font-display text-sm font-semibold text-indigo-deep">{event.location.name}</div>{event.location.city && <div className="mt-0.5 text-xs text-graphite/70">{event.location.city}</div>}</div>
          </div>

          <div className="my-5 divider-gold" />
          <div className="eyebrow mb-3 text-graphite/60">Tickets</div>
          <div className="space-y-2">
            {event.priceTiers.map((tier) => {
              const selected = selectedTier === tier.label;
              return (
                <label key={tier.label} className={`flex min-h-[82px] items-start gap-3 rounded-md border px-4 py-3 transition-colors ${tier.soldOut ? "cursor-not-allowed border-mist bg-mist/20 opacity-60" : selected ? "cursor-pointer border-gold-heritage bg-gold-heritage/5" : "cursor-pointer border-mist hover:border-gold-heritage/60"}`}>
                  <input type="radio" name={`tier-${event.slug}`} checked={selected} disabled={tier.soldOut} onChange={() => setSelectedTier(tier.label)} className="mt-1 accent-gold-heritage" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3"><span className="font-display text-sm font-semibold text-indigo-deep">{tier.label}</span><span className="font-display text-sm font-black text-indigo-deep">{tier.price}</span></div>
                    {tier.description && <div className="mt-1 text-xs leading-snug text-graphite/70">{tier.description}</div>}
                    {tier.soldOut && <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#B83636]">Sold out</div>}
                  </div>
                </label>
              );
            })}
          </div>

          <label className="mt-4 flex items-center justify-between gap-4 text-sm font-semibold text-indigo-deep">
            Quantity
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="rounded-md border border-mist bg-white px-3 py-2 text-sm focus:border-gold-heritage focus:outline-none">
              {[1,2,3,4,5,6,7,8,9,10].map((number) => <option key={number} value={number}>{number}</option>)}
            </select>
          </label>
        </div>

        <div className="border-t border-mist bg-white px-2 pb-4 pt-2">
          <div className="px-4 pb-2 pt-3 text-center">
            <div className="eyebrow text-gold-heritage">Secure embedded checkout</div>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-graphite/60"><Icon name="check" className="h-3.5 w-3.5 text-teal-mission" /> Payment stays on this page</div>
          </div>
          {loading && <div className="flex min-h-[320px] items-center justify-center text-sm text-graphite/60">Loading secure payment form…</div>}
          {error && <div className="mx-4 my-5 rounded-md border border-[#B83636]/20 bg-[#B83636]/5 px-3 py-3 text-sm text-[#B83636]">{error}</div>}
          <div ref={mountRef} className={loading || error ? "hidden" : "min-h-[620px] w-full overflow-visible"} aria-label="Embedded Stripe checkout" />
        </div>
      </div>
      <p className="mt-3 px-2 text-[11px] leading-relaxed text-graphite/60">Payment is processed securely by Stripe. Card details never touch OMI servers.</p>
    </aside>
  );
}
