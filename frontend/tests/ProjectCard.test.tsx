import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard, splitTitle } from "@/components/projects/ProjectCard";
import type { Project } from "@/lib/api/types";

const base: Project = {
  slug: "resurgent-intelligence",
  title: "Resurgent Intelligence",
  summary: "A short summary.",
  description: null,
  status: "planned",
  technologies: ["Python", "FastAPI"],
  repository_url: null,
  demo_url: null,
  featured: true,
};

describe("ProjectCard", () => {
  it("links to the project detail page", () => {
    render(<ProjectCard project={base} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/projects/resurgent-intelligence");
  });

  it("shows the project's status as text", () => {
    render(<ProjectCard project={base} />);
    expect(screen.getByText("Planned")).toBeInTheDocument();
  });

  it("labels prototypes and experiments honestly", () => {
    const { rerender } = render(<ProjectCard project={{ ...base, status: "prototype" }} />);
    expect(screen.getByText("Prototype")).toBeInTheDocument();
    rerender(<ProjectCard project={{ ...base, status: "experimental" }} />);
    expect(screen.getByText("Experimental")).toBeInTheDocument();
  });

  it("renders the full title, summary and technologies", () => {
    render(<ProjectCard project={base} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Resurgent Intelligence");
    expect(screen.getByText("A short summary.")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Technologies" })).toHaveTextContent("Python");
  });

  it("omits the summary when there is none", () => {
    render(<ProjectCard project={{ ...base, summary: null }} />);
    expect(screen.queryByText("A short summary.")).not.toBeInTheDocument();
  });
});

describe("splitTitle", () => {
  it("separates the last word for the display face", () => {
    expect(splitTitle("Resurgent Intelligence")).toEqual(["Resurgent ", "Intelligence"]);
    expect(splitTitle("CyberResponse")).toEqual(["", "CyberResponse"]);
  });
});
