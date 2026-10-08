import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, ViewTransition } from "react";

import { Threaded } from "@/components/layout/Threaded";
import { NetworkArt, seedFrom } from "@/components/projects/NetworkArt";
import { splitTitle } from "@/components/projects/ProjectCard";
import { TechList } from "@/components/technology/TechList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ErrorState } from "@/components/ui/StateMessage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProject } from "@/lib/api/projects";
import { projectStatusLabel } from "@/lib/format";

// Shared by generateMetadata and the page, so the API is called once per request.
const loadProject = cache(getProject);

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const result = await loadProject(slug);
  return result.ok ? { title: result.data.title, description: result.data.summary ?? undefined } : { title: "Project" };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const result = await loadProject(slug);
  if (!result.ok && result.error === "not_found") notFound();

  if (!result.ok) {
    return (
      <Threaded>
        <Section labelledBy="project-error" last>
          <h1 id="project-error" className="condensed pt-24 text-5xl font-semibold">
            Project
          </h1>
          <ErrorState what="Project details" error={result.error} />
        </Section>
      </Threaded>
    );
  }

  const project = result.data;
  const [lead, last] = splitTitle(project.title);
  const paragraphs = (project.description ?? "").split(/\n{2,}/).filter(Boolean);
  const current = project.status === "in_progress" || project.status === "active";

  return (
    <>
      <header
        data-night-band
        className="night-band on-night grid gap-10 px-[var(--rail)] pt-[calc(env(safe-area-inset-top,0px)+112px)] pb-16 lg:grid-cols-[1.1fr_1fr] lg:items-end"
      >
        <div>
          <Link href="/projects" className="label text-night-muted no-underline hover:text-on-night">
            ← All projects
          </Link>
          <h1 className="condensed mt-6 text-[clamp(44px,7vw,92px)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance">
            {lead}
            <em className="display-word text-lilac">{last}</em>
          </h1>
          {project.summary && <p className="mt-6 max-w-[52ch] text-lg text-night-muted">{project.summary}</p>}
          <div className="mt-6">
            <StatusBadge label={projectStatusLabel[project.status]} tone={current ? "current" : "neutral"} onNight />
          </div>
        </div>
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <div className="relative aspect-[4/3.2] overflow-hidden rounded-[10px] bg-night ring-1 ring-on-night/10">
            <div className="absolute -inset-[6%]">
              <NetworkArt seed={seedFrom(project.slug)} />
            </div>
          </div>
        </ViewTransition>
      </header>

      <Threaded>
        <Section labelledBy="overview-heading" last={!project.technologies.length}>
          <SectionHeading index="01" label="Overview" id="overview-heading" title="Overview" />
          {paragraphs.length ? (
            <div className="mt-8 grid max-w-[65ch] gap-5 text-lg">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-muted">A full write-up for this project has not been published yet.</p>
          )}
          {(project.repository_url || project.demo_url) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {project.repository_url && (
                <a href={project.repository_url} className="btn btn-solid" target="_blank" rel="noreferrer">
                  Source code <span className="arrow" aria-hidden="true">↗</span>
                </a>
              )}
              {project.demo_url && (
                <a href={project.demo_url} className="btn btn-outline" target="_blank" rel="noreferrer">
                  Live demo <span className="arrow" aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </Section>
        {project.technologies.length > 0 && (
          <Section labelledBy="stack-heading" last>
            <SectionHeading index="02" label="Stack" id="stack-heading" title="Technologies" />
            <TechList items={project.technologies} className="mt-8 text-base" />
          </Section>
        )}
      </Threaded>
    </>
  );
}
