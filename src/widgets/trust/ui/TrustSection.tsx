import styles from "./TrustSection.module.css";

const PROOF_POINTS = [
  "2024–2025 · SkillStaff / Лемана ПРО",
  "Коммерческий React / TypeScript",
  "B2B / CRM / HR",
  "REST API · BFF · WebSocket",
  "Legacy · code review · releases",
];

export function TrustSection() {
  return (
    <div className={styles.trust} aria-label="Ключевой коммерческий опыт">
      {PROOF_POINTS.map((point) => (
        <span key={point} className={styles.point}>
          <span className={styles.dot} aria-hidden="true" />
          {point}
        </span>
      ))}
    </div>
  );
}
