"use client";

import { motion } from "framer-motion";

export default function EditorialQuote() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden bg-indigo-deep">
      {/* Ambient gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,164,194,0.12),transparent_60%)]" />

      {/* Star specks */}
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_30%,#fff_1px,transparent_1.5px),radial-gradient(circle_at_70%_80%,#F2C54A_1px,transparent_1.5px),radial-gradient(circle_at_90%_20%,#fff_1px,transparent_1.5px),radial-gradient(circle_at_30%_70%,#fff_0.5px,transparent_1px)] [background-size:400px_400px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        <div className="eyebrow justify-center flex items-center gap-3 mb-10">
          <span className="w-8 h-px bg-gold-heritage" />
          Our calling
          <span className="w-8 h-px bg-gold-heritage" />
        </div>

        <h2 className="font-display font-black text-white text-5xl md:text-7xl leading-[1.05] tracking-tight">
          Transforming Lives.
        </h2>
        <div className="tagline-script text-6xl md:text-8xl mt-4 text-gradient-sunrise">
          Igniting Futures.
        </div>

        <p className="mt-12 text-lg md:text-xl text-mist/75 leading-relaxed max-w-2xl mx-auto">
          Since 2008, the Outpouring has carried teaching, mentorship, and
          mission across generations and borders — a movement rooted in faith,
          built on education, led by servants, measured by impact.
        </p>
      </motion.div>
    </section>
  );
}
