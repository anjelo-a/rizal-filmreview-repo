export type LikertScaleLabel = {
  value: number;
  label: string;
};

export const DEFAULT_LIKERT_LABELS: LikertScaleLabel[] = [
  { value: 1, label: "Very Weak" },
  { value: 2, label: "Weak" },
  { value: 3, label: "Fair" },
  { value: 4, label: "Strong" },
  { value: 5, label: "Excellent" },
];
