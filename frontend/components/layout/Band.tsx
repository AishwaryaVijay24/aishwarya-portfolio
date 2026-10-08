"use client";

import { useRef } from "react";

export type Surface = "plain" | "grid" | "tint" | "paper" | "dots" | "wash";

/**
 * Full-width section background inside the threaded body (DESIGN.md §7, "Section surfaces").
 * Each section picks its own surface so neighbouring sections never share a background.
 * Only the graph-paper surface has the cursor glow.
 */
export function Band({ surface = "plain", children, className = "" }: { surface?: Surface; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const glow = surface === "grid";

  return (
    <div
      ref={ref}
      className={`band ${surface === "plain" ? "" : `surface-${surface}`} ${className}`}
      onPointerMove={
        glow
          ? (e) => {
              if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
              const el = ref.current!;
              const r = el.getBoundingClientRect();
              el.style.setProperty("--mx", `${e.clientX - r.left}px`);
              el.style.setProperty("--my", `${e.clientY - r.top}px`);
              el.dataset.glow = "true";
            }
          : undefined
      }
      onPointerLeave={glow ? () => (ref.current!.dataset.glow = "false") : undefined}
    >
      {glow && <div className="grid-glow" aria-hidden="true" />}
      {children}
    </div>
  );
}
