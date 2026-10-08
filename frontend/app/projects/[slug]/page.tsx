import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, ViewTransition } from "react";

import { Threaded } from "@/components/layout/Threaded";
import { Words } from "@/components/motion/Words";
import { NetworkArt, seedFrom } from "@/components/projects/NetworkArt";
import { ProjectFacts, ProjectLinks } from "@/components/projects/ProjectMeta";
import { TechList } from "@/components/technology/TechList";
import { CircleCheck } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ErrorState } from "@/components/ui/StateMessage";
import { getProject } from "@/lib/api/projects";
import { splitTitle } from "@/lib/text";

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
  let index = 0;
  const next = () => String(++index).padStart(2, "0");

  return (
    <>
      <header
        data-night-band
        className="night-band on-night grid gap-10 px-[var(--rail)] pt-[calc(env(safe-area-inset-top,0px)+112px)] pb-16 lg:grid-cols-[1.1fr_1fr] lg:items-end"
      >
        <div className="grid gap-6">
          <Link href="/projects" className="label text-night-muted no-underline hover:text-on-night">
            ← All projects
          </Link>
          <Reveal as="h1" className="condensed text-[clamp(44px,7vw,92px)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance">
            <Words>
              <>
                {lead}
                <em className="display-word text-lilac">{last}</em>
              </>
            </Words>
          </Reveal>
          {project.summary && <p className="max-w-[52ch] text-lg text-night-muted">{project.summary}</p>}
          <ProjectFacts project={project} onNight />
        </div>
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[10px] bg-night ring-1 ring-on-night/10">
            <div className="absolute -inset-[6%]">
              <NetworkArt seed={seedFrom(project.slug)} />
            </div>
          </div>
        </ViewTransition>
      </header>

      <Threaded>
        {project.highlights.length > 0 && (
          <Section labelledBy="highlights-heading">
            <SectionHeading index={next()} label="Highlights" id="highlights-heading" title="What it does" />
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {project.highlights.map((h, i) => (
                <Reveal
                  as="li"
                  key={h}
                  from={i % 2 ? "right" : "left"}
                  delay={i * 90}
                  className="flex gap-3 rounded-[10px] border border-line bg-surface/70 p-5 text-[15px] leading-snug"
                >
                  <CircleCheck size={20} className="mt-px shrink-0 text-violet" aria-hidden="true" />
                  <span>{h}</span>
                </Reveal>
              ))}
            </ul>
          </Section>
        )}

        <Section labelledBy="overview-heading" last={!project.technologies.length}>
          <SectionHeading index={next()} label="Overview" id="overview-heading" title="Overview" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,65ch)_1fr]">
            {paragraphs.length ? (
              <div className="grid gap-5 text-lg">
                {paragraphs.map((p, i) => (
                  <Reveal as="p" key={i} from="up" delay={i * 80}>
                    {p}
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="text-muted">A full write-up for this project has not been published yet.</p>
            )}
            <Reveal from="right" className="grid content-start gap-4">
              <ProjectLinks project={project} />
            </Reveal>
          </div>
        </Section>

        {project.technologies.length > 0 && (
          <Section labelledBy="stack-heading" last>
            <SectionHeading index={next()} label="Stack" id="stack-heading" title="Technologies" />
            <Reveal from="left">
              <TechList items={project.technologies} className="mt-8 text-base" />
            </Reveal>
          </Section>
        )}
      </Threaded>
    </>
  );
}
