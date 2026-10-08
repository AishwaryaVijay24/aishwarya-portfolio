import type { ProjectVisual as Kind } from "@/lib/api/types";
import { NetworkArt } from "./NetworkArt";

/**
 * Project artwork chosen per project (DESIGN.md §7, "Project visuals"). Each one depicts
 * what the project actually does, using only facts from its verified description.
 * Drawn for a Night background; colour comes from the project's accent (--accent).
 */

const W = 400;
const H = 300;
const label = { fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.06em" } as const;
const A = "var(--accent)";
const MUTED = "var(--night-muted)";
const LINE = "color-mix(in srgb, var(--on-night) 22%, transparent)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="block size-full" aria-hidden="true">
      {children}
    </svg>
  );
}

/** CyberResponse v2: a supervisor coordinating triage and evidence agents, MCP tools around it, human approval before any case change. */
function Agents() {
  const tools = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return [200 + Math.cos(a) * 118, 150 + Math.sin(a) * 104] as const;
  });
  return (
    <Frame>
      <g className="pv-orbit">
        <ellipse cx="200" cy="150" rx="118" ry="104" fill="none" stroke={LINE} strokeDasharray="3 6" />
        {tools.map(([x, y], i) => (
          <rect key={i} x={x - 9} y={y - 9} width="18" height="18" rx="4" fill="none" stroke={A} strokeOpacity="0.7" />
        ))}
      </g>
      <text x="200" y="28" textAnchor="middle" fill={MUTED} style={label}>MCP TOOLS</text>
      <line x1="200" y1="150" x2="132" y2="196" stroke={A} strokeOpacity="0.6" />
      <line x1="200" y1="150" x2="268" y2="196" stroke={A} strokeOpacity="0.6" />
      <circle cx="200" cy="150" r="30" fill={A} fillOpacity="0.18" stroke={A} strokeWidth="1.5" />
      <circle cx="200" cy="150" r="6" fill={A} className="pv-pulse" />
      <text x="200" y="104" textAnchor="middle" fill="var(--on-night)" style={label}>SUPERVISOR</text>
      <circle cx="132" cy="196" r="16" fill="var(--night)" stroke={A} />
      <circle cx="268" cy="196" r="16" fill="var(--night)" stroke={A} />
      <text x="132" y="230" textAnchor="middle" fill={MUTED} style={label}>triage</text>
      <text x="268" y="230" textAnchor="middle" fill={MUTED} style={label}>evidence</text>
      <rect x="160" y="252" width="80" height="26" rx="13" fill="none" stroke={A} strokeDasharray="4 3" />
      <path d="M180 265 l6 6 l12 -12" fill="none" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <text x="248" y="269" fill={MUTED} style={label}>human approval</text>
    </Frame>
  );
}

/** SciClaim: claim → rewrite → BM25 + dense fused to 20 candidates → cross-encoder top 3 → verdict. */
function Pipeline() {
  const bar = (x: number, y: number, w: number, o = 0.5) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height="6" rx="3" fill={A} fillOpacity={o} />;
  return (
    <Frame>
      <rect x="18" y="128" width="62" height="44" rx="8" fill="none" stroke={A} strokeWidth="1.5" />
      <text x="49" y="155" textAnchor="middle" fill="var(--on-night)" style={label}>claim</text>
      <path d="M80 150 C 105 150, 105 100, 130 100 M80 150 C 105 150, 105 200, 130 200" fill="none" stroke={LINE} />
      <text x="132" y="86" fill={MUTED} style={label}>BM25</text>
      <text x="132" y="226" fill={MUTED} style={label}>dense</text>
      <rect x="130" y="94" width="64" height="12" rx="6" fill="none" stroke={A} strokeOpacity="0.5" />
      <rect x="130" y="194" width="64" height="12" rx="6" fill="none" stroke={A} strokeOpacity="0.5" />
      <path d="M194 100 C 215 100, 215 150, 232 150 M194 200 C 215 200, 215 150, 232 150" fill="none" stroke={LINE} />
      <g>{Array.from({ length: 8 }, (_, i) => bar(236, 110 + i * 10, 54, 0.25 + (i % 3) * 0.12))}</g>
      <text x="263" y="100" textAnchor="middle" fill={MUTED} style={label}>top 20</text>
      <path d="M296 150 L 312 150" stroke={LINE} />
      <g>{[0, 1, 2].map((i) => bar(316, 134 + i * 12, 40, 0.9))}</g>
      <text x="336" y="124" textAnchor="middle" fill={MUTED} style={label}>top 3</text>
      <rect x="308" y="196" width="76" height="26" rx="13" fill={A} fillOpacity="0.2" stroke={A} />
      <text x="346" y="213" textAnchor="middle" fill="var(--on-night)" style={label}>verdict</text>
      <path d="M336 174 L 346 194" stroke={LINE} />
      <circle cx="84" cy="150" r="3.5" fill={A} className="pv-flow" style={{ "--dx": "230px" } as React.CSSProperties} />
    </Frame>
  );
}

