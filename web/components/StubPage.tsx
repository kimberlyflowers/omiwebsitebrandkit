import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";

type ExternalLink = { label: string; href: string };

type Props = {
  eyebrow: string;
  title: string;
  script?: string;
  lede: string;
  notice?: string;
  accent?: "indigo" | "gold" | "teal" | "action";
  externalLink?: ExternalLink;
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
}: Props) {
  return (
    <>
      <Nav />
      <main>
        <section className={`relative min-h-[70vh] ${heroGradient[accent]} grain flex items-center`}>
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

        <section className="py-24 bg-indigo-deep">
          <div className="mx-auto max-w-container px-6 md:px-10 text-center">
            <div className="eyebrow text-mist/50 mb-4">In progress</div>
            <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-3">
              This page is being prepared.
            </h2>
            <p className="text-mist/70 max-w-xl mx-auto">
              Full content arrives with the next release. In the meantime, head
              back home or reach out.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="btn btn-primary">Back home</Link>
              <Link href="/contact" className="btn btn-ghost">Contact us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
