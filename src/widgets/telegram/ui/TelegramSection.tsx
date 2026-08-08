import { telegramChannel } from "@/shared/config/telegram";
import { useReveal } from "@/shared/lib/useReveal";

import styles from "./TelegramSection.module.css";

export function TelegramSection() {
  const sectionRef = useReveal<HTMLElement>();
  const postsRef = useReveal<HTMLDivElement>();
  const [mainPost, ...secondaryPosts] = telegramChannel.posts;

  return (
    <section
      id="telegram"
      ref={sectionRef}
      className={`${styles.telegram} reveal`}
    >
      <div className={styles.header}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Пишу ещё и в Telegram</h2>
          <p className={styles.description}>{telegramChannel.description}</p>
          <a
            href={telegramChannel.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            {telegramChannel.cta}
          </a>
        </div>
      </div>

      {mainPost && (
        <div className={styles.preview} ref={postsRef}>
          <a
            href={mainPost.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mainPost}
            aria-label="Открыть пост в Telegram"
          >
            <div className={styles.postHeader}>
              <span className={styles.avatar} aria-hidden="true">
                🦆
              </span>
              <div className={styles.postMeta}>
                <span className={styles.channelName}>{telegramChannel.name}</span>
                <span className={styles.postDate}>{mainPost.date}</span>
              </div>
            </div>
            <p className={styles.postText}>{mainPost.text}</p>
          </a>

          <div className={styles.secondaryPosts}>
            {secondaryPosts.map((post, index) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryPost}
                aria-label="Открыть пост в Telegram"
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                <div className={styles.postHeader}>
                  <div className={styles.postMeta}>
                    <span className={styles.channelName}>
                      {telegramChannel.name}
                    </span>
                    <span className={styles.postDate}>{post.date}</span>
                  </div>
                </div>
                <p className={styles.postText}>{post.text}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
