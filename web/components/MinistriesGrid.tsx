"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ministries } from "@/lib/ministries";
import ImageSlot from "./ImageSlot";

const accent = {
  teal:     "from-teal-mission/20 to-transparent border-teal-mission/30",
  electric: "from-teal-electric/20 to-transparent border-teal-electric/30",
  gold:     "from-gold-heritage/20 to-transparent border-gold-heritage/30",
  indigo:   "from-indigo-500/15 to-transparent border-indigo-500/30",
  action:   "from-[#B83636]/20 to-transparent border-[#B83636]/40",
};

const text = {
  teal:     "text-teal-mission",
  electric: "text-teal-electric",
  gold:     "text-gold-heritage",
  indigo:   "text-indigo-500",
  action:   "text-[#E96B6B]",
};

export default function MinistriesGrid() {
  return (
    <section className="relative py-28 md:py-36 bg-[#0A1A36] overflow-hidden grain">
      {/* Decorative gradient orb */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(23,164,194,0.18),transparent_70%)] pointer-events-none" />

      <div className="relative mx-auto max-w-container px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-gold-heritage" />
            The Network
          </div>
          <h2 className="font-display font-black text-white text-4xl md:text-5xl leading-[1.1] tracking-tight">
            Six ministries.{" "}
            <span className="text-gradient-sunrise">One calling.</span>
          </h2>
          <p className="mt-5 text-lg text-mist/75 leading-relaxed">
            From classrooms to the public square, each ministry extends the
            Outpouring into a different corner of culture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ministries.map((m, i) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={m.externalUrl ?? `/ministries/${m.slug}`}
                target={m.externalUrl ? "_blank" : undefined}
                rel={m.externalUrl ? "noopener noreferrer" : undefined}
                className={`card group block h-full bg-gradient-to-br ${accent[m.accent]} overflow-hidden`}
              >
                <ImageSlot
                  ratio="aspect-[16/10]"
                  tone="dark"
                  caption={`${m.name} photo`}
                  id={`home-ministry-${m.slug}`}
                />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`eyebrow ${text[m.accent]}`}>{m.short}</span>
                    <span className={`opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 ${text[m.accent]}`}>
                      →
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl leading-tight mb-4 flex items-center gap-2 flex-wrap">
                    {m.name}
                    {m.externalUrl && (
                      <span className="text-[10px] font-display font-semibold uppercase tracking-wider text-gold-heritage border border-gold-heritage/40 rounded-full px-2 py-0.5">
                        Live ↗
                      </span>
                    )}
                  </h3>
                  <p className="text-mist/70 text-sm leading-relaxed">{m.tagline}</p>
                  {m.externalUrl && (
                    <div className="mt-4 text-xs text-gold-heritage/80 font-display font-semibold">
                      {m.externalUrl.replace(/^https?:\/\//, "")}
                    </div>
                  )}
                  {m.legalBadge && (
                    <div className="mt-5 pt-5 border-t border-white/10 text-[11px] text-mist/50 leading-relaxed">
                      {m.legalBadge}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
