import { skillGroups } from "@/shared/config/skills";
import { useReveal } from "@/shared/lib/useReveal";
import { SectionHeading } from "@/shared/ui/SectionHeading";

import styles from "./AboutSection.module.css";

export function AboutSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="about" ref={sectionRef} className={`${styles.about} reveal`}>
      <SectionHeading index="01" eyebrow="Профиль" title="Обо мне" />

      <div className={styles.grid}>
        <div className={styles.text}>
          <p>
            Разрабатываю frontend для коммерческих продуктов на React и TypeScript: интерфейсы с API, состоянием приложения, real-time данными и существующей кодовой базой.
          </p>
          <p>
            Работал с B2B/CRM-, HR- и административными системами, legacy-кодом, WebSocket, тестированием и релизами. В работе ценю понятные границы компонентов, предсказуемое состояние и код, который можно спокойно развивать дальше.
          </p>
        </div>

        <div className={styles.skills} aria-label="Технологии и навыки">
          {skillGroups.map((group) => (
            <div key={group.title} className={styles.skillGroup}>
              <h3 className={styles.skillGroupTitle}>{group.title}</h3>
              <ul className={styles.skillsList}>
                {group.skills.map((skill) => (
                  <li key={skill} className={styles.skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
