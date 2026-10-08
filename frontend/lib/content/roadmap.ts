/**
 * How this portfolio is built, phase by phase.
 * This describes the site itself (from CLAUDE.md), not portfolio projects,
 * so it lives in the frontend rather than the database.
 */

export type PhaseStatus = "in_progress" | "planned";

export type Phase = {
  title: string;
  stack: string;
  detail: string;
  status: PhaseStatus;
};

export const roadmap: Phase[] = [
  {
    title: "Foundation",
    stack: "Next.js · FastAPI · PostgreSQL · Docker Compose",
    detail:
      "A Next.js frontend talking to a FastAPI backend and PostgreSQL, with migrations and seeded data, running locally with Docker Compose.",
    status: "in_progress",
  },
  {
    title: "Retrieval",
    stack: "pgvector · RAG",
    detail: "Portfolio content becomes searchable through retrieval, so answers can be grounded in verified information.",
    status: "planned",
  },
  {
    title: "Portfolio Agent",
    stack: "Read-only agent · MCP tools",
    detail: "An agent that answers questions about my verified work. It is read-only and never modifies portfolio data.",
    status: "planned",
  },
  {
    title: "Cloud",
    stack: "Kubernetes · AWS EKS · RDS · GitHub Actions",
    detail: "Containerised services deployed to AWS with CI/CD and observability.",
    status: "planned",
  },
];
