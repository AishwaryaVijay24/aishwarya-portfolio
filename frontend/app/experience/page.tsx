import type { Metadata } from "next";
import { Suspense } from "react";

import { Timeline } from "@/components/experience/Timeline";
import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RowsSkeleton } from "@/components/ui/Skeletons";
import { EmptyState, ErrorState } from "@/components/ui/StateMessage";
import { getEducation } from "@/lib/api/education";
import { getExperience } from "@/lib/api/experience";
import { educationEntries, experienceEntries } from "@/lib/timeline";

export const metadata: Metadata = { title: "Experience" };

async function Work() {
  const result = await getExperience();
  if (!result.ok) return <ErrorState what="Experience entries" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No experience entries are published yet." />;
  return <Timeline entries={experienceEntries(result.data)} detailed />;
}

async function Study() {
  const result = await getEducation();
  if (!result.ok) return <ErrorState what="Education entries" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No education entries are published yet." />;
  return <Timeline entries={educationEntries(result.data)} detailed />;
}

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        seed={23}
        title={
          <>
            Where I&apos;ve <em className="display-word">worked</em> and studied
          </>
        }
      />
      <Threaded>
        <Section labelledBy="experience-heading">
          <SectionHeading index="01" label="Work" id="experience-heading" title="Experience" />
          <Suspense fallback={<RowsSkeleton rows={2} />}>
            <Work />
          </Suspense>
        </Section>
        <Section labelledBy="education-heading" last>
          <SectionHeading index="02" label="Study" id="education-heading" title="Education" />
          <Suspense fallback={<RowsSkeleton rows={2} />}>
            <Study />
          </Suspense>
        </Section>
      </Threaded>
    </>
  );
}
