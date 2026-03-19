export type Verdict = "Historically Accurate";

export type ArtifactType =
  | "lantern"
  | "spectacles"
  | "books"
  | "locket"
  | "pen-blade";

export type Vec3Tuple = [number, number, number];

export type Topic = {
  id: string;
  title: string;
  period?: string;
  filmShows: string;
  actualHistory: string;
  sources: string[];
  significance: string;
  verdict: Verdict;
  artifactType: ArtifactType;
  artifactLabel: string;
  scenePosition: Vec3Tuple;
  cameraPosition: Vec3Tuple;
  focusPoint: Vec3Tuple;
};
