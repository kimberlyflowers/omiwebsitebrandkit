"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Globe from "./Globe";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-celestial grain">
      {/* Globe fills the right half on desktop, full behind on mobile */}
      <div className="absolute inset-0 md:left-1/3 opacity-80 md:opacity-100">
        <Globe />
      </div>

      {/* Left gradient scrim so copy stays legible over the globe */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-deep via-indigo-deep/60 to-transparent md:via-indigo-deep/40" />

      {/* Content */}
      <div className="relative mx-auto max-w-container px-6 md:px-10 pt-40 md:pt-44 pb-24 min-h-screen flex items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="w-8 h-px bg-gold-heritage" />
            Est. 2008 · Faith · Education · Leadership · Impact
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display font-black text-white text-[clamp(2.75rem,6.5vw,5rem)] leading-[1.05] tracking-tight"
          >
            Transforming Lives.{" "}
            <span className="tagline-script font-normal text-gradient-sunrise block md:inline text-[1.05em] md:text-[0.95em] mt-2 md:mt-0">
              Igniting Futures.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-lg md:text-xl text-mist/85 leading-relaxed max-w-xl"
          >
            Outpouring Missions International empowers, equips, and expands the
            reach of faith-driven leaders through teaching, mentorship, and
            global outreach — across classrooms, communities, and continents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3"
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

          {/* Pillar strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-xl"
          >
            {[
              ["01", "Faith"],
              ["02", "Education"],
              ["03", "Leadership"],
              ["04", "Impact"],
            ].map(([num, label]) => (
              <div key={num}>
                <div className="font-display font-black text-gold-heritage text-sm">{num}</div>
                <div className="mt-1 font-display font-semibold text-white text-base">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
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
