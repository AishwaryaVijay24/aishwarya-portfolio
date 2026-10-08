import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ListSkeleton } from "@/components/experience/ListSkeleton";
import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { TechList } from "@/components/technology/TechList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState, ErrorState } from "@/components/ui/StateMessage";
import { getSkills } from "@/lib/api/skills";
import { site } from "@/lib/config/site";

export const metadata: Metadata = { title: "About" };

async function SkillGroups() {
  const result = await getSkills();
  if (!result.ok) return <ErrorState what="Skills" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No skills are listed yet." />;
  const groups = new Map<string, string[]>();
  for (const skill of result.data) groups.set(skill.category, [...(groups.get(skill.category) ?? []), skill.name]);
  return (
    <dl className="mt-12 grid gap-0">
      {[...groups].map(([category, names]) => (
        <div key={category} className="numbered-row grid gap-2 py-6 sm:grid-cols-[minmax(160px,240px)_1fr]">
          <dt className="label pt-1 text-violet">{category}</dt>
          <dd>
            <TechList items={names} className="text-[15px] text-ink" />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        seed={41}
        title={
          <>
            {site.firstName} <em className="display-word">{site.lastName}</em>
          </>
        }
        lede={site.statement}
      />
      <Threaded>
        <Section labelledBy="skills-heading">
          <SectionHeading
            index="01"
            label="Skills"
            id="skills-heading"
            title={
              <>
                What I work <em className="display-word">with</em>
              </>
            }
          />
          <Suspense fallback={<ListSkeleton rows={3} />}>
            <SkillGroups />
          </Suspense>
        </Section>
        <Section labelledBy="more-heading" last>
          <SectionHeading index="02" label="More" id="more-heading" title="Keep exploring" />
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/experience" className="btn btn-solid">
              Experience and education <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/research" className="btn btn-outline">
              Research
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact
            </Link>
          </div>
        </Section>
      </Threaded>
    </>
  );
}
