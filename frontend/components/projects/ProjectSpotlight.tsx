import Link from "next/link";
import { ViewTransition } from "react";

import { Parallax } from "@/components/motion/Parallax";
import { TechList } from "@/components/technology/TechList";
import { CircleCheck } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/api/types";
import { splitTitle } from "@/lib/text";
import { accentStyle } from "@/lib/visuals";
import { seedFrom } from "./NetworkArt";
import { ProjectFacts, ProjectLinks } from "./ProjectMeta";
import { ProjectVisual } from "./ProjectVisual";
import { TiltSurface } from "./TiltSurface";

function Artwork({ project, index, aspect }: { project: Project; index: number; aspect: string }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card block rounded-[10px]" data-cursor="view" tabIndex={-1} aria-hidden="true">
      <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
        <div>
          <TiltSurface
            className={`on-night relative ${aspect} overflow-hidden rounded-[10px] bg-night text-on-night`}
            art={
              <div className="absolute inset-[6%]">
                <ProjectVisual kind={project.visual} seed={seedFrom(project.slug)} />
              </div>
            }
          >
            <div className="flex items-end justify-between p-[clamp(18px,3vw,28px)]">
              <span className="display-word text-[clamp(44px,6vw,88px)] leading-none text-[var(--accent)] opacity-90">{String(index + 1).padStart(2, "0")}</span>
              <span className="card-open label text-[11px] text-night-muted">Open ↗</span>
            </div>
          </TiltSurface>
        </div>
      </ViewTransition>
    </Link>
  );
}

function Title({ project, size }: { project: Project; size: string }) {
  const [lead, last] = splitTitle(project.title);
  return (
    <h3 id={`spot-${project.slug}`} className={`condensed leading-[0.95] font-semibold tracking-[-0.03em] ${size}`}>
      <Link href={`/projects/${project.slug}`} className="no-underline hover:text-[var(--accent-ink)]">
        {lead}
        <em className="display-word text-[var(--accent-ink)]">{last}</em>
      </Link>
    </h3>
  );
}

function Highlights({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="grid gap-2.5">
      {items.map((h) => (
        <li key={h} className="flex gap-2.5 text-[15px] leading-snug">
          <CircleCheck size={18} className="mt-px shrink-0 text-[var(--accent-ink)]" aria-hidden="true" />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

function Actions({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href={`/projects/${project.slug}`} className="btn btn-solid">
        Read the case study <span className="arrow" aria-hidden="true">→</span>
      </Link>
      <ProjectLinks project={project} size="sm" />
    </div>
  );
}

/**
 * Featured project. Three compositions rotate so consecutive projects never look alike:
 * artwork left, artwork right, and a full-width banner with the text in columns below.
 */
export function ProjectSpotlight({ project, index }: { project: Project; index: number }) {
  const layout = index % 3;

  if (layout === 2) {
    return (
      <article className="grid gap-8" aria-labelledby={`spot-${project.slug}`} style={accentStyle(project.visual)}>
        <Reveal from="scale">
          <Parallax distance={20}>
            <Artwork project={project} index={index} aspect="aspect-[21/9]" />
          </Parallax>
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr_1fr]">
          <Reveal from="left" className="grid content-start gap-4">
            <ProjectFacts project={project} />
            <Title project={project} size="text-[clamp(34px,4vw,52px)]" />
          </Reveal>
          <Reveal from="up" delay={120} className="grid content-start gap-4">
            {project.summary && <p className="text-lg text-muted">{project.summary}</p>}
            <TechList items={project.technologies} />
          </Reveal>
          <Reveal from="right" delay={200} className="grid content-start gap-5">
            <Highlights items={project.highlights.slice(0, 3)} />
            <Actions project={project} />
          </Reveal>
        </div>
      </article>
    );
  }

  const flip = layout === 1;
  return (
    <article className="grid items-center gap-[clamp(28px,5vw,72px)] lg:grid-cols-12" aria-labelledby={`spot-${project.slug}`} style={accentStyle(project.visual)}>
      <Reveal from={flip ? "right" : "left"} className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Parallax distance={28}>
          <Artwork project={project} index={index} aspect="aspect-[16/11]" />
        </Parallax>
      </Reveal>
      <Reveal from={flip ? "left" : "right"} delay={120} className={`grid gap-5 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <ProjectFacts project={project} />
        <Title project={project} size="text-[clamp(34px,4.4vw,56px)]" />
        {project.summary && <p className="max-w-[48ch] text-lg text-muted">{project.summary}</p>}
        <Highlights items={project.highlights.slice(0, 3)} />
        <TechList items={project.technologies} />
        <Actions project={project} />
      </Reveal>
    </article>
  );
}
