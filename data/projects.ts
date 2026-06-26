// data/projects.ts

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  year: number;
};

export const projects: Project[] = [
  {
    id: "1",
    name: "Aplikacja Mobilna Portfolio",
    description: "Projekt studencki realizowany w ramach laboratorium programowania mobilnego na iOS.",
    technologies: ["React Native", "TypeScript", "Expo Router"],
    year: 2026
  },
  {
    id: "2",
    name: "System Rezerwacji Miejsc",
    description: "Aplikacja webowo-mobilna ułatwiająca rezerwację sal lekcyjnych i laboratoryjnych na uczelni.",
    technologies: ["React", "Node.js", "MongoDB"],
    year: 2025
  }
];