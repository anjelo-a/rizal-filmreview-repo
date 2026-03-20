"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ConclusionCaption } from "./ConclusionCaption";

type ConclusionContentProps = {
  label: string;
  title: string;
  caption: string;
};

export function ConclusionContent({
  label,
  title,
  caption,
}: ConclusionContentProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="verdict-content"
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="verdict-eyebrow" style={{ color: "#D8B06A" }}>
        {label}
      </p>
      <h3 className="verdict-heading" style={{ color: "#F5EDE4" }}>
        {title}
      </h3>
      <div className="verdict-rule" />
      <ConclusionCaption text={caption} />
    </motion.div>
  );
}
