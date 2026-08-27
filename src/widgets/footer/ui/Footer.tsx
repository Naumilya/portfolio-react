import { useState } from "react";

import { siteConfig } from "@/shared/config/site";

import styles from "./Footer.module.css";

const quotes = [
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Simplicity is prerequisite for reliability. — Edsger W. Dijkstra",
  "Premature optimization is the root of all evil. — Donald Knuth",
  "Programs must be written for people to read. — Harold Abelson & Gerald Jay Sussman",
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const handleFortuneClick = () => {
    setCurrentIndex((previous) => (previous + 1) % quotes.length);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.copy}>
          © {year} {siteConfig.name}
        </span>
        {currentIndex !== -1 && (
          <span className={styles.quote} aria-live="polite">
            {quotes[currentIndex]}
          </span>
        )}
      </div>

      <div className={styles.right}>
        <button
          type="button"
          onClick={handleFortuneClick}
          className={styles.fortuneButton}
          aria-label="Показать следующую цитату разработчика"
        >
          $ fortune
        </button>
        <span className={styles.divider} aria-hidden="true" />
        <a href="#site-architecture" className={styles.link}>
          Как сделан сайт
        </a>
        <span className={styles.divider} aria-hidden="true" />
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub ↗
        </a>
        <span className={styles.divider} aria-hidden="true" />
        <a
          href={siteConfig.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Telegram ↗
        </a>
      </div>
    </footer>
  );
}
