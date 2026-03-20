"use client";

import { Html, RoundedBox, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useRef } from "react";
import * as THREE from "three";
import {
  getBaseCardLayout,
  type LikertOption,
  type LikertValue,
  type LikertViewport,
} from "./likertConfig";

type LikertOptionMeshProps = {
  index: number;
  total: number;
  option: LikertOption;
  value?: LikertValue;
  hoveredValue?: LikertValue;
  viewport: LikertViewport;
  disabled?: boolean;
  onHover: (value?: LikertValue) => void;
  onSelect: (value: LikertValue) => void;
};

function LikertOptionMeshComponent({
  index,
  total,
  option,
  value,
  hoveredValue,
  viewport,
  disabled = false,
  onHover,
  onSelect,
}: LikertOptionMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const faceMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const isHovered = hoveredValue === option.value;
  const isSelected = value === option.value;
  const hasSelection = value !== undefined;
  const baseLayout = getBaseCardLayout(index, total, viewport);
  const isCompact = viewport === "tablet";

  useCursor(isHovered && !disabled);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const bodyMaterial = bodyMaterialRef.current;
    const faceMaterial = faceMaterialRef.current;

    if (!group || !bodyMaterial || !faceMaterial) {
      return;
    }

    const floatOffset = Math.sin(state.clock.elapsedTime * 0.85 + index * 0.7);
    const selectedDepth = isSelected ? 0.88 : 0;
    const hoverDepth = !isSelected && isHovered ? 0.28 : 0;
    const deEmphasisDepth = hasSelection && !isSelected ? -0.22 : 0;
    const targetY =
      baseLayout.y + floatOffset * 0.05 + (isHovered ? 0.14 : 0) + (isSelected ? 0.08 : 0);
    const targetZ = baseLayout.z + selectedDepth + hoverDepth + deEmphasisDepth;
    const targetRotationX = isHovered ? -0.08 : -0.04;
    const targetRotationY = isSelected ? baseLayout.rotationY * 0.24 : baseLayout.rotationY;
    const targetRotationZ = isHovered ? -baseLayout.x * 0.008 : 0;
    const targetScale = isSelected ? 1.07 : isHovered ? 1.03 : hasSelection ? 0.97 : 1;
    const targetBodyColor = new THREE.Color(
      isSelected
        ? "#c59b55"
        : isHovered
          ? "#7b6650"
          : hasSelection
            ? "#2b241f"
            : "#322b26",
    );
    const targetFaceColor = new THREE.Color(
      isSelected
        ? "#f7e8c7"
        : isHovered
          ? "#f0e2c1"
          : "#e7d6b4",
    );

    group.position.x = THREE.MathUtils.damp(group.position.x, baseLayout.x, 5.5, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 5.5, delta);
    group.position.z = THREE.MathUtils.damp(group.position.z, targetZ, 5.5, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetRotationX, 5.5, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetRotationY, 5.5, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetRotationZ, 5.5, delta);
    group.scale.setScalar(
      THREE.MathUtils.damp(group.scale.x, targetScale, 5.5, delta),
    );

    bodyMaterial.color.lerp(targetBodyColor, 1 - Math.exp(-5 * delta));
    bodyMaterial.opacity = THREE.MathUtils.damp(
      bodyMaterial.opacity,
      hasSelection && !isSelected ? 0.84 : 1,
      5.5,
      delta,
    );
    faceMaterial.color.lerp(targetFaceColor, 1 - Math.exp(-5 * delta));
    faceMaterial.emissive.set(isSelected ? "#50351a" : isHovered ? "#342515" : "#201711");
    faceMaterial.emissiveIntensity = THREE.MathUtils.damp(
      faceMaterial.emissiveIntensity,
      isSelected ? 0.36 : isHovered ? 0.18 : 0.08,
      5.5,
      delta,
    );
  });

  return (
    <group
      ref={groupRef}
      position={[baseLayout.x, 0, baseLayout.z]}
      onPointerOver={() => {
        if (!disabled) {
          onHover(option.value);
        }
      }}
      onPointerOut={() => onHover(undefined)}
      onClick={() => onSelect(option.value)}
      onPointerDown={() => onSelect(option.value)}
    >
      <RoundedBox args={[1.2, 1.62, 0.3]} radius={0.12} smoothness={6}>
        <meshStandardMaterial
          ref={bodyMaterialRef}
          color="#322b26"
          metalness={0.24}
          roughness={0.56}
          transparent
        />
      </RoundedBox>
      <RoundedBox
        args={[1.04, 1.45, 0.06]}
        radius={0.09}
        smoothness={6}
        position={[0, 0, 0.16]}
      >
        <meshStandardMaterial
          ref={faceMaterialRef}
          color="#e7d6b4"
          metalness={0.08}
          roughness={0.3}
        />
      </RoundedBox>
      <mesh position={[0, -0.54, 0.19]}>
        <planeGeometry args={[0.8, 0.03]} />
        <meshBasicMaterial color={isSelected ? "#8c5624" : "#7d6646"} />
      </mesh>
      <Html
        transform
        sprite
        position={[0, 0.05, 0.2]}
        distanceFactor={1.5}
        zIndexRange={[10, 0]}
        pointerEvents="none"
      >
        <div
          className={`flex h-[110px] ${
            isCompact ? "w-[122px]" : "w-[134px]"
          } flex-col items-center justify-center text-center`}
        >
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#7d5b2a]">
            {option.value}
          </span>
          <span className="mt-3 font-serif text-[15px] leading-tight text-[#2b1f14]">
            {option.shortLabel}
          </span>
        </div>
      </Html>
    </group>
  );
}

export const LikertOptionMesh = memo(LikertOptionMeshComponent);

export default LikertOptionMesh;
