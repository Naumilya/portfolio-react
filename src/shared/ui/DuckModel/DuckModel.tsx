import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MathUtils, Mesh, type Group } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

import duckModel from "@/shared/models/duckVox.glb?url";

interface DuckModelProps {
  position?: [number, number, number];
  scale?: number;
  reducedMotion?: boolean;
}

export function DuckModel({
  position = [0, 0, 0],
  scale = 1,
  reducedMotion = false,
}: DuckModelProps) {
  const motionRef = useRef<Group | null>(null);
  const animationFinishedRef = useRef(reducedMotion);

  const { scene } = useGLTF(duckModel);

  /*
   * Не используем исходный scene напрямую.
   *
   * Это особенно важно, если позже окажется, что модель
   * содержит skeleton / animation clips.
   */
  const duckScene = useMemo(() => clone(scene), [scene]);

  useEffect(() => {
    duckScene.traverse((object) => {
      if (!(object instanceof Mesh)) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;
    });
  }, [duckScene]);

  useFrame((_, delta) => {
    const group = motionRef.current;

    if (!group || reducedMotion || animationFinishedRef.current) {
      return;
    }

    /*
     * Небольшая entrance-анимация.
     *
     * Не заставляем утку бесконечно подпрыгивать и качаться.
     * После появления модель остаётся физически стабильной,
     * а движение сцены обеспечивает OrbitControls.
     */
    const nextScale = MathUtils.damp(group.scale.x, 1, 7, delta);

    const nextRotationX = MathUtils.damp(group.rotation.x, 0, 6, delta);

    const nextRotationY = MathUtils.damp(group.rotation.y, 0, 5, delta);

    group.scale.setScalar(nextScale);
    group.rotation.x = nextRotationX;
    group.rotation.y = nextRotationY;

    const scaleFinished = Math.abs(1 - nextScale) < 0.001;
    const xFinished = Math.abs(nextRotationX) < 0.001;
    const yFinished = Math.abs(nextRotationY) < 0.001;

    if (scaleFinished && xFinished && yFinished) {
      group.scale.setScalar(1);
      group.rotation.set(0, 0, 0);

      animationFinishedRef.current = true;
    }
  });

  return (
    <group position={position} scale={scale}>
      <group
        ref={motionRef}
        scale={reducedMotion ? 1 : 0.8}
        rotation={reducedMotion ? [0, 0, 0] : [0.1, -0.65, 0]}
      >
        <primitive object={duckScene} />
      </group>
    </group>
  );
}

useGLTF.preload(duckModel);
