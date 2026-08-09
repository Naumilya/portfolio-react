import { skillGroups } from "@/shared/config/skills";
import { useReveal } from "@/shared/lib/useReveal";
import { SectionHeading } from "@/shared/ui/SectionHeading";

import styles from "./AboutSection.module.css";

export function AboutSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="about" ref={sectionRef} className={`${styles.about} reveal`}>
      <SectionHeading
        index="01"
        eyebrow="Профиль"
        title="Как работаю"
        description="Коротко о подходе к продуктовой разработке и технологиях, с которыми работаю."
      />

      <div className={styles.grid}>
        <div className={styles.profile}>
          <p className={styles.lead}>
            Работаю внутри существующих продуктов: разбираюсь в чужом коде,
            интеграциях и ограничениях системы, а затем довожу интерфейс до
            предсказуемого состояния для пользователя и команды.
          </p>

          <p className={styles.secondaryText}>
            Мне близки задачи, где кроме React-компонента нужно понять данные,
            API, состояние приложения, real-time поведение и то, как изменение
            пройдёт через review, тестирование и релиз.
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
