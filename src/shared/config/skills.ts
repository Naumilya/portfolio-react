export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Core",
    skills: ["React", "TypeScript", "JavaScript"],
  },
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "Redux Toolkit"],
  },
  {
    title: "Data / integration",
    skills: ["REST API", "WebSocket"],
  },
  {
    title: "Workflow",
    skills: ["Git", "Vite", "Testing"],
  },
];
