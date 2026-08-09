import { lazy, Suspense, useEffect, useRef, useState } from "react";

import { siteConfig } from "@/shared/config/site";

import styles from "./HeroSection.module.css";

const DuckScene = lazy(() =>
  import("./DuckScene").then((module) => ({ default: module.DuckScene })),
);

const DUCK_MESSAGES = [
  "quack()",
  "sudo quack",
  "works on my machine",
  "HTTP 429: too many quacks",
] as const;

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

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(start: number, end: number, value: number) {
  const progress = clamp01((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

export function HeroSection() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hasFinePointer = useMediaQuery("(pointer: fine)");

  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [duckReady, setDuckReady] = useState(false);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [duckMessage, setDuckMessage] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const duckMessageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const duckMessageIndexRef = useRef(0);

  useEffect(() => {
    const sceneTimerId = window.setTimeout(() => {
      setSceneEnabled(true);
    }, 120);

    return () => {
      window.clearTimeout(sceneTimerId);

      if (autoRotateTimerRef.current !== null) {
        clearTimeout(autoRotateTimerRef.current);
      }

      if (duckMessageTimerRef.current !== null) {
        clearTimeout(duckMessageTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero || reducedMotion) {
      return;
    }

    let frameId = 0;

    const updateScrollScene = () => {
      frameId = 0;

      const rect = hero.getBoundingClientRect();
      const travel = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = clamp01(-rect.top / travel);
      const introOpacity = 1 - smoothstep(0.16, 0.52, progress);
      const storyOpacity = smoothstep(0.38, 0.62, progress);

      hero.style.setProperty("--hero-progress", progress.toFixed(4));
      hero.style.setProperty("--hero-intro-opacity", introOpacity.toFixed(4));
      hero.style.setProperty("--hero-story-opacity", storyOpacity.toFixed(4));
      hero.style.setProperty("--hero-copy-shift", `${Math.round(progress * -70)}px`);
      hero.style.setProperty("--hero-duck-shift", `${(progress * -11).toFixed(2)}vw`);
      hero.style.setProperty("--hero-duck-scale", (1 + progress * 0.24).toFixed(4));
      hero.style.setProperty("--hero-ghost-shift", `${(progress * -7).toFixed(2)}vw`);
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = requestAnimationFrame(updateScrollScene);
    };

    updateScrollScene();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== 0) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [reducedMotion]);

  const markInteracted = () => {
    setHasInteracted(true);
  };

  const handleDuckInteract = () => {
    markInteracted();

    if (duckMessageTimerRef.current !== null) {
      clearTimeout(duckMessageTimerRef.current);
    }

    const message =
      DUCK_MESSAGES[duckMessageIndexRef.current % DUCK_MESSAGES.length];

    duckMessageIndexRef.current += 1;
    setDuckMessage(message);

    duckMessageTimerRef.current = setTimeout(() => {
      setDuckMessage(null);
      duckMessageTimerRef.current = null;
    }, 1100);
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
    <section
      id="hero"
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <div className={styles.stage}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.ghostWord} aria-hidden="true">
          SHIP.
        </div>

        <div className={styles.content}>
          <p className={`${styles.intro} hero-animate`}>
            <span className={styles.prompt}>$</span>
            <span>whoami</span>
            <span className={styles.caret} aria-hidden="true">
              _
            </span>
          </p>

          <div className={styles.hgroup}>
            <h1 id="hero-title" className="hero-animate hero-animate-delay-1">
              <span className={styles.nameLine}>Привет, я Илья.</span>
              <span className={styles.highlight}>Frontend-разработчик.</span>
            </h1>

            <p className={`${styles.tagline} hero-animate hero-animate-delay-2`}>
              {siteConfig.tagline}
            </p>

            <p className={`${styles.description} hero-animate hero-animate-delay-3`}>
              {siteConfig.description}
            </p>
          </div>

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
              GitHub ↗
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.canvasWrapper} aria-hidden="true">
            {sceneEnabled ? (
              <Suspense fallback={<div className={styles.canvasFallback} />}>
                <DuckScene
                  reducedMotion={reducedMotion}
                  hasFinePointer={hasFinePointer}
                  autoRotate={autoRotate}
                  duckReady={duckReady}
                  onDuckInteract={handleDuckInteract}
                  onDuckReady={handleDuckReady}
                  onControlsStart={handleControlsStart}
                  onControlsEnd={handleControlsEnd}
                />
              </Suspense>
            ) : (
              <div className={styles.canvasFallback} />
            )}
          </div>

          {duckMessage && (
            <div className={styles.duckBubble} role="status" aria-live="polite">
              {duckMessage}
            </div>
          )}

          <div
            className={`${styles.interactionHint} ${
              duckReady ? styles.interactionHintReady : ""
            } ${hasInteracted ? styles.interactionHintHidden : ""}`}
            aria-hidden="true"
          >
            <span className={styles.interactionDot} />
            покрути • кликни
          </div>
        </div>

        <div className={styles.story}>
          <span className={styles.storyKicker}>after / release</span>
          <p className={styles.storyText}>
            Не просто собираю интерфейсы.
            <span>Разбираюсь, как они живут после релиза.</span>
          </p>
          <div className={styles.storyMeta} aria-label="Основные направления">
            <span>React / TypeScript</span>
            <span>API / real-time</span>
            <span>legacy / releases</span>
          </div>
        </div>

        <div className={styles.scrollProgress} aria-hidden="true">
          <span className={styles.progressLabel}>scroll</span>
          <span className={styles.progressTrack}>
            <span className={styles.progressValue} />
          </span>
        </div>
      </div>
    </section>
  );
}
