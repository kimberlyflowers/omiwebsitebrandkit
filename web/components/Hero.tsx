"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Globe from "./Globe";

/**
 * Conference video backdrop
 * -------------------------
 * Drop a file into `/web/public/conference-reel.mp4` and it'll auto-play
 * behind the globe at ~25% opacity with a teal screen-blend. If the file
 * is missing, the <video> stays invisible and the hero still looks right.
 *
 * Recommended clip: 8–15s loop, 1920x1080, H.264, <4 MB, no audio.
 */
const VIDEO_SRC = "/conference-reel.mp4";
const VIDEO_POSTER = "/conference-poster.jpg"; // optional still frame

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-celestial grain">
      {/* Layer 1 — video backdrop (only shows if the file exists) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen pointer-events-none"
        src={VIDEO_SRC}
        poster={VIDEO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Layer 2 — indigo wash to keep the globe dominant */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-deep/60 via-indigo-deep/30 to-indigo-deep/80" />

      {/* Layer 3 — globe */}
      <div className="absolute inset-0">
        <Globe />
      </div>

      {/* Layer 4 — centered vignette for text legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,31,61,0.55)_55%,rgba(11,31,61,0.92)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-deep/40 via-transparent to-indigo-deep" />

      {/* Layer 5 — content */}
      <div className="relative mx-auto max-w-4xl px-6 md:px-10 pt-36 md:pt-44 pb-24 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow flex items-center justify-center gap-3"
        >
          <span className="w-8 h-px bg-gold-heritage" />
          Est. 2008 · Faith · Education · Leadership · Impact
          <span className="w-8 h-px bg-gold-heritage" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display font-black text-white text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.05] tracking-tight"
        >
          Transforming Lives.
          <span className="tagline-script font-normal text-gradient-sunrise block text-[1.05em] mt-3">
            Igniting Futures.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-lg md:text-xl text-mist/85 leading-relaxed max-w-2xl"
        >
          Outpouring Missions International empowers, equips, and expands the
          reach of faith-driven leaders through teaching, mentorship, and
          global outreach — across classrooms, communities, and continents.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-3 justify-center"
        >
          <Link href="/conference" className="btn btn-primary">
            Join the Next Conference
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 7h12m-5-5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/about" className="btn btn-ghost">
            Our Mission
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
