import Link from "next/link";
import { ViewTransition } from "react";

import { Parallax } from "@/components/motion/Parallax";
import { TechList } from "@/components/technology/TechList";
import { CircleCheck } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/api/types";
import { splitTitle } from "@/lib/text";
import { NetworkArt, seedFrom } from "./NetworkArt";
import { ProjectFacts, ProjectLinks } from "./ProjectMeta";
import { TiltSurface } from "./TiltSurface";

/**
 * Featured project as a large editorial row. Rows alternate sides; the artwork and the
 * text enter from opposite directions and the artwork drifts against the scroll.
 */
export function ProjectSpotlight({ project, index }: { project: Project; index: number }) {
  const [lead, last] = splitTitle(project.title);
  const flip = index % 2 === 1;
  return (
    <article className="grid items-center gap-[clamp(28px,5vw,72px)] lg:grid-cols-12" aria-labelledby={`spot-${project.slug}`}>
      <Reveal from={flip ? "right" : "left"} className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Parallax distance={28}>
          <Link href={`/projects/${project.slug}`} className="project-card block rounded-[10px]" data-cursor="view" tabIndex={-1} aria-hidden="true">
            <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
              <div>
                <TiltSurface
                  className="on-night relative aspect-[16/11] overflow-hidden rounded-[10px] bg-night text-on-night"
                  art={<NetworkArt seed={seedFrom(project.slug)} />}
                >
                  <div className="flex items-end justify-between p-[clamp(18px,3vw,28px)]">
                    <span className="display-word text-[clamp(56px,8vw,112px)] leading-none text-lilac/90">{String(index + 1).padStart(2, "0")}</span>
                    <span className="card-open label text-[11px] text-night-muted">Open ↗</span>
                  </div>
                </TiltSurface>
              </div>
            </ViewTransition>
          </Link>
        </Parallax>
      </Reveal>

      <Reveal from={flip ? "left" : "right"} delay={120} className={`grid gap-5 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <ProjectFacts project={project} />
        <h3 id={`spot-${project.slug}`} className="condensed text-[clamp(34px,4.4vw,56px)] leading-[0.95] font-semibold tracking-[-0.03em]">
          <Link href={`/projects/${project.slug}`} className="no-underline hover:text-violet">
            {lead}
            <em className="display-word text-violet">{last}</em>
          </Link>
        </h3>
        {project.summary && <p className="max-w-[48ch] text-lg text-muted">{project.summary}</p>}
        {project.highlights.length > 0 && (
          <ul className="grid gap-2.5">
            {project.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex gap-2.5 text-[15px] leading-snug">
                <CircleCheck size={18} className="mt-px shrink-0 text-violet" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
        <TechList items={project.technologies} />
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/projects/${project.slug}`} className="btn btn-solid">
            Read the case study <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <ProjectLinks project={project} size="sm" />
        </div>
      </Reveal>
    </article>
  );
}
