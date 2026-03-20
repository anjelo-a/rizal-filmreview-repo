"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type RatingPillarProps = {
  delay: number;
  fill: number;
  height: number;
  index: number;
  position: [number, number, number];
  revealed: boolean;
  reduceMotion: boolean;
};

export function RatingPillar({
  delay,
  fill,
  height,
  index,
  position,
  revealed,
  reduceMotion,
}: RatingPillarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const shellGlowRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const coreGroupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const fillHeight = Math.max(0.001, height * fill);
  const basePosition = useMemo(
    () => new THREE.Vector3(position[0], position[1], position[2]),
    [position],
  );

  useFrame(({ clock, pointer }, delta) => {
    if (
      !groupRef.current ||
      !shellRef.current ||
      !shellGlowRef.current ||
      !coreRef.current ||
      !haloRef.current ||
      !coreGroupRef.current ||
      !glowRef.current
    ) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    const revealTarget = revealed ? 1 : 0;
    progressRef.current = THREE.MathUtils.damp(
      progressRef.current,
      revealTarget,
      3.6,
      delta,
    );

    const stagedProgress = THREE.MathUtils.clamp(
      (progressRef.current - delay) / (1 - delay),
      0,
      1,
    );
    const idleBob = reduceMotion
      ? 0
      : Math.sin(elapsed * 0.75 + index * 0.6) * 0.05;

    groupRef.current.position.x = basePosition.x;
    groupRef.current.position.z = basePosition.z;
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      basePosition.y - 1.6 + stagedProgress * 1.6 + idleBob,
      4.4,
      delta,
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      0.22 - index * 0.05 + (reduceMotion ? 0 : pointer.x * 0.08),
      3,
      delta,
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -0.02 + (reduceMotion ? 0 : pointer.y * 0.04),
      3,
      delta,
    );

    shellRef.current.scale.y = THREE.MathUtils.damp(
      shellRef.current.scale.y,
      0.78 + stagedProgress * 0.22,
      4,
      delta,
    );
    const shellGlowMaterial = shellGlowRef.current
      .material as THREE.MeshBasicMaterial;
    shellGlowMaterial.opacity = THREE.MathUtils.damp(
      shellGlowMaterial.opacity,
      0.04 + stagedProgress * 0.08,
      4,
      delta,
    );
    coreGroupRef.current.scale.y = THREE.MathUtils.damp(
      coreGroupRef.current.scale.y,
      stagedProgress,
      4.2,
      delta,
    );
    haloRef.current.scale.setScalar(
      THREE.MathUtils.damp(
        haloRef.current.scale.x,
        0.7 + stagedProgress * 0.45,
        4,
        delta,
      ),
    );
    glowRef.current.intensity = THREE.MathUtils.damp(
      glowRef.current.intensity,
      (1.8 + fill * 5.2) * stagedProgress,
      3.4,
      delta,
    );
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, -height / 2 - 0.24, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.82, 0.98, 0.34, 28]} />
        <meshStandardMaterial
          color="#241711"
          metalness={0.82}
          roughness={0.22}
        />
      </mesh>

      <RoundedBox
        ref={shellRef}
        args={[1.48, height, 1.48]}
        radius={0.26}
        smoothness={10}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#e7ded2"
          transparent
          opacity={0.2}
          roughness={0.06}
          metalness={0.08}
          transmission={0.96}
          thickness={1.18}
          ior={1.18}
          clearcoat={1}
          clearcoatRoughness={0.06}
        />
      </RoundedBox>

      <mesh ref={shellGlowRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.2, height * 0.95, 1.2]} />
        <meshBasicMaterial color="#f0cb84" transparent opacity={0.04} />
      </mesh>

      <group
        ref={coreGroupRef}
        position={[0, -height / 2 + fillHeight / 2 + 0.08, 0]}
        scale={[1, 0, 1]}
      >
        <mesh ref={coreRef} castShadow>
          <boxGeometry args={[0.86, fillHeight, 0.86]} />
          <meshPhysicalMaterial
            color={fill < 1 ? "#f3d4a0" : "#ffe6b7"}
            emissive="#c9832f"
            emissiveIntensity={1.1}
            roughness={0.12}
            metalness={0.14}
            transmission={0.26}
            transparent
            opacity={0.98}
          />
        </mesh>
      </group>

      <mesh ref={haloRef} position={[0, height * 0.16, 0]}>
        <cylinderGeometry args={[1.28, 1.28, height * 0.84, 24, 1, true]} />
        <meshBasicMaterial color="#f0c67b" transparent opacity={0.09} />
      </mesh>

      <mesh position={[0, height / 2 - 0.18, 0]}>
        <cylinderGeometry args={[0.5, 0.56, 0.1, 24]} />
        <meshStandardMaterial
          color="#fff2db"
          emissive="#f0b75e"
          emissiveIntensity={0.7}
          metalness={0.28}
          roughness={0.14}
        />
      </mesh>

      <pointLight
        ref={glowRef}
        position={[0, height / 2 + 0.6, 0.45]}
        color={fill < 1 ? "#f4ca8b" : "#ffd799"}
        distance={7.2}
        decay={2}
        intensity={0}
      />
    </group>
  );
}
