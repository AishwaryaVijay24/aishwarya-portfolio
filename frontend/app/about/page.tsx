import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { Band } from "@/components/layout/Band";
import { PageHero } from "@/components/layout/PageHero";
import { TechList } from "@/components/technology/TechList";
import { Threaded } from "@/components/layout/Threaded";
import { Magnetic } from "@/components/motion/Magnetic";
import { SkillCategoryIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RowsSkeleton } from "@/components/ui/Skeletons";
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
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      {[...groups].map(([category, names], i) => (
        <Reveal
          key={category}
          from={i % 2 ? "right" : "left"}
          delay={(i % 2) * 120}
          className={`grid content-start gap-4 rounded-[10px] border border-line bg-surface/70 p-6 ${i === 0 ? "md:col-span-2" : ""}`}
        >
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[color-mix(in_srgb,var(--orchid)_14%,transparent)] text-[var(--orchid-ink)]">
              <SkillCategoryIcon category={category} size={19} />
            </span>
            <h3 className="label text-[var(--orchid-ink)]">{category}</h3>
          </div>
          <TechList items={names} variant="chips" />
        </Reveal>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        seed={41}
        font="serif"
        title={
          <>
            {site.firstName} <em className="display-word">{site.lastName}</em>
          </>
        }
        lede={site.statement}
      />
      <Threaded>
        <Band surface="wash">
        <Section labelledBy="bio-heading">
          <SectionHeading
            index="01"
            label="Profile"
            id="bio-heading"
            font="wide"
            tone="orchid"
            title={
              <>
                Engineer, <em className="display-word">builder</em>, researcher
              </>
            }
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="grid gap-5 text-[clamp(18px,1.6vw,22px)] leading-relaxed">
              {site.bio.map((p, i) => (
                <Reveal as="p" key={i} from="up" delay={i * 120}>
                  {p}
                </Reveal>
              ))}
            </div>
            <Reveal from="right" className="grid content-start gap-3 border-l border-line pl-6 font-mono text-sm text-muted">
              <span>London, UK</span>
              <span>MSc Artificial Intelligence · QMUL</span>
              <span>BTech Computer Science · Symbiosis</span>
            </Reveal>
          </div>
        </Section>
        <Section labelledBy="skills-heading">
          <SectionHeading
            index="02"
            label="Skills"
            id="skills-heading"
            tone="orchid"
            title={
              <>
                What I work <em className="display-word">with</em>
              </>
            }
          />
          <Suspense fallback={<RowsSkeleton rows={3} />}>
            <SkillGroups />
          </Suspense>
        </Section>
        <Section labelledBy="more-heading" last>
          <SectionHeading index="03" label="More" id="more-heading" title="Keep exploring" font="serif" tone="orchid" />
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Link href="/projects" className="btn btn-solid">
                Projects <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </Magnetic>
            <Link href="/experience" className="btn btn-outline">
              Experience
            </Link>
            <Link href="/research" className="btn btn-outline">
              Research
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Contact
            </Link>
          </div>
        </Section>
        </Band>
      </Threaded>
    </>
  );
}
