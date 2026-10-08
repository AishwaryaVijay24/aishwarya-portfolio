import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { ProjectGrid, ProjectGridSkeleton } from "@/components/projects/ProjectGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState, ErrorState } from "@/components/ui/StateMessage";
import { getProjects } from "@/lib/api/projects";

export const metadata: Metadata = { title: "Projects" };

async function AllProjects() {
  const result = await getProjects();
  if (!result.ok) return <ErrorState what="Projects" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No projects are published yet." />;
  return <ProjectGrid projects={result.data} />;
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        seed={11}
        title={
          <>
            Things I&apos;ve <em className="display-word">built</em>
          </>
        }
        lede="Each project is labelled honestly: prototypes, experiments and planned work say so."
      />
      <Threaded>
        <Section labelledBy="projects-heading" last>
          <SectionHeading index="01" label="Index" id="projects-heading" title="All projects" />
          <Suspense fallback={<ProjectGridSkeleton count={4} />}>
            <AllProjects />
          </Suspense>
        </Section>
      </Threaded>
    </>
  );
}
