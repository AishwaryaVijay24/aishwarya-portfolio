"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/api/types";
import { projectStatusLabel } from "@/lib/format";
import { splitTitle } from "@/lib/text";
import { accentStyle } from "@/lib/visuals";
import { seedFrom } from "./NetworkArt";
import { ProjectVisual } from "./ProjectVisual";

/**
 * Editorial index of all projects. Hovering a row (mouse) reveals a floating preview
 * that follows the cursor; rows slide in from the left one after another.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const activeProject = projects.find((p) => p.slug === active);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 24 });
  const sy = useSpring(y, { stiffness: 200, damping: 24 });

  return (
    <div
      className="relative mt-12"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ol aria-label="All projects">
        {projects.map((p, i) => {
          const [lead, last] = splitTitle(p.title);
          return (
            <Reveal as="li" key={p.slug} from="left" delay={i * 80} className="numbered-row" style={accentStyle(p.visual)}>
              <Link
                href={`/projects/${p.slug}`}
                className="row-main group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 py-7 no-underline lg:grid-cols-[72px_minmax(0,1fr)_200px_110px_120px]"
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(p.slug)}
                onFocus={() => setActive(null)}
                data-cursor="view"
              >
                <span className="display-word text-[34px] leading-none text-[var(--accent-ink)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="condensed text-[clamp(28px,3.4vw,44px)] leading-none font-semibold tracking-[-0.02em] group-hover:text-[var(--accent-ink)]">
                  {lead}
                  <em className="display-word">{last}</em>
                </span>
                <span className="col-start-2 font-mono text-xs text-muted lg:col-start-auto">{p.category}</span>
                <span className="col-start-2 font-mono text-xs text-muted lg:col-start-auto">{p.period}</span>
                <span className="label col-start-2 text-[11px] text-[var(--accent-ink)] lg:col-start-auto lg:justify-self-end">{projectStatusLabel[p.status]}</span>
              </Link>
            </Reveal>
          );
        })}
      </ol>

      {!reduceMotion && (
        <motion.div className="pointer-events-none fixed top-0 left-0 z-40 hidden md:block" style={{ x: sx, y: sy }} aria-hidden="true">
          <AnimatePresence>
            {activeProject && (
              <motion.div
                key={activeProject.slug}
                className="on-night -translate-x-1/2 translate-y-6 overflow-hidden rounded-[10px] bg-night p-3 shadow-[0_30px_60px_-30px_rgb(10_8_30/0.7)]"
                style={{ width: 260, height: 190 }}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <div className="size-full" style={accentStyle(activeProject.visual)}>
                  <ProjectVisual kind={activeProject.visual} seed={seedFrom(activeProject.slug)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
