import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import ImageSlot from "./ImageSlot";

/* ============================================================
   Split-hero layout — image left, content right
   Use for: Give, SABWB, Entrepreneurial Development, focused
   single-subject pages that benefit from a hero photograph.
   Pattern: 50/50 hero → stats strip → 2-col alternating
   features → CTA band.
   ============================================================ */

type Stat = { num: string; label: string };
type Feature = { title: string; body: string; caption?: string };

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  externalLink?: { label: string; href: string };
  primaryCta?: { label: string; href: string };
  heroCaption?: string;
  stats?: Stat[];
  features?: Feature[];
  closing?: { title: string; body: string };
};

export default function SplitHeroPage({
  eyebrow,
  title,
  lede,
  externalLink,
  primaryCta,
  heroCaption = "Hero photograph",
  stats,
  features,
  closing,
}: Props) {
  const resolvedStats: Stat[] = stats ?? [
    { num: "2008", label: "Year founded" },
    { num: "—", label: "People served" },
    { num: "—", label: "Programs running" },
  ];

  const resolvedFeatures: Feature[] = features ?? [
    {
      title: "Rooted in conviction",
      body: "Everything here flows from the core OMI mission — faith-driven, education-grounded, impact-measured.",
      caption: "Feature photo A",
    },
    {
      title: "Built for real life",
      body: "Programs are shaped around the realities of the people they serve — not theoretical frameworks.",
      caption: "Feature photo B",
    },
  ];

  return (
    <>
      <Nav />
      <main>
        {/* ---------------- SPLIT HERO ---------------- */}
        <section className="relative bg-indigo-deep pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(23,164,194,0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-container px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="eyebrow flex items-center gap-3 mb-5 text-gold-heritage">
                <span className="w-8 h-px bg-gold-heritage" />
                {eyebrow}
              </div>
              <h1 className="font-display font-black text-white text-5xl md:text-6xl leading-[1.05] tracking-tight">
                {title}
              </h1>
              <p className="mt-7 text-lg md:text-xl text-mist/85 leading-relaxed">
                {lede}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                {primaryCta && (
                  <Link href={primaryCta.href} className="btn btn-primary">
                    {primaryCta.label}
                  </Link>
                )}
                {externalLink && (
                  <a
                    href={externalLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    {externalLink.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 3h6v6M11 3L4 10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
            <div>
              <ImageSlot
                ratio="aspect-[4/5]"
                tone="dark"
                caption={heroCaption}
                id={`splithero-${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              />
            </div>
          </div>
        </section>

        {/* ---------------- STATS STRIP (light) ---------------- */}
        <section className="relative bg-offwhite text-indigo-deep">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />
          <div className="mx-auto max-w-container px-6 md:px-10 py-14 md:py-20">
            <div className="grid grid-cols-3 gap-8 md:gap-12">
              {resolvedStats.map((s, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="font-display font-black text-4xl md:text-6xl leading-none text-gradient-sunrise">
                    {s.num}
                  </div>
                  <div className="mt-3 eyebrow text-graphite/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FEATURES — alternating (light) ---------------- */}
        <section className="relative bg-offwhite text-indigo-deep pb-24 md:pb-32">
          <div className="mx-auto max-w-container px-6 md:px-10 space-y-20 md:space-y-28">
            {resolvedFeatures.map((f, i) => (
              <div
                key={i}
                className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ImageSlot
                  ratio="aspect-[4/3]"
                  tone="light"
                  caption={f.caption ?? `Feature ${i + 1}`}
                  id={`splithero-${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-feature-${i + 1}`}
                />
                <div>
                  <div className="font-display font-black text-gold-heritage text-sm mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display font-bold text-indigo-deep text-3xl md:text-4xl leading-tight mb-5">
                    {f.title}
                  </h3>
                  <p className="text-lg text-graphite/80 leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- CLOSING CTA (dark) ---------------- */}
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-indigo-deep via-indigo-royal to-teal-mission/60 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(242,197,74,0.22),transparent_60%)]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-black text-white text-3xl md:text-5xl leading-[1.1] tracking-tight">
              {closing?.title ?? "Join us."}
            </h2>
            <p className="mt-5 text-lg text-mist/85 max-w-xl mx-auto">
              {closing?.body ??
                "Take the next step — partner, attend, or reach out to learn more."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/give" className="btn btn-primary">Partner</Link>
              <Link href="/contact" className="btn btn-ghost">Contact</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
