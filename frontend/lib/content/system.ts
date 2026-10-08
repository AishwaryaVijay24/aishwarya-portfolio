/**
 * Layers of the portfolio's own architecture, for the Living System diagram.
 * `current` layers belong to Phase 1; everything else is planned and must be labelled so.
 */

export type SystemNode = {
  id: string;
  label: string;
  tag?: string;
  x: number;
  y: number;
  w: number;
  current: boolean;
};

export type SystemEdge = { from: string; to: string };

export const systemNodes: SystemNode[] = [
  { id: "browser", label: "Browser", x: 20, y: 120, w: 110, current: true },
  { id: "next", label: "Next.js", x: 190, y: 120, w: 110, current: true },
  { id: "api", label: "FastAPI", x: 360, y: 120, w: 110, current: true },
  { id: "db", label: "PostgreSQL", x: 540, y: 120, w: 130, current: true },
  { id: "rag", label: "Retrieval", tag: "pgvector", x: 540, y: 220, w: 130, current: false },
  { id: "agent", label: "Agent", tag: "read-only", x: 360, y: 220, w: 110, current: false },
  { id: "mcp", label: "MCP tools", x: 360, y: 20, w: 110, current: false },
  { id: "cloud", label: "AWS", tag: "EKS · RDS", x: 730, y: 120, w: 110, current: false },
];

export const systemEdges: SystemEdge[] = [
  { from: "browser", to: "next" },
  { from: "next", to: "api" },
  { from: "api", to: "db" },
  { from: "db", to: "rag" },
  { from: "rag", to: "agent" },
  { from: "agent", to: "api" },
  { from: "agent", to: "mcp" },
  { from: "db", to: "cloud" },
];

/** An edge is current only when both ends are current. */
export function isCurrentEdge(edge: SystemEdge): boolean {
  const byId = new Map(systemNodes.map((n) => [n.id, n]));
  return Boolean(byId.get(edge.from)?.current && byId.get(edge.to)?.current);
}
