import { siteConfig } from "@/shared/config/site";
import { useReveal } from "@/shared/lib/useReveal";
import { SectionHeading } from "@/shared/ui/SectionHeading";

import styles from "./ContactsSection.module.css";

export function ContactsSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className={`${styles.contacts} reveal`}
    >
      <SectionHeading
        index="06"
        eyebrow="Контакты"
        title="Связаться"
        description="Рассматриваю frontend-позиции и продуктовые команды, где важны качество интерфейса и инженерный контекст."
      />

      <div className={styles.content}>
        <p className={styles.statement}>
          Если мой опыт подходит вашей команде — напишите. Быстрее всего отвечаю в Telegram.
        </p>

        <div className={styles.contactPanel}>
          <a
            href={siteConfig.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryBtn}
          >
            Написать в Telegram ↗
          </a>

          <a href={`mailto:${siteConfig.email}`} className={styles.emailLink}>
            {siteConfig.email}
          </a>

          <div className={styles.links}>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
