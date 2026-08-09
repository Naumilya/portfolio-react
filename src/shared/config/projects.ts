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
