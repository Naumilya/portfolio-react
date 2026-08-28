import { useEffect, useState } from "react";

import { experience } from "@/shared/config/experience";
import { personalProjects } from "@/shared/config/projects";
import { siteConfig } from "@/shared/config/site";

import styles from "./DuckAssistant.module.css";

type AnswerKey = "websocket" | "experience" | "jobradar" | "contact";

const websocketExperience = experience.find((item) =>
  item.responsibilities.some((responsibility) =>
    responsibility.toLowerCase().includes("websocket"),
  ),
);

const websocketTask = websocketExperience?.responsibilities.find((responsibility) =>
  responsibility.toLowerCase().includes("websocket"),
);

const jobRadar = personalProjects.find((project) => project.id === "jobradar");

const answers: Record<AnswerKey, string> = {
  websocket: websocketExperience
    ? `${websocketExperience.company}: ${websocketTask ?? "работал с WebSocket"}. Стек проекта: ${websocketExperience.stack.join(", ")}.`
    : "В коммерческом опыте есть работа с WebSocket. Подробности — в секции опыта.",
  experience: experience
    .map((item) => `${item.period} — ${item.company}`)
    .join(" · "),
  jobradar: jobRadar
    ? `${jobRadar.description} Архитектура: ${jobRadar.architecture}`
    : "JobRadar — личный проект. Подробности есть в секции проектов.",
  contact: `Быстрее всего написать в Telegram. Также доступен email ${siteConfig.email} и CV в секции контактов.`,
};

const questions: Array<{ key: AnswerKey; label: string }> = [
  { key: "websocket", label: "Что с WebSocket?" },
  { key: "experience", label: "Коммерческий опыт" },
  { key: "jobradar", label: "Что такое JobRadar?" },
  { key: "contact", label: "Как связаться?" },
];

const quickLinks = [
  { href: "#experience", label: "Опыт" },
  { href: "#projects", label: "Проекты" },
  { href: "#contacts", label: "Контакты" },
] as const;

export function DuckAssistant() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState<AnswerKey | null>(null);

  useEffect(() => {
    const projects = document.getElementById("projects");

    if (!projects || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18 },
    );

    observer.observe(projects);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <aside className={styles.assistant} aria-label="Duck-помощник по портфолио">
      {isOpen && (
        <section
          id="duck-assistant-panel"
          className={styles.panel}
          role="dialog"
          aria-label="Duck-помощник"
        >
          <div className={styles.header}>
            <div>
              <span className={styles.eyebrow}>PORTFOLIO GUIDE</span>
              <h2 className={styles.title}>Спросить утку</h2>
            </div>

            <button
              type="button"
              className={styles.close}
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть помощника"
            >
              ×
            </button>
          </div>

          <p className={styles.intro}>
            Я пока работаю локально, без AI-бэкенда. Но быстро покажу главное по
            портфолио.
          </p>

          <div className={styles.questions} aria-label="Готовые вопросы">
            {questions.map((question) => (
              <button
                key={question.key}
                type="button"
                className={`${styles.question} ${activeAnswer === question.key ? styles.questionActive : ""}`}
                onClick={() => setActiveAnswer(question.key)}
              >
                {question.label}
              </button>
            ))}
          </div>

          <div className={styles.answer} aria-live="polite">
            {activeAnswer
              ? answers[activeAnswer]
              : "Выбери вопрос выше или сразу перейди к нужной секции."}
          </div>

          <nav className={styles.quickLinks} aria-label="Быстрые переходы">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                {link.label} ↗
              </a>
            ))}
          </nav>
        </section>
      )}

      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls="duck-assistant-panel"
        aria-label={isOpen ? "Закрыть Duck-помощника" : "Открыть Duck-помощника"}
        onClick={() => setIsOpen((value) => !value)}
      >
        <svg
          className={styles.duck}
          viewBox="0 0 48 48"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M17.5 7.5c-5.8 0-10.5 4.7-10.5 10.5 0 3.7 1.9 6.9 4.8 8.8C7.7 29 5 33.3 5 38h32c0-5.5-3.5-10.2-8.4-12 2.1-2 3.4-4.8 3.4-8 0-5.8-4.7-10.5-10.5-10.5h-4Z" />
          <path className={styles.beak} d="M30 16.5h13l-7 6h-7.5l1.5-6Z" />
          <circle className={styles.eye} cx="24" cy="14.5" r="1.8" />
        </svg>
        <span className={styles.status} aria-hidden="true" />
      </button>
    </aside>
  );
}
