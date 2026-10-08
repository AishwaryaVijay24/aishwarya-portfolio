"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";

import { isCurrentEdge, systemEdges, systemNodes } from "@/lib/content/system";

const NODE_H = 44;

function edgePath(fromId: string, toId: string) {
  const a = systemNodes.find((n) => n.id === fromId)!;
  const b = systemNodes.find((n) => n.id === toId)!;
  const ax = a.x + a.w / 2;
  const ay = a.y + NODE_H / 2;
  const bx = b.x + b.w / 2;
  const by = b.y + NODE_H / 2;
  if (ay === by) return `M ${a.x + a.w} ${ay} L ${b.x} ${by}`;
  if (ax === bx) return ay < by ? `M ${ax} ${a.y + NODE_H} L ${bx} ${b.y}` : `M ${ax} ${a.y} L ${bx} ${b.y + NODE_H}`;
  const mx = (ax + bx) / 2;
  return `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${by}, ${bx} ${by}`;
}

/**
 * The supporting visual (DESIGN.md §8): the portfolio's own architecture.
 * Phase 1 layers are solid with signals moving through them; planned layers are outlined.
 */
export function LivingSystem({ bare = false }: { bare?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [hot, setHot] = useState<string | null>(null);
  const linked = new Set<string>();
  if (hot) {
    linked.add(hot);
    systemEdges.forEach((e) => {
      if (e.from === hot) linked.add(e.to);
      if (e.to === hot) linked.add(e.from);
    });
  }

  return (
    <figure className={bare ? "" : "mt-12"}>
      <div
        className={`on-night system overflow-x-auto text-on-night ${bare ? "rounded-[10px] border border-on-night/10 p-[clamp(12px,2vw,24px)]" : "rounded-[10px] bg-night p-[clamp(16px,3vw,32px)]"}`}
      >
        <svg
          viewBox="0 0 860 300"
          className="block h-auto w-full min-w-[640px]"
          role="img"
          aria-label="Architecture diagram. Phase 1: Browser to Next.js to FastAPI to PostgreSQL. Planned: retrieval with pgvector, a read-only Portfolio Agent with MCP tools, and AWS hosting."
        >
          <g>
            {systemEdges.map((e, i) => (
              <path
                key={`${e.from}-${e.to}`}
                id={`edge-${i}`}
                className="edge"
                d={edgePath(e.from, e.to)}
                data-planned={!isCurrentEdge(e)}
                data-hot={hot !== null && (e.from === hot || e.to === hot)}
              />
            ))}
          </g>
          {!reduceMotion && (
            <g>
              {systemEdges.map((e, i) =>
                isCurrentEdge(e) ? (
                  <circle key={`pulse-${i}`} className="pulse" r="3.5" opacity="0">
                    <set attributeName="opacity" to="1" begin={`${i * 0.5}s`} />
                    <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}>
                      <mpath href={`#edge-${i}`} />
                    </animateMotion>
                  </circle>
                ) : null,
              )}
            </g>
          )}
          <g>
            {systemNodes.map((n) => (
              <g
                key={n.id}
                className="node"
                tabIndex={0}
                aria-label={`${n.label}${n.tag ? `, ${n.tag}` : ""}, ${n.current ? "Phase 1" : "planned"}`}
                data-planned={!n.current}
                data-hot={linked.has(n.id)}
                onPointerEnter={() => setHot(n.id)}
                onPointerLeave={() => setHot(null)}
                onFocus={() => setHot(n.id)}
                onBlur={() => setHot(null)}
              >
                <rect x={n.x} y={n.y} width={n.w} height={NODE_H} rx="6" />
                <text x={n.x + n.w / 2} y={n.y + (n.tag ? 19 : 27)} textAnchor="middle">
                  {n.label}
                </text>
                {n.tag && (
                  <text className="tag" x={n.x + n.w / 2} y={n.y + 34} textAnchor="middle">
                    {n.tag}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>
      <figcaption className={`mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs ${bare ? "text-night-muted" : "text-muted"}`}>
        <span className="inline-flex items-center gap-2">
          <i className={`inline-block h-2.5 w-3.5 rounded-sm ${bare ? "bg-lilac" : "bg-violet"}`} aria-hidden="true" /> Phase 1, in progress
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="inline-block h-2.5 w-3.5 rounded-sm shadow-[inset_0_0_0_1px_var(--muted)]" aria-hidden="true" /> Planned
        </span>
      </figcaption>
    </figure>
  );
}
