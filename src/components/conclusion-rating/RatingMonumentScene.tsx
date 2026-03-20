"use client";

import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { MonumentPlatform } from "./MonumentPlatform";
import { RatingPillar } from "./RatingPillar";

type RatingMonumentSceneProps = {
  className?: string;
  maxScore?: number;
  rating?: number;
  reduceMotion?: boolean;
  revealed?: boolean;
  score?: number;
};

type PillarMonumentProps = {
  maxScore: number;
  reduceMotion: boolean;
  revealed: boolean;
  score: number;
};

function PillarMonument({
  maxScore,
  reduceMotion,
  revealed,
  score,
}: PillarMonumentProps) {
  const monumentRef = useRef<THREE.Group>(null);
  const haloRingRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);
  const pillarHeight = 7.8;
  const pillarPositions = useMemo<[number, number, number][]>(
    () => [
      [-4.8, 0.1, 0.2],
      [-2.4, 0.1, -0.15],
      [0, 0.1, 0.25],
      [2.4, 0.1, -0.1],
      [4.8, 0.1, 0.2],
    ],
    [],
  );
  const fills = useMemo(
    () =>
      Array.from({ length: maxScore }, (_, index) =>
        Math.max(0, Math.min(1, score - index)),
      ),
    [maxScore, score],
  );

  useFrame(({ clock, pointer }, delta) => {
    if (!monumentRef.current || !haloRingRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    progressRef.current = THREE.MathUtils.damp(
      progressRef.current,
      revealed ? 1 : 0,
      3.2,
      delta,
    );

    monumentRef.current.position.y = THREE.MathUtils.damp(
      monumentRef.current.position.y,
      -0.8 + progressRef.current * 0.8,
      3.2,
      delta,
    );
    monumentRef.current.rotation.y = THREE.MathUtils.damp(
      monumentRef.current.rotation.y,
      -0.24 + (reduceMotion ? 0 : pointer.x * 0.12),
      3,
      delta,
    );
    monumentRef.current.rotation.x = THREE.MathUtils.damp(
      monumentRef.current.rotation.x,
      0.03 + (reduceMotion ? 0 : pointer.y * 0.03),
      3,
      delta,
    );

    haloRingRef.current.rotation.z = THREE.MathUtils.damp(
      haloRingRef.current.rotation.z,
      0.16 + (reduceMotion ? 0 : Math.sin(elapsed * 0.4) * 0.08),
      2.2,
      delta,
    );
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 3.2, 12]}
        fov={37}
        onUpdate={(camera) => camera.lookAt(0, 2.5, 0)}
      />

      <ambientLight intensity={0.8} color="#eadcc6" />
      <hemisphereLight intensity={0.7} color="#fff1d8" groundColor="#120b08" />
      <directionalLight
        position={[-9, 14, 12]}
        intensity={3.8}
        color="#ffe1ad"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[12, 8, -8]}
        angle={0.54}
        penumbra={0.9}
        intensity={48}
        color="#cdd9e7"
      />
      <pointLight position={[-4, 7, 10]} intensity={12} color="#f7cf91" />

      <mesh
        ref={haloRingRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 1.7, -1.8]}
      >
        <torusGeometry args={[6.3, 0.08, 22, 144]} />
        <meshBasicMaterial color="#8e6840" transparent opacity={0.32} />
      </mesh>

      <group ref={monumentRef} position={[0, -0.8, 0]}>
        <MonumentPlatform />

        {fills.map((fill, index) => (
          <RatingPillar
            key={`rating-pillar-${index + 1}`}
            delay={index * 0.12}
            fill={fill}
            height={pillarHeight}
            index={index}
            position={pillarPositions[index]}
            revealed={revealed}
            reduceMotion={reduceMotion}
          />
        ))}
      </group>

      <ContactShadows
        position={[0, -2.8, 0]}
        opacity={0.52}
        scale={22}
        blur={2.8}
        far={8}
      />
    </>
  );
}

export function RatingMonumentScene({
  className,
  maxScore = 5,
  rating,
  reduceMotion = false,
  revealed,
  score,
}: RatingMonumentSceneProps) {
  const resolvedScore = score ?? rating ?? 4.5;
  const [mountedReveal, setMountedReveal] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMountedReveal(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 3.2, 12], fov: 37 }}
      >
        <PillarMonument
          maxScore={maxScore}
          reduceMotion={reduceMotion}
          revealed={revealed ?? mountedReveal}
          score={resolvedScore}
        />
      </Canvas>
    </div>
  );
}
