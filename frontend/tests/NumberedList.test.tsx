import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NumberedList } from "@/components/experience/NumberedList";

describe("NumberedList", () => {
  it("renders items in order with zero-padded numbers", () => {
    render(
      <NumberedList
        label="Build phases"
        items={[
          { key: "a", title: "Foundation", meta: "Next.js" },
          { key: "b", title: "Retrieval" },
        ]}
      />,
    );
    const list = screen.getByRole("list", { name: "Build phases" });
    const rows = within(list).getAllByRole("listitem");
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveTextContent("01");
    expect(rows[0]).toHaveTextContent("Foundation");
    expect(rows[1]).toHaveTextContent("02");
  });

  it("keeps content visible before any reveal animation", () => {
    render(<NumberedList label="L" items={[{ key: "a", title: "Visible" }]} />);
    expect(screen.getByRole("listitem")).not.toHaveAttribute("data-pre", "true");
  });
});
