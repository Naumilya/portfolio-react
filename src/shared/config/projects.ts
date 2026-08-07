export interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  task: string;
  contribution: string;
  stack: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
}

export interface PersonalProject {
  id: string;
  title: string;
  status: "in-progress" | "planned";
  description: string;
  problem: string;
  architecture: string;
  keyDecisions: string[];
  challenges: string[];
  working: string[];
  roadmap: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "lemanapro",
    title: "Лемана ПРО",
    type: "B2B / CRM / HR системы",
    description:
      "Крупный продукт с микрофронтендами для B2B/CRM-, HR- и административных систем.",
    task: "Разработка и поддержка микрофронтендов в составе крупного продукта.",
    contribution:
      "Создавал формы, карточки, поиск, фильтрацию и условное отображение данных. Интегрировал REST API и BFF, реализовал клиентскую часть real-time чата через WebSocket. Работал с legacy-кодом, Storybook, SonarQube, code review, тестированием и релизами.",
    stack: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "REST API",
      "WebSocket",
      "Storybook",
    ],
    liveUrl: "https://lemanapro.ru/",
  },
  {
    id: "mskburo",
    title: "Московское экскурсионное бюро",
    type: "Корпоративный сайт",
    description:
      "Коммерческий сайт экскурсионного бюро с презентацией экскурсий и услуг компании.",
    task: "Разработка и поддержка коммерческого сайта от вёрстки до запуска.",
    contribution:
      "Создавал страницы, компоненты, формы и интерактивные элементы. Работал с API и данными, исправлял ошибки и сопровождал проект после запуска.",
    stack: ["React", "TypeScript", "HTML & CSS", "REST API"],
    liveUrl: "https://mskburo.ru/",
  },
];

export const personalProjects: PersonalProject[] = [
  {
    id: "jobradar",
    title: "JobRadar",
    status: "in-progress",
    description:
      "TODO: добавить описание проекта. Что это, какую проблему решает.",
    problem: "TODO: какую проблему решает проект.",
    architecture: "TODO: описать архитектуру.",
    keyDecisions: ["TODO: ключевые решения"],
    challenges: ["TODO: проблемы и как решались"],
    working: ["TODO: что уже работает"],
    roadmap: ["TODO: план развития"],
  },
];
