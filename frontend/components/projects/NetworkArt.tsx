/**
 * Deterministic network-graph artwork (DESIGN.md §7, "Project card art"):
 * nodes, nearest-neighbour connections and one highlighted path.
 * Same seed, same picture, on the server and the client.
 */

function rng(seed: number) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

export function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

const W = 400;
const H = 320;
const r1 = (n: number) => Math.round(n * 10) / 10;

export function NetworkArt({ seed, className = "" }: { seed: number; className?: string }) {
  const rand = rng(seed);
  const nodes = Array.from({ length: 10 }, () => [40 + rand() * (W - 80), 30 + rand() * (H * 0.55)] as const);
  const dist = (a: number, b: number) => (nodes[a][0] - nodes[b][0]) ** 2 + (nodes[a][1] - nodes[b][1]) ** 2;
  const nearest = (i: number) =>
    nodes
      .map((_, j) => j)
      .filter((j) => j !== i)
      .sort((a, b) => dist(i, a) - dist(i, b));

  const edges: [number, number][] = [];
  const seen = new Set<string>();
  nodes.forEach((_, i) =>
    nearest(i)
      .slice(0, 2)
      .forEach((j) => {
        const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      }),
  );

  const path = [0];
  for (let step = 0; step < 4; step++) {
    const next = nearest(path[path.length - 1]).find((j) => !path.includes(j));
    if (next === undefined) break;
    path.push(next);
  }

  const dots: [number, number][] = [];
  for (let i = 0; i < 16; i++) for (let j = 0; j < 12; j++) if (rand() > 0.55) dots.push([(i + 0.5) * (W / 16), (j + 0.5) * (H / 12)]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className={`block size-full ${className}`} aria-hidden="true">
      {dots.map(([x, y], i) => (
        <circle key={`d${i}`} cx={r1(x)} cy={r1(y)} r="1.4" fill="var(--peri)" fillOpacity="0.35" />
      ))}
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={r1(nodes[a][0])} y1={r1(nodes[a][1])} x2={r1(nodes[b][0])} y2={r1(nodes[b][1])} stroke="var(--peri)" strokeOpacity="0.35" strokeWidth="1.2" />
      ))}
      <path
        d={path.map((k, n) => `${n ? "L" : "M"}${r1(nodes[k][0])} ${r1(nodes[k][1])}`).join(" ")}
        fill="none"
        stroke="var(--lilac)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {nodes.map(([x, y], k) => {
        const on = path.includes(k);
        return <circle key={`n${k}`} cx={r1(x)} cy={r1(y)} r={on ? 5 : 3.5} fill={on ? "var(--lilac)" : "var(--peri)"} fillOpacity={on ? 1 : 0.6} />;
      })}
    </svg>
  );
}
