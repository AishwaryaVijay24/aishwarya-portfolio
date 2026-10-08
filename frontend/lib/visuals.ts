import type { ProjectVisual } from "./api/types";

/**
 * Each project visual has its own accent (DESIGN.md §2, project accents).
 * `vivid` is for artwork on Night; `ink` is the text-safe shade for light surfaces.
 */
export const visualAccent: Record<ProjectVisual, { vivid: string; ink: string }> = {
  agents: { vivid: "var(--orchid)", ink: "var(--orchid-ink)" },
  pipeline: { vivid: "var(--sky)", ink: "var(--sky-ink)" },
  services: { vivid: "var(--teal)", ink: "var(--teal-ink)" },
  vectors: { vivid: "var(--lilac)", ink: "var(--violet)" },
  lowrank: { vivid: "var(--mint)", ink: "var(--mint-ink)" },
  app: { vivid: "var(--leaf)", ink: "var(--leaf-ink)" },
  network: { vivid: "var(--lilac)", ink: "var(--violet)" },
};

export const accentStyle = (visual: ProjectVisual) =>
  ({ "--accent": visualAccent[visual].vivid, "--accent-ink": visualAccent[visual].ink }) as React.CSSProperties;
