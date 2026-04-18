"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Globe from "./Globe";

/**
 * Hero banner & video
 * -------------------
 * Drop files into /web/public/ to activate layers:
 *   - omi-banner.jpg    → full-bleed branded banner behind the globe
 *   - conference-reel.mp4  → subtle video backdrop (25% opacity, screen blend)
 * When no banner.jpg exists, the globe + gradient hero renders instead.
 */
const BANNER_SRC = "/earth-wide.png";
const VIDEO_SRC = "/conference-reel.mp4";

type Props = {
  eyebrow?: string;
  headline?: string;
  script?: string;
  lede?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  useBanner?: boolean;
  bannerOverride?: string;   // from Sanity, wins if set
  videoOverride?: string;    // from Sanity, wins if set
};

export default function Hero({
  eyebrow = "Est. 2008 · Faith · Education · Leadership · Impact",
  headline = "Transforming Lives.",
  script = "Igniting Futures.",
  lede = "Outpouring Missions International empowers, equips, and expands the reach of faith-driven leaders through teaching, mentorship, and global outreach — across classrooms, communities, and continents.",
  primaryCta = { label: "Join the Next Conference", href: "/conference" },
  secondaryCta = { label: "Our Mission", href: "/about" },
  useBanner = true,
  bannerOverride,
  videoOverride,
}: Props) {
  const bannerSrc = bannerOverride || BANNER_SRC;
  const videoSrc = videoOverride || VIDEO_SRC;
  return (
    <section className="relative min-h-screen overflow-hidden bg-celestial grain">
      {/* Layer 1 — branded banner image */}
      {useBanner && (
        <img
          src={bannerSrc}
          alt="Outpouring Missions International"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}

      {/* Layer 2 — conference video (if present) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen pointer-events-none"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Layer 3 — globe (only renders if banner fails / isn't set) */}
      {!useBanner && (
        <div className="absolute inset-0">
          <Globe />
        </div>
      )}

      {/* Layer 4 — indigo gradient scrim so text stays legible over the banner */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-deep/30 via-indigo-deep/55 to-indigo-deep" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,31,61,0.45)_65%,rgba(11,31,61,0.9)_100%)]" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-6 md:px-10 pt-36 md:pt-44 pb-24 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow flex items-center justify-center gap-3"
        >
          <span className="w-8 h-px bg-gold-heritage" />
          {eyebrow}
          <span className="w-8 h-px bg-gold-heritage" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display font-black text-white text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] tracking-tight"
        >
          {headline}
          {script && (
            <span className="tagline-script font-normal text-gradient-sunrise block text-[1.05em] mt-3">
              {script}
            </span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-lg md:text-xl text-mist/85 leading-relaxed max-w-2xl"
        >
          {lede}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-3 justify-center"
        >
          <Link href={primaryCta.href} className="btn btn-primary">
            {primaryCta.label}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 7h12m-5-5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href={secondaryCta.href} className="btn btn-ghost">
            {secondaryCta.label}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl"
        >
          {[
            ["01", "Faith"],
            ["02", "Education"],
            ["03", "Leadership"],
            ["04", "Impact"],
          ].map(([num, label]) => (
            <div key={num} className="text-center">
              <div className="font-display font-black text-gold-heritage text-sm">{num}</div>
              <div className="mt-1 font-display font-semibold text-white text-base">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="text-[10px] font-display font-medium uppercase tracking-[0.3em] text-white/50">
          Scroll
        </div>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-glow" />
      </motion.div>
    </section>
  );
}
