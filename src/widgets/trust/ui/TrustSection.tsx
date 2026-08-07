import styles from "./TrustSection.module.css";

const PROOF_POINTS = [
  "React / TypeScript",
  "Commercial products",
  "REST / WebSocket",
  "Testing",
  "Git",
];

export function TrustSection() {
  return (
    <div className={styles.trust} aria-label="Ключевые навыки">
      {PROOF_POINTS.map((point) => (
        <span key={point} className={styles.point}>
          <span className={styles.dot} aria-hidden="true" />
          {point}
        </span>
      ))}
    </div>
  );
}
