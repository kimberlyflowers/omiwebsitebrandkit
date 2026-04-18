"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaBlock() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Horizon gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-deep via-indigo-royal to-teal-mission/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(242,197,74,0.25),transparent_60%)]" />
      <div className="absolute inset-0 grain" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        <div className="eyebrow justify-center flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-gold-heritage" />
          Partner with us
          <span className="w-8 h-px bg-gold-heritage" />
        </div>
        <h2 className="font-display font-black text-white text-4xl md:text-6xl leading-[1.05] tracking-tight">
          Be part of the{" "}
          <span className="text-gradient-sunrise">Outpouring</span>.
        </h2>
        <p className="mt-6 text-lg md:text-xl text-mist/85 leading-relaxed max-w-2xl mx-auto">
          Every teaching, every trip, every student — made possible by partners
          who believe transformation is worth the investment.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link href="/give" className="btn btn-primary">Give now</Link>
          <Link href="/contact" className="btn btn-ghost">Become a partner</Link>
        </div>
      </motion.div>
    </section>
  );
}
