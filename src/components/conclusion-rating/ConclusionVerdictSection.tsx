"use client";

import { motion } from "framer-motion";

const RATING_DATA = [
  { value: 1, label: "Very Weak", filled: 1 },
  { value: 2, label: "Weak", filled: 1 },
  { value: 3, label: "Fair", filled: 1 },
  { value: 4, label: "Strong", filled: 1 },
  { value: 5, label: "Excellent", filled: 0.5 }, // 4.5 rating
];

function RatingPillar({
  filled,
  delay,
}: {
  value: number;
  filled: number;
  delay: number;
}) {
  const activeLevel = filled;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-end"
      style={{
        width: "70px",
        height: "320px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40, rotateY: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: -15 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
    >
      {/* Outer Glass Shell */}
      <div
        className="absolute inset-0 rounded-[4px] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(80,50,30,0.5) 0%, rgba(10,5,2,0.8) 100%)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRightColor: "rgba(255,255,255,0.15)",
          borderTopColor: "rgba(255,255,255,0.12)",
          transform: "translateZ(8px)",
          boxShadow: "-8px 12px 24px rgba(0,0,0,0.5)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent via-transparent to-white/5" />
      </div>

      {/* Side Face for Depth */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[12px] origin-right"
        style={{
          background:
            "linear-gradient(180deg, rgba(40,25,15,0.9) 0%, rgba(5,2,1,0.9) 100%)",
          transform: "rotateY(90deg)",
          transformStyle: "preserve-3d",
        }}
      />

      {/* Top Face for Depth */}
      <div
        className="absolute top-0 w-full h-[12px] origin-top"
        style={{
          background: "rgba(90,60,40,0.8)",
          transform: "rotateX(-90deg)",
          transformStyle: "preserve-3d",
          borderTop: "1px solid rgba(255,255,255,0.3)",
        }}
      />

      {/* Inner Glowing Core container */}
      <div
        className="absolute bottom-[2px] w-[calc(100%-4px)] flex items-end justify-center rounded-[2px] overflow-hidden"
        style={{
          height: "calc(100% - 4px)",
          transform: "translateZ(2px)",
        }}
      >
        <motion.div
          className="w-full relative"
          style={{
            background: "linear-gradient(180deg, #fcd58c 0%, #aa6428 100%)",
            boxShadow:
              activeLevel > 0 ? "0 0 30px rgba(220,150,70,0.6)" : "none",
          }}
          initial={{ height: "0%" }}
          whileInView={{ height: `${activeLevel * 100}%` }}
          viewport={{ once: false }}
          transition={{
            delay: delay + 0.3,
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Core Highlights */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/30 w-full" />
          <div className="absolute top-0 left-0 w-full h-[4px] bg-white/40 mix-blend-overlay" />
        </motion.div>
      </div>

      {/* Base Grounding Shadow */}
      <div
        className="absolute -bottom-6 w-[120%] h-12 rounded-[100%]"
        style={{
          background:
            activeLevel > 0
              ? "radial-gradient(ellipse at center, rgba(220,150,70,0.3) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 70%)",
          transform: "rotateX(75deg) translateZ(-15px)",
          filter: "blur(6px)",
        }}
      />
    </motion.div>
  );
}

function RatingMonument() {
  return (
    <div
      className="relative flex items-center justify-center w-full h-[400px]"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "center 30%",
      }}
    >
      <div
        className="flex items-end gap-6"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(5deg) rotateY(-18deg) translateZ(-40px)",
        }}
      >
        {RATING_DATA.map((item, i) => (
          <RatingPillar
            key={item.value}
            value={item.value}
            filled={item.filled}
            delay={0.15 + i * 0.1}
          />
        ))}
      </div>

      {/* Platform/Plinth */}
      <div
        className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[140%] h-[180px] origin-bottom"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(120,70,30,0.15) 0%, rgba(0,0,0,0) 65%)",
          transform: "rotateX(80deg)",
        }}
      />
    </div>
  );
}

export function ConclusionVerdictSection() {
  return (
    <section
      className="w-full relative overflow-hidden rounded-[40px] bg-[#090705] border border-[#d5b98a]/15 shadow-2xl py-16 px-8 lg:py-24 lg:px-16"
      id="final-verdict"
    >
      {/* Ambient Lighting Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(160,95,45,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(5,3,2,0.8)_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(240,218,177,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(240,218,177,0.2)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Left Column: Verdict Text (40%) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3
              className="uppercase tracking-[0.35em] text-[11px] font-semibold mb-6"
              style={{ color: "#D8B06A" }}
            >
              Overall Verdict
            </h3>
            {/* Warm ivory headline for high contrast and readability */}
            <h2
              className="text-[2.5rem] lg:text-[3.25rem] font-serif leading-[1.1] mb-6 lg:mb-8"
              style={{
                color: "#F5EDE4",
                textShadow: "0 0 20px rgba(255, 220, 180, 0.06)",
              }}
            >
              A strong, near-excellent closing judgment.
            </h2>
            <p className="text-[#ede4d3] text-[1.125rem] lg:text-[1.25rem] font-medium mb-5 leading-[1.6]">
              A historically grounded and emotionally effective portrayal of
              Rizal.
            </p>
            <p className="text-[#e7dcc9]/65 text-[1rem] lg:text-[1.1rem] leading-[1.75] max-w-[85%]">
              The final score lands between{" "}
              <span className="text-[#fcd58c] font-medium">Strong</span> and{" "}
              <span className="text-[#fcd58c] font-medium">Excellent</span>,
              giving the review a decisive closing image without overstatement.
            </p>
          </motion.div>
        </div>

        {/* Right Column: Rating Monument (55%) */}
        <div className="w-full lg:w-[55%] relative flex flex-col items-center justify-center min-h-[460px]">
          <RatingMonument />

          {/* Integrated Score Display */}
          <motion.div
            className="absolute bottom-4 left-4 lg:left-0 flex items-baseline gap-3 bg-[linear-gradient(135deg,rgba(40,25,18,0.9)_0%,rgba(15,8,5,0.98)_100%)] backdrop-blur-xl px-8 py-5 rounded-2xl border border-[#d8bc82]/30 shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[#fff8eb] text-[3.5rem] font-serif font-semibold leading-none drop-shadow-sm">
              4.5
            </span>
            <span className="text-[#d8bc82] text-[1.5rem] font-serif tracking-wide">
              / 5
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ConclusionVerdictSection;
