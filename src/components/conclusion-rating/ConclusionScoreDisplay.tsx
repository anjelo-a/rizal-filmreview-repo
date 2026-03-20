"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";

import type { LikertScaleLabel } from "./ratingScale";
import { RatingLabel } from "./RatingLabel";
import { RatingMonumentScene } from "./RatingMonumentScene";
import { ScoreOverlay } from "./ScoreOverlay";
import { useMediaQuery } from "./useMediaQuery";

type ConclusionScoreDisplayProps = {
  rating: number;
  total: number;
  verdictLine: string;
  labels: LikertScaleLabel[];
};

function getLegendTone(rating: number, value: number) {
  return rating >= value
    ? "active"
    : rating >= value - 0.5
      ? "partial"
      : "idle";
}

export function ConclusionScoreDisplay({
  rating,
  total,
  verdictLine,
  labels,
}: ConclusionScoreDisplayProps) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sceneRef, { once: true, amount: 0.3 });
  const dominantLabel = useMemo(
    () =>
      labels.find((item) => item.value === Math.ceil(rating))?.label ??
      "Excellent",
    [labels, rating],
  );

  return (
    <motion.div
      ref={sceneRef}
      className="verdict-display"
      initial={reduceMotion ? false : { opacity: 0, x: 40 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="verdict-display-backdrop" />
      <div className="verdict-display-grid" />

      <div className="verdict-display-inner">
        {isDesktop ? (
          <RatingMonumentScene
            rating={rating}
            revealed={isInView}
            reduceMotion={Boolean(reduceMotion)}
          />
        ) : (
          <div className="verdict-mobile-monument" aria-hidden="true">
            {labels.map((item) => {
              const tone = getLegendTone(rating, item.value);

              return (
                <div
                  key={item.value}
                  className={`verdict-mobile-pillar verdict-mobile-pillar-${tone}`}
                  style={{
                    height: `${48 + item.value * 10}%`,
                  }}
                >
                  <span
                    className="verdict-mobile-fill"
                    style={{
                      height: `${Math.max(0, Math.min(1, rating - (item.value - 1))) * 100}%`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ScoreOverlay rating={rating} total={total} verdictLine={verdictLine} />
      <div className="verdict-status-chip">{dominantLabel}</div>

      <div className="verdict-scale-legend">
        {labels.map((item) => (
          <RatingLabel
            key={item.value}
            value={item.value}
            label={item.label}
            active={rating >= item.value - 0.5}
          />
        ))}
      </div>
    </motion.div>
  );
}
