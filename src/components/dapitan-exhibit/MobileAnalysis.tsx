"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { dapitanTopics } from "@/data/dapitanTopics";
import type { Topic } from "@/types/dapitanTopic";

type MobileAnalysisView = "list" | "detail";

type MobileTopicCardProps = {
  index: number;
  topic: Topic;
  onSelect: (id: string) => void;
};

function MobileTopicCard({ index, topic, onSelect }: MobileTopicCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(topic.id)}
      className="w-full rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 text-left shadow-[0_16px_45px_rgba(0,0,0,0.2)] transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#e0c88f] focus:ring-offset-2 focus:ring-offset-[#120d09]"
      aria-label={`Open details for ${topic.title}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d8bc82]/78">
            Topic {index + 1}
          </p>
          <h3 className="mt-2 font-serif text-[1.2rem] leading-tight text-[#fbf4e7]">
            {topic.title}
          </h3>
          {/* Keep the secondary line short and clipped so the list remains easy
              to scan with consistent tap targets. */}
          <p className="mt-2 truncate text-sm text-[#e7dcc9]/78">
            {topic.artifactLabel}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 text-lg leading-none text-[#f0d7a4]"
        >
          ›
        </span>
      </div>
    </button>
  );
}

export function MobileAnalysis() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const view: MobileAnalysisView = selectedId ? "detail" : "list";
  const selectedTopic = useMemo<Topic | null>(
    () => dapitanTopics.find((topic) => topic.id === selectedId) ?? null,
    [selectedId],
  );

  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-[#d5b98a]/14 bg-[linear-gradient(180deg,rgba(15,11,9,0.98),rgba(10,8,6,0.98))] shadow-[0_28px_90px_rgba(0,0,0,0.38)]">
      {/* Mobile uses a lightweight decorative background only, keeping the
          section readable and avoiding 3D rendering on smaller devices. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,176,110,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(120,76,33,0.18),transparent_28%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(240,218,177,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(240,218,177,0.16)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative min-h-[34rem]">
        <AnimatePresence mode="wait" initial={false}>
          {view === "list" ? (
            <motion.div
              key="mobile-list"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={panelTransition}
              className="absolute inset-0 overflow-y-auto p-5"
            >
              <p className="text-xs uppercase tracking-[0.34em] text-[#d8bc82]/80">
                Analysis
              </p>
              <h2 className="mt-3 font-serif text-[2rem] leading-[0.96] text-[#f6ead2]">
                Rizal in Dapitan:
                <br />
                Film vs History
              </h2>
              <p className="mt-3 text-sm text-[#e7dcc9]/78">
                Tap a topic to compare the film with the historical record.
              </p>
              <div className="mt-5 space-y-3">
                {dapitanTopics.map((topic, index) => (
                  <MobileTopicCard
                    key={topic.id}
                    index={index}
                    topic={topic}
                    onSelect={setSelectedId}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedTopic?.id ?? "mobile-detail"}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={panelTransition}
              className="absolute inset-0 flex overflow-y-auto bg-[linear-gradient(180deg,rgba(15,11,9,0.985),rgba(10,8,6,0.985))] flex-col p-5"
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-[#f4e7ca] transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#e0c88f] focus:ring-offset-2 focus:ring-offset-[#120d09]"
              >
                <span aria-hidden="true">←</span>
                Back
              </button>
              {selectedTopic ? (
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.34em] text-[#d8bc82]/80">
                    {selectedTopic.period ?? "Dapitan archive"}
                  </p>
                  <h3 className="mt-3 font-serif text-[2rem] leading-tight text-[#fbf4e7]">
                    {selectedTopic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#e7dcc9]/78">
                    This topic compares the scene shown in the film with the
                    historical record and why that distinction matters.
                  </p>
                  <div className="mt-5 grid gap-3">
                    <section className="rounded-[20px] border border-white/8 bg-white/[0.04] p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]">
                        Film
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#efe4d2]">
                        {selectedTopic.filmShows}
                      </p>
                    </section>
                    <section className="rounded-[20px] border border-[#d5b98a]/14 bg-[#c89b55]/[0.06] p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#f0d7a4]">
                        History
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#fff6e8]">
                        {selectedTopic.actualHistory}
                      </p>
                    </section>
                  </div>
                  <div className="mt-5 grid gap-4 border-t border-white/8 pt-4">
                    <section>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]">
                        Short Explanation
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#efe4d2]">
                        This scene is treated as historically accurate in the
                        analysis and is grounded in the cited references for
                        Rizal&apos;s years in Dapitan.
                      </p>
                    </section>
                    <section>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]">
                        Sources
                      </p>
                      <p className="mt-2 text-sm text-[#e6d8c0]">
                        {selectedTopic.sources.join("; ")}
                      </p>
                    </section>
                    <section>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]">
                        Why It Matters
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#efe4d2]">
                        {selectedTopic.significance}
                      </p>
                    </section>
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MobileAnalysis;