/** CyberResponse: microservices (API, AI worker, notifications) over Redis and PostgreSQL, with an operator dashboard. */
function Services() {
  const box = (x: number, name: string) => (
    <g key={name}>
      <rect x={x} y="40" width="92" height="52" rx="8" fill={A} fillOpacity="0.12" stroke={A} />
      <text x={x + 46} y="70" textAnchor="middle" fill="var(--on-night)" style={label}>{name}</text>
      <line x1={x + 46} y1="92" x2={x + 46} y2="140" stroke={LINE} />
    </g>
  );
  return (
    <Frame>
      {box(24, "API")}
      {box(154, "AI worker")}
      {box(284, "notify")}
      <rect x="24" y="140" width="352" height="30" rx="15" fill="none" stroke={A} strokeDasharray="5 4" />
      <text x="40" y="159" fill={MUTED} style={label}>REDIS QUEUE</text>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={150 + i * 22} y="150" width="14" height="10" rx="2" fill={A} className="pv-flow" style={{ "--dx": "180px", animationDelay: `${i * 0.9}s` } as React.CSSProperties} />
      ))}
      <ellipse cx="110" cy="210" rx="52" ry="12" fill="none" stroke={A} />
      <path d="M58 210 v44 a52 12 0 0 0 104 0 v-44" fill="none" stroke={A} />
      <text x="110" y="244" textAnchor="middle" fill={MUTED} style={label}>PostgreSQL</text>
      <line x1="110" y1="170" x2="110" y2="198" stroke={LINE} />
      <rect x="214" y="196" width="162" height="84" rx="8" fill="none" stroke={LINE} />
      <rect x="214" y="196" width="162" height="16" rx="8" fill={A} fillOpacity="0.18" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="226" y={222 + i * 16} width={110 - i * 24} height="7" rx="3.5" fill={A} fillOpacity={0.5 - i * 0.1} />
      ))}
      <text x="295" y="190" textAnchor="middle" fill={MUTED} style={label}>operator dashboard</text>
    </Frame>
  );
}

/** Qwen RAG: chunks embedded into a vector space; the query retrieves its nearest neighbours. */
// Fixed layout, computed once: three clusters of embedded chunks and a query point.
const VECTOR_POINTS = (() => {
  let s = 7;
  const rand = () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
  const centres = [
    [110, 110],
    [270, 90],
    [230, 210],
  ];
  return Array.from({ length: 54 }, (_, i) => {
    const [cx, cy] = centres[i % 3];
    return [cx + (rand() - 0.5) * 110, cy + (rand() - 0.5) * 80] as const;
  });
})();
const QUERY = [215, 150] as const;
const NEAREST = [...VECTOR_POINTS]
  .sort((a, b) => (a[0] - QUERY[0]) ** 2 + (a[1] - QUERY[1]) ** 2 - ((b[0] - QUERY[0]) ** 2 + (b[1] - QUERY[1]) ** 2))
  .slice(0, 5);

function Vectors() {
  const pts = VECTOR_POINTS;
  const q = QUERY;
  const near = NEAREST;
  return (
    <Frame>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={i % 3 === 0 ? "var(--peri)" : A} fillOpacity="0.55" />
      ))}
      <circle cx={q[0]} cy={q[1]} r="46" fill="none" stroke={A} strokeDasharray="3 4" className="pv-pulse" />
      {near.map(([x, y], i) => (
        <line key={i} x1={q[0]} y1={q[1]} x2={x} y2={y} stroke={A} strokeOpacity="0.7" />
      ))}
      <path d={`M${q[0]} ${q[1] - 8} l2.4 5.6 6 .6 -4.6 4 1.4 6 -5.2 -3.2 -5.2 3.2 1.4 -6 -4.6 -4 6 -.6z`} fill="var(--on-night)" />
      <text x={q[0] + 12} y={q[1] - 12} fill="var(--on-night)" style={label}>query</text>
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={24 + i * 52} y="262" width="44" height="18" rx="4" fill="none" stroke={LINE} />
      ))}
      <text x="24" y="254" fill={MUTED} style={label}>chunks → embeddings</text>
    </Frame>
  );
}

