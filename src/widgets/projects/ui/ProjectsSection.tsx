import { personalProjects } from "@/shared/config/projects";
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
        eyebrow="Личные проекты"
        title="Свои проекты"
        description="Собственные продукты, где я отвечаю за решения целиком — от идеи и архитектуры до интерфейса и кода."
      />

      <div id="own-projects" className={styles.projectList}>
        {personalProjects.map((project) => (
          <article key={project.id} className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <div>
                <span className={styles.kicker}>Telegram Mini App</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
              </div>

              <span className={styles.statusBadge}>
                {project.status === "in-progress" ? "В разработке" : "Запланирован"}
              </span>
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.caseGrid}>
              <div className={styles.caseBlock}>
                <h4 className={styles.caseTitle}>Проблема</h4>
                <p>{project.problem}</p>
              </div>

              <div className={styles.caseBlock}>
                <h4 className={styles.caseTitle}>Архитектура</h4>
                <p>{project.architecture}</p>
              </div>

              <div className={styles.caseBlock}>
                <h4 className={styles.caseTitle}>Решения</h4>
                <ul className={styles.decisionList}>
                  {project.keyDecisions.map((decision) => (
                    <li key={decision}>{decision}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.workingBlock}>
              <h4 className={styles.caseTitle}>Уже работает</h4>
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
