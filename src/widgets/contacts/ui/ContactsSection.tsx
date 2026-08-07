import { siteConfig } from "@/shared/config/site";
import { useReveal } from "@/shared/lib/useReveal";

import styles from "./ContactsSection.module.css";

export function ContactsSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className={`${styles.contacts} reveal`}
    >
      <div className={styles.textContent}>
        <h2 className={styles.title}>Связаться</h2>
        <p className={styles.subtitle}>
          Есть проект, работа или просто интересная идея?
        </p>
        <p className={styles.supporting}>
          Пиши — открыт к предложениям и новым продуктам.
        </p>
      </div>

      <div className={styles.actions}>
        <a
          href={siteConfig.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryBtn}
        >
          Написать в Telegram
        </a>
        <a href={`mailto:${siteConfig.email}`} className={styles.secondaryBtn}>
          Написать на почту
        </a>
      </div>

      <div className={styles.links}>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Instagram
        </a>
      </div>
    </section>
  );
}
