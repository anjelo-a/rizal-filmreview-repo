"use client";

import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group } from "three";
import type { Topic } from "@/types/dapitanTopic";

type ArtifactItemProps = {
  topic: Topic;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: (id: string) => void;
};

type ArtifactModelProps = {
  highlight: number;
};

function LanternArtifact({ highlight }: ArtifactModelProps) {
  return (
    <>
      <mesh position={[0, -0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.36, 0.68, 6]} />
        <meshStandardMaterial
          color="#5a3b1f"
          metalness={0.45}
          roughness={0.4}
          emissive="#d7aa5b"
          emissiveIntensity={0.18 + highlight * 0.9}
        />
      </mesh>
      <mesh position={[0, 0.33, 0]} castShadow>
        <coneGeometry args={[0.33, 0.36, 6]} />
        <meshStandardMaterial
          color="#7a5227"
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.73, 0]} castShadow>
        <torusGeometry args={[0.18, 0.05, 12, 24]} />
        <meshStandardMaterial
          color="#b8893d"
          metalness={0.8}
          roughness={0.18}
        />
      </mesh>
    </>
  );
}

function SpectaclesArtifact({ highlight }: ArtifactModelProps) {
  return (
    <>
      <mesh position={[-0.42, 0.02, 0]} castShadow>
        <torusGeometry args={[0.32, 0.07, 14, 44]} />
        <meshStandardMaterial
          color="#a5783d"
          metalness={0.86}
          roughness={0.25}
          emissive="#f0c97a"
          emissiveIntensity={highlight * 0.85}
        />
      </mesh>
      <mesh position={[0.42, 0.02, 0]} castShadow>
        <torusGeometry args={[0.32, 0.07, 14, 44]} />
        <meshStandardMaterial
          color="#a5783d"
          metalness={0.86}
          roughness={0.25}
          emissive="#f0c97a"
          emissiveIntensity={highlight * 0.85}
        />
      </mesh>
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.28, 0.05, 0.05]} />
        <meshStandardMaterial color="#b98a4b" metalness={0.9} roughness={0.2} />
      </mesh>
    </>
  );
}

function BooksArtifact({ highlight }: ArtifactModelProps) {
  return (
    <>
      <mesh
        position={[0, -0.18, 0]}
        rotation={[0.08, 0.12, -0.08]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.1, 0.2, 0.82]} />
        <meshStandardMaterial color="#6a4221" roughness={0.72} />
      </mesh>
      <mesh
        position={[0.03, 0.04, 0]}
        rotation={[-0.04, -0.16, 0.06]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.05, 0.22, 0.8]} />
        <meshStandardMaterial
          color="#9a6a31"
          roughness={0.66}
          emissive="#e0b469"
          emissiveIntensity={highlight * 0.58}
        />
      </mesh>
      <mesh
        position={[-0.04, 0.28, 0]}
        rotation={[0.06, 0.1, -0.04]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 0.19, 0.76]} />
        <meshStandardMaterial color="#c89d58" roughness={0.6} />
      </mesh>
    </>
  );
}

function LocketArtifact({ highlight }: ArtifactModelProps) {
  return (
    <>
      <mesh position={[0, 0.1, 0]} castShadow>
        <torusGeometry args={[0.35, 0.07, 18, 56]} />
        <meshStandardMaterial
          color="#b48646"
          metalness={0.88}
          roughness={0.18}
          emissive="#f4d695"
          emissiveIntensity={highlight * 0.9}
        />
      </mesh>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.08, 28]} />
        <meshStandardMaterial
          color="#7f4d27"
          metalness={0.55}
          roughness={0.32}
        />
      </mesh>
      <mesh position={[0, 0.62, 0]} castShadow>
        <torusGeometry args={[0.18, 0.03, 12, 32]} />
        <meshStandardMaterial
          color="#c5964f"
          metalness={0.82}
          roughness={0.2}
        />
      </mesh>
    </>
  );
}

function PenBladeArtifact({ highlight }: ArtifactModelProps) {
  return (
    <>
      <mesh
        position={[-0.22, 0.08, 0]}
        rotation={[0.08, 0.18, -0.6]}
        castShadow
      >
        <cylinderGeometry args={[0.06, 0.04, 1.15, 12]} />
        <meshStandardMaterial
          color="#8f6134"
          metalness={0.46}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.2, -0.12, 0]} rotation={[0.12, 0.08, 0.78]} castShadow>
        <boxGeometry args={[0.16, 1.02, 0.08]} />
        <meshStandardMaterial
          color="#bbb1a1"
          metalness={0.76}
          roughness={0.24}
          emissive="#e9cb8a"
          emissiveIntensity={highlight * 0.72}
        />
      </mesh>
      <mesh position={[0.42, -0.42, 0]} rotation={[0, 0, 0.18]} castShadow>
        <boxGeometry args={[0.18, 0.34, 0.1]} />
        <meshStandardMaterial
          color="#7f4a28"
          metalness={0.4}
          roughness={0.42}
        />
      </mesh>
    </>
  );
}

function ArtifactModel({
  topic,
  highlight,
}: {
  topic: Topic;
  highlight: number;
}) {
  switch (topic.artifactType) {
    case "lantern":
      return <LanternArtifact highlight={highlight} />;
    case "spectacles":
      return <SpectaclesArtifact highlight={highlight} />;
    case "books":
      return <BooksArtifact highlight={highlight} />;
    case "locket":
      return <LocketArtifact highlight={highlight} />;
    case "pen-blade":
      return <PenBladeArtifact highlight={highlight} />;
    default:
      return null;
  }
}

export function ArtifactItem({
  topic,
  isSelected,
  isDimmed,
  onSelect,
}: ArtifactItemProps) {
  const groupRef = useRef<Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useCursor(isHovered);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const elapsed = state.clock.getElapsedTime();
    const bob = Math.sin(elapsed * 0.7 + topic.scenePosition[0]) * 0.12;
    group.position.set(
      topic.scenePosition[0],
      topic.scenePosition[1] + bob,
      topic.scenePosition[2],
    );
    group.rotation.y = elapsed * 0.22 + topic.scenePosition[0] * 0.14;
    group.rotation.x = Math.sin(elapsed * 0.35 + topic.scenePosition[2]) * 0.08;
    const scaleTarget = isSelected ? 1.1 : isHovered ? 1.05 : 1;
    group.scale.x += (scaleTarget - group.scale.x) * 0.08;
    group.scale.y += (scaleTarget - group.scale.y) * 0.08;
    group.scale.z += (scaleTarget - group.scale.z) * 0.08;
  });

  const highlight = isSelected ? 1 : isHovered ? 0.62 : 0.12;
  const opacity = isDimmed ? 0.4 : 1;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: React Three Fiber groups receive pointer events for 3D object picking.
    <group
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => onSelect(topic.id)}
    >
      <mesh scale={isSelected ? 1.65 : 1.35}>
        <sphereGeometry args={[0.72, 22, 22]} />
        <meshBasicMaterial
          color={isSelected ? "#d8bc82" : "#7d5a31"}
          transparent
          opacity={0.08 * opacity + highlight * 0.08}
        />
      </mesh>
      <group scale={opacity}>
        <ArtifactModel topic={topic} highlight={highlight} />
      </group>
    </group>
  );
}

export default ArtifactItem;
