"use client";

type ScoreOverlayProps = {
  rating: number;
  total: number;
  verdictLine: string;
};

export function ScoreOverlay({
  rating,
  total,
  verdictLine,
}: ScoreOverlayProps) {
  return (
    <div className="verdict-score-overlay">
      <p className="verdict-score-kicker">Final Score</p>
      <div className="verdict-score-row">
        <span className="verdict-score-number">{rating.toFixed(1)}</span>
        <span className="verdict-score-total">/ {total}</span>
      </div>
      <p className="verdict-score-line">{verdictLine}</p>
    </div>
  );
}
