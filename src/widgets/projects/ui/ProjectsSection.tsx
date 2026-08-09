import { personalProjects, projects } from "@/shared/config/projects";
import { useReveal } from "@/shared/lib/useReveal";
import { SectionHeading } from "@/shared/ui/SectionHeading";

import styles from "./ProjectsSection.module.css";

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
        description="Коммерческие кейсы и собственный продукт: контекст, мой вклад и технические решения без выдуманных метрик."
      />

      <div className={styles.projectList}>
        {projects.map((project, index) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.cardTopline}>
              <span className={styles.projectIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")} / commercial
              </span>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  aria-label={`Открыть сайт проекта ${project.title}`}
                >
                  Открыть сайт ↗
                </a>
              )}
            </div>

            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardType}>{project.type}</p>
              </div>
              <p className={styles.description}>{project.description}</p>
            </div>

            <div className={styles.caseGrid}>
              <div className={styles.caseBlock}>
                <h4 className={styles.caseTitle}>Мой вклад</h4>
                <p>{project.contribution}</p>
              </div>

              <div className={styles.caseBlock}>
                <h4 className={styles.caseTitle}>Задача</h4>
                <p>{project.task}</p>
              </div>
            </div>

            <ul className={styles.stackList} aria-label="Стек проекта">
              {project.stack.map((tech) => (
                <li key={tech} className={styles.tech}>
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div id="own-projects" className={styles.personalSection}>
        <div className={styles.personalIntro}>
          <span className={styles.personalEyebrow}>Lab / personal</span>
          <h3 className={styles.personalTitle}>JobRadar</h3>
          <p>
            Свой продукт, на котором можно показать решения целиком: от идеи и архитектуры до интерфейса и ограничений внешних API.
          </p>
        </div>

        {personalProjects.map((project) => (
          <article key={project.id} className={styles.personalCard}>
            <div className={styles.personalHeader}>
              <div>
                <span className={styles.personalKicker}>Telegram Mini App</span>
                <h4 className={styles.personalProjectTitle}>{project.title}</h4>
              </div>
              <span className={styles.statusBadge}>
                {project.status === "in-progress" ? "В разработке" : "Запланирован"}
              </span>
            </div>

            <p className={styles.personalDescription}>{project.description}</p>

            <div className={styles.personalGrid}>
              <div className={styles.caseBlock}>
                <h5 className={styles.caseTitle}>Проблема</h5>
                <p>{project.problem}</p>
              </div>

              <div className={styles.caseBlock}>
                <h5 className={styles.caseTitle}>Архитектура</h5>
                <p>{project.architecture}</p>
              </div>

              <div className={styles.caseBlock}>
                <h5 className={styles.caseTitle}>Решения</h5>
                <ul className={styles.decisionList}>
                  {project.keyDecisions.map((decision) => (
                    <li key={decision}>{decision}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.workingBlock}>
              <h5 className={styles.caseTitle}>Уже работает</h5>
              <ul className={styles.stackList}>
                {project.working.map((item) => (
                  <li key={item} className={styles.tech}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectAction}
                aria-label={`Открыть GitHub проекта ${project.title}`}
              >
                Смотреть код на GitHub ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
