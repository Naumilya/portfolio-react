import { useEffect, useState, type FormEvent } from "react";

import { experience } from "@/shared/config/experience";
import { personalProjects } from "@/shared/config/projects";
import { siteConfig } from "@/shared/config/site";

import { askDuck } from "../api/askDuck";
import styles from "./DuckAssistant.module.css";

type AnswerKey = "websocket" | "experience" | "jobradar" | "contact";
type AnswerSource = "local" | "ai";

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

const aiContext = {
  site: {
    name: siteConfig.name,
    role: siteConfig.role,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    email: siteConfig.email,
    phone: siteConfig.phone,
    telegram: siteConfig.telegram,
    github: siteConfig.github,
  },
  experience,
  projects: personalProjects,
};

function getFallbackAnswer(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("websocket") || normalized.includes("вебсокет")) {
    return answers.websocket;
  }

  if (
    normalized.includes("jobradar") ||
    normalized.includes("ваканс") ||
    normalized.includes("проект")
  ) {
    return answers.jobradar;
  }

  if (
    normalized.includes("контакт") ||
    normalized.includes("связ") ||
    normalized.includes("telegram") ||
    normalized.includes("email") ||
    normalized.includes("почт")
  ) {
    return answers.contact;
  }

  if (
    normalized.includes("опыт") ||
    normalized.includes("лемана") ||
    normalized.includes("skillstaff") ||
    normalized.includes("работал")
  ) {
    return answers.experience;
  }

  return "AI сейчас недоступен. Я могу локально ответить про коммерческий опыт, WebSocket, JobRadar и контакты — выбери готовый вопрос выше.";
}

export function DuckAssistant() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState<AnswerKey | null>(null);
  const [answer, setAnswer] = useState(
    "Выбери готовый вопрос или спроси что-нибудь про портфолио.",
  );
  const [answerSource, setAnswerSource] = useState<AnswerSource>("local");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const showLocalAnswer = (key: AnswerKey) => {
    setActiveAnswer(key);
    setAnswer(answers[key]);
    setAnswerSource("local");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const question = message.trim();
    if (!question || isLoading) return;

    setActiveAnswer(null);
    setIsLoading(true);
    setAnswer("Утка думает…");

    try {
      const aiAnswer = await askDuck(question, aiContext);
      setAnswer(aiAnswer);
      setAnswerSource("ai");
      setMessage("");
    } catch {
      setAnswer(getFallbackAnswer(question));
      setAnswerSource("local");
    } finally {
      setIsLoading(false);
    }
  };

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
            Готовые ответы работают всегда. Свободный вопрос сначала попробует AI,
            а при ошибке автоматически переключится на локальный fallback.
          </p>

          <div className={styles.questions} aria-label="Готовые вопросы">
            {questions.map((question) => (
              <button
                key={question.key}
                type="button"
                className={`${styles.question} ${activeAnswer === question.key ? styles.questionActive : ""}`}
                onClick={() => showLocalAnswer(question.key)}
              >
                {question.label}
              </button>
            ))}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={280}
              placeholder="Например: с чем работал на Лемана ПРО?"
              aria-label="Вопрос Duck-помощнику"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={styles.send}
              disabled={isLoading || !message.trim()}
            >
              {isLoading ? "…" : "Спросить"}
            </button>
          </form>

          <div className={styles.answer} aria-live="polite">
            <span className={styles.answerSource}>
              {answerSource === "ai" ? "AI RESPONSE" : "LOCAL FALLBACK"}
            </span>
            {answer}
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
