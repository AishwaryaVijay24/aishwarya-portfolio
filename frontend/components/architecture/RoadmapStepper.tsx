import { Bot, Cloud, Database, Layers } from "lucide-react";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { Reveal } from "@/components/ui/Reveal";
import { roadmap } from "@/lib/content/roadmap";

const ICONS = [Layers, Database, Bot, Cloud];

/** The build phases as a horizontal stepper on Night; vertical on small screens. */
export function RoadmapStepper() {
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6" aria-label="Build phases">
      <span className="absolute top-5 right-[12%] left-[12%] hidden h-px bg-on-night/15 md:block" aria-hidden="true" />
      {roadmap.map((phase, i) => {
        const Icon = ICONS[i] ?? Layers;
        const current = phase.status === "in_progress";
        return (
          <Reveal as="li" key={phase.title} from="right" delay={i * 140} className="relative grid grid-cols-[40px_1fr] gap-4 md:grid-cols-1 md:justify-items-center md:text-center">
            <span
              className={`relative z-10 grid size-10 place-items-center rounded-full ${current ? "bg-lilac text-night" : "border border-on-night/25 bg-night text-night-muted"}`}
              aria-hidden="true"
            >
              <Icon size={18} />
            </span>
            <div className="grid gap-2 md:justify-items-center">
              <span className="font-mono text-xs text-night-muted">Phase {i + 1}</span>
              <h3 className="condensed text-2xl leading-none font-semibold">{phase.title}</h3>
              <p className="font-mono text-xs leading-relaxed text-night-muted">{phase.stack}</p>
              <StatusBadge label={current ? "In progress" : "Planned"} tone={current ? "current" : "neutral"} onNight />
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
