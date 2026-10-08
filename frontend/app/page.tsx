import Link from "next/link";
import { Suspense } from "react";

import { LivingSystem } from "@/components/architecture/LivingSystem";
import { NumberedList } from "@/components/experience/NumberedList";
import { Hero } from "@/components/hero/Hero";
import { Threaded } from "@/components/layout/Threaded";
import { ProjectGrid, ProjectGridSkeleton } from "@/components/projects/ProjectGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState, ErrorState } from "@/components/ui/StateMessage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Terminal } from "@/components/ui/Terminal";
import { getProjects } from "@/lib/api/projects";
import { roadmap } from "@/lib/content/roadmap";

async function SelectedProjects() {
  const result = await getProjects();
  if (!result.ok) return <ErrorState what="Projects" error={result.error} />;
  const featured = result.data.filter((p) => p.featured);
  const projects = (featured.length ? featured : result.data).slice(0, 4);
  if (projects.length === 0) return <EmptyState message="No projects are published yet." />;
  return <ProjectGrid projects={projects} />;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Threaded>
        <Section labelledBy="work-heading">
          <SectionHeading
            index="01"
            label="Work"
            id="work-heading"
            title={
              <>
                Selected <em className="display-word">work</em>
              </>
            }
            lede="Each project opens into a detail page with its architecture and decisions."
          />
          <Suspense fallback={<ProjectGridSkeleton />}>
            <SelectedProjects />
          </Suspense>
          <Link href="/projects" className="btn btn-outline mt-10">
            All projects <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </Section>

        <Section labelledBy="build-heading">
          <SectionHeading
            index="02"
            label="Build"
            id="build-heading"
            title={
              <>
                How this portfolio is <em className="display-word">built</em>
              </>
            }
            lede="The portfolio is itself an engineering project, built in phases."
          />
          <NumberedList
            label="Build phases"
            items={roadmap.map((phase) => ({
              key: phase.title,
              title: phase.title,
              meta: phase.stack,
              detail: phase.detail,
              aside: <StatusBadge label={phase.status === "in_progress" ? "In progress" : "Planned"} tone={phase.status === "in_progress" ? "current" : "neutral"} />,
            }))}
          />
        </Section>

        <Section labelledBy="system-heading">
          <SectionHeading
            index="03"
            label="System"
            id="system-heading"
            title={
              <>
                The <em className="display-word">system</em> behind it
              </>
            }
            lede="Phase 1 layers are solid, with requests moving through them. Planned layers are outlined. Hover or focus a layer to trace its connections."
          />
          <LivingSystem />
        </Section>

        <Section labelledBy="lab-heading" last>
          <SectionHeading
            index="04"
            label="AI Lab"
            id="lab-heading"
            title={
              <>
                Talk to my <em className="display-word">AI</em>
              </>
            }
          />
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-7">
            <div className="grid gap-6">
              <p className="max-w-[56ch] text-lg text-muted">
                The Portfolio Agent is coming in a future phase. It will answer questions about my projects, experience and research using only verified information.
              </p>
              <Link href="/ai-lab" className="btn btn-solid justify-self-start">
                Visit the AI Lab <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
            <Terminal
              label="Portfolio Agent status: planned, read-only"
              lines={[{ prompt: true, text: "agent status" }, { text: "portfolio-agent: planned" }, { text: "mode: read-only" }]}
            />
          </div>
        </Section>
      </Threaded>
    </>
  );
}
