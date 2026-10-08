import type { Project } from "@/lib/api/types";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(28px,4vw,44px)]">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}

export function ProjectGridSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(28px,4vw,44px)]" aria-busy="true" aria-label="Loading projects">
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <div className="skeleton aspect-[4/3.2] rounded-[10px]" />
          <div className="skeleton mt-4 h-4 w-3/4" />
          <div className="skeleton mt-2 h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
