import { ArrowUpRight, Calendar, FileText, GithubIcon, Tag } from "@/components/ui/icons";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Project } from "@/lib/api/types";
import { projectStatusLabel } from "@/lib/format";

export const isCurrent = (p: Project) => p.status === "in_progress" || p.status === "active";

/** Period, category and status with icons. */
export function ProjectFacts({ project, onNight = false }: { project: Project; onNight?: boolean }) {
  const tone = onNight ? "text-night-muted" : "text-muted";
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs ${tone}`}>
      {project.period && (
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={14} aria-hidden="true" /> {project.period}
        </span>
      )}
      {project.category && (
        <span className="inline-flex items-center gap-1.5">
          <Tag size={14} aria-hidden="true" /> {project.category}
        </span>
      )}
      <StatusBadge label={projectStatusLabel[project.status]} tone={isCurrent(project) ? "current" : "neutral"} onNight={onNight} />
    </div>
  );
}

/** External links that exist for a project: source, paper, demo. */
export function ProjectLinks({ project, size = "md" }: { project: Project; size?: "sm" | "md" }) {
  const links = [
    project.repository_url && { href: project.repository_url, label: "Source", icon: <GithubIcon size={16} /> },
    project.paper_url && { href: project.paper_url, label: "Paper", icon: <FileText size={16} aria-hidden="true" /> },
    project.demo_url && { href: project.demo_url, label: "Live demo", icon: <ArrowUpRight size={16} aria-hidden="true" /> },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className={`btn btn-outline ${size === "sm" ? "px-3 py-2 text-[13px]" : ""}`}
          aria-label={`${l.label} for ${project.title} (opens in a new tab)`}
        >
          {l.icon} {l.label} <ArrowUpRight size={14} className="icon-nudge" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
