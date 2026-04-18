"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ministries } from "@/lib/ministries";

const primary = [
  { href: "/about", label: "About" },
  { href: "/conference", label: "Conference" },
  { href: "/events", label: "Events" },
  { href: "/commentary", label: "Commentary" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-indigo-deep/85 backdrop-blur-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-container px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/omi-logo.png"
            alt="Outpouring Missions International"
            className="h-12 md:h-14 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-display font-medium text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* Ministries mega-menu */}
          <div className="relative group">
            <button className="text-sm font-display font-medium text-white/80 hover:text-white transition-colors inline-flex items-center gap-1">
              Ministries
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="opacity-60">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="w-[380px] rounded-xl border border-white/10 bg-indigo-deep/95 backdrop-blur-xl shadow-omi-lg p-2">
                {ministries.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/ministries/${m.slug}`}
                    className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                  >
                    <div className="text-sm font-display font-semibold text-white flex items-center justify-between">
                      {m.name}
                      <span className="text-xs text-mist/50 group-hover/item:text-gold-heritage transition-colors">→</span>
                    </div>
                    <div className="text-xs text-mist/60 mt-0.5">{m.short}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact" className="text-sm font-display font-medium text-white/70 hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/give" className="btn btn-primary !py-2.5 !px-5 !text-sm">
            Partner
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-indigo-deep/95 backdrop-blur-lg">
          <div className="px-6 py-6 space-y-4">
            {primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-base font-display font-medium text-white/90"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10">
              <div className="eyebrow text-gold-heritage mb-3">Ministries</div>
              {ministries.map((m) => (
                <Link
                  key={m.slug}
                  href={`/ministries/${m.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm text-white/80"
                >
                  {m.name}
                </Link>
              ))}
            </div>
            <div className="pt-3 flex gap-3">
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn btn-ghost flex-1">Contact</Link>
              <Link href="/give" onClick={() => setMenuOpen(false)} className="btn btn-primary flex-1">Partner</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
