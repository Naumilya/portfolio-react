import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import { siteConfig } from "@/shared/config/site";
import { DuckModel } from "@/shared/ui/DuckModel";

import styles from "./HeroSection.module.css";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

export function HeroSection() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hasFinePointer = useMediaQuery("(pointer: fine)");

  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [duckReady, setDuckReady] = useState(false);

  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (autoRotateTimerRef.current !== null) {
        clearTimeout(autoRotateTimerRef.current);
      }
    };
  }, []);

  const markInteracted = () => {
    setHasInteracted(true);
  };

  const handleDuckReady = () => {
    setDuckReady(true);
  };

  const handleControlsStart = () => {
    markInteracted();

    if (autoRotateTimerRef.current !== null) {
      clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }

    setAutoRotate(false);
  };

  const handleControlsEnd = () => {
    if (reducedMotion) {
      return;
    }

    if (autoRotateTimerRef.current !== null) {
      clearTimeout(autoRotateTimerRef.current);
    }

    autoRotateTimerRef.current = setTimeout(() => {
      setAutoRotate(true);
      autoRotateTimerRef.current = null;
    }, 1400);
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <p className={`${styles.intro} hero-animate`}>
          <span className={styles.prompt}>$</span> whoami
        </p>

        <hgroup className={styles.hgroup}>
          <h1 className="hero-animate hero-animate-delay-1">
            Привет, я Илья —{" "}
            <span className={styles.highlight}>Frontend-разработчик.</span>
          </h1>

          <h2 className="hero-animate hero-animate-delay-2">
            {siteConfig.tagline}
          </h2>

          <p className="hero-animate hero-animate-delay-3">
            {siteConfig.description}
          </p>
        </hgroup>

        <div className={`${styles.actions} hero-animate hero-animate-delay-4`}>
          <a href="#projects" className={styles.primaryBtn}>
            Смотреть работы
          </a>

          <a href="#contacts" className={styles.secondaryBtn}>
            Связаться
          </a>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tertiaryLink}
          >
            GitHub →
          </a>
        </div>
      </div>

      <div
        className={`${styles.canvasWrapper} hero-animate hero-animate-delay-3`}
        aria-hidden="true"
      >
        <Canvas
          camera={{
            position: [0, 0.05, 7],
            fov: 38,
            near: 0.1,
            far: 50,
          }}
          dpr={[1, 1.75]}
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
              onInteract={markInteracted}
              onReady={handleDuckReady}
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
              onStart={handleControlsStart}
              onEnd={handleControlsEnd}
            />
          )}
        </Canvas>

        <div
          className={`${styles.interactionHint} ${
            duckReady ? styles.interactionHintReady : ""
          } ${hasInteracted ? styles.interactionHintHidden : ""}`}
        >
          <span className={styles.interactionDot} aria-hidden="true" />
          покрути • кликни
        </div>
      </div>
    </section>
  );
}
