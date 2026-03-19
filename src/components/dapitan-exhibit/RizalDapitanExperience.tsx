"use client";

import { motion } from "framer-motion";
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

  const selectedTopic = useMemo<Topic | null>(
    () => dapitanTopics.find((topic) => topic.id === selectedId) ?? null,
    [selectedId],
  );

  const currentIndex = useMemo(
    () => dapitanTopics.findIndex((topic) => topic.id === selectedId),
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
    document.getElementById("dapitan-evidence-room")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handlePrevious = () => {
    if (dapitanTopics.length === 0) return;
    const fallbackIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex =
      (fallbackIndex - 1 + dapitanTopics.length) % dapitanTopics.length;
    setSelectedId(dapitanTopics[nextIndex]?.id ?? null);
  };

  const handleNext = () => {
    if (dapitanTopics.length === 0) return;
    const fallbackIndex = currentIndex === -1 ? -1 : currentIndex;
    const nextIndex = (fallbackIndex + 1) % dapitanTopics.length;
    setSelectedId(dapitanTopics[nextIndex]?.id ?? null);
  };

  return (
    <section
      id="analysis"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#332214_0%,#120d09_52%,#080605_100%)] py-10 text-white"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,161,94,0.08),transparent_25%,transparent_70%,rgba(102,70,34,0.12))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(240,218,177,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(240,218,177,0.22)_1px,transparent_1px)] [background-size:110px_110px]" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div
          id="dapitan-evidence-room"
          className="relative overflow-hidden rounded-[38px] border border-[#d5b98a]/14 bg-[#080605]/78 shadow-[0_35px_120px_rgba(0,0,0,0.55)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,184,121,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(97,60,23,0.18),transparent_28%)]" />
          <div className="relative min-h-[960px] lg:min-h-[1000px]">
            <div className="absolute inset-0">
              <RizalDapitanScene
                topics={dapitanTopics}
                selectedTopic={selectedTopic}
                onSelectTopic={handleSelect}
              />
            </div>
            <div className="relative flex min-h-[960px] flex-col justify-between p-4 md:p-6 lg:min-h-[1000px] lg:p-8">
              <HeroIntro onExplore={handleExplore} />
              <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_470px]">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="pointer-events-none flex min-h-[260px] items-end"
                >
                  <div className="max-w-lg rounded-[28px] border border-[#d5b98a]/14 bg-[#0d0907]/52 p-5 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]/80">
                      Evidence Room
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#e7dcc9]/85">
                      A curated 3D archive of five moments from Rizal’s Dapitan
                      years. Each artifact is a point of comparison between
                      filmic representation and the historical record.
                    </p>
                  </div>
                </motion.div>
                <ComparisonOverlay topic={selectedTopic} />
              </div>
            </div>
          </div>
        </div>
        <TopicNavigator
          topics={dapitanTopics}
          selectedId={selectedId}
          onSelect={handleSelect}
          onOverview={handleOverview}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
        <SummarySection />
      </div>
    </section>
  );
}

export default RizalDapitanExperience;
