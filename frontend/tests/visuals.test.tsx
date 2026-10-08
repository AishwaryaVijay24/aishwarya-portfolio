import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { TechList } from "@/components/technology/TechList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isDarkBrand, techIcon } from "@/lib/techIcons";

describe("tech logos", () => {
  it("maps real technologies to their own logos", () => {
    expect(techIcon("Python")?.title).toBe("Python");
    expect(techIcon("PostgreSQL")?.title).toBe("PostgreSQL");
    expect(techIcon("GitLab CI/CD")?.title).toBe("GitLab");
  });

  it("never borrows a logo for concepts", () => {
    for (const concept of ["RAG", "Microservices", "Embeddings", "ML classification", "REST APIs"]) {
      expect(techIcon(concept)).toBeUndefined();
    }
  });

  it("renders near-black brand logos in the text colour so they stay visible in dark mode", () => {
    expect(isDarkBrand("000000")).toBe(true);
    expect(isDarkBrand("3776AB")).toBe(false);
    const { container } = render(<TechList items={["Next.js", "Python"]} />);
    const [next, python] = container.querySelectorAll("svg");
    expect(next.getAttribute("fill")).toBe("currentColor");
    expect(python.getAttribute("fill")).toBe("#3776AB");
  });
});

describe("ProjectVisual", () => {
  it("draws a different visual for each kind", () => {
    const kinds = ["agents", "pipeline", "services", "vectors", "lowrank", "app"] as const;
    const markup = kinds.map((kind) => render(<ProjectVisual kind={kind} seed={1} />).container.innerHTML);
    expect(new Set(markup).size).toBe(kinds.length);
  });

  it("labels the agents visual with the project's real components", () => {
    const { container } = render(<ProjectVisual kind="agents" seed={1} />);
    expect(container.textContent).toContain("SUPERVISOR");
    expect(container.textContent).toContain("human approval");
  });
});

describe("SectionHeading", () => {
  it("applies the requested typographic voice", () => {
    const { container } = render(<SectionHeading index="01" label="Research" id="h" title="Research" font="serif" />);
    expect(container.querySelector("h2")?.className).toContain("type-serif");
  });
});
