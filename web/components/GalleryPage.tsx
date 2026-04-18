import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import ImageSlot from "./ImageSlot";

/* ============================================================
   Gallery-forward layout — image-dense
   Use for: Teachings, YES, Missions Outreach — anywhere you want
   photography to carry the page.
   Pattern: edge-to-edge hero strip → asymmetric masonry →
   featured story → grid of secondary items → CTA.
   ============================================================ */

type Item = { title: string; meta?: string; body?: string; caption?: string; href?: string };

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  featured?: { title: string; body: string; caption?: string; cta?: { label: string; href: string } };
  items?: Item[];
  heroCaption?: string;
};

export default function GalleryPage({
  eyebrow,
  title,
  lede,
  featured,
  items,
  heroCaption = "Hero imagery",
}: Props) {
  const resolvedItems: Item[] = items ?? [
    { title: "Placeholder title one", meta: "Category", body: "Short description for this card. Replace with real content.", caption: "Photo 1" },
    { title: "Placeholder title two", meta: "Category", body: "Short description for this card. Replace with real content.", caption: "Photo 2" },
    { title: "Placeholder title three", meta: "Category", body: "Short description for this card. Replace with real content.", caption: "Photo 3" },
    { title: "Placeholder title four", meta: "Category", body: "Short description for this card. Replace with real content.", caption: "Photo 4" },
    { title: "Placeholder title five", meta: "Category", body: "Short description for this card. Replace with real content.", caption: "Photo 5" },
    { title: "Placeholder title six", meta: "Category", body: "Short description for this card. Replace with real content.", caption: "Photo 6" },
  ];

  const resolvedFeatured = featured ?? {
    title: "Featured story",
    body: "A headline moment — the teaching, the cohort, the trip — lifted out of the grid so it gets its due space.",
    caption: "Featured photo",
    cta: { label: "Read the story", href: "#" },
  };

  return (
    <>
      <Nav />
      <main>
        {/* ---------------- HERO STRIP (dark) ---------------- */}
        <section className="relative bg-celestial grain pt-36 pb-12 md:pt-44 md:pb-16">
          <div className="relative mx-auto max-w-container px-6 md:px-10">
            <div className="max-w-3xl">
              <div className="eyebrow flex items-center gap-3 mb-5 text-gold-heritage">
                <span className="w-8 h-px bg-gold-heritage" />
                {eyebrow}
              </div>
              <h1 className="font-display font-black text-white text-5xl md:text-7xl leading-[1.05] tracking-tight">
                {title}
              </h1>
              <p className="mt-7 text-lg md:text-xl text-mist/85 leading-relaxed max-w-2xl">
                {lede}
              </p>
            </div>
          </div>
        </section>

        {/* Edge-to-edge hero strip */}
        <section className="relative bg-indigo-deep pb-16 md:pb-24">
          <div className="relative mx-auto max-w-container px-6 md:px-10">
            <ImageSlot
              ratio="aspect-[21/9]"
              tone="dark"
              caption={heroCaption}
              id={`gallery-${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-hero`}
            />
          </div>
        </section>

        {/* ---------------- MASONRY GRID (light) ---------------- */}
        <section className="relative bg-offwhite text-indigo-deep py-20 md:py-28">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />
          <div className="mx-auto max-w-container px-6 md:px-10">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <h2 className="font-display font-black text-indigo-deep text-3xl md:text-5xl leading-[1.1] tracking-tight">
                The collection.
              </h2>
              <div className="text-sm font-display font-semibold text-gold-heritage">
                {resolvedItems.length} items
              </div>
            </div>

            {/* Asymmetric grid — first item spans 2 cols on lg */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {resolvedItems.map((it, i) => (
                <Link
                  key={i}
                  href={it.href ?? "#"}
                  className={`group block rounded-lg bg-white border border-mist shadow-omi-sm hover:shadow-omi-lg hover:border-gold-heritage/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden ${
                    i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <ImageSlot
                    ratio={i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}
                    tone="light"
                    caption={it.caption ?? `Photo ${i + 1}`}
                    id={`gallery-${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i + 1}`}
                  />
                  <div className="p-6 md:p-8">
                    {it.meta && (
                      <div className="eyebrow text-teal-mission mb-2">{it.meta}</div>
                    )}
                    <h3 className={`font-display font-bold text-indigo-deep leading-tight mb-2 ${
                      i === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                    }`}>
                      {it.title}
                    </h3>
                    {it.body && (
                      <p className="text-sm text-graphite/80 leading-relaxed">
                        {it.body}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- FEATURED STORY (dark, cinematic) ---------------- */}
        <section className="relative bg-indigo-deep py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(23,164,194,0.12),transparent_60%)]" />
          <div className="relative mx-auto max-w-container px-6 md:px-10 grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
            <ImageSlot
              ratio="aspect-[5/4]"
              tone="dark"
              caption={resolvedFeatured.caption ?? "Featured photo"}
              id={`gallery-${eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-featured`}
            />
            <div>
              <div className="eyebrow flex items-center gap-3 mb-5 text-gold-heritage">
                <span className="w-8 h-px bg-gold-heritage" />
                Featured
              </div>
              <h2 className="font-display font-black text-white text-3xl md:text-5xl leading-[1.1] tracking-tight mb-6">
                {resolvedFeatured.title}
              </h2>
              <p className="text-lg text-mist/80 leading-relaxed mb-8">
                {resolvedFeatured.body}
              </p>
              {resolvedFeatured.cta && (
                <Link href={resolvedFeatured.cta.href} className="btn btn-primary">
                  {resolvedFeatured.cta.label}
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ---------------- CTA (light) ---------------- */}
        <section className="relative bg-offwhite text-indigo-deep py-20 md:py-24">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-black text-indigo-deep text-2xl md:text-4xl leading-[1.15] tracking-tight">
              Want to dig in further?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-primary">Get in touch</Link>
              <Link href="/" className="btn btn-ghost !border-indigo-deep/20 !text-indigo-deep hover:!bg-indigo-deep hover:!text-white">
                Back home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
