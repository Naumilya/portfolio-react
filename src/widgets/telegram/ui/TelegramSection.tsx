import { telegramChannel } from "@/shared/config/telegram";
import { useReveal } from "@/shared/lib/useReveal";
import { SectionHeading } from "@/shared/ui/SectionHeading";

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
      <SectionHeading
        index="04"
        eyebrow="Личный канал"
        title="Telegram"
        description={telegramChannel.description}
      />

      <div className={styles.content}>
        <div className={styles.channelCard}>
          <span className={styles.avatar} aria-hidden="true">
            🦆
          </span>
          <div>
            <h3 className={styles.channelName}>{telegramChannel.name}</h3>
            <p className={styles.handle}>{telegramChannel.handle}</p>
          </div>
          <a
            href={telegramChannel.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            {telegramChannel.cta}
          </a>
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
                <span className={styles.postLabel}>Последний пост</span>
                <span className={styles.postDate}>{mainPost.date}</span>
              </div>
              <p className={styles.postText}>{mainPost.text}</p>
              <span className={styles.postAction}>Открыть в Telegram ↗</span>
            </a>

            {secondaryPosts.length > 0 && (
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
                    <span className={styles.postDate}>{post.date}</span>
                    <p className={styles.postText}>{post.text}</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
