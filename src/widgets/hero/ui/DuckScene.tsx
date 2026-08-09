import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { DuckModel } from "@/shared/ui/DuckModel";

interface DuckSceneProps {
  reducedMotion: boolean;
  hasFinePointer: boolean;
  autoRotate: boolean;
  duckReady: boolean;
  onDuckInteract: () => void;
  onDuckReady: () => void;
  onControlsStart: () => void;
  onControlsEnd: () => void;
}

export function DuckScene({
  reducedMotion,
  hasFinePointer,
  autoRotate,
  duckReady,
  onDuckInteract,
  onDuckReady,
  onControlsStart,
  onControlsEnd,
}: DuckSceneProps) {
  return (
    <Canvas
      camera={{
        position: [0, 0.05, 7],
        fov: 38,
        near: 0.1,
        far: 50,
      }}
      dpr={[1, 1.6]}
      shadows
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={1.1} />

      <directionalLight
        castShadow
        position={[4, 6, 5]}
        intensity={2}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />

      <directionalLight position={[-4, 2, 3]} intensity={0.65} />
      <pointLight position={[2, 3, -4]} intensity={0.7} />

      <Suspense fallback={null}>
        <DuckModel
          position={[0, 0.05, 0]}
          scale={1.4}
          reducedMotion={reducedMotion}
          onInteract={onDuckInteract}
          onReady={onDuckReady}
        />
      </Suspense>

      {hasFinePointer && (
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.07}
          rotateSpeed={0.6}
          target={[0, 0, 0]}
          minPolarAngle={Math.PI * 0.36}
          maxPolarAngle={Math.PI * 0.64}
          autoRotate={!reducedMotion && duckReady && autoRotate}
          autoRotateSpeed={0.32}
          onStart={onControlsStart}
          onEnd={onControlsEnd}
        />
      )}
    </Canvas>
  );
}
