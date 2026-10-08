import type { Metadata } from "next";
import { Suspense } from "react";

import { Band } from "@/components/layout/Band";
import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RowsSkeleton } from "@/components/ui/Skeletons";
import { EmptyState, ErrorState } from "@/components/ui/StateMessage";
import { getProjects } from "@/lib/api/projects";

export const metadata: Metadata = { title: "Projects" };

async function AllProjects() {
  const result = await getProjects();
  if (!result.ok) return <ErrorState what="Projects" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No projects are published yet." />;
  return <ProjectIndex projects={result.data} />;
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
        lede="Every project is labelled honestly: experiments, prototypes and in-progress work say so."
      />
      <Threaded>
        <Band surface="grid">
        <Section labelledBy="projects-heading" last>
          <SectionHeading index="01" label="Index" id="projects-heading" title="All projects" />
          <Suspense fallback={<RowsSkeleton rows={6} />}>
            <AllProjects />
          </Suspense>
        </Section>
        </Band>
      </Threaded>
    </>
  );
}
