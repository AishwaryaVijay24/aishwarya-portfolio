import Link from "next/link";
import { ViewTransition } from "react";

import { TechList } from "@/components/technology/TechList";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Project } from "@/lib/api/types";
import { projectStatusLabel } from "@/lib/format";
import { NetworkArt, seedFrom } from "./NetworkArt";
import { TiltSurface } from "./TiltSurface";

/** Splits a title so its last word can be set in the expressive display face. */
export function splitTitle(title: string): [string, string] {
  const i = title.trim().lastIndexOf(" ");
  return i === -1 ? ["", title.trim()] : [title.slice(0, i + 1), title.slice(i + 1)];
}

export function ProjectCard({ project }: { project: Project }) {
  const [lead, last] = splitTitle(project.title);
  return (
    <Link href={`/projects/${project.slug}`} className="project-card group block rounded-[10px] no-underline">
      <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
        <div>
          <TiltSurface
            className="on-night relative aspect-[4/3.2] overflow-hidden rounded-[10px] bg-night text-on-night"
            art={<NetworkArt seed={seedFrom(project.slug)} />}
          >
            <div className="grid gap-2 p-[clamp(18px,3vw,28px)]">
              <span className="flex items-center justify-between">
                <span className="label text-[11px] text-lilac">Project</span>
                <span className="card-open label text-[11px] text-night-muted" aria-hidden="true">
                  Open ↗
                </span>
              </span>
              <h3 className="card-title condensed text-[clamp(28px,3.4vw,40px)] leading-none font-semibold tracking-[-0.02em]">
                {lead}
                <em className="display-word text-lilac">{last}</em>
              </h3>
            </div>
          </TiltSurface>
        </div>
      </ViewTransition>
      <div className="mt-4 grid gap-3">
        {project.summary && <p className="max-w-[52ch] text-muted">{project.summary}</p>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TechList items={project.technologies.slice(0, 5)} />
          <StatusBadge label={projectStatusLabel[project.status]} tone={project.status === "in_progress" || project.status === "active" ? "current" : "neutral"} />
        </div>
      </div>
    </Link>
  );
}
