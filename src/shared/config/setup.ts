export interface SetupCategory {
  title: string;
  items: string[];
}

export const setup: SetupCategory[] = [
  {
    title: "Среда",
    items: ["Windows"],
  },
  {
    title: "Стек",
    items: ["React + TypeScript", "Vite"],
  },
  {
    title: "Инструменты",
    items: ["VS Code", "Git / GitHub", "ESLint"],
  },
];
