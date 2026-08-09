import { useEffect, useRef, useState } from "react";

import { personalProjects, projects } from "@/shared/config/projects";
import { SectionHeading } from "@/shared/ui/SectionHeading";

import styles from "./ProjectsSection.module.css";

interface ShowcaseItem {
  id: string;
  title: string;
  type: string;
  category: string;
  description: string;
  primaryLabel: string;
  primaryText: string;
  secondaryLabel: string;
  secondaryText: string;
  tags: string[];
  notes: string[];
  href?: string;
  hrefLabel?: string;
  poster: "systems" | "route" | "radar";
}

const showcaseItems: ShowcaseItem[] = [
  ...projects.map((project, index) => ({
    id: project.id,
    title: project.title,
    type: project.type,
    category: `0${index + 1} / commercial`,
    description: project.description,
    primaryLabel: "Задача",
    primaryText: project.task,
    secondaryLabel: "Мой вклад",
    secondaryText: project.contribution,
    tags: project.stack,
    notes: project.stack.slice(0, 3),
    href: project.liveUrl,
    hrefLabel: "Открыть проект ↗",
    poster: project.id === "lemanapro" ? ("systems" as const) : ("route" as const),
  })),
  ...personalProjects.map((project) => ({
    id: project.id,
    title: project.title,
    type: "Telegram Mini App",
    category: "03 / personal lab",
    description: project.description,
    primaryLabel: "Зачем",
    primaryText: project.problem,
    secondaryLabel: "Архитектура",
    secondaryText: project.architecture,
    tags: project.working,
    notes: project.keyDecisions,
    href: project.githubUrl,
    hrefLabel: "Смотреть код ↗",
    poster: "radar" as const,
  })),
];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

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

function ProjectPoster({ item, index }: { item: ShowcaseItem; index: number }) {
  if (item.poster === "systems") {
    return (
      <div className={`${styles.poster} ${styles.systemsPoster}`} aria-hidden="true">
        <div className={styles.posterChrome}>
          <span>system / map</span>
          <span>0{index + 1}</span>
        </div>

        <div className={styles.systemWindow}>
          <div className={styles.systemSidebar}>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className={styles.systemMain}>
            <div className={styles.systemToolbar}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.systemCards}>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className={styles.systemFlow}>
          <span>MFE</span>
          <i>→</i>
          <span>BFF</span>
          <i>→</i>
          <span>REST / WS</span>
        </div>
      </div>
    );
  }

  if (item.poster === "route") {
    return (
      <div className={`${styles.poster} ${styles.routePoster}`} aria-hidden="true">
        <div className={styles.posterChrome}>
          <span>concept / route</span>
          <span>0{index + 1}</span>
        </div>

        <div className={styles.routeCanvas}>
          <div className={styles.routeLine} />
          <span className={`${styles.routeStop} ${styles.stopOne}`}>Экскурсии</span>
          <span className={`${styles.routeStop} ${styles.stopTwo}`}>Формы</span>
          <span className={`${styles.routeStop} ${styles.stopThree}`}>API</span>
          <span className={`${styles.routeStop} ${styles.stopFour}`}>Запуск</span>

          <div className={styles.routeTicket}>
            <small>commercial web</small>
            <strong>Москва</strong>
            <span>React / TypeScript</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.poster} ${styles.radarPoster}`} aria-hidden="true">
      <div className={styles.posterChrome}>
        <span>product / prototype</span>
        <span>0{index + 1}</span>
      </div>

      <div className={styles.radarCanvas}>
        <div className={styles.radarRings}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.radarSweep} />

        <div className={styles.vacancyCard}>
          <small>frontend / remote</small>
          <strong>React Developer</strong>
          <div>
            <span>TypeScript</span>
            <span>React</span>
            <span>API</span>
          </div>
        </div>

        <div className={styles.radarPipeline}>
          <span>BOT</span>
          <i>→</i>
          <span>FILTER</span>
          <i>→</i>
          <span>MINI APP</span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const compactLayout = useMediaQuery("(max-width: 900px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene || compactLayout || reducedMotion) {
      return;
    }

    let frameId = 0;

    const updateScene = () => {
      frameId = 0;

      const rect = scene.getBoundingClientRect();
      const travel = Math.max(scene.offsetHeight - window.innerHeight, 1);
      const progress = clamp01(-rect.top / travel);
      const nextIndex = Math.min(
        showcaseItems.length - 1,
        Math.floor(progress * showcaseItems.length),
      );

      scene.style.setProperty("--showcase-progress", progress.toFixed(4));
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = requestAnimationFrame(updateScene);
    };

    updateScene();
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

  const scrollToProject = (index: number) => {
    const scene = sceneRef.current;

    if (!scene || compactLayout) {
      return;
    }

    const sceneTop = window.scrollY + scene.getBoundingClientRect().top;
    const travel = Math.max(scene.offsetHeight - window.innerHeight, 1);
    const progress =
      showcaseItems.length === 1 ? 0 : index / (showcaseItems.length - 1);

    window.scrollTo({
      top: sceneTop + travel * progress,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id="projects" className={styles.projects}>
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title="Работы"
        description="Не галерея скриншотов, а три разных типа задач: продуктовая разработка, коммерческий запуск и собственный эксперимент."
      />

      <div ref={sceneRef} className={styles.showcaseScene}>
        <div className={styles.showcaseStage}>
          <aside className={styles.selector} aria-label="Выбрать проект">
            <div className={styles.selectorIntro}>
              <span>selected / 03</span>
              <p>Скролл переключает проекты, сцена остаётся на месте.</p>
            </div>

            <ol className={styles.selectorList}>
              {showcaseItems.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`${styles.selectorButton} ${
                      index === activeIndex ? styles.selectorButtonActive : ""
                    }`}
                    onClick={() => scrollToProject(index)}
                    aria-pressed={index === activeIndex}
                  >
                    <span>0{index + 1}</span>
                    <strong>{item.title}</strong>
                  </button>
                </li>
              ))}
            </ol>

            <div className={styles.sceneProgress} aria-hidden="true">
              <span className={styles.sceneProgressValue} />
            </div>
          </aside>

          <div className={styles.panelViewport}>
            {showcaseItems.map((item, index) => {
              const active = index === activeIndex;

              return (
                <article
                  key={item.id}
                  className={`${styles.panel} ${active ? styles.panelActive : ""}`}
                  aria-hidden={!compactLayout && !active}
                >
                  <div className={styles.panelCopy}>
                    <div className={styles.panelTopline}>
                      <span>{item.category}</span>
                      <span>{item.type}</span>
                    </div>

                    <h3 className={styles.projectTitle}>{item.title}</h3>
                    <p className={styles.projectDescription}>{item.description}</p>

                    <div className={styles.caseGrid}>
                      <div>
                        <h4>{item.primaryLabel}</h4>
                        <p>{item.primaryText}</p>
                      </div>
                      <div>
                        <h4>{item.secondaryLabel}</h4>
                        <p>{item.secondaryText}</p>
                      </div>
                    </div>

                    <ul className={styles.noteList}>
                      {item.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>

                    <div className={styles.panelFooter}>
                      <ul className={styles.tagList} aria-label="Технологии и готовые части">
                        {item.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>

                      {item.href && item.hrefLabel && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projectLink}
                          tabIndex={!compactLayout && !active ? -1 : 0}
                        >
                          {item.hrefLabel}
                        </a>
                      )}
                    </div>
                  </div>

                  <ProjectPoster item={item} index={index} />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
