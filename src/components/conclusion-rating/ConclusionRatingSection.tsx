"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ConclusionContent } from "./ConclusionContent";
import { ConclusionScoreDisplay } from "./ConclusionScoreDisplay";
import { DEFAULT_LIKERT_LABELS, type LikertScaleLabel } from "./ratingScale";

type ConclusionRatingSectionProps = {
  label?: string;
  title?: string;
  rating?: number;
  total?: number;
  verdictLine?: string;
  caption?: string;
  labels?: LikertScaleLabel[];
};

export default function ConclusionRatingSection({
  label = "Overall Verdict",
  title = "A strong, near-excellent closing judgment.",
  rating = 4.5,
  total = 5,
  verdictLine = "Positioned between Strong and Excellent.",
  caption = "A historically grounded and emotionally effective portrayal of Rizal.",
  labels = DEFAULT_LIKERT_LABELS,
}: ConclusionRatingSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="verdict-section">
      <div className="verdict-ambience verdict-ambience-left" />
      <div className="verdict-ambience verdict-ambience-right" />

      <div className="verdict-layout">
        <div className="verdict-copy-column">
          <ConclusionContent label={label} title={title} caption={caption} />

          <motion.p
            className="verdict-support-line"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: 0.12,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            The final score lands between <strong>Strong</strong> and{" "}
            <strong>Excellent</strong>, giving the review a decisive closing
            image without overstatement.
          </motion.p>
        </div>

        <ConclusionScoreDisplay
          rating={rating}
          total={total}
          labels={labels}
          verdictLine={verdictLine}
        />
      </div>

      <p className="sr-only">
        Final rating: {rating.toFixed(1)} out of {total}. {caption}
      </p>
    </div>
  );
}
