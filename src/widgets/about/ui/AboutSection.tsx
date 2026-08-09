import { skillGroups } from "@/shared/config/skills";
import { useReveal } from "@/shared/lib/useReveal";
import { SectionHeading } from "@/shared/ui/SectionHeading";

import styles from "./AboutSection.module.css";

const VALUE_POINTS = [
  {
    title: "Продукт",
    text: "Формы, карточки, поиск, фильтрация, условное отображение и интерфейсы с большим количеством данных.",
  },
  {
    title: "Интеграции",
    text: "REST API, BFF, WebSocket, состояние приложения и клиентская логика вокруг данных.",
  },
  {
    title: "Инженерия",
    text: "Legacy-код, тестирование, Storybook, code review и участие в релизном цикле.",
  },
] as const;

export function AboutSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="about" ref={sectionRef} className={`${styles.about} reveal`}>
      <SectionHeading
        index="01"
        eyebrow="Профиль"
        title="Обо мне"
        description="Не только стек: как я работаю внутри существующего продукта и команды."
      />

      <div className={styles.grid}>
        <div className={styles.profile}>
          <p className={styles.lead}>
            Основной профиль — React и TypeScript в коммерческих продуктах, где нужно не просто собрать экран, а встроиться в API, состояние, архитектуру и процесс релиза.
          </p>

          <p className={styles.secondaryText}>
            Работал с B2B/CRM-, HR- и административными системами, real-time данными и существующей кодовой базой. Стараюсь оставлять после себя понятные компоненты и предсказуемое поведение интерфейса.
          </p>

          <div className={styles.valueGrid} aria-label="Ключевые компетенции">
            {VALUE_POINTS.map((point) => (
              <div key={point.title} className={styles.valueItem}>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
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
