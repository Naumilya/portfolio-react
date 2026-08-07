import { personalProjects, projects } from "@/shared/config/projects";
import { useReveal } from "@/shared/lib/useReveal";

import styles from "./ProjectsSection.module.css";

export function ProjectsSection() {
  const sectionRef = useReveal<HTMLElement>();
  const personalRef = useReveal<HTMLElement>();

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className={`${styles.projects} reveal`}
      >
        <h2 className={styles.title}>Избранные работы</h2>

        <div className={styles.stack}>
          {projects.map((project) => (
            <article key={project.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardType}>{project.type}</p>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Открыть сайт
                  </a>
                )}
              </div>

              <p className={styles.description}>{project.description}</p>

              <div className={styles.contribution}>
                <h4 className={styles.contributionTitle}>Мой вклад</h4>
                <p>{project.contribution}</p>
              </div>

              <ul className={styles.stackList}>
                {project.stack.map((tech) => (
                  <li key={tech} className={styles.tech}>
                    {tech}
                  </li>
                ))}
              </ul>

              <div className={styles.cardFooter}>
                <span className={styles.caseLink}>Посмотреть кейс →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="own-projects"
        ref={personalRef}
        className={`${styles.projects} reveal`}
      >
        <h2 className={styles.title}>Свои проекты</h2>

        {personalProjects.map((project) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardType}>
                  {project.status === "in-progress"
                    ? "В разработке"
                    : "Запланирован"}
                </p>
              </div>
            </div>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.contribution}>
              <h4 className={styles.contributionTitle}>Статус</h4>
              <p>
                Собственный проект в разработке. Подробности появятся позже.
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
