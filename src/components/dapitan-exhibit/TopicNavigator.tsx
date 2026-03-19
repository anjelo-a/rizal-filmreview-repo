"use client";

import type { Topic } from "@/types/dapitanTopic";

const baseCardClassName =
  "min-h-[96px] rounded-[18px] border px-3.5 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-[#e0c88f] focus:ring-offset-2 focus:ring-offset-[#120d09] md:min-h-[104px]";
const idleCardClassName =
  "border-white/6 bg-white/[0.02] text-[#e6d8c0] hover:border-[#d5b98a]/24 hover:bg-white/[0.05]";
const activeCardClassName =
  "border-[#f0c989]/55 bg-[linear-gradient(180deg,rgba(208,167,90,0.18),rgba(208,167,90,0.08))] text-[#fff7ea] shadow-[0_12px_28px_rgba(155,111,45,0.2)]";

type TopicNavigatorProps = {
  topics: Topic[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOverview: () => void;
};

export function TopicNavigator({
  topics,
  selectedId,
  onSelect,
  onOverview,
}: TopicNavigatorProps) {
  return (
    <div className="relative z-10 space-y-3 rounded-[24px] border border-white/8 bg-[#140f0c]/58 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur-lg md:space-y-4 md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-[#d8bc82]/80">
            Topic Navigator
          </p>
          <p className="mt-1 max-w-sm text-sm text-[#e6d8c0]/68">
            Select an artifact record directly.
          </p>
        </div>
      </div>
      {/* The navigator is now a single data-driven card system. Overview lives
          in the same grid as the topics, so navigation uses one reliable pattern
          instead of mixing cards with separate text-button controls. */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        <button
          type="button"
          onClick={onOverview}
          aria-pressed={selectedId === null}
          className={`${baseCardClassName} ${
            selectedId === null ? activeCardClassName : idleCardClassName
          }`}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d8bc82]/70">
            Overview
          </p>
          <p className="mt-1.5 font-serif text-[1rem] leading-tight md:text-[1.05rem]">
            Archive Room
          </p>
          <p className="mt-2 max-w-[22ch] text-sm leading-5 text-current/78">
            Return to the full exhibit view.
          </p>
        </button>
        {topics.map((topic, index) => {
          const isSelected = topic.id === selectedId;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onSelect(topic.id)}
              aria-pressed={isSelected}
              className={`${baseCardClassName} ${
                isSelected ? activeCardClassName : idleCardClassName
              }`}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#d8bc82]/70">
                Topic {index + 1}
              </p>
              <p className="mt-1.5 font-serif text-[0.95rem] leading-tight md:text-base">
                {topic.title}
              </p>
              <p className="mt-2 max-w-[22ch] text-sm leading-5 text-current/78">
                {topic.artifactLabel}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TopicNavigator;
