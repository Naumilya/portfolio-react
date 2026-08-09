import { experience } from "@/shared/config/experience";
import { useReveal } from "@/shared/lib/useReveal";
import { SectionHeading } from "@/shared/ui/SectionHeading";

import styles from "./ExperienceSection.module.css";

export function ExperienceSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`${styles.experience} reveal`}
    >
      <SectionHeading
        index="02"
        eyebrow="Коммерческий опыт"
        title="Опыт"
        description="Продуктовая разработка, поддержка существующих систем и работа с интерфейсами, которые живут после релиза."
      />

      <div className={styles.timeline}>
        {experience.map((item, index) => (
          <article key={item.company} className={styles.item}>
            <div className={styles.meta}>
              <span className={styles.order} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.period}>{item.period}</span>
            </div>

            <div className={styles.content}>
              <div className={styles.header}>
                <div>
                  <h3 className={styles.role}>{item.role}</h3>
                  <div className={styles.company}>{item.company}</div>
                </div>
                <p className={styles.context}>{item.context}</p>
              </div>

              <div className={styles.details}>
                <div className={styles.responsibilities}>
                  <h4 className={styles.sectionTitle}>Что делал</h4>
                  <ul className={styles.list}>
                    {item.responsibilities.map((resp) => (
                      <li key={resp} className={styles.listItem}>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className={styles.sectionTitle}>Инженерная среда</h4>
                  <ul className={styles.taskList}>
                    {item.technicalTasks.map((task) => (
                      <li key={task} className={styles.task}>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.footer}>
                <p className={styles.result}>{item.result}</p>

                <ul className={styles.stack} aria-label="Стек">
                  {item.stack.map((tech) => (
                    <li key={tech} className={styles.tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
