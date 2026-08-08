export interface SetupCategory {
  title: string;
  items: string[];
}

export const setup: SetupCategory[] = [
  {
    title: "Железо",
    items: [
      "Intel Core i5-12400F",
      "NVIDIA GeForce RTX 3060 — 12 GB VRAM",
      "32 GB RAM",
    ],
  },
  {
    title: "Периферия",
    items: [
      "Logitech G Pro Superlight",
      "DEXP 27\"",
      "Dareu A98",
    ],
  },
  {
    title: "Среда",
    items: ["Windows 11", "VS Code"],
  },
  {
    title: "Разработка",
    items: [
      "React + TypeScript",
      "Vite",
      "Git / GitHub",
      "ESLint",
    ],
  },
];
