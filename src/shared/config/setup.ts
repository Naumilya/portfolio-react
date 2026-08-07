export interface SetupCategory {
  title: string;
  items: string[];
}

export const setup: SetupCategory[] = [
  {
    title: "Оборудование",
    items: [
      'MacBook Pro 14"',
      'Монитор 27" 4K',
      "Механическая клавиатура",
      "Мышь Logitech MX Master",
    ],
  },
  {
    title: "ПО",
    items: ["VS Code", "Figma", "iTerm2", "Docker Desktop"],
  },
  {
    title: "Инструменты",
    items: ["Git / GitHub", "ESLint / Prettier", "Vite", "Chrome DevTools"],
  },
];
