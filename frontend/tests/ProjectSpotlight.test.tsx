import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectSpotlight } from "@/components/projects/ProjectSpotlight";
import { project } from "./fixtures";

describe("ProjectSpotlight", () => {
  it("links the title to the case study", () => {
    render(<ProjectSpotlight project={project()} index={0} />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Sample Project");
    expect(heading.querySelector("a")).toHaveAttribute("href", "/projects/sample-project");
  });

  it("labels the status honestly", () => {
    const { rerender } = render(<ProjectSpotlight project={project({ status: "experimental" })} index={0} />);
    expect(screen.getByText("Experimental")).toBeInTheDocument();
    rerender(<ProjectSpotlight project={project({ status: "in_progress" })} index={0} />);
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  it("shows at most three highlights", () => {
    render(<ProjectSpotlight project={project()} index={0} />);
    expect(screen.getByText("Third point")).toBeInTheDocument();
    expect(screen.queryByText("Fourth point")).not.toBeInTheDocument();
  });

  it("only renders links that exist", () => {
    const { rerender } = render(<ProjectSpotlight project={project()} index={0} />);
    expect(screen.queryByRole("link", { name: /source for/i })).not.toBeInTheDocument();
    rerender(<ProjectSpotlight project={project({ repository_url: "https://github.com/x/y", paper_url: "https://doi.org/1" })} index={0} />);
    expect(screen.getByRole("link", { name: /source for sample project/i })).toHaveAttribute("href", "https://github.com/x/y");
    expect(screen.getByRole("link", { name: /paper for sample project/i })).toHaveAttribute("href", "https://doi.org/1");
  });

  it("hides the duplicate artwork link from assistive technology", () => {
    render(<ProjectSpotlight project={project()} index={0} />);
    const caseStudy = screen.getAllByRole("link").filter((l) => l.getAttribute("href") === "/projects/sample-project");
    // Title link + "Read the case study"; the artwork link is aria-hidden.
    expect(caseStudy).toHaveLength(2);
  });
});
