import { useReveal } from "@/shared/lib/useReveal";

import styles from "./AnimatedSectionTitle.module.css";

interface AnimatedSectionTitleProps {
  children: string;
  as?: "h2" | "h3";
}

export function AnimatedSectionTitle({
  children,
  as = "h2",
}: AnimatedSectionTitleProps) {
  const sectionRef = useReveal<HTMLHeadingElement>();
  const Tag = as;

  return (
    <Tag ref={sectionRef} className={`${styles.title} reveal`}>
      {children}
    </Tag>
  );
}
