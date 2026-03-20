"use client";

import { Float, PerspectiveCamera, RoundedBox, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function createStarShape() {
  const shape = new THREE.Shape();
  const outerRadius = 0.68;
  const innerRadius = 0.3;

  for (let index = 0; index < 10; index += 1) {
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    const angle = Math.PI / 2 + (index * Math.PI) / 5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (index === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }

  shape.closePath();
  return shape;
}

type StarTokenProps = {
  position: [number, number, number];
  fill: number;
  rotationOffset: number;
};

function StarToken({ position, fill, rotationOffset }: StarTokenProps) {
  const groupRef = useRef<THREE.Group>(null);
  const starShape = useMemo(() => createStarShape(), []);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      rotationOffset + Math.sin(elapsed * 0.8 + rotationOffset) * 0.22,
      3,
      delta,
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      Math.cos(elapsed * 1.1 + rotationOffset) * 0.08,
      3,
      delta,
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      position[1] + Math.sin(elapsed * 1.35 + rotationOffset) * 0.08,
      3,
      delta,
    );
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[0, 0, -0.2]} castShadow>
        <cylinderGeometry args={[0.86, 0.96, 0.36, 6]} />
        <meshStandardMaterial color="#3b2414" metalness={0.4} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0, 0]} castShadow>
        <extrudeGeometry
          args={[
            starShape,
            {
              depth: 0.22,
              bevelEnabled: true,
              bevelSegments: 3,
              steps: 1,
              bevelSize: 0.05,
              bevelThickness: 0.04,
            },
          ]}
        />
        <meshStandardMaterial color="#8a5622" metalness={0.65} roughness={0.34} />
      </mesh>
      <mesh position={[-0.68 + fill * 0.68, 0, 0.13]} castShadow>
        <boxGeometry args={[1.36 * fill, 1.5, 0.16]} />
        <meshStandardMaterial
          color={fill === 0.5 ? "#f5d88f" : "#ffe3a3"}
          emissive="#c38a2d"
          emissiveIntensity={0.35}
          metalness={0.45}
          roughness={0.22}
        />
      </mesh>
    </group>
  );
}

