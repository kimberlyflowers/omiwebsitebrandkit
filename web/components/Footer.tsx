import Link from "next/link";
import { ministries } from "@/lib/ministries";

const navCols = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About OMI" },
      { href: "/conference", label: "Annual Conference" },
      { href: "/teachings", label: "Seasonal Teachings" },
      { href: "/commentary", label: "Cultural Commentary" },
    ],
  },
  {
    title: "Engage",
    links: [
      { href: "/give", label: "Give" },
      { href: "/contact", label: "Contact" },
      { href: "/about#history", label: "Our Story" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#070F1E] border-t border-white/5 pt-20 pb-10">
      <div className="mx-auto max-w-container px-6 md:px-10">
        {/* Top */}
        <div className="grid lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] gap-12 pb-14 border-b border-white/10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block group">
              <img
                src="/omi-logo.png"
                alt="Outpouring Missions International"
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 text-sm text-mist/60 leading-relaxed max-w-sm">
              Empowering, equipping, and expanding the reach of faith-driven
              leaders across nations since 2008.
            </p>
            <div className="mt-6 tagline-script text-2xl text-gradient-sunrise">
              Igniting Futures.
            </div>
          </div>

          {/* Nav cols */}
          {navCols.map((col) => (
            <div key={col.title}>
              <div className="eyebrow text-gold-heritage mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-mist/75 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Ministries */}
          <div>
            <div className="eyebrow text-gold-heritage mb-4">Ministries</div>
            <ul className="space-y-3">
              {ministries.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/ministries/${m.slug}`}
                    className="text-sm text-mist/75 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    {m.name}
                    {m.slug === "sabwb-action" && (
                      <span className="text-[9px] uppercase tracking-wider text-[#E96B6B]/80 border border-[#E96B6B]/30 rounded-full px-1.5 py-0.5">
                        501(c)(4)
                      </span>
                    )}
                    {m.externalUrl && (
                      <span className="text-[9px] uppercase tracking-wider text-gold-heritage/80 border border-gold-heritage/30 rounded-full px-1.5 py-0.5 group-hover:text-gold-heritage group-hover:border-gold-heritage transition-colors">
                        Live ↗
                      </span>
                    )}
                  </Link>
                  {m.externalUrl && (
                    <a
                      href={m.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-1 text-[11px] text-gold-heritage/70 hover:text-gold-heritage transition-colors"
                    >
                      {m.externalUrl.replace(/^https?:\/\//, "")} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between gap-6 text-xs text-mist/50">
          <div>
            © 2008–{new Date().getFullYear()} Outpouring Missions International. All
            rights reserved.
            <span className="block mt-1 text-mist/40">
              Outpouring Missions International is a 501(c)(3) tax-exempt
              organization. EIN placeholder.
            </span>
          </div>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        {/* SABWB Action disclaimer */}
        <div className="mt-6 p-4 rounded-lg border border-[#B83636]/20 bg-[#B83636]/5 text-[11px] text-mist/60 leading-relaxed">
          <span className="font-display font-semibold text-[#E96B6B] mr-1">
            Regarding SABWB Action:
          </span>
          SABWB Action is a 501(c)(4) social-welfare organization, legally and
          financially separate from Outpouring Missions International (a
          501(c)(3)). Contributions to SABWB Action are not tax-deductible as
          charitable contributions. Any political endorsements are made by
          SABWB Action, not OMI.
        </div>
      </div>
    </footer>
  );
}
