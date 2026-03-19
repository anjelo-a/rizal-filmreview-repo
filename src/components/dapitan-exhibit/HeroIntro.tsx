"use client";

import { motion, useReducedMotion } from "framer-motion";

type HeroIntroProps = {
  onExplore: () => void;
  isFocused?: boolean;
};

export function HeroIntro({ onExplore, isFocused = false }: HeroIntroProps) {
  const prefersReducedMotion = useReducedMotion();
  const contentTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.22 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
      }
      className="pointer-events-none relative z-10 max-w-[34rem] px-1 py-1 lg:max-w-[38rem] xl:max-w-[42rem]"
    >
      <p className="mb-3 font-serif text-[11px] uppercase tracking-[0.42em] text-[#d8bc82] md:text-xs">
        Analysis
      </p>
      <h2 className="font-serif text-[clamp(2.5rem,5.2vw,5rem)] leading-[0.92] text-[#f6ead2] drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
        Rizal in Dapitan:
        <br />
        Film vs History
      </h2>
      {/* Copy reduced to one short support line so the title and scene carry the
          hierarchy instead of competing with dense text. */}
      <motion.p
        animate={{
          opacity: isFocused ? 0 : 1,
          y: isFocused ? -8 : 0,
        }}
        transition={contentTransition}
        className="mt-3 max-w-md text-sm leading-6 text-[#e7dcc9]/82 md:mt-4 md:text-base"
      >
        Compare the film’s scenes with the historical record.
      </motion.p>
      <motion.div
        animate={{
          opacity: isFocused ? 0 : 1,
          y: isFocused ? -8 : 0,
        }}
        transition={contentTransition}
        className="pointer-events-auto mt-4 flex flex-wrap items-center gap-3 md:mt-5"
      >
        <button
          type="button"
          onClick={onExplore}
          className="rounded-full border border-[#d2ae69]/60 bg-[#caa05a]/18 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#f6e2b0] transition hover:border-[#e0c88f] hover:bg-[#caa05a]/28 focus:outline-none focus:ring-2 focus:ring-[#e0c88f] focus:ring-offset-2 focus:ring-offset-[#120d09] md:text-sm"
        >
          Inspect the Evidence
        </button>
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#d0baa0]/82">
          Hover to highlight. Click to inspect.
        </p>
      </motion.div>
      <motion.div
        animate={{
          opacity: isFocused ? 0 : 1,
          y: isFocused ? -8 : 0,
        }}
        transition={contentTransition}
        className="mt-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#d0baa0]/70 md:mt-5"
      >
        <span>Five archival points</span>
        <span className="h-px w-10 bg-gradient-to-r from-[#d8bc82]/60 to-transparent" />
        <span>One historical verdict</span>
      </motion.div>
    </motion.div>
  );
}

export default HeroIntro;
