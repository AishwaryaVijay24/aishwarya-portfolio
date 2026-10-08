import type { Metadata } from "next";
import { Suspense } from "react";

import { NumberedList } from "@/components/experience/NumberedList";
import { ListSkeleton } from "@/components/experience/ListSkeleton";
import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { TechList } from "@/components/technology/TechList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState, ErrorState } from "@/components/ui/StateMessage";
import { getEducation } from "@/lib/api/education";
import { getExperience } from "@/lib/api/experience";
import { formatRange } from "@/lib/format";

export const metadata: Metadata = { title: "Experience" };

async function ExperienceList() {
  const result = await getExperience();
  if (!result.ok) return <ErrorState what="Experience entries" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No experience entries are published yet." />;
  return (
    <NumberedList
      label="Experience"
      items={result.data.map((e) => ({
        key: String(e.id),
        title: (
          <>
            {e.role} <span className="text-muted">· {e.organization}</span>
          </>
        ),
        meta: [formatRange(e.start_date, e.end_date), e.location].filter(Boolean).join(" · "),
        detail: (
          <div className="grid gap-3">
            {e.summary && <p>{e.summary}</p>}
            {e.highlights.length > 0 && (
              <ul className="grid list-disc gap-1 pl-5">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            <TechList items={e.technologies} />
          </div>
        ),
      }))}
    />
  );
}

async function EducationList() {
  const result = await getEducation();
  if (!result.ok) return <ErrorState what="Education entries" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No education entries are published yet." />;
  return (
    <NumberedList
      label="Education"
      items={result.data.map((e) => ({
        key: String(e.id),
        title: (
          <>
            {e.degree}
            {e.field_of_study ? `, ${e.field_of_study}` : ""} <span className="text-muted">· {e.institution}</span>
          </>
        ),
        meta: e.start_date || e.end_date ? formatRange(e.start_date, e.end_date) : undefined,
        detail: e.summary,
      }))}
    />
  );
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
          <Suspense fallback={<ListSkeleton />}>
            <ExperienceList />
          </Suspense>
        </Section>
        <Section labelledBy="education-heading" last>
          <SectionHeading index="02" label="Study" id="education-heading" title="Education" />
          <Suspense fallback={<ListSkeleton rows={2} />}>
            <EducationList />
          </Suspense>
        </Section>
      </Threaded>
    </>
  );
}
