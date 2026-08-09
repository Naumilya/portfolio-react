import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  index: string;
  title: string;
  eyebrow?: string;
  description?: string;
}

export function SectionHeading({
  index,
  title,
  eyebrow,
  description,
}: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <span className={styles.index} aria-hidden="true">
        {index}
      </span>

      <div className={styles.content}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}
