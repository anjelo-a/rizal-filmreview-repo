"use client";

import type { Topic } from "@/types/dapitanTopic";

type TopicNavigatorProps = {
  topics: Topic[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOverview: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function TopicNavigator({
  topics,
  selectedId,
  onSelect,
  onOverview,
  onPrevious,
  onNext,
}: TopicNavigatorProps) {
  return (
    <div className="relative z-10 mt-5 space-y-4 rounded-[28px] border border-[#d5b98a]/16 bg-[#140f0c]/72 p-4 shadow-[0_18px_55px_rgba(0,0,0,0.32)] backdrop-blur-xl md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.34em] text-[#d8bc82]/80">
          Topic Navigator
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onOverview}
            className="rounded-full border border-[#d5b98a]/28 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#efe4d2] transition hover:border-[#e0c88f] hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#e0c88f] focus:ring-offset-2 focus:ring-offset-[#120d09]"
          >
            Overview
          </button>
          <button
            type="button"
            onClick={onPrevious}
            className="rounded-full border border-[#d5b98a]/28 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#efe4d2] transition hover:border-[#e0c88f] hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#e0c88f] focus:ring-offset-2 focus:ring-offset-[#120d09]"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-full border border-[#d5b98a]/28 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#efe4d2] transition hover:border-[#e0c88f] hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#e0c88f] focus:ring-offset-2 focus:ring-offset-[#120d09]"
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
        {topics.map((topic, index) => {
          const isSelected = topic.id === selectedId;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onSelect(topic.id)}
              className={`rounded-[22px] border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-[#e0c88f] focus:ring-offset-2 focus:ring-offset-[#120d09] ${
                isSelected
                  ? "border-[#e0c88f]/70 bg-[#d0a75a]/16 text-[#fff7ea] shadow-[0_10px_30px_rgba(155,111,45,0.24)]"
                  : "border-white/8 bg-white/[0.03] text-[#e6d8c0] hover:border-[#d5b98a]/35 hover:bg-white/[0.06]"
              }`}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#d8bc82]/70">
                Topic {index + 1}
              </p>
              <p className="mt-2 font-serif text-lg leading-tight">
                {topic.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TopicNavigator;
