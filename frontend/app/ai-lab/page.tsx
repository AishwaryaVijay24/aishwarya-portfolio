import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/PageHero";
import { Threaded } from "@/components/layout/Threaded";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Bot, Database, FileText, FlaskConical, Layers } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { TypingTerminal } from "@/components/ui/TypingTerminal";

export const metadata: Metadata = { title: "AI Lab" };

// Planned read-only tools (CLAUDE.md "Future Portfolio Agent"). Not implemented in Phase 1.
const plannedTools = [
  { name: "search_projects", detail: "Find projects by topic or technology", icon: Layers },
  { name: "get_project", detail: "Read one project's verified details", icon: Database },
  { name: "search_experience", detail: "Search roles and responsibilities", icon: Bot },
  { name: "search_research", detail: "Search research entries", icon: FlaskConical },
  { name: "search_publications", detail: "Search publications", icon: FileText },
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
            <Reveal from="tilt">
              <TypingTerminal
                label="Portfolio Agent status: planned, read-only, grounded in retrieval"
                lines={[{ prompt: true, text: "agent status" }, { text: "portfolio-agent: planned" }, { text: "mode: read-only" }, { text: "grounding: retrieval (planned)" }]}
              />
            </Reveal>
          </div>
        </Section>
        <Section labelledBy="tools-heading" last>
          <SectionHeading index="02" label="Tools" id="tools-heading" title="Planned tools" lede="Each tool only reads data. None of them are built yet." />
          <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {plannedTools.map((tool, i) => (
              <Reveal key={tool.name} from="up" delay={i * 80} className="grid gap-3 rounded-[10px] border border-dashed border-line p-5">
                <span className="grid size-10 place-items-center rounded-full bg-violet/10 text-violet" aria-hidden="true">
                  <tool.icon size={18} />
                </span>
                <dt className="font-mono text-[15px] text-violet">{tool.name}()</dt>
                <dd className="text-muted">{tool.detail}</dd>
              </Reveal>
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
