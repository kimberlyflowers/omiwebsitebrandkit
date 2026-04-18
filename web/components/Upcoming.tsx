"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const events = [
  {
    kind: "Conference",
    title: "Annual Outpouring Conference",
    date: "Weekend after Mother's Day",
    loc: "Location TBA",
    href: "/conference",
    accent: "gold" as const,
  },
  {
    kind: "Teaching",
    title: "Seasonal Teaching Intensive",
    date: "Next cohort · date TBA",
    loc: "Hybrid · in-person + stream",
    href: "/teachings",
    accent: "teal" as const,
  },
];

const accentBar = {
  gold: "bg-gradient-to-r from-gold-heritage to-gold-bright",
  teal: "bg-gradient-to-r from-teal-mission to-teal-electric",
};

export default function Upcoming() {
  return (
    <section className="relative py-24 md:py-32 bg-offwhite text-indigo-deep">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />

      <div className="mx-auto max-w-container px-6 md:px-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="eyebrow mb-3 flex items-center gap-3 text-gold-heritage">
              <span className="w-8 h-px bg-gold-heritage" />
              On the calendar
            </div>
            <h2 className="font-display font-black text-indigo-deep text-3xl md:text-5xl leading-[1.1] tracking-tight">
              What's next.
            </h2>
          </div>
          <Link href="/conference" className="text-sm font-display font-semibold text-gold-heritage hover:text-indigo-deep transition-colors">
            See full schedule →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {events.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={e.href}
                className="group block p-8 md:p-10 relative overflow-hidden rounded-lg bg-white border border-mist shadow-omi-sm hover:shadow-omi-lg hover:border-gold-heritage/40 hover:-translate-y-1 transition-all duration-500"
              >
                <div className={`absolute top-0 left-0 h-1 w-full ${accentBar[e.accent]}`} />
                <div className="eyebrow text-graphite/60 mb-4">{e.kind}</div>
                <h3 className="font-display font-bold text-indigo-deep text-2xl md:text-3xl leading-tight mb-6">
                  {e.title}
                </h3>
                <div className="space-y-2 text-graphite/80">
                  <div className="text-sm flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-70 text-teal-mission">
                      <rect x="2" y="3" width="10" height="9" rx="1" />
                      <path d="M2 6h10M5 1v3M9 1v3" strokeLinecap="round" />
                    </svg>
                    {e.date}
                  </div>
                  <div className="text-sm flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-70 text-teal-mission">
                      <path d="M7 7a2 2 0 100-4 2 2 0 000 4zM7 13s-5-4-5-8a5 5 0 0110 0c0 4-5 8-5 8z" />
                    </svg>
                    {e.loc}
                  </div>
                </div>
                <div className="mt-8 text-sm font-display font-semibold text-indigo-deep group-hover:text-gold-heritage transition-colors">
                  Learn more →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
