"use client";

import type { AnalysisItem } from "@/types/analysis";
import ScrollReveal from "./ScrollReveal";

interface AnalysisCardProps {
  item: AnalysisItem;
  delay: number;
  direction: "left" | "right" | "up";
}

const AnalysisCard = ({ item, delay, direction }: AnalysisCardProps) => {
  return (
    <ScrollReveal delay={delay} direction={direction}>
      <div className="h-full rounded-2xl border border-[#b0bea9] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-lg">
        <h3 className="mb-2 text-xl font-semibold text-[#92aa83]">
          {item.title}
        </h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </ScrollReveal>
  );
};

export default AnalysisCard;