function RatingStage() {
  const plaqueRef = useRef<THREE.Group>(null);
  const scoreRef = useRef<THREE.Group>(null);
  const verdictRef = useRef<THREE.Group>(null);
  const stars = [1, 1, 1, 1, 0.5];

  useFrame(({ clock }, delta) => {
    if (!plaqueRef.current || !scoreRef.current || !verdictRef.current) {
      return;
    }

    const elapsed = clock.getElapsedTime();

    plaqueRef.current.rotation.y = THREE.MathUtils.damp(
      plaqueRef.current.rotation.y,
      Math.sin(elapsed * 0.42) * 0.16,
      2.4,
      delta,
    );
    plaqueRef.current.rotation.x = THREE.MathUtils.damp(
      plaqueRef.current.rotation.x,
      -0.14 + Math.cos(elapsed * 0.5) * 0.03,
      2.4,
      delta,
    );

    scoreRef.current.position.y = THREE.MathUtils.damp(
      scoreRef.current.position.y,
      0.44 + Math.sin(elapsed * 1.25) * 0.04,
      4,
      delta,
    );
    verdictRef.current.position.y = THREE.MathUtils.damp(
      verdictRef.current.position.y,
      -0.42 + Math.cos(elapsed * 0.95) * 0.03,
      4,
      delta,
    );
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.7, 8.2]} fov={31} />
      <color attach="background" args={["#0b0705"]} />
      <fog attach="fog" args={["#0b0705", 8, 18]} />
      <ambientLight intensity={0.8} color="#f4e7cf" />
      <spotLight
        position={[4, 7, 7]}
        angle={0.45}
        penumbra={0.7}
        intensity={78}
        color="#ffe2b2"
        castShadow
      />
      <pointLight position={[-5, 3, 4]} intensity={26} color="#a85d22" />
      <pointLight position={[0, -1, 5]} intensity={12} color="#f5c06a" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.72, 0]} receiveShadow>
        <circleGeometry args={[7.2, 64]} />
        <meshStandardMaterial color="#120b08" roughness={0.95} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.68, 0]}>
        <ringGeometry args={[2.8, 4.8, 64]} />
        <meshBasicMaterial color="#8a5622" transparent opacity={0.2} />
      </mesh>

      <Float speed={1.1} rotationIntensity={0.14} floatIntensity={0.24}>
        <group position={[0, -0.55, 0]}>
          <mesh position={[0, -0.9, 0]} receiveShadow castShadow>
            <cylinderGeometry args={[2.6, 2.95, 0.5, 40]} />
            <meshStandardMaterial color="#2e1c11" metalness={0.35} roughness={0.68} />
          </mesh>
          <mesh position={[0, -0.55, 0]} receiveShadow castShadow>
            <cylinderGeometry args={[2.1, 2.3, 0.24, 40]} />
            <meshStandardMaterial color="#6d4722" metalness={0.5} roughness={0.42} />
          </mesh>
          <group ref={plaqueRef}>
            <RoundedBox
              args={[4.6, 2.5, 0.42]}
              radius={0.18}
              smoothness={6}
              position={[0, 0.55, -0.1]}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial
                color="#5a3517"
                metalness={0.55}
                roughness={0.34}
                emissive="#1f130a"
                emissiveIntensity={0.3}
              />
            </RoundedBox>
            <RoundedBox
              args={[4.16, 2.06, 0.18]}
              radius={0.14}
              smoothness={6}
              position={[0, 0.56, 0.16]}
              castShadow
            >
              <meshStandardMaterial
                color="#c58a3a"
                metalness={0.62}
                roughness={0.22}
                emissive="#7e4f16"
                emissiveIntensity={0.24}
              />
            </RoundedBox>

            <group ref={scoreRef} position={[0, 0.44, 0.32]}>
              <Text
                fontSize={0.98}
                letterSpacing={-0.04}
                color="#fff2d4"
                anchorX="center"
                anchorY="middle"
              >
                4.5
              </Text>
              <Text
                position={[1.1, -0.03, 0]}
                fontSize={0.32}
                color="#f1d19e"
                anchorX="left"
                anchorY="middle"
              >
                / 5
              </Text>
            </group>

            <group ref={verdictRef} position={[0, -0.42, 0.32]}>
              <Text
                fontSize={0.24}
                maxWidth={3.3}
                lineHeight={1.2}
                color="#2f1708"
                anchorX="center"
                anchorY="middle"
                textAlign="center"
              >
                Excellent historical drama
              </Text>
            </group>
          </group>

          <group position={[0, 1.8, 1.1]}>
            {stars.map((fill, index) => (
              <StarToken
                key={`${fill}-${index}`}
                fill={fill}
                position={[-2.3 + index * 1.15, 0, index === 4 ? 0.14 : 0]}
                rotationOffset={index * 0.7}
              />
            ))}
          </group>
        </group>
      </Float>
    </>
  );
}

export default function FilmRatingDisplay() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#8a5b1d]/20 bg-[linear-gradient(160deg,#130c08_0%,#2b1a11_48%,#110b07_100%)] px-6 py-8 text-white shadow-[0_30px_90px_rgba(22,10,3,0.34)] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,140,0.3),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(179,96,28,0.18),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(240,218,177,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(240,218,177,0.18)_1px,transparent_1px)] [background-size:92px_92px]" />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.38em] text-[#e4c086]">
            Final Rating
          </p>
          <h3 className="mt-3 font-serif text-[2rem] leading-tight text-[#fff4de] sm:text-[2.4rem]">
            A proper 3D verdict for our 4.5 out of 5 score.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f0e0c1]/78 sm:text-base">
            The rating now lives inside an animated display piece that fits the
            site&apos;s museum-like presentation: a floating plaque, glowing star
            tokens, and a warm bronze stage that keeps moving subtly as you
            read.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#dcb879]/40 bg-[radial-gradient(circle_at_top,#f3dfb8_0%,#c08f44_48%,#7b5221_100%)] px-5 py-2 shadow-[0_18px_55px_rgba(76,46,13,0.4)]">
            <span className="inline-flex h-3 w-3 rounded-full bg-[#442107] shadow-[0_0_12px_rgba(68,33,7,0.6)]" />
            <span className="font-serif text-sm uppercase tracking-[0.24em] text-[#2c1406]">
              Excellent Historical Drama
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(35,22,13,0.9),rgba(8,5,4,0.98))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_26px_60px_rgba(0,0,0,0.28)]">
          <div className="h-[420px] w-full sm:h-[480px]">
            <Canvas
              shadows
              dpr={[1, 1.8]}
              gl={{ antialias: true, alpha: false }}
              camera={{ position: [0, 1.7, 8.2], fov: 31 }}
            >
              <RatingStage />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
