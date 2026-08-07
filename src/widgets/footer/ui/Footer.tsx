import { siteConfig } from "@/shared/config/site";

import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.copy} aria-hidden="true">
          {"(c)"} {year} {siteConfig.name}
        </span>
      </div>

      <div className={styles.right}>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <span className={styles.divider} aria-hidden="true" />
        <a
          href={siteConfig.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Telegram
        </a>
      </div>
    </footer>
  );
}
