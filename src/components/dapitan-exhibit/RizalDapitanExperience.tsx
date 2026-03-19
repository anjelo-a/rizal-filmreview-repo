"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { dapitanTopics } from "@/data/dapitanTopics";
import type { Topic } from "@/types/dapitanTopic";
import ComparisonOverlay from "./ComparisonOverlay";
import HeroIntro from "./HeroIntro";
import RizalDapitanScene from "./RizalDapitanScene";
import SummarySection from "./SummarySection";
import TopicNavigator from "./TopicNavigator";

export function RizalDapitanExperience() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const selectedTopic = useMemo<Topic | null>(
    () => dapitanTopics.find((topic) => topic.id === selectedId) ?? null,
    [selectedId],
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleOverview = () => {
    setSelectedId(null);
  };

  const handleExplore = () => {
    setSelectedId(dapitanTopics[0]?.id ?? null);
  };

  const isFocusMode = selectedTopic !== null;
  const sceneTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };
  const layerTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="analysis"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#332214_0%,#120d09_52%,#080605_100%)] py-4 text-white sm:py-6 lg:py-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,161,94,0.08),transparent_25%,transparent_70%,rgba(102,70,34,0.12))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(240,218,177,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(240,218,177,0.22)_1px,transparent_1px)] [background-size:110px_110px]" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div
          id="dapitan-evidence-room"
          className="relative overflow-hidden rounded-[38px] border border-[#d5b98a]/14 bg-[#080605]/78 shadow-[0_35px_120px_rgba(0,0,0,0.55)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,184,121,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(97,60,23,0.18),transparent_28%)]" />
          <div className="relative h-[min(900px,calc(100svh-2rem))] min-h-[680px] sm:h-[min(920px,calc(100svh-3rem))] sm:min-h-[720px] lg:h-[min(940px,calc(100svh-4rem))]">
            <motion.div
              animate={{
                opacity: isFocusMode ? 0.92 : 1,
                scale: isFocusMode ? 0.97 : 1,
                y: isFocusMode ? -6 : 0,
              }}
              transition={sceneTransition}
              className="absolute inset-0"
            >
              <RizalDapitanScene
                topics={dapitanTopics}
                selectedTopic={selectedTopic}
                onSelectTopic={handleSelect}
              />
            </motion.div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,6,5,0.12),rgba(8,6,5,0.36)_72%,rgba(8,6,5,0.68))]" />
            <div className="relative h-full p-4 md:p-6 lg:p-8">
              {/* Vertical pushing is eliminated by keeping both modes inside one
                  fixed-height stage. Browse UI and focus UI are absolutely
                  layered and faded in/out instead of being stacked in the flow. */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isFocusMode ? 0 : 1,
                  y: isFocusMode ? -18 : 0,
                }}
                transition={layerTransition}
                className={`absolute left-4 right-4 top-4 z-10 md:left-6 md:right-auto md:top-6 lg:left-8 lg:top-8 ${
                  isFocusMode ? "pointer-events-none" : "pointer-events-auto"
                }`}
              >
                <HeroIntro onExplore={handleExplore} isFocused={isFocusMode} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{
                  opacity: isFocusMode ? 0 : 1,
                  y: isFocusMode ? 16 : 0,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        delay: isFocusMode ? 0 : 0.18,
                        duration: 0.28,
                        ease: [0.22, 1, 0.36, 1] as const,
                      }
                }
                className={`absolute bottom-4 left-4 right-4 z-10 md:bottom-6 md:left-6 md:right-6 lg:bottom-8 lg:left-8 lg:right-8 ${
                  isFocusMode ? "pointer-events-none" : "pointer-events-auto"
                }`}
              >
                {/* Browse mode keeps direct artifact selection visible without
                    creating any extra detail stack below the fold. */}
                <TopicNavigator
                  topics={dapitanTopics}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                  onOverview={handleOverview}
                />
              </motion.div>
              <AnimatePresence>
                {isFocusMode ? (
                  <ComparisonOverlay
                    key={selectedTopic?.id}
                    topic={selectedTopic}
                    onClose={handleOverview}
                  />
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <SummarySection />
      </div>
    </section>
  );
}

export default RizalDapitanExperience;
