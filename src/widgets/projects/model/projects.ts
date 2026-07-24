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
    id: "mskburo",
    title: "Сайт Московского конструкторского бюро",
    description: "",
    contribution: "",
    stack: [],
    image: "",
    liveUrl: "https://mskburo.ru/",
  },
  {
    id: "lemanapro",
    title: "Лемана ПРО",
    description: "",
    contribution: "",
    stack: [],
    image: "",
    liveUrl: "https://lemanapro.ru/",
  },
];
