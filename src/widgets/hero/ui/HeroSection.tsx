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
  const compactLayout = useMediaQuery("(max-width: 760px)");
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

    if (!hero || reducedMotion || compactLayout) {
      return;
    }

    let frameId = 0;

    const updateScrollScene = () => {
      frameId = 0;

      const rect = hero.getBoundingClientRect();
      const travel = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = clamp01(-rect.top / travel);

      const primaryExit = smoothstep(0.18, 0.4, progress);
      const secondaryEnter = smoothstep(0.48, 0.7, progress);
      const visualLift = smoothstep(0.22, 0.82, progress);

      hero.style.setProperty("--hero-progress", progress.toFixed(4));
      hero.style.setProperty(
        "--hero-primary-opacity",
        (1 - primaryExit).toFixed(4),
      );
      hero.style.setProperty(
        "--hero-primary-shift",
        `${Math.round(primaryExit * -26)}px`,
      );
      hero.style.setProperty(
        "--hero-secondary-opacity",
        secondaryEnter.toFixed(4),
      );
      hero.style.setProperty(
        "--hero-secondary-shift",
        `${Math.round((1 - secondaryEnter) * 30)}px`,
      );
      hero.style.setProperty(
        "--hero-visual-scale",
        (1 + visualLift * 0.075).toFixed(4),
      );
      hero.style.setProperty(
        "--hero-visual-shift",
        `${Math.round(visualLift * -10)}px`,
      );
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
  }, [compactLayout, reducedMotion]);

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
        <div className={styles.frame}>
          <div className={styles.topline} aria-hidden="true">
            <span>portfolio / frontend</span>
            <span>React · TypeScript · product UI</span>
          </div>

          <div className={styles.copyPanel}>
            <div className={styles.copyViewport}>
              <div className={styles.primaryCopy}>
                <p className={`${styles.command} hero-animate`}>
                  <span>$</span>
                  <span>whoami</span>
                  <span className={styles.caret} aria-hidden="true">
                    _
                  </span>
                </p>

                <div className={styles.headingGroup}>
                  <h1
                    id="hero-title"
                    className="hero-animate hero-animate-delay-1"
                  >
                    <span>Привет,</span>
                    <span>я Илья.</span>
                    <strong>Frontend-разработчик.</strong>
                  </h1>

                  <p className={`${styles.tagline} hero-animate hero-animate-delay-2`}>
                    {siteConfig.tagline}
                  </p>

                  <p
                    className={`${styles.description} hero-animate hero-animate-delay-3`}
                  >
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

              <div className={styles.secondaryCopy}>
                <span className={styles.sceneIndex}>02 / after release</span>
                <h2>
                  Интерфейс —
                  <strong>только начало.</strong>
                </h2>
                <p className={styles.secondaryLead}>
                  Работаю с REST/BFF, WebSocket, legacy-кодом, тестами и релизным
                  циклом — там, где фронтенд становится частью продукта.
                </p>
                <a href="#experience" className={styles.storyLink}>
                  Как это выглядит в работе ↓
                </a>
              </div>
            </div>

            <ul className={styles.techRail} aria-label="Основной стек">
              <li>React / TypeScript</li>
              <li>REST / BFF</li>
              <li>WebSocket</li>
              <li>Legacy / releases</li>
            </ul>
          </div>

          <div className={styles.visualPanel}>
            <div className={styles.visualHeader} aria-hidden="true">
              <span>DUCK.3D</span>
              <span>interactive object</span>
            </div>

            <div className={styles.visual}>
              <div className={styles.visualWord} aria-hidden="true">
                DUCK
              </div>
              <div className={styles.target} aria-hidden="true" />

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
            </div>

            <div className={styles.visualFooter} aria-hidden="true">
              <span className={styles.interactionState}>
                <i />
                {hasInteracted ? "interaction received" : "drag / click"}
              </span>
              <span>{duckReady ? "ready" : "loading"}</span>
            </div>
          </div>

          <div className={styles.progress} aria-hidden="true">
            <span>01</span>
            <span className={styles.progressTrack}>
              <i />
            </span>
            <span>02</span>
          </div>
        </div>
      </div>
    </section>
  );
}
