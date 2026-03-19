"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Topic } from "@/types/dapitanTopic";
import VerdictStamp from "./VerdictStamp";

type ComparisonOverlayProps = {
  topic: Topic | null;
};

export function ComparisonOverlay({ topic }: ComparisonOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {topic ? (
        <motion.aside
          key={topic.id}
          initial={{ opacity: 0, x: 28, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 18, y: 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex h-full min-h-[420px] flex-col overflow-hidden rounded-[30px] border border-[#d5b98a]/18 bg-[linear-gradient(160deg,rgba(31,22,16,0.92),rgba(19,13,10,0.82))] p-5 text-[#f0e7da] shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl md:p-7"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,177,109,0.15),transparent_42%)]" />
          <div className="relative flex flex-col gap-5">
            <VerdictStamp verdict={topic.verdict} />
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[#d8bc82]/80">
                {topic.period ?? "Dapitan archive"}
              </p>
              <h3 className="mt-3 font-serif text-3xl text-[#fbf4e7]">
                {topic.title}
              </h3>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <section className="border border-white/8 bg-white/4 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]">
                  What the Film Shows
                </p>
                <p className="mt-3 text-sm leading-7 text-[#efe4d2]">
                  {topic.filmShows}
                </p>
              </section>
              <section className="border border-[#d5b98a]/22 bg-[#c89b55]/[0.07] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#f0d7a4]">
                  What Actually Happened
                </p>
                <p className="mt-3 text-sm leading-7 text-[#fff6e8]">
                  {topic.actualHistory}
                </p>
              </section>
            </div>
            <div className="grid gap-4 border-t border-white/10 pt-4 md:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]">
                  Sources
                </p>
                <p className="mt-2 text-sm text-[#e6d8c0]">
                  {topic.sources.join("; ")}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]">
                  Significance
                </p>
                <p className="mt-2 text-sm leading-7 text-[#efe4d2]">
                  {topic.significance}
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      ) : (
        <motion.aside
          key="overview"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 18 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 flex h-full min-h-[420px] flex-col justify-end rounded-[30px] border border-[#d5b98a]/16 bg-[linear-gradient(180deg,rgba(25,18,13,0.28),rgba(18,12,9,0.82))] p-6 text-[#f0e7da] shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-7"
        >
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(215,177,109,0.18),transparent_58%)]" />
          <div className="relative space-y-5">
            <p className="text-xs uppercase tracking-[0.34em] text-[#d8bc82]/80">
              Overview
            </p>
            <h3 className="font-serif text-3xl text-[#fbf4e7]">
              Inspect the archive
            </h3>
            <p className="max-w-lg text-sm leading-7 text-[#e7dcc9]/90">
              Select a floating artifact to compare the film’s depiction with
              the documented historical record. The scene is arranged like a
              curated exhibit, with each object standing in for a key point from
              Rizal’s years in Dapitan.
            </p>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#d0baa0]/80">
              <span className="h-px flex-1 bg-gradient-to-r from-[#d8bc82]/60 to-transparent" />
              Hover to highlight. Select to focus.
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default ComparisonOverlay;