/** ML Tutor LoRA: frozen base weights W plus a trainable low-rank update B·A. */
function LowRank() {
  const cell = 14;
  return (
    <Frame>
      <g>
        {Array.from({ length: 10 * 10 }, (_, i) => (
          <rect key={i} x={30 + (i % 10) * cell} y={60 + Math.floor(i / 10) * cell} width={cell - 3} height={cell - 3} rx="2" fill="var(--on-night)" fillOpacity={0.06 + ((i * 37) % 9) * 0.012} />
        ))}
      </g>
      <text x="100" y="48" textAnchor="middle" fill={MUTED} style={label}>W · frozen</text>
      <text x="196" y="138" textAnchor="middle" fill="var(--on-night)" style={{ ...label, fontSize: 22 }}>+</text>
      <g>
        {Array.from({ length: 10 * 2 }, (_, i) => (
          <rect key={i} x={226 + (i % 2) * cell} y={60 + Math.floor(i / 2) * cell} width={cell - 3} height={cell - 3} rx="2" fill={A} fillOpacity={0.45 + (i % 3) * 0.15} />
        ))}
      </g>
      <text x="246" y="48" textAnchor="middle" fill={MUTED} style={label}>B</text>
      <text x="270" y="138" textAnchor="middle" fill="var(--on-night)" style={{ ...label, fontSize: 16 }}>×</text>
      <g className="pv-pulse">
        {Array.from({ length: 2 * 6 }, (_, i) => (
          <rect key={i} x={286 + (i % 6) * cell} y={116 + Math.floor(i / 6) * cell} width={cell - 3} height={cell - 3} rx="2" fill={A} fillOpacity={0.5 + (i % 2) * 0.3} />
        ))}
      </g>
      <text x="328" y="104" textAnchor="middle" fill={MUTED} style={label}>A</text>
      <text x="200" y="250" textAnchor="middle" fill="var(--on-night)" style={label}>W + B·A   ·   rank-r adapter</text>
    </Frame>
  );
}

/** EcoEats: a web app screen for a food-waste platform (abstract UI, no invented data). */
function App() {
  return (
    <Frame>
      <rect x="60" y="24" width="280" height="252" rx="14" fill="none" stroke={LINE} />
      <rect x="60" y="24" width="280" height="30" rx="14" fill={A} fillOpacity="0.14" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={78 + i * 12} cy="39" r="3.5" fill="var(--on-night)" fillOpacity="0.3" />
      ))}
      <path d="M200 78 c 26 4 34 26 26 48 c -22 4 -40 -10 -40 -32 c 0 -6 4 -12 14 -16z" fill={A} fillOpacity="0.85" className="pv-pulse" />
      <path d="M200 78 C 206 96, 214 108, 226 126" stroke="var(--night)" strokeWidth="2" fill="none" />
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <g key={`${r}${c}`}>
            <rect x={82 + c * 122} y={150 + r * 58} width="114" height="48" rx="8" fill={A} fillOpacity="0.08" stroke={A} strokeOpacity="0.4" />
            <circle cx={100 + c * 122} cy={174 + r * 58} r="9" fill={A} fillOpacity="0.5" />
            <rect x={116 + c * 122} y={166 + r * 58} width="64" height="6" rx="3" fill="var(--on-night)" fillOpacity="0.35" />
            <rect x={116 + c * 122} y={178 + r * 58} width="42" height="6" rx="3" fill="var(--on-night)" fillOpacity="0.18" />
          </g>
        )),
      )}
    </Frame>
  );
}

export function ProjectVisual({ kind, seed }: { kind: Kind; seed: number }) {
  switch (kind) {
    case "agents":
      return <Agents />;
    case "pipeline":
      return <Pipeline />;
    case "services":
      return <Services />;
    case "vectors":
      return <Vectors />;
    case "lowrank":
      return <LowRank />;
    case "app":
      return <App />;
    default:
      return <NetworkArt seed={seed} />;
  }
}
