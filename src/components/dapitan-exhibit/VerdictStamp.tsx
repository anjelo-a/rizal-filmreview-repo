"use client";

import { motion } from "framer-motion";
import type { Verdict } from "@/types/dapitanTopic";

type VerdictStampProps = {
  verdict: Verdict;
};

export function VerdictStamp({ verdict }: VerdictStampProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.72, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: -3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-3 self-start rounded-full border border-[#dcb879]/65 bg-[radial-gradient(circle_at_top,#f3dfb8_0%,#c08f44_48%,#7b5221_100%)] px-5 py-2 shadow-[0_18px_55px_rgba(76,46,13,0.48)]"
    >
      <span className="inline-flex h-3 w-3 rounded-full bg-[#442107] shadow-[0_0_12px_rgba(68,33,7,0.6)]" />
      <span className="font-serif text-sm uppercase tracking-[0.24em] text-[#2c1406] md:text-base">
        {verdict}
      </span>
    </motion.div>
  );
}

export default VerdictStamp;
