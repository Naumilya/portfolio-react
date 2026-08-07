import { useEffect, useState } from "react";

import styles from "./PageIntro.module.css";

const ASCII = ["  __", " /  \\", "|    |", " \\__/"];

export function PageIntro() {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(() => {
    if (typeof sessionStorage === "undefined") return false;
    return sessionStorage.getItem("portfolioIntroSeen") === "1";
  });

  useEffect(() => {
    if (done) return;

    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => {
      try {
        sessionStorage.setItem("portfolioIntroSeen", "1");
      } catch {
        // ignore
      }
      setDone(true);
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      className={`${styles.intro} ${visible ? styles.visible : ""}`}
      aria-hidden="true"
    >
      <div className={styles.ascii}>
        {ASCII.map((line, i) => (
          <div
            key={i}
            className={styles.line}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
