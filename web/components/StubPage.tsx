import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import ImageSlot from "./ImageSlot";

type ExternalLink = { label: string; href: string };

type OverviewCard = { title: string; body: string; caption?: string };

type EngageBlock = {
  title: string;
  body: string;
  cta?: { label: string; href: string };
  caption?: string;
};

type HeroImage = {
  src?: string;
  alt?: string;
  caption?: string;
  id?: string;
  opacity?: number; // 0-100, default 65
};

type Props = {
  eyebrow: string;
  title: string;
  script?: string;
  lede: string;
  notice?: string;
  accent?: "indigo" | "gold" | "teal" | "action";
  externalLink?: ExternalLink;
  heroImage?: HeroImage;
  overviewCards?: OverviewCard[];
  pullQuote?: string;
  pullQuoteAttribution?: string;
  engage?: EngageBlock;
};

const heroGradient = {
  indigo: "bg-celestial",
  gold:   "bg-[radial-gradient(ellipse_at_30%_40%,#3D2A0F,#0B1F3D_70%)]",
  teal:   "bg-[radial-gradient(ellipse_at_30%_40%,#0A5A6F,#0B1F3D_70%)]",
  action: "bg-[radial-gradient(ellipse_at_30%_40%,#3A1111,#0B1F3D_70%)]",
};

