import { setup } from "@/shared/config/setup";
import { useReveal } from "@/shared/lib/useReveal";

import styles from "./SetupSection.module.css";

export function SetupSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="setup" ref={sectionRef} className={`${styles.setup} reveal`}>
      <h2 className={styles.title}>Сетап</h2>

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
