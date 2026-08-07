import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group } from "three";

import duckModel from "@/shared/models/duckVox.glb?url";

interface DuckModelProps {
  position?: [number, number, number];
  scale?: number;
}

export function DuckModel({ position = [0, 0, 0], scale = 1 }: DuckModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(duckModel);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    groupRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.12;
    groupRef.current.rotation.z = Math.sin(time * 0.8) * 0.05;

    if (hovered) {
      groupRef.current.position.y += 0.08;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(duckModel);
