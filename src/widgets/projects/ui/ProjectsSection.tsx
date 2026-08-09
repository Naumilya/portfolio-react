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
        eyebrow="Personal projects"
        title="Свои проекты"
        description="Проекты, где я сам принимаю продуктовые и технические решения — от идеи и архитектуры до интерфейса и кода."
      />

      <div id="own-projects" className={styles.personalSection}>
        <div className={styles.personalIntro}>
          <span className={styles.personalEyebrow}>Independent work</span>
          <h3 className={styles.personalTitle}>От идеи до реализации</h3>
          <p>
            Здесь показываю то, что делаю вне коммерческой работы: собственные
            продукты, эксперименты и решения, за которые отвечаю целиком.
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
