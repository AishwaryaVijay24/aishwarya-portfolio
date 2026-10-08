import type { Project } from "@/lib/api/types";

export const project = (overrides: Partial<Project> = {}): Project => ({
  slug: "sample-project",
  title: "Sample Project",
  summary: "A short summary.",
  description: null,
  status: "prototype",
  technologies: ["Python", "FastAPI"],
  period: "2026",
  category: "RAG",
  highlights: ["First point", "Second point", "Third point", "Fourth point"],
  repository_url: null,
  demo_url: null,
  paper_url: null,
  featured: true,
  ...overrides,
});
