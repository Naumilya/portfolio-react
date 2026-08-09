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

const CAPABILITIES = [
  ["01", "React / TypeScript"],
  ["02", "REST / BFF"],
  ["03", "WebSocket / real-time"],
  ["04", "Legacy / releases"],
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
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export function HeroSection() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hasFinePointer = useMediaQuery("(pointer: fine)");

  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [duckReady, setDuckReady] = useState(false);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [duckMessage, setDuckMessage] = useState<string | null>(null);

  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const duckMessageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const duckMessageIndexRef = useRef(0);

  useEffect(() => {
    const sceneTimerId = window.setTimeout(() => setSceneEnabled(true), 120);

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

  const markInteracted = () => setHasInteracted(true);

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

  const handleDuckReady = () => setDuckReady(true);

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
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroMain}>
        <div className={styles.content}>
          <p className={`${styles.eyebrow} hero-animate`}>
            <span>portfolio / 2026</span>
            <span className={styles.available}>frontend</span>
          </p>

          <h1 id="hero-title" className="hero-animate hero-animate-delay-1">
            <span>Привет,</span>
            <span>я Илья.</span>
            <strong>Frontend-разработчик.</strong>
          </h1>

          <div className={`${styles.copyGrid} hero-animate hero-animate-delay-2`}>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <p className={styles.description}>{siteConfig.description}</p>
          </div>

          <div className={`${styles.actions} hero-animate hero-animate-delay-3`}>
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

        <div className={`${styles.visual} hero-animate hero-animate-delay-2`}>
          <div className={styles.visualLabel} aria-hidden="true">
            <span>interactive object</span>
            <span>duck.3d</span>
          </div>

          <div className={styles.orbit} aria-hidden="true" />

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

          <span className={styles.duckWord} aria-hidden="true">
            DUCK
          </span>

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
      </div>

      <ul className={`${styles.capabilities} hero-animate hero-animate-delay-4`}>
        {CAPABILITIES.map(([index, label]) => (
          <li key={label}>
            <span>{index}</span>
            <strong>{label}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
