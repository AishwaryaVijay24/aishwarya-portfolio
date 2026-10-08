"use client";

import Link from "next/link";
import { useRef } from "react";

import { TechList } from "@/components/technology/TechList";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/api/types";
import { projectStatusLabel } from "@/lib/format";
import { splitTitle } from "@/lib/text";
import { accentStyle } from "@/lib/visuals";
import { seedFrom } from "./NetworkArt";
import { ProjectVisual } from "./ProjectVisual";

/**
 * Horizontal rail of flip cards for supporting projects. The front shows the project;
 * hovering or focusing flips it to the stack and highlights. Scrolls natively (trackpad,
 * touch, keyboard) with snap points and arrow buttons.
 */
export function ProjectRail({ projects }: { projects: Project[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    rail.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 24), behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} className="btn btn-outline px-3 py-2" aria-label="Scroll projects left">
          ←
        </button>
        <button type="button" onClick={() => scrollBy(1)} className="btn btn-outline px-3 py-2" aria-label="Scroll projects right">
          →
        </button>
      </div>
      <ul ref={railRef} className="rail -mx-2 flex gap-6 overflow-x-auto px-2 pb-4" aria-label="More projects">
        {projects.map((p, i) => {
          const [lead, last] = splitTitle(p.title);
          return (
            <Reveal as="li" key={p.slug} from="tilt" delay={i * 110} className="w-[min(82vw,340px)] shrink-0" style={accentStyle(p.visual)}>
              <Link href={`/projects/${p.slug}`} className="flip block h-[400px] rounded-[10px] no-underline" data-cursor="view">
                <div className="flip-inner">
                  <div className="flip-face on-night bg-night text-on-night">
                    <div className="absolute inset-x-[6%] top-[4%] h-[62%]">
                      <ProjectVisual kind={p.visual} seed={seedFrom(p.slug)} />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 grid gap-2 bg-gradient-to-t from-night via-night/80 to-transparent p-6 pt-16">
                      <span className="label text-[11px] text-[var(--accent)]">
                        {p.period} · {projectStatusLabel[p.status]}
                      </span>
                      <h3 className="condensed text-[30px] leading-none font-semibold tracking-[-0.02em]">
                        {lead}
                        <em className="display-word text-[var(--accent)]">{last}</em>
                      </h3>
                      {p.category && <span className="font-mono text-xs text-night-muted">{p.category}</span>}
                    </div>
                  </div>
                  <div className="flip-face flip-back grid content-between border border-line bg-surface p-6 text-ink">
                    <div className="grid gap-4">
                      <span className="label text-[11px] text-[var(--accent-ink)]">How it works</span>
                      <p className="text-[15px] leading-relaxed text-muted">{p.summary}</p>
                    </div>
                    <div className="grid gap-4">
                      <TechList items={p.technologies.slice(0, 6)} variant="chips" />
                      <span className="label text-[11px] text-[var(--accent-ink)]">Read more →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
