import { useEffect, useState } from "react";

import styles from "./PageIntro.module.css";

const ASCII = ["  __", " /  \\", "|    |", " \\__/"];

function hasSeenIntro() {
  if (typeof sessionStorage === "undefined") {
    return false;
  }

  return sessionStorage.getItem("portfolioIntroSeen") === "1";
}

export function PageIntro() {
  const [done, setDone] = useState(hasSeenIntro);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (done) {
      return;
    }

    const leaveTimerId = window.setTimeout(() => {
      setLeaving(true);
    }, 380);

    const doneTimerId = window.setTimeout(() => {
      try {
        sessionStorage.setItem("portfolioIntroSeen", "1");
      } catch {
        // sessionStorage can be unavailable in strict privacy modes.
      }

      setDone(true);
    }, 620);

    return () => {
      window.clearTimeout(leaveTimerId);
      window.clearTimeout(doneTimerId);
    };
  }, [done]);

  if (done) {
    return null;
  }

  return (
    <div
      className={`${styles.intro} ${leaving ? styles.leaving : ""}`}
      aria-hidden="true"
    >
      <div className={styles.ascii}>
        {ASCII.map((line, index) => (
          <div
            key={line}
            className={styles.line}
            style={{ animationDelay: `${index * 45}ms` }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
