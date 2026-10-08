import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Timeline, type TimelineEntry } from "@/components/experience/Timeline";

const entries: TimelineEntry[] = [
  { key: "w", kind: "work", title: "Engineer", org: "Org", period: "Jan 2025 – Jul 2025", points: ["Point one", "Point two"], technologies: ["Java"] },
  { key: "s", kind: "study", title: "MSc, AI", org: "University", period: "Sept 2025 – Sept 2026" },
];

describe("Timeline", () => {
  it("labels work and education entries", () => {
    render(<Timeline entries={entries} />);
    expect(screen.getByText(/Work · Jan 2025/)).toBeInTheDocument();
    expect(screen.getByText(/Education · Sept 2025/)).toBeInTheDocument();
  });

  it("compact mode shows only the first point", () => {
    render(<Timeline entries={entries} />);
    expect(screen.getByText("Point one")).toBeInTheDocument();
    expect(screen.queryByText("Point two")).not.toBeInTheDocument();
  });

  it("detailed mode shows every point and the stack", () => {
    render(<Timeline entries={entries} detailed />);
    expect(screen.getByText("Point two")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Technologies" })).toHaveTextContent("Java");
  });
});
