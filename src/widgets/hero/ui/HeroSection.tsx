import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

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

        <nav className={`${styles.actions} hero-animate hero-animate-delay-4`}>
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
        </nav>
      </div>

      <div
        className={`${styles.canvasWrapper} hero-animate hero-animate-delay-3`}
        aria-hidden="true"
      >
        <Canvas
          camera={{
            position: [0, 0.35, 6.5],
            fov: 36,
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
          {/* Общий мягкий свет */}
          <ambientLight intensity={0.9} />

          {/* Основной источник */}
          <directionalLight
            castShadow
            position={[4, 6, 5]}
            intensity={2}
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0005}
          />

          {/* Холодный/мягкий fill с противоположной стороны */}
          <directionalLight position={[-4, 2, 3]} intensity={0.65} />

          {/* Небольшой back/rim light */}
          <pointLight position={[1, 3, -4]} intensity={0.7} />

          <Suspense fallback={null}>
            <DuckModel
              position={[0, 0.1, 0]}
              scale={1.6}
              reducedMotion={reducedMotion}
            />

            <ContactShadows
              position={[0, -1.35, 0]}
              opacity={0.32}
              scale={5}
              blur={2.5}
              far={3}
              resolution={512}
            />
          </Suspense>

          {hasFinePointer && (
            <OrbitControls
              makeDefault
              enablePan={false}
              enableZoom={false}
              enableDamping
              dampingFactor={0.075}
              rotateSpeed={0.65}
              target={[0, 0.15, 0]}
              minPolarAngle={Math.PI * 0.35}
              maxPolarAngle={Math.PI * 0.65}
              autoRotate={!reducedMotion}
              autoRotateSpeed={0.55}
            />
          )}
        </Canvas>
      </div>
    </section>
  );
}
