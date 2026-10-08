import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { project } from "./fixtures";

describe("ProjectIndex", () => {
  it("lists every project in order with honest status labels", () => {
    render(
      <ProjectIndex
        projects={[project({ slug: "a", title: "Alpha", status: "completed" }), project({ slug: "b", title: "Beta Two", status: "planned" })]}
      />,
    );
    const rows = within(screen.getByRole("list", { name: "All projects" })).getAllByRole("listitem");
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveTextContent("01");
    expect(rows[0]).toHaveTextContent("Completed");
    expect(within(rows[1]).getByRole("link")).toHaveAttribute("href", "/projects/b");
    expect(rows[1]).toHaveTextContent("Planned");
  });
});
