"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils, type PerspectiveCamera, Vector3 } from "three";
import type { Topic } from "@/types/dapitanTopic";

type CameraControllerProps = {
  selectedTopic: Topic | null;
};

const defaultCameraPosition = new Vector3(0, 0.8, 9.5);
const defaultFocusPoint = new Vector3(0, 0.3, 0);

export function CameraController({ selectedTopic }: CameraControllerProps) {
  const { camera, pointer } = useThree();
  const desiredPosition = useRef(defaultCameraPosition.clone());
  const desiredLookAt = useRef(defaultFocusPoint.clone());
  const scratchTarget = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    const perspectiveCamera = camera as PerspectiveCamera;
    const parallaxX = pointer.x * 0.28;
    const parallaxY = pointer.y * 0.16;

    if (selectedTopic) {
      desiredPosition.current.set(...selectedTopic.cameraPosition);
      desiredLookAt.current.set(...selectedTopic.focusPoint);
    } else {
      desiredPosition.current.copy(defaultCameraPosition);
      desiredLookAt.current.copy(defaultFocusPoint);
    }

    camera.position.lerp(
      scratchTarget
        .copy(desiredPosition.current)
        .addScalar(0)
        .set(
          desiredPosition.current.x + parallaxX,
          desiredPosition.current.y + parallaxY,
          desiredPosition.current.z,
        ),
      1 - Math.exp(-delta * 2.2),
    );

    scratchTarget.set(
      desiredLookAt.current.x + parallaxX * 0.5,
      desiredLookAt.current.y + parallaxY * 0.55,
      desiredLookAt.current.z,
    );
    perspectiveCamera.lookAt(scratchTarget);
    perspectiveCamera.fov = MathUtils.lerp(
      perspectiveCamera.fov,
      selectedTopic ? 34 : 42,
      1 - Math.exp(-delta * 2.1),
    );
    perspectiveCamera.updateProjectionMatrix();
  });

  return null;
}

export default CameraController;
