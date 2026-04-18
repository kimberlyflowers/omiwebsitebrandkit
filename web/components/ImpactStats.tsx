"use client";

import { motion } from "framer-motion";

const stats = [
  { num: "2008", label: "Year founded" },
  { num: "6", label: "Ministries" },
  { num: "1K+", label: "Leaders trained" },
  { num: "∞", label: "Lives touched" },
];

export default function ImpactStats() {
  return (
    <section className="relative py-20 md:py-28 bg-indigo-deep">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 border-y border-white/10 py-12 md:py-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="font-display font-black text-5xl md:text-7xl leading-none text-gradient-sunrise">
                {s.num}
              </div>
              <div className="mt-3 eyebrow text-mist/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
        <p className="text-center mt-6 text-xs text-mist/40">
          Figures are placeholders — replace with live metrics.
        </p>
      </div>
    </section>
  );
}
