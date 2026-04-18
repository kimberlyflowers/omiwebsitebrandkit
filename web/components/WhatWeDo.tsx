"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImageSlot from "./ImageSlot";

const pillars = [
  {
    num: "01",
    title: "Annual Conference",
    meta: "Weekend after Mother's Day",
    body:
      "A weekend where the whole movement gathers — worship, teaching, and commissioning. The heartbeat of our year.",
    href: "/conference",
    cta: "See this year's lineup",
  },
  {
    num: "02",
    title: "Seasonal Teachings",
    meta: "Multi-day · every ~2 months",
    body:
      "Deep-dive teaching intensives through the year. Scripture, culture, and calling — taught to be lived.",
    href: "/teachings",
    cta: "Browse teachings",
  },
  {
    num: "03",
    title: "Cultural Commentary",
    meta: "Released as the moment calls for it",
    body:
      "Thoughtful, Spirit-led reflection on the questions shaping our culture — offered to ground the faithful in clarity.",
    href: "/commentary",
    cta: "Read the latest",
  },
];

export default function WhatWeDo() {
  return (
    <section className="relative py-28 md:py-36 bg-offwhite text-indigo-deep">
      {/* Top transition — gold hairline from dark hero */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />

      <div className="mx-auto max-w-container px-6 md:px-10">
        <div className="max-w-3xl mb-16">
          <div className="eyebrow mb-4 flex items-center gap-3 text-gold-heritage">
            <span className="w-8 h-px bg-gold-heritage" />
            What we do
          </div>
          <h2 className="font-display font-black text-indigo-deep text-4xl md:text-5xl leading-[1.1] tracking-tight">
            Three rhythms that shape the{" "}
            <span className="text-gradient-sunrise">Outpouring</span>.
          </h2>
          <p className="mt-5 text-lg text-graphite/80 leading-relaxed">
            The conference ignites the year. Seasonal teachings form the bones.
            Commentary anchors us in the moment. Together they equip the movement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={p.href}
                className="group block h-full rounded-lg bg-white border border-mist shadow-omi-sm hover:shadow-omi-lg hover:border-gold-heritage/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                <ImageSlot
                  ratio="aspect-[16/10]"
                  tone="light"
                  caption={`${p.title} photo`}
                  id={`home-whatwedo-${p.num}`}
                />
                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-display font-black text-gold-heritage text-2xl">
                      {p.num}
                    </span>
                    <span className="text-gold-heritage opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                      →
                    </span>
                  </div>
                  <div className="eyebrow text-teal-mission mb-3">{p.meta}</div>
                  <h3 className="font-display font-bold text-indigo-deep text-2xl md:text-[1.75rem] leading-tight mb-4">
                    {p.title}
                  </h3>
                  <p className="text-graphite/80 leading-relaxed">{p.body}</p>
                  <div className="mt-8 pt-6 border-t border-mist text-sm font-display font-semibold text-indigo-deep group-hover:text-gold-heritage transition-colors">
                    {p.cta}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
