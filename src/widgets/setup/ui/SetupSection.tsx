import { setup } from "@/shared/config/setup";
import { useReveal } from "@/shared/lib/useReveal";
import { SectionHeading } from "@/shared/ui/SectionHeading";

import styles from "./SetupSection.module.css";

export function SetupSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="setup" ref={sectionRef} className={`${styles.setup} reveal`}>
      <SectionHeading
        index="05"
        eyebrow="Рабочее место"
        title="Сетап"
        description="Железо, периферия и инструменты, которыми пользуюсь в работе и своих проектах."
      />

      <div className={styles.grid}>
        {setup.map((category) => (
          <div key={category.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{category.title}</h3>
            <ul className={styles.list}>
              {category.items.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
