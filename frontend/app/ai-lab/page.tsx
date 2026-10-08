import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Terminal } from "@/components/ui/Terminal";

export const metadata: Metadata = { title: "AI Lab" };

// Planned read-only tools (CLAUDE.md "Future Portfolio Agent"). Not implemented in Phase 1.
const plannedTools = [
  { name: "search_projects", detail: "Find projects by topic or technology" },
  { name: "get_project", detail: "Read one project's verified details" },
  { name: "search_experience", detail: "Search roles and responsibilities" },
  { name: "search_research", detail: "Search research entries" },
  { name: "search_publications", detail: "Search publications" },
];

export default function AiLabPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Lab"
        seed={53}
        title={
          <>
            Talk to my <em className="display-word">AI</em>
          </>
        }
        lede="The Portfolio Agent is coming in a future phase. This page explains what it will do."
      />
      <Threaded>
        <Section labelledBy="agent-heading">
          <SectionHeading
            index="01"
            label="Portfolio Agent"
            id="agent-heading"
            title={
              <>
                Grounded, read-only, <em className="display-word">honest</em>
              </>
            }
          />
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-8">
            <div className="grid max-w-[56ch] gap-5 text-lg text-muted">
              <p>
                The agent will answer questions about my projects, experience, research and publications. It will use retrieval over verified portfolio data, so
                every answer is grounded in what is actually published here.
              </p>
              <p>It will be read-only. It can never change portfolio data, and it will say so when it does not know something.</p>
              <StatusBadge label="Planned" />
            </div>
            <Terminal
              label="Portfolio Agent status: planned, read-only"
              lines={[{ prompt: true, text: "agent status" }, { text: "portfolio-agent: planned" }, { text: "mode: read-only" }, { text: "grounding: retrieval (planned)" }]}
            />
          </div>
        </Section>
        <Section labelledBy="tools-heading" last>
          <SectionHeading index="02" label="Tools" id="tools-heading" title="Planned tools" lede="Each tool only reads data. None of them are built yet." />
          <dl className="mt-10">
            {plannedTools.map((tool) => (
              <div key={tool.name} className="numbered-row grid gap-1 py-5 sm:grid-cols-[minmax(200px,280px)_1fr]">
                <dt className="font-mono text-[15px] text-violet">{tool.name}</dt>
                <dd className="text-muted">{tool.detail}</dd>
              </div>
            ))}
          </dl>
          <Link href="/projects" className="btn btn-outline mt-10">
            Explore projects meanwhile <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </Section>
      </Threaded>
    </>
  );
}
