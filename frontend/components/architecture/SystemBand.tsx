"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Full-width Night moment inside the threaded body. It grows from an inset panel to the
 * full viewport width as it scrolls into view, so the page "opens up" at this section.
 */
export function SystemBand({ children, labelledBy }: { children: React.ReactNode; labelledBy: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const clipPath = useTransform(scrollYProgress, (p) => {
    const t = Math.min(Math.max(p, 0), 1);
    return `inset(0 ${(1 - t) * 4}% round ${(1 - t) * 24}px)`;
  });

  return (
    <motion.section
      ref={ref}
      aria-labelledby={labelledBy}
      className="on-night relative mt-[clamp(80px,12vw,150px)] -mr-[var(--rail)] -ml-[calc(var(--rail)+var(--rail-gap))] overflow-hidden bg-night text-on-night"
      style={reduceMotion ? undefined : { clipPath }}
    >
      <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full border border-dashed border-on-night/10 spin-slow" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-56 -left-24 size-[420px] rounded-full border border-on-night/5" aria-hidden="true" />
      <div className="relative px-[var(--rail)] py-[clamp(80px,10vw,128px)] md:px-[calc(var(--rail)+var(--rail-gap))]">{children}</div>
    </motion.section>
  );
}
