"use client";

import { motion } from "framer-motion";

type HeroIntroProps = {
  onExplore: () => void;
};

export function HeroIntro({ onExplore }: HeroIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none relative z-10 max-w-3xl px-6 pt-10 md:px-10 lg:px-12"
    >
      <p className="mb-4 font-serif text-xs uppercase tracking-[0.45em] text-[#d8bc82] md:text-sm">
        Analysis
      </p>
      <h2 className="font-serif text-4xl leading-none text-[#f6ead2] drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] md:text-6xl lg:text-7xl">
        Rizal in Dapitan:
        <br />
        Film vs History
      </h2>
      <p className="mt-6 max-w-2xl text-sm leading-7 text-[#e7dcc9]/85 md:text-base">
        Step into a digital evidence room comparing the film’s portrayal of
        Rizal’s years in Dapitan with the historical record. Each artifact marks
        a moment where cinema meets documented history.
      </p>
      <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onExplore}
          className="rounded-full border border-[#d2ae69]/60 bg-[#caa05a]/18 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#f6e2b0] transition hover:border-[#e0c88f] hover:bg-[#caa05a]/28 focus:outline-none focus:ring-2 focus:ring-[#e0c88f] focus:ring-offset-2 focus:ring-offset-[#120d09]"
        >
          Inspect the Evidence
        </button>
        <p className="text-xs uppercase tracking-[0.3em] text-[#d0baa0]/75">
          Five archival points. One historical verdict.
        </p>
      </div>
    </motion.div>
  );
}

export default HeroIntro;
