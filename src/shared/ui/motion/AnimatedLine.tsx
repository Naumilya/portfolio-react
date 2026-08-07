import { useReveal } from "@/shared/lib/useReveal";

import styles from "./AnimatedLine.module.css";

interface AnimatedLineProps {
  className?: string;
}

export function AnimatedLine({ className }: AnimatedLineProps) {
  const lineRef = useReveal<HTMLDivElement>();

  return (
    <div
      ref={lineRef}
      className={`${styles.line} ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
