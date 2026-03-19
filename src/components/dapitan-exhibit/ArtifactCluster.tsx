"use client";

import type { Topic } from "@/types/dapitanTopic";
import ArtifactItem from "./ArtifactItem";

type ArtifactClusterProps = {
  topics: Topic[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function ArtifactCluster({
  topics,
  selectedId,
  onSelect,
}: ArtifactClusterProps) {
  return (
    <group>
      {topics.map((topic) => {
        const isSelected = topic.id === selectedId;
        const isDimmed = selectedId !== null && !isSelected;
        return (
          <ArtifactItem
            key={topic.id}
            topic={topic}
            isSelected={isSelected}
            isDimmed={isDimmed}
            onSelect={onSelect}
          />
        );
      })}
    </group>
  );
}

export default ArtifactCluster;
