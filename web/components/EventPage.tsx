import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import ImageSlot from "./ImageSlot";
import RegisterCard from "./RegisterCard";
import type { EventDetail } from "@/lib/events";

/* ============================================================
   EventPage — Eventbrite-style event detail / registration page.
   Structure:
     - Full-bleed cover with title overlay
     - 2-col body:
       - Left (wider): About, Agenda, Speakers, Location, FAQ
       - Right (narrower, sticky): Registration card w/ date, time,
         location, price tiers, register button
     - Share + organizer strip
   ============================================================ */

type Props = { event: EventDetail };

function Icon({ name, className = "w-4 h-4" }: { name: "calendar" | "clock" | "pin" | "ticket" | "share" | "check"; className?: string }) {
  switch (name) {
    case "calendar":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "pin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "ticket":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V9z" />
          <path d="M9 7v10" />
        </svg>
      );
    case "share":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
        </svg>
      );
    case "check":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
  }
}

export default function EventPage({ event: e }: Props) {
  const dateLabel = e.endDate && e.endDate !== e.startDate
    ? `${e.startDate} — ${e.endDate}`
    : e.startDate;
  const timeLabel = e.endTime
    ? `${e.startTime} — ${e.endTime}${e.timezone ? " " + e.timezone : ""}`
    : `${e.startTime}${e.timezone ? " " + e.timezone : ""}`;

  return (
    <>
      <Nav />
      <main className="bg-offwhite text-indigo-deep">
        {/* ---------------- COVER ---------------- */}
        <section className="relative bg-indigo-deep pt-24 pb-0 overflow-hidden">
          <div className="relative h-[360px] w-full overflow-hidden md:h-[520px]">
            {e.heroImage ? (
              <img
                src={e.heroImage}
                alt={e.title}
                className="absolute inset-0 block h-full w-full object-cover opacity-70"
              />
            ) : (
              <div className="absolute inset-0 p-6">
                <ImageSlot
                  ratio="h-full"
                  tone="dark"
                  caption={e.coverCaption ?? "Event cover photograph"}
                  id={`event-${e.slug}-cover`}
                />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-indigo-deep/70 to-indigo-deep/30" />
          </div>

          <div className="relative -mt-28 md:-mt-40 mx-auto max-w-container px-6 md:px-10 pb-8">
            <div className="mb-4">
              <Link
                href="/"
                className="text-xs uppercase tracking-[0.2em] font-display font-semibold text-mist/70 hover:text-white transition-colors"
              >
                ← Back
              </Link>
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-gold-heritage/15 border border-gold-heritage/30 text-[11px] uppercase tracking-[0.2em] font-display font-semibold text-gold-heritage mb-4">
              {e.kind}
            </div>
            <h1 className="font-display font-black text-white text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-4xl">
              {e.title}
            </h1>
            {e.tagline && (
              <p className="mt-4 text-xl md:text-2xl text-gold-heritage tagline-script max-w-3xl">
                {e.tagline}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist/80 font-display">
              <span className="inline-flex items-center gap-2">
                <Icon name="calendar" /> {dateLabel}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="clock" /> {timeLabel}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="pin" /> {e.location.name}
                {e.location.city ? ` · ${e.location.city}` : ""}
              </span>
            </div>
          </div>
        </section>

        {/* ---------------- BODY — 2 col ---------------- */}
        <section className="bg-offwhite">
          <div className="mx-auto max-w-container px-6 md:px-10 py-14 md:py-20 grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
            {/* LEFT — details */}
            <div className="space-y-14">
              {/* About */}
              <div>
                <h2 className="font-display font-bold text-indigo-deep text-2xl md:text-3xl mb-5">
                  About this event
                </h2>
                <div className="space-y-4 text-graphite text-base md:text-lg leading-[1.75]">
                  {e.about.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Agenda */}
              {e.agenda && e.agenda.length > 0 && (
                <div>
                  <h2 className="font-display font-bold text-indigo-deep text-2xl md:text-3xl mb-5">
                    Schedule
                  </h2>
                  <div className="rounded-lg border border-mist bg-white overflow-hidden">
                    {e.agenda.map((a, i) => (
                      <div
                        key={i}
                        className={`flex flex-col md:flex-row gap-2 md:gap-6 px-6 py-5 ${
                          i !== 0 ? "border-t border-mist" : ""
                        }`}
                      >
                        <div className="md:w-44 shrink-0 text-sm font-display font-semibold text-gold-heritage tracking-wide">
                          {a.time}
                        </div>
                        <div>
                          <div className="font-display font-semibold text-indigo-deep">
                            {a.title}
                          </div>
                          {a.detail && (
                            <div className="text-sm text-graphite/70 mt-1">{a.detail}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Speakers */}
              {e.speakers && e.speakers.length > 0 && (
                <div>
                  <h2 className="font-display font-bold text-indigo-deep text-2xl md:text-3xl mb-5">
                    Speakers
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {e.speakers.map((s, i) => (
                      <div key={i}>
                        <ImageSlot
                          ratio="aspect-square"
                          tone="light"
                          caption={s.caption ?? `Speaker ${i + 1}`}
                          id={`event-${e.slug}-speaker-${i + 1}`}
                        />
                        <div className="mt-3">
                          <div className="font-display font-semibold text-indigo-deep text-sm">
                            {s.name}
                          </div>
                          {s.role && (
                            <div className="text-xs text-graphite/70 mt-0.5">{s.role}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              <div>
                <h2 className="font-display font-bold text-indigo-deep text-2xl md:text-3xl mb-5">
                  Location
                </h2>
                <div className="rounded-lg border border-mist bg-white p-6 md:p-8">
                  <div className="font-display font-semibold text-indigo-deep text-lg">
                    {e.location.name}
                  </div>
                  {e.location.address && (
                    <div className="text-graphite mt-1">{e.location.address}</div>
                  )}
                  {e.location.city && (
                    <div className="text-graphite">{e.location.city}</div>
                  )}
                  <div className="mt-6">
                    <ImageSlot
                      ratio="aspect-[16/9]"
                      tone="light"
                      caption="Venue map / photograph"
                      id={`event-${e.slug}-location`}
                    />
                  </div>
                </div>
              </div>

              {/* FAQ */}
              {e.faq && e.faq.length > 0 && (
                <div>
                  <h2 className="font-display font-bold text-indigo-deep text-2xl md:text-3xl mb-5">
                    Frequently asked
                  </h2>
                  <div className="rounded-lg border border-mist bg-white divide-y divide-mist overflow-hidden">
                    {e.faq.map((f, i) => (
                      <details key={i} className="group">
                        <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                          <span className="font-display font-semibold text-indigo-deep text-base md:text-lg">
                            {f.q}
                          </span>
                          <span className="text-gold-heritage shrink-0 mt-1 group-open:rotate-45 transition-transform text-xl leading-none">
                            +
                          </span>
                        </summary>
                        <div className="px-6 pb-5 -mt-1 text-graphite text-sm md:text-base leading-relaxed">
                          {f.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Organizer strip */}
              <div className="pt-8 border-t border-mist">
                <div className="eyebrow text-gold-heritage mb-3">Presented by</div>
                <div className="flex items-center gap-4">
                  <img
                    src="/omi-logo.png"
                    alt="Outpouring Missions International"
                    className="h-14 w-auto object-contain"
                  />
                  <div>
                    <Link href="/about" className="text-sm text-teal-mission hover:text-indigo-deep transition-colors font-display font-semibold">
                      About OMI →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — sticky register card (real Stripe flow) */}
            <RegisterCard event={e} dateLabel={dateLabel} timeLabel={timeLabel} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
