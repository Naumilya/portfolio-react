export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Языки",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    skills: ["React", "Redux Toolkit"],
  },
  {
    title: "Интеграции",
    skills: ["REST API", "WebSocket"],
  },
  {
    title: "Инженерия",
    skills: ["Git", "Vite", "Testing"],
  },
];
