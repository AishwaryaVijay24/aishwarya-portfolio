import type { Metadata } from "next";
import { Suspense } from "react";

import { ListSkeleton } from "@/components/experience/ListSkeleton";
import { NumberedList } from "@/components/experience/NumberedList";
import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState, ErrorState } from "@/components/ui/StateMessage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getPublications, getResearch } from "@/lib/api/research";

export const metadata: Metadata = { title: "Research" };

const humanize = (value: string) => value.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

async function ResearchList() {
  const result = await getResearch();
  if (!result.ok) return <ErrorState what="Research entries" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No research entries are published yet." />;
  return (
    <NumberedList
      label="Research"
      items={result.data.map((r) => ({
        key: String(r.id),
        title: r.url ? (
          <a href={r.url} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-violet">
            {r.title}
          </a>
        ) : (
          r.title
        ),
        detail: r.summary,
        aside: <StatusBadge label={humanize(r.status)} />,
      }))}
    />
  );
}

async function PublicationList() {
  const result = await getPublications();
  if (!result.ok) return <ErrorState what="Publications" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No publications are listed yet." />;
  return (
    <NumberedList
      label="Publications"
      items={result.data.map((p) => ({
        key: String(p.id),
        title: p.url ? (
          <a href={p.url} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-violet">
            {p.title}
          </a>
        ) : (
          p.title
        ),
        meta: [p.authors.join(", "), p.venue, p.year].filter(Boolean).join(" · "),
      }))}
    />
  );
}

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        seed={37}
        title={
          <>
            Questions I&apos;m <em className="display-word">exploring</em>
          </>
        }
      />
      <Threaded>
        <Section labelledBy="research-heading">
          <SectionHeading index="01" label="Research" id="research-heading" title="Research" />
          <Suspense fallback={<ListSkeleton />}>
            <ResearchList />
          </Suspense>
        </Section>
        <Section labelledBy="publications-heading" last>
          <SectionHeading index="02" label="Writing" id="publications-heading" title="Publications" />
          <Suspense fallback={<ListSkeleton rows={2} />}>
            <PublicationList />
          </Suspense>
        </Section>
      </Threaded>
    </>
  );
}
