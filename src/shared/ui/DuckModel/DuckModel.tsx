import { Center, useGLTF } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils, Mesh, MeshBasicMaterial, type Group } from "three";

import duckModel from "@/shared/models/duckVox.glb?url";

interface DuckModelProps {
  position?: [number, number, number];
  scale?: number;
  reducedMotion?: boolean;
  onInteract?: () => void;
  onReady?: () => void;
}

type Trick = "spin" | "backflip" | "sideHop";

const ENTRANCE_DURATION = 1.35;

const TRICK_DURATION: Record<Trick, number> = {
  spin: 0.95,
  backflip: 1.05,
  sideHop: 0.8,
};

const SHADOW_Y = -1.16;

const PARTICLES = [
  { x: -0.65, z: 0.05, lift: 0.2 },
  { x: 0.62, z: -0.08, lift: 0.24 },
  { x: -0.42, z: -0.34, lift: 0.17 },
  { x: 0.4, z: 0.38, lift: 0.21 },
  { x: -0.16, z: 0.55, lift: 0.26 },
  { x: 0.18, z: -0.55, lift: 0.19 },
];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOutBack(value: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
}

export function DuckModel({
  position = [0, 0, 0],
  scale = 1,
  reducedMotion = false,
  onInteract,
  onReady,
}: DuckModelProps) {
  const motionRef = useRef<Group | null>(null);
  const idleRef = useRef<Group | null>(null);

  const shadowRef = useRef<Mesh | null>(null);
  const particlesRef = useRef<Group | null>(null);

  const entranceStartRef = useRef<number | null>(null);
  const entranceFinishedRef = useRef(reducedMotion);
  const readyNotifiedRef = useRef(false);

  const trickStartRef = useRef<number | null>(null);
  const trickPendingRef = useRef(false);
  const trickRef = useRef<Trick>("spin");
  const trickIndexRef = useRef(0);

  const particleStartRef = useRef<number | null>(null);
  const landingTriggeredRef = useRef(false);

  const hoveredRef = useRef(false);

  const { scene } = useGLTF(duckModel);

  const duckScene = useMemo(() => {
    const clonedScene = scene.clone(true);

    clonedScene.traverse((object) => {
      if (!(object instanceof Mesh)) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;
    });

    return clonedScene;
  }, [scene]);

  const resetMotion = () => {
    const group = motionRef.current;

    if (!group) {
      return;
    }

    group.position.set(0, 0, 0);
    group.rotation.set(0, 0, 0);
    group.scale.set(1, 1, 1);
  };

  const notifyReady = () => {
    if (readyNotifiedRef.current) {
      return;
    }

    readyNotifiedRef.current = true;
    onReady?.();
  };

  const updateShadow = (height: number) => {
    const shadow = shadowRef.current;

    if (!shadow) {
      return;
    }

    const normalizedHeight = Math.min(Math.max(height / 0.8, 0), 1);
    const shadowScale = MathUtils.lerp(1, 0.62, normalizedHeight);

    shadow.scale.setScalar(shadowScale);

    const material = shadow.material;

    if (material instanceof MeshBasicMaterial) {
      material.opacity = MathUtils.lerp(0.28, 0.09, normalizedHeight);
    }
  };

  const triggerParticles = (time: number) => {
    const group = particlesRef.current;

    particleStartRef.current = time;

    if (!group) {
      return;
    }

    group.children.forEach((child) => {
      child.position.set(0, 0, 0);
      child.rotation.set(0, 0, 0);
      child.scale.setScalar(0);
    });

    group.visible = true;
  };

  const updateParticles = (time: number) => {
    const group = particlesRef.current;
    const startedAt = particleStartRef.current;

    if (!group || startedAt === null) {
      return;
    }

    const elapsed = time - startedAt;
    const duration = 0.42;
    const progress = clamp01(elapsed / duration);

    group.children.forEach((child, index) => {
      const config = PARTICLES[index];

      if (!config) {
        return;
      }

      const spread = easeOutCubic(progress);

      child.position.x = config.x * spread;
      child.position.z = config.z * spread;
      child.position.y = Math.sin(progress * Math.PI) * config.lift;

      child.rotation.x = progress * Math.PI * 2;
      child.rotation.z = progress * Math.PI * 1.5;

      const particleScale = Math.sin(progress * Math.PI) * 0.075;

      child.scale.setScalar(particleScale);
    });

    if (progress >= 1) {
      particleStartRef.current = null;
      group.visible = false;
    }
  };

  const updateIdle = (time: number, delta: number, busy: boolean) => {
    const group = idleRef.current;

    if (!group) {
      return;
    }

    if (busy || reducedMotion) {
      group.rotation.x = MathUtils.damp(group.rotation.x, 0, 8, delta);
      group.rotation.y = MathUtils.damp(group.rotation.y, 0, 8, delta);
      group.rotation.z = MathUtils.damp(group.rotation.z, 0, 8, delta);

      const nextScale = MathUtils.damp(group.scale.x, 1, 8, delta);
      group.scale.setScalar(nextScale);

      return;
    }

    const hoverScale = hoveredRef.current ? 1.025 : 1;
    const targetX = hoveredRef.current ? -0.035 : 0;
    const targetZ = hoveredRef.current ? -0.045 : 0;

    group.rotation.x = MathUtils.damp(group.rotation.x, targetX, 7, delta);
    group.rotation.z = MathUtils.damp(group.rotation.z, targetZ, 7, delta);

    const targetY = Math.sin(time * 0.45) * 0.045;

    group.rotation.y = MathUtils.damp(group.rotation.y, targetY, 3, delta);

    const nextScale = MathUtils.damp(group.scale.x, hoverScale, 8, delta);
    group.scale.setScalar(nextScale);
  };

  useFrame((state, delta) => {
    const motion = motionRef.current;

    if (!motion) {
      return;
    }

    const time = state.clock.getElapsedTime();

    updateParticles(time);

    if (reducedMotion) {
      if (
        !entranceFinishedRef.current ||
        trickStartRef.current !== null ||
        trickPendingRef.current
      ) {
        resetMotion();

        entranceFinishedRef.current = true;
        entranceStartRef.current = null;

        trickStartRef.current = null;
        trickPendingRef.current = false;

        landingTriggeredRef.current = false;
        particleStartRef.current = null;

        if (particlesRef.current) {
          particlesRef.current.visible = false;

          particlesRef.current.children.forEach((child) => {
            child.scale.setScalar(0);
          });
        }
      }

      notifyReady();
      updateIdle(time, delta, true);
      updateShadow(0);

      return;
    }

    if (!entranceFinishedRef.current) {
      if (entranceStartRef.current === null) {
        entranceStartRef.current = time;
      }

      const elapsed = time - entranceStartRef.current;
      const progress = clamp01(elapsed / ENTRANCE_DURATION);

      const movement = easeOutCubic(progress);
      const rotationProgress = easeInOutCubic(progress);

      motion.position.x = 0.72 * (1 - movement);
      motion.position.y =
        1.55 * (1 - movement) + Math.sin(progress * Math.PI) * 0.22;

      motion.rotation.x = -Math.PI * 2 * rotationProgress;
      motion.rotation.z = 0.18 * (1 - movement);

      const baseScale = 0.88 + 0.12 * easeOutBack(progress);

      let squash = 0;

      if (progress > 0.8) {
        const landingProgress = (progress - 0.8) / 0.2;

        squash = Math.sin(landingProgress * Math.PI) * 0.1;
      }

      motion.scale.set(
        baseScale + squash,
        baseScale - squash,
        baseScale + squash,
      );

      updateShadow(motion.position.y);

      if (progress > 0.92 && !landingTriggeredRef.current) {
        landingTriggeredRef.current = true;
        triggerParticles(time);
      }

      updateIdle(time, delta, true);

      if (progress >= 1) {
        resetMotion();

        entranceFinishedRef.current = true;
        entranceStartRef.current = null;
        landingTriggeredRef.current = false;

        updateShadow(0);
        notifyReady();
      }

      return;
    }

    if (trickPendingRef.current && trickStartRef.current === null) {
      trickPendingRef.current = false;
      trickStartRef.current = time;
      landingTriggeredRef.current = false;
    }

    if (trickStartRef.current !== null) {
      const trick = trickRef.current;
      const elapsed = time - trickStartRef.current;
      const progress = clamp01(elapsed / TRICK_DURATION[trick]);

      let height = 0;

      if (trick === "spin") {
        height = Math.sin(progress * Math.PI) * 0.72;

        motion.position.y = height;
        motion.rotation.y = easeOutCubic(progress) * Math.PI * 2;
        motion.rotation.z = Math.sin(progress * Math.PI) * 0.08;
      }

      if (trick === "backflip") {
        height = Math.sin(progress * Math.PI) * 0.86;

        motion.position.y = height;
        motion.rotation.x = -easeInOutCubic(progress) * Math.PI * 2;
        motion.rotation.z = Math.sin(progress * Math.PI) * -0.08;
      }

      if (trick === "sideHop") {
        height = Math.sin(progress * Math.PI) * 0.48;

        motion.position.y = height;
        motion.position.x = Math.sin(progress * Math.PI) * 0.48;
        motion.rotation.z = Math.sin(progress * Math.PI) * -0.32;
        motion.rotation.y = Math.sin(progress * Math.PI) * 0.22;
      }

      let squash = 0;

      if (progress < 0.14) {
        const prepare = progress / 0.14;
        squash = Math.sin(prepare * Math.PI) * 0.07;
      }

      if (progress > 0.82) {
        const landing = (progress - 0.82) / 0.18;
        squash = Math.sin(landing * Math.PI) * 0.12;
      }

      motion.scale.set(1 + squash, 1 - squash, 1 + squash);

      updateShadow(height);

      if (progress > 0.92 && !landingTriggeredRef.current) {
        landingTriggeredRef.current = true;
        triggerParticles(time);
      }

      updateIdle(time, delta, true);

      if (progress >= 1) {
        resetMotion();

        trickStartRef.current = null;
        landingTriggeredRef.current = false;

        updateShadow(0);
      }

      return;
    }

    updateIdle(time, delta, false);
    updateShadow(0);
  });

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    hoveredRef.current = true;
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    hoveredRef.current = false;
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 5) {
      return;
    }

    event.stopPropagation();

    if (
      reducedMotion ||
      !entranceFinishedRef.current ||
      trickStartRef.current !== null ||
      trickPendingRef.current
    ) {
      return;
    }

    const tricks: Trick[] = ["spin", "backflip", "sideHop"];

    trickRef.current = tricks[trickIndexRef.current % tricks.length];

    trickIndexRef.current += 1;
    trickPendingRef.current = true;

    onInteract?.();
  };

  return (
    <group position={position} scale={scale}>
      <mesh
        ref={shadowRef}
        position={[0, SHADOW_Y, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.72, 48]} />

        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </mesh>

      <group
        ref={particlesRef}
        position={[0, SHADOW_Y + 0.025, 0]}
        visible={false}
      >
        {PARTICLES.map((_, index) => (
          <mesh key={index} scale={0}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#1ed760" />
          </mesh>
        ))}
      </group>

      <group ref={motionRef}>
        <group
          ref={idleRef}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={handleClick}
        >
          <Center>
            <primitive object={duckScene} />
          </Center>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(duckModel);
