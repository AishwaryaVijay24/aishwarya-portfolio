"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { TechList } from "@/components/technology/TechList";
import { Briefcase, GraduationCap, MapPin } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

export type TimelineEntry = {
  key: string;
  kind: "work" | "study";
  title: string;
  org: string;
  period: string;
  location?: string | null;
  summary?: string | null;
  points?: string[];
  technologies?: string[];
};

/**
 * Vertical timeline (DESIGN.md §7). The centre line fills as the visitor scrolls;
 * entries alternate sides on wide screens and slide in from their side.
 */
export function Timeline({ entries, detailed = false }: { entries: TimelineEntry[]; detailed?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative mt-14 grid gap-12" aria-label="Timeline">
      <span className="absolute top-0 bottom-0 left-[19px] w-px bg-line md:left-1/2" aria-hidden="true" />
      <motion.span
        className="timeline-line absolute top-0 bottom-0 left-[19px] w-[2px] -translate-x-[0.5px] bg-[var(--thread)] md:left-1/2"
        style={{ scaleY: reduceMotion ? 1 : scaleY }}
        aria-hidden="true"
      />
      {entries.map((e, i) => {
        const right = i % 2 === 1;
        const Icon = e.kind === "work" ? Briefcase : GraduationCap;
        return (
          <li key={e.key} className="relative grid grid-cols-[40px_1fr] gap-5 md:grid-cols-2 md:gap-16">
            <span
              className="relative z-10 grid size-10 place-items-center rounded-full border border-line bg-surface text-violet md:absolute md:left-1/2 md:-translate-x-1/2"
              aria-hidden="true"
            >
              <Icon size={18} />
            </span>
            <Reveal
              from={right ? "right" : "left"}
              className={`grid gap-2 ${right ? "md:col-start-2" : "md:col-start-1 md:text-right"} ${detailed ? "" : "md:max-w-[440px]"} ${right ? "" : "md:justify-self-end"}`}
            >
              <span className={`label flex items-center gap-2 text-[11px] text-violet ${right ? "" : "md:justify-end"}`}>
                {e.kind === "work" ? "Work" : "Education"} · {e.period}
              </span>
              <h3 className="condensed text-[clamp(22px,2.4vw,30px)] leading-[1.05] font-semibold tracking-[-0.01em]">{e.title}</h3>
              <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-muted ${right ? "" : "md:justify-end"}`}>
                <span className="font-medium text-ink">{e.org}</span>
                {e.location && (
                  <span className="inline-flex items-center gap-1 font-mono text-xs">
                    <MapPin size={13} aria-hidden="true" /> {e.location}
                  </span>
                )}
              </p>
              {e.summary && <p className="max-w-[56ch] text-muted">{e.summary}</p>}
              {detailed && e.points && e.points.length > 0 && (
                <ul className="mt-2 grid list-disc gap-1.5 pl-5 text-left text-[15px] text-muted marker:text-violet">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
              {!detailed && e.points && e.points[0] && <p className="max-w-[52ch] text-[15px] text-muted">{e.points[0]}</p>}
              {detailed && e.technologies && <TechList items={e.technologies} className={`mt-2 ${right ? "" : "md:justify-end"}`} />}
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
