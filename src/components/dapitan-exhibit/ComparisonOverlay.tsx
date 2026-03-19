"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Topic } from "@/types/dapitanTopic";
import VerdictStamp from "./VerdictStamp";

type ComparisonOverlayProps = {
  topic: Topic | null;
  onClose: () => void;
};

export function ComparisonOverlay({ topic, onClose }: ComparisonOverlayProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!topic) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 28, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 18, y: 12 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
      }
      role="dialog"
      aria-modal="false"
      aria-label={`${topic.title} details`}
      className="absolute inset-x-4 top-4 z-20 max-h-[calc(100%-1.5rem)] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,rgba(31,22,16,0.78),rgba(19,13,10,0.7))] text-[#f0e7da] shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:inset-x-6 sm:top-6 md:inset-x-auto md:right-6 md:top-6 md:w-[min(420px,calc(100%-3rem))] lg:right-8 lg:top-8 lg:w-[430px] xl:w-[470px]"
    >
      {/* Focus mode uses an absolute overlay panel. Because it sits outside the
          normal document flow, selecting a topic never expands the section or
          pushes the navigator downward. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,177,109,0.16),transparent_40%)]" />
      <div className="relative flex h-full max-h-[calc(100%-0rem)] flex-col overflow-y-auto p-4 md:p-5">
        <div className="flex items-start justify-between gap-4">
          <VerdictStamp verdict={topic.verdict} />
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-[#f4e7ca] transition hover:border-[#e0c88f]/45 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#e0c88f] focus:ring-offset-2 focus:ring-offset-[#120d09]"
            aria-label="Close detail panel"
          >
            ×
          </button>
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase tracking-[0.34em] text-[#d8bc82]/80">
            {topic.period ?? "Dapitan archive"}
          </p>
          <h3 className="mt-2 max-w-[16ch] font-serif text-[1.65rem] leading-tight text-[#fbf4e7] md:text-[1.85rem] xl:text-[2rem]">
            {topic.title}
          </h3>
        </div>
        {/* Focus mode swaps in this fixed overlay instead of stacking extra
            content under the scene, so detail reading stays readable without
            causing any layout growth. */}
        <div className="mt-4 grid gap-3">
          <section className="rounded-[18px] border border-white/6 bg-white/[0.04] p-3.5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]">
              Film
            </p>
            <p className="mt-2 text-sm leading-6 text-[#efe4d2]">
              {topic.filmShows}
            </p>
          </section>
          <section className="rounded-[18px] border border-[#d5b98a]/14 bg-[#c89b55]/[0.06] p-3.5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#f0d7a4]">
              History
            </p>
            <p className="mt-2 text-sm leading-6 text-[#fff6e8]">
              {topic.actualHistory}
            </p>
          </section>
        </div>
        <div className="mt-4 grid gap-3 border-t border-white/8 pt-3 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]">
              Sources
            </p>
            <p className="mt-1.5 text-sm text-[#e6d8c0]">
              {topic.sources.join("; ")}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]">
              Why It Matters
            </p>
            <p className="mt-1.5 text-sm leading-6 text-[#efe4d2]">
              {topic.significance}
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export default ComparisonOverlay;
