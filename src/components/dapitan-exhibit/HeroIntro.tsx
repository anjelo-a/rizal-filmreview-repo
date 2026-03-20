"use client";

import { motion, useReducedMotion } from "framer-motion";

type HeroIntroProps = {
  isFocused?: boolean;
};

export function HeroIntro({ isFocused = false }: HeroIntroProps) {
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
        className="mt-4 max-w-lg rounded-[20px] border border-[#d2ae69]/18 bg-[#1a130e]/62 px-4 py-3 text-sm text-[#efe4d2] shadow-[0_18px_40px_rgba(0,0,0,0.18)] md:mt-5 md:px-5"
      >
        <p className="uppercase tracking-[0.28em] text-[#d8bc82]/82">
          Choose a topic below to inspect a specific artifact and compare the
          film scene with the historical record.
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
