export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  context: string;
  responsibilities: string[];
  technicalTasks: string[];
  result: string;
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "2024 — 2025",
    role: "Frontend-разработчик",
    company: "SkillStaff / проект «Лемана ПРО»",
    context:
      "B2B/CRM-, HR- и административные системы в составе крупного продукта.",
    responsibilities: [
      "Разрабатывал микрофронтенды для B2B/CRM-, HR- и административных систем",
      "Создавал формы, карточки, поиск, фильтрацию и условное отображение данных",
      "Интегрировал REST API и BFF",
      "Реализовал клиентскую часть real-time чата через WebSocket",
    ],
    technicalTasks: [
      "Работа с legacy-кодом",
      "Storybook",
      "SonarQube",
      "Code review",
      "Тестирование и релизы",
    ],
    result:
      "Поддерживал и развивал существующий продукт, внедрял новые фичи и улучшал качество кода.",
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "REST API",
      "WebSocket",
      "Storybook",
    ],
  },
  {
    period: "2023 — 2024",
    role: "Frontend-разработчик",
    company: "Московское экскурсионное бюро",
    context: "Коммерческий сайт экскурсионного бюро.",
    responsibilities: [
      "Разрабатывал и поддерживал коммерческий сайт mskburo.ru",
      "Создавал страницы, компоненты, формы и интерактивные элементы",
      "Работал с API и данными",
      "Исправлял ошибки и сопровождал проект после запуска",
    ],
    technicalTasks: [
      "Адаптивная вёрстка",
      "Интеграция с API",
      "Оптимизация производительности",
    ],
    result: "Запустил и сопровождал коммерческий сайт после релиза.",
    stack: ["React", "TypeScript", "HTML & CSS", "REST API"],
  },
  {
    period: "2021 — 2023",
    role: "Frontend-разработчик, верстальщик",
    company: "Фриланс",
    context: "Лендинги, сайты-визитки и небольшие интерфейсы.",
    responsibilities: [
      "Начал карьеру с адаптивной вёрстки лендингов, сайтов-визиток и небольших интерфейсов",
      "Выполнял заказы и доработки на разных площадках",
    ],
    technicalTasks: ["Адаптивная вёрстка", "Интерактивные элементы"],
    result:
      "Получил практику работы с реальными заказчиками, адаптивной вёрсткой и JavaScript-интерактивом.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
];
