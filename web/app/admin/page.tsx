import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — OMI",
  robots: { index: false, follow: false },
};

const TOOLS = [
  {
    href: "/studio",
    title: "Sanity Studio",
    desc: "Author posts, events, ministries. The CMS for everything content-driven.",
    status: "Live" as const,
  },
  {
    href: "#",
    title: "Registrations",
    desc: "Event registration list, payment status, attendee notes. Powered by Stripe.",
    status: "Coming soon" as const,
  },
  {
    href: "#",
    title: "Admin API",
    desc: "REST + MCP wrapper for Bloomie and other agents to manage content programmatically.",
    status: "Coming soon" as const,
  },
];

const STATUS_STYLES = {
  Live: "bg-teal-mission/15 text-teal-mission border-teal-mission/30",
  "Coming soon": "bg-gold-heritage/15 text-gold-heritage border-gold-heritage/30",
};

export default function AdminIndex() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative bg-celestial grain pt-36 pb-16 md:pt-44 md:pb-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-deep" />
          <div className="relative mx-auto max-w-container px-6 md:px-10">
            <div className="eyebrow flex items-center gap-3 mb-5 text-gold-heritage">
              <span className="w-8 h-px bg-gold-heritage" />
              Admin
            </div>
            <h1 className="font-display font-black text-white text-5xl md:text-7xl leading-[1.05] tracking-tight">
              Tools.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-mist/85 leading-relaxed max-w-2xl">
              Behind-the-scenes tools for running the site. Not linked from public navigation.
            </p>
          </div>
        </section>

        <section className="relative bg-offwhite text-indigo-deep py-16 md:py-24">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />
          <div className="mx-auto max-w-container px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {TOOLS.map((t) => {
                const isLive = t.status === "Live";
                const Wrapper = ({ children }: { children: React.ReactNode }) =>
                  isLive ? (
                    <Link
                      href={t.href}
                      className="group block rounded-lg bg-white border border-mist shadow-omi-sm hover:shadow-omi-lg hover:border-gold-heritage/40 hover:-translate-y-1 transition-all duration-500 p-8"
                    >
                      {children}
                    </Link>
                  ) : (
                    <div className="rounded-lg bg-white border border-mist border-dashed p-8 opacity-70">
                      {children}
                    </div>
                  );

                return (
                  <Wrapper key={t.title}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className={`text-[10px] font-display font-semibold uppercase tracking-widest border rounded-full px-2 py-0.5 ${STATUS_STYLES[t.status]}`}>
                        {t.status}
                      </span>
                      {isLive && (
                        <span className="text-gold-heritage opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                          →
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-indigo-deep text-2xl leading-tight mb-3">
                      {t.title}
                    </h3>
                    <p className="text-graphite/80 text-sm leading-relaxed">{t.desc}</p>
                  </Wrapper>
                );
              })}
            </div>

            <div className="mt-12 p-6 rounded-lg border border-gold-heritage/30 bg-gold-heritage/5 text-sm text-graphite leading-relaxed">
              <div className="font-display font-semibold text-indigo-deep mb-2">Heads up</div>
              These tools are unlisted but not authenticated. Lock them down with Vercel Password Protection
              (Settings → Deployment Protection → Password Protection on /admin and /studio paths) before sharing
              publicly, or wire NextAuth for proper SSO when ready.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
