// context/ProjectsContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'; //
import { saveData, loadData } from '../utils/storage'; //
import { projects as initialProjects } from '../data/projects'; //

export type Project = { //
  id: string; //
  name: string; //
  description: string; //
  technologies: string[]; //
  year: number; //
};

type Ctx = { //
  projects: Project[]; //
  addProject: (p: Omit<Project, 'id'>) => void; //
  removeProject: (id: string) => void; //
};

const ProjectsContext = createContext<Ctx | null>(null); //
const STORAGE_KEY = '@projects'; //

export function ProjectsProvider({ children }: { children: React.ReactNode }) { //
  const [projects, setProjects] = useState<Project[]>([]); //
  const [loaded, setLoaded] = useState(false); //

  // Wczytanie danych przy starcie
  useEffect(() => {
    (async () => {
      const stored = await loadData<Project[]>(STORAGE_KEY); //
      setProjects(stored && stored.length > 0 ? stored : initialProjects); //
      setLoaded(true); //
    })();
  }, []);

  // Zapis przy zmianie stanu
  useEffect(() => {
    if (loaded) saveData(STORAGE_KEY, projects); //
  }, [projects, loaded]);

  const addProject = (p: Omit<Project, 'id'>) => { //
    const newProject: Project = { ...p, id: Date.now().toString() }; //
    setProjects(prev => [newProject, ...prev]); //
  };

  const removeProject = (id: string) => { //
    setProjects(prev => prev.filter(p => p.id !== id)); //
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, removeProject }}> {/* */}
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() { //
  const ctx = useContext(ProjectsContext); //
  if (!ctx) throw new Error('useProjects musi byc uzyty w ProjectsProvider'); //
  return ctx; //
}