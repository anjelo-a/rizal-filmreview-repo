"use client";

import DesktopAnalysis from "./DesktopAnalysis";
import MobileAnalysis from "./MobileAnalysis";
import SummarySection from "./SummarySection";

export function RizalDapitanExperience() {
  return (
    <section
      id="analysis"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#332214_0%,#120d09_52%,#080605_100%)] py-4 text-white sm:py-6 lg:py-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,161,94,0.08),transparent_25%,transparent_70%,rgba(102,70,34,0.12))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(240,218,177,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(240,218,177,0.22)_1px,transparent_1px)] [background-size:110px_110px]" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Breakpoint-based rendering keeps mobile and desktop interaction
            models separate without sharing the same layered UI. */}
        <div className="md:hidden">
          <MobileAnalysis />
        </div>
        <div className="hidden md:block">
          <DesktopAnalysis />
        </div>
        <SummarySection />
      </div>
    </section>
  );
}

export default RizalDapitanExperience;
