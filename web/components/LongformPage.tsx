import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import ImageSlot from "./ImageSlot";

/* ============================================================
   Longform layout — essay / editorial column
   Use for: About, Commentary, narrative-heavy pages.
   Pattern: narrow hero, drop-cap lede, inline image, sidebar quote.
   ============================================================ */

type Section = { kind: "prose" | "image" | "pullquote"; content: string; caption?: string };

type Props = {
  eyebrow: string;
  title: string;
  kicker?: string; // smaller line under title (byline / date)
  lede: string;
  sections?: Section[];
  outro?: { heading: string; body: string; cta?: { label: string; href: string } };
};

export default function LongformPage({
  eyebrow,
  title,
  kicker,
  lede,
  sections = [],
  outro,
}: Props) {
  const defaultSections: Section[] = sections.length
    ? sections
    : [
        {
          kind: "prose",
          content:
            "The story starts here. Placeholder paragraph describing origins, founding conviction, or the moment that set the movement in motion. Replace with real narrative copy.",
        },
        {
          kind: "image",
          content: "feature-image",
          caption: "Feature photo",
        },
        {
          kind: "prose",
          content:
            "Second beat — what the work looks like now. Who it serves. How it's changed over time. Keep the voice warm but authoritative.",
        },
        {
          kind: "pullquote",
          content: "The Outpouring was never ours to build. We were only ever called to keep pouring.",
        },
        {
          kind: "prose",
          content:
            "Third beat — the invitation. What the reader should do next, gently. A call to step in, read more, or reach out.",
        },
      ];

  return (
    <>
      <Nav />
      <main>
        {/* ---------------- HERO (dark, narrow) ---------------- */}
        <section className="relative bg-celestial grain pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-deep" />
          <div className="relative mx-auto max-w-3xl px-6 md:px-10 text-center">
            <div className="eyebrow flex items-center justify-center gap-3 mb-6 text-gold-heritage">
              <span className="w-8 h-px bg-gold-heritage" />
              {eyebrow}
              <span className="w-8 h-px bg-gold-heritage" />
            </div>
            <h1 className="font-display font-black text-white text-5xl md:text-7xl leading-[1.05] tracking-tight">
              {title}
            </h1>
            {kicker && (
              <div className="mt-6 text-sm font-display text-mist/60 tracking-wide">
                {kicker}
              </div>
            )}
          </div>
        </section>

        {/* ---------------- ARTICLE BODY (light) ---------------- */}
        <section className="relative bg-offwhite text-indigo-deep">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />
          <article className="mx-auto max-w-2xl px-6 py-20 md:py-28">
            {/* Lede with drop cap */}
            <p className="text-xl md:text-2xl leading-relaxed text-indigo-deep first-letter:font-display first-letter:font-black first-letter:text-gold-heritage first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9] first-letter:mt-1">
              {lede}
            </p>

            <div className="divider-gold my-14" />

            {/* Sections */}
            <div className="space-y-10">
              {defaultSections.map((s, i) => {
                if (s.kind === "prose") {
                  return (
                    <p key={i} className="text-lg leading-[1.75] text-graphite">
                      {s.content}
                    </p>
                  );
                }
                if (s.kind === "image") {
                  return (
                    <figure key={i} className="my-14 -mx-6 md:-mx-16">
                      <ImageSlot
                        ratio="aspect-[16/10]"
                        tone="light"
                        caption={s.caption ?? "Feature photo"}
                        id={`longform-${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i}`}
                      />
                      {s.caption && (
                        <figcaption className="mt-3 text-xs text-graphite/60 font-display italic text-center">
                          {s.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                // pullquote
                return (
                  <blockquote
                    key={i}
                    className="my-14 border-l-4 border-gold-heritage pl-6 md:pl-8 py-2"
                  >
                    <p className="font-display font-semibold text-2xl md:text-3xl leading-tight text-indigo-deep italic">
                      "{s.content}"
                    </p>
                  </blockquote>
                );
              })}
            </div>
          </article>
        </section>

        {/* ---------------- OUTRO (dark) ---------------- */}
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-indigo-deep via-indigo-royal to-teal-mission/50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,197,74,0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-black text-white text-3xl md:text-5xl leading-[1.1] tracking-tight">
              {outro?.heading ?? "Stay in the story."}
            </h2>
            <p className="mt-5 text-lg text-mist/85 max-w-xl mx-auto">
              {outro?.body ??
                "More chapters on the way. Subscribe, reach out, or explore the rest of the movement."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {outro?.cta && (
                <Link href={outro.cta.href} className="btn btn-primary">
                  {outro.cta.label}
                </Link>
              )}
              <Link href="/" className="btn btn-ghost">Back home</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
