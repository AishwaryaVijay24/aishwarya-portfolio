import Link from "next/link";
import { Suspense } from "react";

import { LivingSystem } from "@/components/architecture/LivingSystem";
import { RoadmapStepper } from "@/components/architecture/RoadmapStepper";
import { SystemBand } from "@/components/architecture/SystemBand";
import { Timeline } from "@/components/experience/Timeline";
import { Hero } from "@/components/hero/Hero";
import { Band } from "@/components/layout/Band";
import { Threaded } from "@/components/layout/Threaded";
import { Magnetic } from "@/components/motion/Magnetic";
import { Words } from "@/components/motion/Words";
import { ProjectRail } from "@/components/projects/ProjectRail";
import { ProjectSpotlight } from "@/components/projects/ProjectSpotlight";
import { PublicationFeature } from "@/components/research/PublicationFeature";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RowsSkeleton, SpotlightSkeleton } from "@/components/ui/Skeletons";
import { EmptyState, ErrorState } from "@/components/ui/StateMessage";
import { TypingTerminal } from "@/components/ui/TypingTerminal";
import { getEducation } from "@/lib/api/education";
import { getExperience } from "@/lib/api/experience";
import { getProjects } from "@/lib/api/projects";
import { getPublications } from "@/lib/api/research";
import { educationEntries, experienceEntries } from "@/lib/timeline";

async function Work() {
  const result = await getProjects();
  if (!result.ok) return <ErrorState what="Projects" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No projects are published yet." />;
  const featured = result.data.filter((p) => p.featured);
  const spotlight = featured.length ? featured : result.data.slice(0, 2);
  const rest = result.data.filter((p) => !spotlight.includes(p));
  return (
    <>
      <div className="mt-16 grid gap-[clamp(80px,10vw,140px)]">
        {spotlight.map((project, i) => (
          <ProjectSpotlight key={project.slug} project={project} index={i} />
        ))}
      </div>
      {rest.length > 0 && (
        <div className="mt-[clamp(96px,12vw,160px)]">
          <Reveal from="left" className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="condensed text-[clamp(28px,3.4vw,40px)] leading-none font-semibold tracking-[-0.02em]">
              More <em className="display-word text-violet">builds</em>
            </h3>
            <p className="max-w-[44ch] text-muted">Smaller projects and experiments. Hover a card to flip it.</p>
          </Reveal>
          <div className="mt-6">
            <ProjectRail projects={rest} />
          </div>
        </div>
      )}
    </>
  );
}

async function Journey() {
  const [experience, education] = await Promise.all([getExperience(), getEducation()]);
  if (!experience.ok) return <ErrorState what="Experience entries" error={experience.error} />;
  const entries = [...experienceEntries(experience.data), ...(education.ok ? educationEntries(education.data) : [])];
  if (entries.length === 0) return <EmptyState message="No experience entries are published yet." />;
  return <Timeline entries={entries} />;
}

async function Research() {
  const result = await getPublications();
  if (!result.ok) return <ErrorState what="Publications" error={result.error} />;
  if (result.data.length === 0) return <EmptyState message="No publications are listed yet." />;
  return <PublicationFeature publication={result.data[0]} />;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Threaded>
        <Band surface="grid">
        <Section labelledBy="work-heading" last>
          <SectionHeading
            index="01"
            label="Work"
            id="work-heading"
            title={
              <>
                Selected <em className="display-word">work</em>
              </>
            }
            lede="Agents, retrieval systems and full-stack platforms. Each opens into a case study."
          />
          <Suspense fallback={<SpotlightSkeleton />}>
            <Work />
          </Suspense>
          <Reveal from="up" className="mt-12">
            <Link href="/projects" className="btn btn-outline">
              All projects <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </Section>
        </Band>

        <Band surface="tint" className="overflow-hidden">
        <span className="outline-type absolute top-16 right-[var(--rail)] hidden text-[clamp(120px,16vw,240px)] md:block" aria-hidden="true">
          2021—26
        </span>
        <Section labelledBy="journey-heading" last>
          <SectionHeading
            index="02"
            label="Journey"
            id="journey-heading"
            font="wide"
            tone="teal"
            title={
              <>
                Where I&apos;ve <em className="display-word">built</em> and studied
              </>
            }
          />
          <Suspense fallback={<RowsSkeleton rows={4} />}>
            <Journey />
          </Suspense>
          <Reveal from="up" className="mt-12">
            <Link href="/experience" className="btn btn-outline">
              Full experience <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </Section>
        </Band>

        <SystemBand labelledBy="system-heading" flush>
          <div className="grid gap-[clamp(48px,6vw,80px)]">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="label tick flex items-center gap-3 text-night-muted" data-knot>
                  <span className="text-lilac">03</span> System
                </p>
                <Reveal as="h2" id="system-heading" className="condensed mt-3.5 text-[clamp(38px,6vw,76px)] leading-none font-semibold tracking-[-0.03em] [&_em]:text-lilac">
                  <Words>
                    <>
                      This portfolio is a <em className="display-word">system</em>
                    </>
                  </Words>
                </Reveal>
              </div>
              <Reveal as="p" from="right" className="max-w-[48ch] text-lg text-night-muted">
                Built in phases, like any production software. Phase 1 layers are solid with live requests moving through them; planned layers are outlined. Hover or
                focus a layer to trace it.
              </Reveal>
            </div>
            <RoadmapStepper />
            <LivingSystem bare />
          </div>
        </SystemBand>

        <Band surface="paper">
        <Section labelledBy="research-heading" last>
          <SectionHeading
            index="04"
            label="Research"
            id="research-heading"
            font="serif"
            tone="sky"
            title={
              <>
                Research, <em className="display-word">published</em>
              </>
            }
          />
          <div className="mt-14">
            <Suspense fallback={<RowsSkeleton rows={2} />}>
              <Research />
            </Suspense>
          </div>
        </Section>
        </Band>

        <Band surface="dots">
        <Section labelledBy="lab-heading" last>
          <SectionHeading
            index="05"
            label="AI Lab"
            id="lab-heading"
            font="mono"
            tone="orchid"
            title={
              <>
                Talk to my <em className="display-word">AI</em>
              </>
            }
          />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <Reveal from="left" className="grid gap-6">
              <p className="max-w-[52ch] text-lg text-muted">
                A Portfolio Agent is coming in a future phase. It will answer questions about my projects, experience and research using only verified information,
                and it will be read-only.
              </p>
              <Magnetic>
                <Link href="/ai-lab" className="btn btn-solid">
                  Visit the AI Lab <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </Magnetic>
            </Reveal>
            <Reveal from="tilt" delay={120}>
              <TypingTerminal
                label="Portfolio Agent status: planned, read-only, grounded in retrieval"
                lines={[
                  { prompt: true, text: "agent status" },
                  { text: "portfolio-agent: planned" },
                  { text: "mode: read-only" },
                  { text: "grounding: retrieval over verified data" },
                ]}
              />
            </Reveal>
          </div>
        </Section>
        </Band>
      </Threaded>
    </>
  );
}
