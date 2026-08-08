export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    title: "Frontend",
    skills: ["React", "Redux Toolkit"],
  },
  {
    title: "Integration",
    skills: ["REST API", "WebSocket"],
  },
  {
    title: "Engineering",
    skills: ["Git", "Vite", "Testing"],
  },
];
