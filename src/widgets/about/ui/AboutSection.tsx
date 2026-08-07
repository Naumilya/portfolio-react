import { skillGroups } from "@/shared/config/skills";
import { useReveal } from "@/shared/lib/useReveal";

import styles from "./AboutSection.module.css";

export function AboutSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="about" ref={sectionRef} className={`${styles.about} reveal`}>
      <h2 className={styles.title}>Обо мне</h2>

      <div className={styles.grid}>
        <div className={styles.text}>
          <p>
            Мне нравится frontend, где недостаточно просто сверстать макет:
            интеграции, состояние приложения, real-time данные, архитектура
            компонентов и работа с существующим продуктом.
          </p>
          <p>
            Сейчас углубляюсь в JavaScript, React и архитектуру и параллельно
            развиваю собственные проекты. Мне важно, чтобы интерфейс оставался
            понятным не только пользователю, но и разработчику, который откроет
            код через полгода.
          </p>
        </div>

        <div className={styles.skills}>
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
