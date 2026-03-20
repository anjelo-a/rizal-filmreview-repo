"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  direction?: "up" | "left" | "right";
  repeat?: boolean;
}

const ScrollReveal = ({
  children,
  delay = 0,
  threshold = 0.1,
  direction = "up",
  repeat = true,
}: ScrollRevealProps) => {
  const prefersReducedMotion = useReducedMotion();

  const hiddenTransform = prefersReducedMotion
    ? { opacity: 0 }
    : direction === "left"
      ? { opacity: 0, x: -32 }
      : direction === "right"
        ? { opacity: 0, x: 32 }
        : { opacity: 0, y: 32 };

  return (
    <motion.div
      initial={hiddenTransform}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !repeat, amount: threshold }}
      transition={{
        delay: delay / 1000,
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