export default function StubPage({
  eyebrow,
  title,
  script,
  lede,
  notice,
  accent = "indigo",
  externalLink,
  heroImage,
  overviewCards,
  pullQuote = "Transforming Lives. Igniting Futures.",
  pullQuoteAttribution,
  engage,
}: Props) {
  const cards: OverviewCard[] = overviewCards ?? [
    {
      title: "What it is",
      body: "A short, clear explanation of this ministry's purpose and who it serves.",
      caption: "Hero photo",
    },
    {
      title: "Who it's for",
      body: "The people we're built to walk alongside — and why it matters now.",
      caption: "Community photo",
    },
    {
      title: "How to engage",
      body: "Simple next steps for anyone ready to lean in — attend, support, or serve.",
      caption: "Action photo",
    },
  ];

  const engageBlock: EngageBlock = engage ?? {
    title: "Take the next step.",
    body:
      "Content for this section is being finalized. Reach out to learn more, or explore the rest of the movement in the meantime.",
    cta: { label: "Contact us", href: "/contact" },
    caption: "Feature photo",
  };

  return (
    <>
      <Nav />
      <main>
        {/* ---------------- HERO (dark) ---------------- */}
        <section className={`relative min-h-[70vh] ${heroGradient[accent]} grain flex items-center overflow-hidden`}>
          {/* Optional hero image — tinted indigo so the brand stays dominant */}
          {heroImage && (
            <>
              {heroImage.src ? (
                <img
                  src={heroImage.src}
                  alt={heroImage.alt ?? ""}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: (heroImage.opacity ?? 65) / 100 }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <ImageSlot
                    ratio="aspect-auto h-full"
                    tone="dark"
                    caption={heroImage.caption ?? "Hero image placeholder"}
                    id={heroImage.id ?? "hero-image"}
                    className="max-w-4xl"
                  />
                </div>
              )}
              {/* Indigo wash for tint + legibility */}
              <div className="absolute inset-0 bg-indigo-deep/55" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-deep/80 via-indigo-deep/40 to-indigo-deep/80" />
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-deep" />
          <div className="relative mx-auto max-w-container px-6 md:px-10 pt-36 pb-24">
            <div className="eyebrow flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gold-heritage" />
              {eyebrow}
            </div>
            <h1 className="font-display font-black text-white text-5xl md:text-7xl leading-[1.05] tracking-tight max-w-4xl">
              {title}
              {script && (
                <>
                  {" "}
                  <span className="tagline-script font-normal text-gradient-sunrise block md:inline text-[1.05em] mt-2">
                    {script}
                  </span>
                </>
              )}
            </h1>
            <p className="mt-8 text-lg md:text-xl text-mist/80 leading-relaxed max-w-2xl">
              {lede}
            </p>
            {notice && (
              <div className="mt-8 inline-block px-4 py-2 rounded-full border border-gold-heritage/30 bg-gold-heritage/5 text-xs font-display font-semibold text-gold-heritage tracking-wide">
                {notice}
              </div>
            )}
            {externalLink && (
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={externalLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {externalLink.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 3h6v6M11 3L4 10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ---------------- OVERVIEW (light) ---------------- */}
        <section className="relative py-24 md:py-32 bg-offwhite text-indigo-deep">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />
          <div className="mx-auto max-w-container px-6 md:px-10">
            <div className="max-w-3xl mb-14">
              <div className="eyebrow mb-4 flex items-center gap-3 text-gold-heritage">
                <span className="w-8 h-px bg-gold-heritage" />
                Overview
              </div>
              <h2 className="font-display font-black text-indigo-deep text-3xl md:text-5xl leading-[1.1] tracking-tight">
                At a glance.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {cards.map((c, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-white border border-mist shadow-omi-sm overflow-hidden hover:shadow-omi-md transition-shadow duration-500"
                >
                  <ImageSlot
                    ratio="aspect-[4/3]"
                    tone="light"
                    caption={c.caption ?? `Image ${i + 1}`}
                    id={`${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-card-${i + 1}`}
                  />
                  <div className="p-7">
                    <div className="font-display font-black text-gold-heritage text-xs mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-display font-bold text-indigo-deep text-xl leading-tight mb-3">
                      {c.title}
                    </h3>
                    <p className="text-graphite/80 text-sm leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- PULLQUOTE (dark) ---------------- */}
        <section className="relative py-24 md:py-32 bg-indigo-deep overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,164,194,0.12),transparent_60%)]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <div className="eyebrow justify-center flex items-center gap-3 mb-8 text-gold-heritage">
              <span className="w-8 h-px bg-gold-heritage" />
              In our words
              <span className="w-8 h-px bg-gold-heritage" />
            </div>
            <blockquote className="font-display font-black text-white text-3xl md:text-5xl leading-[1.15] tracking-tight">
              "{pullQuote}"
            </blockquote>
            {pullQuoteAttribution && (
              <div className="mt-6 text-sm text-mist/60 font-display">
                — {pullQuoteAttribution}
              </div>
            )}
          </div>
        </section>

        {/* ---------------- ENGAGE (light) ---------------- */}
        <section className="relative py-24 md:py-32 bg-offwhite text-indigo-deep">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />
          <div className="mx-auto max-w-container px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <ImageSlot
                  ratio="aspect-[5/4]"
                  tone="light"
                  caption={engageBlock.caption ?? "Feature photo"}
                  id={`${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-feature`}
                />
              </div>
              <div>
                <div className="eyebrow mb-4 flex items-center gap-3 text-gold-heritage">
                  <span className="w-8 h-px bg-gold-heritage" />
                  Engage
                </div>
                <h2 className="font-display font-black text-indigo-deep text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
                  {engageBlock.title}
                </h2>
                <p className="text-lg text-graphite/80 leading-relaxed mb-8">
                  {engageBlock.body}
                </p>
                {engageBlock.cta && (
                  <Link href={engageBlock.cta.href} className="btn btn-primary">
                    {engageBlock.cta.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 7h12m-5-5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- CTA BAND (dark) ---------------- */}
        <section className="relative py-20 md:py-24 bg-gradient-to-br from-indigo-deep via-indigo-royal to-teal-mission/60 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(242,197,74,0.22),transparent_60%)]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-black text-white text-3xl md:text-5xl leading-[1.1] tracking-tight">
              Want to go deeper?
            </h2>
            <p className="mt-4 text-lg text-mist/85 max-w-xl mx-auto">
              Full content arrives with the next release. In the meantime, head
              home, partner with us, or get in touch.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="btn btn-primary">
                Back home
              </Link>
              <Link href="/give" className="btn btn-ghost">
                Partner
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
