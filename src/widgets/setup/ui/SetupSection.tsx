import { setup } from "@/shared/config/setup";
import { useReveal } from "@/shared/lib/useReveal";
import { SectionHeading } from "@/shared/ui/SectionHeading";

import styles from "./SetupSection.module.css";

const PORTFOLIO_ARCHITECTURE = [
  {
    index: "01",
    title: "React + TypeScript + Vite",
    description:
      "UI собран на React и TypeScript, а Vite отвечает за dev-сервер и production build.",
  },
  {
    index: "02",
    title: "3D без блокировки первого экрана",
    description:
      "Three.js подключён через React Three Fiber и Drei. Сцена с уткой загружается лениво через lazy + Suspense.",
  },
  {
    index: "03",
    title: "Scrollspy без мигания",
    description:
      "Активный пункт считается относительно sticky-header, а anchor-scroll блокирует промежуточные active-состояния.",
  },
  {
    index: "04",
    title: "Motion с fallback",
    description:
      "Интерактивы учитывают prefers-reduced-motion, чтобы анимации не были обязательным условием работы интерфейса.",
  },
  {
    index: "05",
    title: "CI перед публикацией",
    description:
      "GitHub Actions запускает npm ci, lint и production build на push и pull request в main.",
  },
] as const;

export function SetupSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="setup" ref={sectionRef} className={`${styles.setup} reveal`}>
      <SectionHeading
        index="05"
        eyebrow="Рабочее место"
        title="Сетап"
        description="Железо, периферия и инструменты, которыми пользуюсь в работе и своих проектах."
      />

      <div className={styles.grid}>
        {setup.map((category) => (
          <div key={category.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{category.title}</h3>
            <ul className={styles.list}>
              {category.items.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div id="site-architecture" className={styles.caseStudy}>
        <div className={styles.caseStudyHeader}>
          <div>
            <span className={styles.caseStudyEyebrow}>$ architecture</span>
            <h3 className={styles.caseStudyTitle}>Как сделан этот сайт</h3>
            <p className={styles.caseStudyDescription}>
              Пять решений, которые можно проверить прямо в исходниках портфолио.
            </p>
          </div>

          <a
            href="https://github.com/Naumilya/portfolio-react"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.caseStudyLink}
          >
            Исходники на GitHub ↗
          </a>
        </div>

        <ol className={styles.architectureGrid}>
          {PORTFOLIO_ARCHITECTURE.map((item) => (
            <li key={item.index} className={styles.architectureCard}>
              <span className={styles.architectureIndex}>{item.index}</span>
              <h4 className={styles.architectureTitle}>{item.title}</h4>
              <p className={styles.architectureDescription}>
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
