"use client";

import { useState } from "react";
import type { EventDetail } from "@/lib/events";

/* ============================================================
   RegisterCard — the sticky registration sidebar on EventPage.
   Owns tier selection + modal form + Stripe Checkout redirect.
   ============================================================ */

function Icon({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    pin: <><path d="M12 22s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
    ticket: <><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V9z" /><path d="M9 7v10" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></>,
    check: <path d="M5 13l4 4L19 7" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    spinner: <path d="M12 2a10 10 0 1 0 10 10" />,
  };
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

type Props = {
  event: EventDetail;
  dateLabel: string;
  timeLabel: string;
};

export default function RegisterCard({ event, dateLabel, timeLabel }: Props) {
  const firstAvailable = event.priceTiers.find((t) => !t.soldOut);
  const [selectedTier, setSelectedTier] = useState<string>(
    firstAvailable?.label ?? event.priceTiers[0]?.label ?? ""
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    quantity: 1,
    notes: "",
  });

  const selected = event.priceTiers.find((t) => t.label === selectedTier);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug: event.slug,
          tierLabel: selectedTier,
          quantity: Number(form.quantity) || 1,
          attendee: {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            notes: form.notes.trim(),
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Checkout failed (${res.status})`);
      }

      const { url } = (await res.json()) as { url: string };
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.tagline ?? "",
          url: window.location.href,
        });
      } catch {
        /* user cancelled — no-op */
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <>
      <aside className="lg:sticky lg:top-28 self-start">
        <div className="rounded-lg bg-white border border-mist shadow-omi-md overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-gold-heritage to-gold-bright" />
          <div className="p-6 md:p-7">
            <div className="flex items-start gap-3">
              <div className="text-gold-heritage mt-1"><Icon name="calendar" className="w-5 h-5" /></div>
              <div>
                <div className="font-display font-semibold text-indigo-deep text-sm">{dateLabel}</div>
                <div className="text-xs text-graphite/70 mt-0.5">{timeLabel}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-4">
              <div className="text-gold-heritage mt-1"><Icon name="pin" className="w-5 h-5" /></div>
              <div>
                <div className="font-display font-semibold text-indigo-deep text-sm">{event.location.name}</div>
                {event.location.city && <div className="text-xs text-graphite/70 mt-0.5">{event.location.city}</div>}
              </div>
            </div>

            <div className="my-6 divider-gold" />

            <div className="eyebrow text-graphite/60 mb-3">Tickets</div>
            <div className="space-y-2">
              {event.priceTiers.map((t) => {
                const isSelected = selectedTier === t.label;
                return (
                  <label
                    key={t.label}
                    className={`flex items-start gap-3 px-4 py-3 rounded-md border cursor-pointer transition-colors ${
                      t.soldOut
                        ? "border-mist bg-mist/20 cursor-not-allowed opacity-60"
                        : isSelected
                        ? "border-gold-heritage bg-gold-heritage/5"
                        : "border-mist hover:border-gold-heritage/60 hover:bg-gold-heritage/5"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`tier-${event.slug}`}
                      value={t.label}
                      disabled={t.soldOut}
                      checked={isSelected}
                      onChange={() => setSelectedTier(t.label)}
                      className="mt-1 accent-gold-heritage"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="font-display font-semibold text-indigo-deep text-sm">{t.label}</div>
                        <div className="font-display font-black text-indigo-deep text-sm">{t.price}</div>
                      </div>
                      {t.description && <div className="text-xs text-graphite/70 mt-1 leading-snug">{t.description}</div>}
                      {t.soldOut && (
                        <div className="text-[10px] uppercase tracking-wider font-display font-semibold text-[#B83636] mt-1">Sold out</div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              disabled={!selected || selected.soldOut}
              className="btn btn-primary w-full mt-6 !justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ticket" className="w-4 h-4" />
              Register
            </button>

            <div className="mt-4 flex items-center justify-center gap-5 text-xs text-graphite/60">
              <button type="button" onClick={handleShare} className="inline-flex items-center gap-1.5 hover:text-indigo-deep transition-colors">
                <Icon name="share" className="w-3.5 h-3.5" />
                Share
              </button>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="check" className="w-3.5 h-3.5 text-teal-mission" />
                Secure checkout
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-graphite/60 leading-relaxed px-2">
          Payment is processed securely by Stripe. You&apos;ll receive a confirmation email with full event details after checkout.
        </p>
      </aside>

      {/* Registration modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="register-title"
        >
          <div
            className="absolute inset-0 bg-indigo-deep/80 backdrop-blur-sm"
            onClick={() => !submitting && setModalOpen(false)}
          />
          <div className="relative w-full md:max-w-xl max-h-[90vh] overflow-y-auto bg-white text-indigo-deep rounded-t-2xl md:rounded-lg shadow-omi-lg border border-white/20 m-0 md:m-6">
            <div className="h-1 bg-gradient-to-r from-gold-heritage to-gold-bright" />
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow text-gold-heritage mb-2">Register</div>
                  <h2 id="register-title" className="font-display font-bold text-indigo-deep text-xl md:text-2xl leading-tight">
                    {event.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => !submitting && setModalOpen(false)}
                  className="text-graphite/50 hover:text-indigo-deep transition-colors p-1"
                  aria-label="Close"
                >
                  <Icon name="close" className="w-5 h-5" />
                </button>
              </div>

              {/* Summary */}
              <div className="mt-5 p-4 rounded-md bg-offwhite border border-mist">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-graphite/70">{dateLabel}</div>
                    <div className="font-display font-semibold text-indigo-deep mt-1">{selected?.label}</div>
                    {selected?.description && <div className="text-xs text-graphite/70 mt-0.5">{selected.description}</div>}
                  </div>
                  <div className="font-display font-black text-indigo-deep text-lg shrink-0">{selected?.price}</div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-display font-semibold text-graphite mb-1.5">
                      First name <span className="text-[#B83636]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-display font-semibold text-graphite mb-1.5">
                      Last name <span className="text-[#B83636]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold text-graphite mb-1.5">
                    Email <span className="text-[#B83636]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-display font-semibold text-graphite mb-1.5">
                      Phone <span className="text-graphite/50">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-display font-semibold text-graphite mb-1.5">Quantity</label>
                    <select
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold text-graphite mb-1.5">
                    Notes <span className="text-graphite/50">(dietary, accessibility, anything else)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-md border border-mist bg-white text-indigo-deep text-sm focus:outline-none focus:border-gold-heritage focus:ring-2 focus:ring-gold-heritage/20 resize-none"
                  />
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-3 border-t border-mist">
                  <div className="text-sm text-graphite/70">
                    {form.quantity} × {selected?.price}
                  </div>
                  <div className="font-display font-black text-indigo-deep text-lg">
                    {selected ? `$${((selected.priceCents * Number(form.quantity)) / 100).toFixed(2)}` : "—"}
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-[#B83636] bg-[#B83636]/5 border border-[#B83636]/20 rounded-md px-3 py-2.5">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary w-full !justify-center disabled:opacity-70 disabled:cursor-wait"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2a10 10 0 1 0 10 10" />
                      </svg>
                      Redirecting to secure checkout…
                    </>
                  ) : (
                    <>
                      <Icon name="ticket" className="w-4 h-4" />
                      Continue to payment
                    </>
                  )}
                </button>

                <p className="text-[11px] text-graphite/60 leading-relaxed text-center">
                  By continuing, you agree to receive event-related email from OMI.
                  Payment is processed securely by Stripe — card details never touch our servers.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
