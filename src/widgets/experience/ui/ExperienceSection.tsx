import { experience } from "@/shared/config/experience";
import { useReveal } from "@/shared/lib/useReveal";

import styles from "./ExperienceSection.module.css";

export function ExperienceSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`${styles.experience} reveal`}
    >
      <h2 className={styles.title}>Опыт</h2>

      <div className={styles.timeline}>
        {experience.map((item) => (
          <article key={item.company} className={styles.item}>
            <div className={styles.period}>{item.period}</div>

            <div className={styles.card}>
              <h3 className={styles.role}>{item.role}</h3>
              <div className={styles.company}>{item.company}</div>
              <p className={styles.context}>{item.context}</p>

              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>
                  Моя зона ответственности
                </h4>
                <ul className={styles.list}>
                  {item.responsibilities.map((resp) => (
                    <li key={resp} className={styles.listItem}>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>
                  Ключевые технические задачи
                </h4>
                <ul className={styles.list}>
                  {item.technicalTasks.map((task) => (
                    <li key={task} className={styles.listItem}>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              <p className={styles.result}>{item.result}</p>

              <ul className={styles.stack}>
                {item.stack.map((tech) => (
                  <li key={tech} className={styles.tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
