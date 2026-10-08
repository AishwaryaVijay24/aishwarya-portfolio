import type { Metadata } from "next";
import { Suspense } from "react";

import { Band } from "@/components/layout/Band";
import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { PublicationFeature } from "@/components/research/PublicationFeature";
import { ArrowUpRight, FlaskConical } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RowsSkeleton } from "@/components/ui/Skeletons";
import { EmptyState, ErrorState } from "@/components/ui/StateMessage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getPublications, getResearch } from "@/lib/api/research";

export const metadata: Metadata = { title: "Research" };

const humanize = (value: string) => value.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

async function ResearchEntries() {
  const result = await getResearch();
  if (!result.ok) return <ErrorState what="Research entries" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No research entries are published yet." />;
  return (
    <ol className="mt-12 grid gap-[clamp(48px,6vw,80px)]" aria-label="Research">
      {result.data.map((r, i) => {
        const flip = i % 2 === 1;
        return (
          <Reveal
            as="li"
            key={r.id}
            from={flip ? "right" : "left"}
            className={`grid gap-6 border-t border-line pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="grid content-start gap-4">
              <span className="grid size-11 place-items-center rounded-full border border-line text-[var(--sky-ink)]" aria-hidden="true">
                <FlaskConical size={20} />
              </span>
              <span className="type-serif text-[64px] leading-none text-[var(--sky-ink)]">{String(i + 1).padStart(2, "0")}</span>
              <span className="justify-self-start">
                <StatusBadge label={humanize(r.status)} tone={r.status === "published" ? "current" : "neutral"} />
              </span>
            </div>
            <div className="grid content-start gap-4">
              <h3 className="type-serif text-[clamp(26px,3vw,38px)] leading-[1.12] text-balance">{r.title}</h3>
              {r.summary && <p className="max-w-[62ch] text-muted">{r.summary}</p>}
              {r.url && (
                <a href={r.url} target="_blank" rel="noreferrer" className="btn btn-outline justify-self-start">
                  {r.url.includes("github.com") ? "Code and paper artefacts" : "Read the paper"} <ArrowUpRight size={16} className="icon-nudge" aria-hidden="true" />
                </a>
              )}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

async function Publications() {
  const result = await getPublications();
  if (!result.ok) return <ErrorState what="Publications" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No publications are listed yet." />;
  return (
    <div className="mt-14 grid gap-16">
      {result.data.map((p) => (
        <PublicationFeature key={p.id} publication={p} />
      ))}
    </div>
  );
}

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        seed={37}
        font="serif"
        art={
          <span className="type-serif absolute right-8 bottom-0 block translate-y-[38%] text-[clamp(200px,26vw,380px)] leading-none text-[color-mix(in_srgb,var(--sky)_22%,transparent)]">
            &ldquo;
          </span>
        }
        title={
          <>
            Questions I&apos;m <em className="display-word">exploring</em>
          </>
        }
        lede="Vision-language model robustness, retrieval and digital fraud response."
      />
      <Threaded>
        <Band surface="paper">
        <Section labelledBy="publications-heading">
          <SectionHeading index="01" label="Writing" id="publications-heading" title="Publications" font="serif" tone="sky" />
          <Suspense fallback={<RowsSkeleton rows={2} />}>
            <Publications />
          </Suspense>
        </Section>
        <Section labelledBy="research-heading" last>
          <SectionHeading index="02" label="Research" id="research-heading" title="Research work" font="serif" tone="sky" />
          <Suspense fallback={<RowsSkeleton />}>
            <ResearchEntries />
          </Suspense>
        </Section>
        </Band>
      </Threaded>
    </>
  );
}
