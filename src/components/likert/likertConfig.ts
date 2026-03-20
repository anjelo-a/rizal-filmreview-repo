export type LikertValue = 1 | 2 | 3 | 4 | 5;

export type LikertOption = {
  value: LikertValue;
  label: string;
  shortLabel: string;
};

export type LikertViewport = "desktop" | "tablet";

export const LIKERT_OPTIONS: readonly LikertOption[] = [
  { value: 1, label: "Strongly Disagree", shortLabel: "Strongly Disagree" },
  { value: 2, label: "Disagree", shortLabel: "Disagree" },
  { value: 3, label: "Neutral", shortLabel: "Neutral" },
  { value: 4, label: "Agree", shortLabel: "Agree" },
  { value: 5, label: "Strongly Agree", shortLabel: "Strongly Agree" },
] as const;

export const LIKERT_SCENE_DIMENSIONS = {
  desktop: {
    cameraPosition: [0, 0.65, 6.7] as const,
    fov: 34,
    spacing: 1.7,
    edgeDepthOffset: -0.34,
  },
  tablet: {
    cameraPosition: [0, 0.6, 7.2] as const,
    fov: 32,
    spacing: 1.42,
    edgeDepthOffset: -0.26,
  },
} as const;

export function getBaseCardLayout(
  index: number,
  total: number,
  viewport: LikertViewport,
) {
  const center = (total - 1) / 2;
  const offset = index - center;
  const config = LIKERT_SCENE_DIMENSIONS[viewport];

  return {
    x: offset * config.spacing,
    y: 0,
    z: Math.abs(offset) * config.edgeDepthOffset,
    rotationY: -offset * (viewport === "desktop" ? 0.12 : 0.09),
  };
}
