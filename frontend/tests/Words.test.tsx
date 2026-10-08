import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Words } from "@/components/motion/Words";
import { splitTitle } from "@/lib/text";

describe("Words", () => {
  it("keeps the full text, including emphasised words", () => {
    const { container } = render(
      <h2>
        <Words>
          <>
            Selected <em>work</em> here
          </>
        </Words>
      </h2>,
    );
    expect(container.textContent).toBe("Selected work here");
    expect(container.querySelector("em")).toHaveTextContent("work");
    expect(container.querySelectorAll(".w")).toHaveLength(3);
  });
});

describe("splitTitle", () => {
  it("separates the last word for the display face", () => {
    expect(splitTitle("Qwen RAG Knowledge Assistant")).toEqual(["Qwen RAG Knowledge ", "Assistant"]);
    expect(splitTitle("SciClaim")).toEqual(["", "SciClaim"]);
  });
});
