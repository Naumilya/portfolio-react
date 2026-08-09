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
        description="Коротко о том, где работал, что делал руками и в каком инженерном контексте."
      />

      <div className={styles.timeline}>
        {experience.map((item, index) => {
          const environment = Array.from(
            new Set([...item.stack, ...item.technicalTasks]),
          );

          return (
            <article key={item.company} className={styles.item}>
              <div className={styles.meta}>
                <span className={styles.order} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.period}>{item.period}</span>
              </div>

              <div className={styles.content}>
                <div className={styles.header}>
                  <h3 className={styles.companyTitle}>{item.company}</h3>
                  <p className={styles.context}>{item.context}</p>
                </div>

                <ul className={styles.highlights}>
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>

                <div className={styles.footer}>
                  <p className={styles.result}>{item.result}</p>

                  <div className={styles.environment}>
                    <span className={styles.environmentLabel}>Стек и процесс</span>
                    <ul className={styles.stack} aria-label="Стек и процессы">
                      {environment.map((detail) => (
                        <li key={detail} className={styles.tech}>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
