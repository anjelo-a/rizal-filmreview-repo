"use client";

import {
  Environment,
  MeshReflectorMaterial,
  Sparkles,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { Topic } from "@/types/dapitanTopic";
import ArtifactCluster from "./ArtifactCluster";
import CameraController from "./CameraController";

type RizalDapitanSceneProps = {
  topics: Topic[];
  selectedTopic: Topic | null;
  onSelectTopic: (id: string) => void;
};

function SceneContent({
  topics,
  selectedTopic,
  onSelectTopic,
}: RizalDapitanSceneProps) {
  return (
    <>
      <color attach="background" args={["#0b0806"]} />
      <fog attach="fog" args={["#0b0806", 7.5, 15]} />
      <ambientLight intensity={0.42} color="#b48b54" />
      <spotLight
        position={[-5, 6.5, 5.5]}
        intensity={selectedTopic ? 112 : 94}
        angle={0.34}
        penumbra={0.8}
        color="#f0c78b"
        castShadow
      />
      <spotLight
        position={[4.6, 3.4, 5]}
        intensity={selectedTopic ? 56 : 40}
        angle={0.42}
        penumbra={1}
        color="#8b5e2d"
      />
      <directionalLight position={[0, 4, 3]} intensity={0.65} color="#d7c0a1" />
      <group position={[0, -2, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[10, 80]} />
          <MeshReflectorMaterial
            blur={[300, 40]}
            resolution={1024}
            mixBlur={1.2}
            mixStrength={14}
            roughness={0.92}
            depthScale={0.5}
            minDepthThreshold={0.2}
            maxDepthThreshold={1.4}
            color="#140f0d"
            metalness={0.25}
          />
        </mesh>
        <mesh position={[0, 0.08, -3.8]} rotation={[0, 0, 0]}>
          <torusGeometry args={[5.3, 0.05, 12, 80]} />
          <meshStandardMaterial
            color="#3b2817"
            metalness={0.45}
            roughness={0.72}
          />
        </mesh>
      </group>
      <Sparkles
        count={64}
        scale={[11.5, 5.8, 9]}
        size={2.2}
        speed={0.18}
        opacity={0.2}
        color="#f0d8a6"
        position={[0, 0.75, 0]}
      />
      <ArtifactCluster
        topics={topics}
        selectedId={selectedTopic?.id ?? null}
        onSelect={onSelectTopic}
      />
      <Environment preset="warehouse" />
      <CameraController selectedTopic={selectedTopic} />
    </>
  );
}

export function RizalDapitanScene(props: RizalDapitanSceneProps) {
  return (
    <Canvas
      className="h-full w-full"
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.85, 9.4], fov: 42 }}
    >
      <SceneContent {...props} />
    </Canvas>
  );
}

export default RizalDapitanScene;
