"use client";

import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useState } from "react";
import * as THREE from "three";
import {
  getBaseCardLayout,
  LIKERT_SCENE_DIMENSIONS,
  type LikertValue,
  type LikertViewport,
} from "./likertConfig";
import LikertOptionMesh from "./LikertOptionMesh";

type LikertSceneProps = {
  value?: LikertValue;
  onChange: (value: LikertValue) => void;
  disabled?: boolean;
  viewport: LikertViewport;
};

type CameraRigProps = {
  value?: LikertValue;
  viewport: LikertViewport;
};

function CameraRig({ value, viewport }: CameraRigProps) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const selectedIndex = value ? value - 1 : 2;
  const total = 5;
  const baseLayout = getBaseCardLayout(selectedIndex, total, viewport);

  useFrame((_, delta) => {
    const targetX = value ? baseLayout.x * 0.15 : 0;
    const targetY = value ? 0.2 : 0;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4, delta);
    target.set(targetX * 0.2, targetY, 0);
    camera.lookAt(target);
  });

  return null;
}

function LikertSceneContent({
  value,
  onChange,
  disabled = false,
  viewport,
}: LikertSceneProps) {
  const [hoveredValue, setHoveredValue] = useState<LikertValue | undefined>();

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={LIKERT_SCENE_DIMENSIONS[viewport].fov}
        position={LIKERT_SCENE_DIMENSIONS[viewport].cameraPosition}
      />
      <CameraRig value={value} viewport={viewport} />
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#090605", 8, 15]} />
      <ambientLight intensity={0.9} color="#f5ebd7" />
      <directionalLight
        position={[3.5, 5, 4]}
        intensity={1.4}
        color="#fff1dc"
        castShadow={false}
      />
      <directionalLight
        position={[-4, -1, 2]}
        intensity={0.42}
        color="#b37a47"
        castShadow={false}
      />
      <group position={[0, 0.25, 0]}>
        {Array.from({ length: 5 }).map((_, index) => {
          const optionValue = (index + 1) as LikertValue;
          return (
            <LikertOptionMesh
              key={optionValue}
              index={index}
              total={5}
              option={{
                value: optionValue,
                label: "",
                shortLabel:
                  optionValue === 1
                    ? "Strongly Disagree"
                    : optionValue === 2
                      ? "Disagree"
                      : optionValue === 3
                        ? "Neutral"
                        : optionValue === 4
                          ? "Agree"
                          : "Strongly Agree",
              }}
              value={value}
              hoveredValue={hoveredValue}
              viewport={viewport}
              disabled={disabled}
              onHover={setHoveredValue}
              onSelect={onChange}
            />
          );
        })}
      </group>
      <mesh position={[0, -1.2, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[5, 48]} />
        <meshBasicMaterial color="#20130e" transparent opacity={0.24} />
      </mesh>
      <ContactShadows
        position={[0, -0.98, 0]}
        opacity={0.32}
        scale={8}
        blur={2}
        far={2.8}
        resolution={512}
        color="#000000"
      />
    </>
  );
}

export function LikertScene({
  value,
  onChange,
  disabled = false,
  viewport,
}: LikertSceneProps) {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: false }}
      camera={{
        position: LIKERT_SCENE_DIMENSIONS[viewport].cameraPosition,
        fov: LIKERT_SCENE_DIMENSIONS[viewport].fov,
      }}
      onPointerMissed={() => undefined}
    >
      <LikertSceneContent
        value={value}
        onChange={onChange}
        disabled={disabled}
        viewport={viewport}
      />
    </Canvas>
  );
}

export default LikertScene;
