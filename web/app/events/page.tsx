import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ImageSlot from "@/components/ImageSlot";
import { events, type EventDetail } from "@/lib/events";

export const metadata = {
  title: "Events Calendar — Outpouring Missions International",
  description: "Every Outpouring gathering in one place. Click any event to learn more and register.",
};

/* ------------------------------------------------------------
   Sort & group events by month for a calendar-style listing.
   ------------------------------------------------------------ */

const MONTH_ORDER = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function parseStart(e: EventDetail): { year: number; month: string; day: number; date: Date } {
  const d = new Date(e.startDate);
  return {
    year: d.getFullYear(),
    month: MONTH_ORDER[d.getMonth()] ?? "",
    day: d.getDate(),
    date: d,
  };
}

function groupByMonth(list: EventDetail[]): { label: string; items: EventDetail[] }[] {
  const sorted = [...list].sort(
    (a, b) => parseStart(a).date.getTime() - parseStart(b).date.getTime()
  );
  const buckets = new Map<string, EventDetail[]>();
  for (const e of sorted) {
    const { year, month } = parseStart(e);
    const key = `${month} ${year}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(e);
  }
  return Array.from(buckets, ([label, items]) => ({ label, items }));
}

const KIND_ACCENT: Record<EventDetail["kind"], { bar: string; badge: string; chip: string }> = {
  Conference: {
    bar: "bg-gradient-to-r from-gold-heritage to-gold-bright",
    badge: "bg-gold-heritage/15 text-gold-heritage border-gold-heritage/30",
    chip: "text-gold-heritage",
  },
  Teaching: {
    bar: "bg-gradient-to-r from-teal-mission to-teal-electric",
    badge: "bg-teal-mission/15 text-teal-mission border-teal-mission/30",
    chip: "text-teal-mission",
  },
  Gathering: {
    bar: "bg-gradient-to-r from-indigo-500 to-teal-mission",
    badge: "bg-indigo-500/15 text-indigo-500 border-indigo-500/30",
    chip: "text-indigo-500",
  },
};

export default function EventsCalendar() {
  const groups = groupByMonth(events);

  return (
    <>
      <Nav />
      <main>
        {/* ---------------- HERO (dark) ---------------- */}
        <section className="relative bg-celestial grain pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-deep" />
          <div className="relative mx-auto max-w-container px-6 md:px-10">
            <div className="eyebrow flex items-center gap-3 mb-5 text-gold-heritage">
              <span className="w-8 h-px bg-gold-heritage" />
              Events Calendar
            </div>
            <h1 className="font-display font-black text-white text-5xl md:text-7xl leading-[1.05] tracking-tight max-w-3xl">
              Every gathering. One place.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-mist/85 leading-relaxed max-w-2xl">
              The annual conference, seasonal teaching intensives, and one-day gatherings across the year. Click any event to see details and register.
            </p>
          </div>
        </section>

        {/* ---------------- CALENDAR (light) ---------------- */}
        <section className="relative bg-offwhite text-indigo-deep py-16 md:py-24">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />
          <div className="mx-auto max-w-container px-6 md:px-10">
            {/* Legend / filter strip */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-6 border-b border-mist">
              <div className="flex items-center gap-5 flex-wrap">
                <span className="text-xs font-display font-semibold text-graphite uppercase tracking-wider">
                  {events.length} events
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-display font-semibold">
                  <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-gold-heritage to-gold-bright" />
                  Conference
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-display font-semibold">
                  <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-teal-mission to-teal-electric" />
                  Teaching
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-display font-semibold">
                  <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-indigo-500 to-teal-mission" />
                  Gathering
                </span>
              </div>
              <Link
                href="/conference"
                className="text-sm font-display font-semibold text-gold-heritage hover:text-indigo-deep transition-colors"
              >
                Featured: Annual Conference →
              </Link>
            </div>

            {/* Month groups */}
            <div className="space-y-14">
              {groups.map((g) => (
                <div key={g.label}>
                  <div className="flex items-baseline gap-4 mb-6">
                    <h2 className="font-display font-black text-indigo-deep text-2xl md:text-3xl">
                      {g.label}
                    </h2>
                    <div className="flex-1 h-px bg-mist" />
                    <span className="text-xs font-display font-semibold text-graphite/60 uppercase tracking-wider">
                      {g.items.length} {g.items.length === 1 ? "event" : "events"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {g.items.map((e) => {
                      const start = parseStart(e);
                      const accent = KIND_ACCENT[e.kind];
                      return (
                        <Link
                          key={e.slug}
                          href={`/events/${e.slug}`}
                          className="group flex flex-col md:flex-row md:items-stretch gap-0 rounded-lg bg-white border border-mist shadow-omi-sm hover:shadow-omi-lg hover:border-gold-heritage/40 transition-all duration-500 overflow-hidden"
                        >
                          {/* Accent bar */}
                          <div className={`w-full h-1 md:w-1.5 md:h-auto ${accent.bar}`} />

                          {/* Date block */}
                          <div className="flex md:flex-col items-center justify-center md:justify-start md:pt-6 md:pb-5 px-6 py-4 md:px-8 md:min-w-[140px] gap-3 md:gap-1 bg-offwhite/60 border-b md:border-b-0 md:border-r border-mist">
                            <div className="font-display font-black text-gold-heritage text-4xl md:text-5xl leading-none">
                              {start.day}
                            </div>
                            <div className="text-left md:text-center">
                              <div className="text-xs font-display font-semibold uppercase tracking-widest text-graphite">
                                {start.month.slice(0, 3)}
                              </div>
                              <div className="text-[11px] text-graphite/60 font-display">
                                {start.year}
                              </div>
                            </div>
                          </div>

                          {/* Thumbnail */}
                          <div className="md:w-48 shrink-0 md:border-r md:border-mist">
                            <ImageSlot
                              ratio="aspect-[16/9] md:aspect-auto md:h-full"
                              tone="light"
                              caption={e.coverCaption ?? "Event photo"}
                              id={`calendar-${e.slug}-thumb`}
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-6 md:p-7 flex flex-col">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className={`inline-flex items-center text-[10px] font-display font-semibold uppercase tracking-widest border rounded-full px-2 py-0.5 ${accent.badge}`}>
                                {e.kind}
                              </span>
                              <span className="text-xs text-graphite/70 font-display">
                                {e.endDate && e.endDate !== e.startDate
                                  ? `${e.startDate.split(",")[0].replace(/\w+, /, "")} — ${e.endDate.split(",")[0].replace(/\w+, /, "")}`
                                  : e.startDate}
                                {e.startTime && ` · ${e.startTime}`}
                              </span>
                            </div>
                            <h3 className="font-display font-bold text-indigo-deep text-xl md:text-2xl leading-tight">
                              {e.title}
                            </h3>
                            {e.tagline && (
                              <p className="mt-2 text-sm text-graphite/80 leading-relaxed">
                                {e.tagline}
                              </p>
                            )}
                            <div className="mt-4 flex items-center justify-between gap-4">
                              <div className="text-xs text-graphite/70 font-display">
                                {e.location.name}
                                {e.location.city ? ` · ${e.location.city}` : ""}
                              </div>
                              <div className="flex items-center gap-2 text-xs font-display font-semibold text-graphite/80">
                                {e.priceTiers[0] && (
                                  <span>From <span className={accent.chip}>{e.priceTiers[0].price}</span></span>
                                )}
                                <span className="text-gold-heritage group-hover:translate-x-1 transition-transform">→</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CTA BAND (dark) ---------------- */}
        <section className="relative py-20 md:py-24 bg-gradient-to-br from-indigo-deep via-indigo-royal to-teal-mission/60 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(242,197,74,0.22),transparent_60%)]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-black text-white text-3xl md:text-5xl leading-[1.1] tracking-tight">
              Don&apos;t see a gathering near you?
            </h2>
            <p className="mt-4 text-lg text-mist/85 max-w-xl mx-auto">
              New events land quarterly. Reach out if you&apos;d like to host an Outpouring teaching in your city.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-primary">Get in touch</Link>
              <Link href="/" className="btn btn-ghost">Back home</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
