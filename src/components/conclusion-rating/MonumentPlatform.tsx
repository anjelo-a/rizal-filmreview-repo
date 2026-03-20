"use client";

import { RoundedBox } from "@react-three/drei";

export function MonumentPlatform() {
  return (
    <group position={[0, -2.65, 0]}>
      <mesh position={[0, -0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[9.8, 11.2, 1.3, 72]} />
        <meshStandardMaterial
          color="#160f0c"
          metalness={0.72}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[0, 0.08, 0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[8.9, 9.45, 0.34, 72]} />
        <meshStandardMaterial
          color="#7a542d"
          metalness={0.86}
          roughness={0.16}
        />
      </mesh>

      <RoundedBox
        args={[16.2, 0.42, 8.4]}
        radius={0.26}
        smoothness={8}
        position={[0, 0.48, 0.12]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#241711"
          metalness={0.9}
          roughness={0.14}
          emissive="#23140d"
          emissiveIntensity={0.32}
        />
      </RoundedBox>

      <RoundedBox
        args={[10.6, 0.16, 4.9]}
        radius={0.18}
        smoothness={8}
        position={[0.6, 0.8, 0.12]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#1c120e"
          metalness={0.95}
          roughness={0.1}
          emissive="#94602a"
          emissiveIntensity={0.15}
        />
      </RoundedBox>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.9, 0]}>
        <ringGeometry args={[2.7, 4.9, 72]} />
        <meshBasicMaterial color="#cf9650" transparent opacity={0.34} />
      </mesh>
    </group>
  );
}
