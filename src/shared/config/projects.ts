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
      "Telegram Mini App для поиска и разбора вакансий: лента, фильтры и быстрый просмотр подходящих позиций.",
    problem:
      "Сократить ручной поиск вакансий по разным источникам и быстрее отсеивать нерелевантные позиции.",
    architecture:
      "Node.js + TypeScript для бота и работы с данными, Vite + React + TypeScript для Telegram Mini App.",
    keyDecisions: [
      "Telegram Mini App как основной интерфейс",
      "Разделение bot/server и web-клиента",
      "Фильтрация вакансий до показа пользователю",
    ],
    challenges: [
      "Ограничения и изменения внешних API вакансий",
      "Работа с Telegram Bot API и сетевыми ограничениями",
    ],
    working: [
      "Локальный Telegram-бот",
      "React-интерфейс Mini App",
      "Прототип ленты вакансий на тестовых данных",
    ],
    roadmap: [
      "Подключить устойчивые источники вакансий",
      "Доработать фильтры и хранение пользовательских настроек",
      "Подготовить публичную демо-версию",
    ],
    githubUrl: "https://github.com/Naumilya/JobRadar",
  },
];
