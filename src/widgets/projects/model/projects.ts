export interface Project {
  id: string;
  title: string;
  description: string;
  contribution: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export const projects: Project[] = [
  {
    id: "lemanapro",
    title: "Лемана ПРО",
    description:
      "Крупный проект по разработке микрофронтендов для B2B/CRM-, HR- и административных систем.",
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
    image: "",
    liveUrl: "https://lemanapro.ru/",
  },
  {
    id: "mskburo",
    title: "Московское экскурсионное бюро",
    description:
      "Коммерческий сайт экскурсионного бюро с презентацией экскурсий и услуг компании.",
    contribution:
      "Разрабатывал и поддерживал сайт mskburo.ru. Создавал страницы, компоненты, формы и интерактивные элементы. Работал с API и данными, исправлял ошибки и сопровождал проект после запуска.",
    stack: ["React", "TypeScript", "HTML & CSS", "REST API"],
    image: "",
    liveUrl: "https://mskburo.ru/",
  },
];
