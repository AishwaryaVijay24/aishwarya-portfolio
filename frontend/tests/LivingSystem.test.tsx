import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LivingSystem } from "@/components/architecture/LivingSystem";
import { isCurrentEdge, systemEdges, systemNodes } from "@/lib/content/system";

describe("LivingSystem", () => {
  it("labels every layer as Phase 1 or planned", () => {
    render(<LivingSystem />);
    for (const node of systemNodes) {
      const label = new RegExp(`^${node.label}.*${node.current ? "Phase 1" : "planned"}$`);
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it("only animates requests through Phase 1 connections", () => {
    const { container } = render(<LivingSystem />);
    expect(container.querySelectorAll(".pulse")).toHaveLength(systemEdges.filter(isCurrentEdge).length);
  });

  it("does not present planned layers as built", () => {
    const planned = systemNodes.filter((n) => !n.current).map((n) => n.id);
    expect(planned).toEqual(expect.arrayContaining(["rag", "agent", "mcp", "cloud"]));
  });
});
