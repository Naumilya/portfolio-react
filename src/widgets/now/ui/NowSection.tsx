import { personalProjects } from "@/shared/config/projects";
import { telegramChannel } from "@/shared/config/telegram";

import styles from "./NowSection.module.css";

function getExcerpt(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= 180) {
    return normalized;
  }

  return `${normalized.slice(0, 177).trimEnd()}…`;
}

export function NowSection() {
  const currentProject =
    personalProjects.find((project) => project.status === "in-progress") ??
    personalProjects[0];
  const latestPost = telegramChannel.posts[0];

  return (
    <section className={styles.now} aria-labelledby="now-title">
      <div className={styles.heading}>
        <span className={styles.prompt}>$ now</span>
        <h2 id="now-title">Сейчас делаю</h2>
        <p>Коротко о том, что сейчас в работе и что обновилось последним.</p>
      </div>

      <div className={styles.items}>
        {currentProject && (
          <a href="#projects" className={styles.item}>
            <div className={styles.itemMeta}>
              <span>В работе</span>
              <span className={styles.status}>active</span>
            </div>
            <strong>{currentProject.title}</strong>
            <p>{currentProject.description}</p>
            <span className={styles.action}>К проекту →</span>
          </a>
        )}

        {latestPost && (
          <a
            href={latestPost.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.item}
          >
            <div className={styles.itemMeta}>
              <span>Последний пост</span>
              <time>{latestPost.date}</time>
            </div>
            <strong>{telegramChannel.name}</strong>
            <p>{getExcerpt(latestPost.text)}</p>
            <span className={styles.action}>Открыть в Telegram ↗</span>
          </a>
        )}
      </div>
    </section>
  );
}
