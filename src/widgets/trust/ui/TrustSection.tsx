import styles from "./TrustSection.module.css";

const PROOF_POINTS = [
  "Коммерческий React / TypeScript",
  "Микрофронтенды",
  "REST / BFF / WebSocket",
  "Legacy • code review • releases",
  "40+ freelance-заказов",
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
