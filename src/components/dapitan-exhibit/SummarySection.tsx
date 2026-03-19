"use client";

import { motion } from "framer-motion";

export function SummarySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-8 overflow-hidden rounded-[32px] border border-[#d5b98a]/16 bg-[linear-gradient(180deg,rgba(24,17,13,0.95),rgba(17,12,9,0.96))] p-8 text-[#f0e7da] shadow-[0_28px_90px_rgba(0,0,0,0.38)]"
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(215,177,109,0.16),transparent_55%)]" />
      <div className="relative max-w-4xl">
        <p className="text-xs uppercase tracking-[0.34em] text-[#d8bc82]/80">
          Final Assessment
        </p>
        <h3 className="mt-4 font-serif text-3xl text-[#fbf4e7] md:text-4xl">
          The film’s Dapitan portrayal is largely historically accurate.
        </h3>
        <p className="mt-5 max-w-3xl text-sm leading-8 text-[#e7dcc9]/90 md:text-base">
          Across exile, medical service, education, personal relationships, and
          political restraint, the film aligns closely with established
          historical accounts. Its dramatic treatment remains cinematic, but the
          core record of Rizal’s years in Dapitan is presented with notable
          fidelity.
        </p>
      </div>
    </motion.div>
  );
}

export default SummarySection;
