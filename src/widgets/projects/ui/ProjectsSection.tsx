import { personalProjects, projects } from "@/shared/config/projects";
import { useReveal } from "@/shared/lib/useReveal";
import { SectionHeading } from "@/shared/ui/SectionHeading";

import styles from "./ProjectsSection.module.css";

function CommercialArtwork({ id, index }: { id: string; index: number }) {
  if (id === "lemanapro") {
    return (
      <div className={`${styles.artwork} ${styles.systemArtwork}`} aria-hidden="true">
        <div className={styles.artworkTopline}>
          <span>product system</span>
          <span>0{index + 1}</span>
        </div>

        <div className={styles.browserFrame}>
          <div className={styles.browserBar}>
            <i />
            <i />
            <i />
            <span>internal.product</span>
          </div>
          <div className={styles.browserBody}>
            <aside>
              <span />
              <span />
              <span />
              <span />
            </aside>
            <div className={styles.browserContent}>
              <div className={styles.browserToolbar}>
                <span />
                <span />
              </div>
              <div className={styles.browserCards}>
                <span />
                <span />
                <span />
                <span />
              </div>
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

  return (
    <div className={`${styles.artwork} ${styles.routeArtwork}`} aria-hidden="true">
      <div className={styles.artworkTopline}>
        <span>commercial web</span>
        <span>0{index + 1}</span>
      </div>

      <div className={styles.routeMap}>
        <span className={`${styles.routeNode} ${styles.routeNodeOne}`}>01</span>
        <span className={`${styles.routeNode} ${styles.routeNodeTwo}`}>02</span>
        <span className={`${styles.routeNode} ${styles.routeNodeThree}`}>03</span>
        <div className={styles.routePath} />

        <div className={styles.ticket}>
          <small>route / interface</small>
          <strong>Москва</strong>
          <span>React · TypeScript · API</span>
        </div>
      </div>
    </div>
  );
}

function JobRadarArtwork() {
  return (
    <div className={`${styles.artwork} ${styles.radarArtwork}`} aria-hidden="true">
      <div className={styles.artworkTopline}>
        <span>personal product</span>
        <span>03</span>
      </div>

      <div className={styles.radarField}>
        <div className={styles.radarRings}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.radarSweep} />

        <div className={styles.vacancyCard}>
          <small>remote · frontend</small>
          <strong>React Developer</strong>
          <div>
            <span>React</span>
            <span>TypeScript</span>
            <span>API</span>
          </div>
        </div>

        <div className={styles.radarFlow}>
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
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`${styles.projects} reveal`}
    >
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title="Работы"
        description="Коммерческие продукты и собственная разработка — без выдуманных метрик, только задача, вклад и технический контекст."
      />

      <div className={styles.caseList}>
        {projects.map((project, index) => (
          <article key={project.id} className={styles.caseStudy}>
            <div className={styles.caseCopy}>
              <div className={styles.caseTopline}>
                <span>0{index + 1} / commercial</span>
                <span>{project.type}</span>
              </div>

              <div className={styles.caseHeading}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              <dl className={styles.caseFacts}>
                <div>
                  <dt>Задача</dt>
                  <dd>{project.task}</dd>
                </div>
                <div>
                  <dt>Мой вклад</dt>
                  <dd>{project.contribution}</dd>
                </div>
              </dl>

              <div className={styles.caseFooter}>
                <ul className={styles.stackList} aria-label="Стек проекта">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                    aria-label={`Открыть сайт проекта ${project.title}`}
                  >
                    Открыть проект ↗
                  </a>
                )}
              </div>
            </div>

            <CommercialArtwork id={project.id} index={index} />
          </article>
        ))}
      </div>

      {personalProjects.map((project) => (
        <article id="own-projects" key={project.id} className={styles.personalCase}>
          <div className={styles.personalHeader}>
            <div>
              <span className={styles.personalEyebrow}>03 / personal lab</span>
              <h3>{project.title}</h3>
            </div>
            <span className={styles.statusBadge}>
              {project.status === "in-progress" ? "В разработке" : "Запланирован"}
            </span>
          </div>

          <div className={styles.personalLayout}>
            <div className={styles.personalCopy}>
              <p className={styles.personalLead}>{project.description}</p>

              <dl className={styles.personalFacts}>
                <div>
                  <dt>Зачем</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>Архитектура</dt>
                  <dd>{project.architecture}</dd>
                </div>
              </dl>

              <div className={styles.decisionBlock}>
                <span>Ключевые решения</span>
                <ul>
                  {project.keyDecisions.map((decision) => (
                    <li key={decision}>{decision}</li>
                  ))}
                </ul>
              </div>

              <ul className={styles.stackList} aria-label="Что уже работает">
                {project.working.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                  aria-label={`Открыть GitHub проекта ${project.title}`}
                >
                  Смотреть код на GitHub ↗
                </a>
              )}
            </div>

            <JobRadarArtwork />
          </div>
        </article>
      ))}
    </section>
  );
}
