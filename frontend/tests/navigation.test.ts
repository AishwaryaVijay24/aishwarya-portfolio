import { describe, expect, it } from "vitest";

import { isActivePath } from "@/components/navigation/NavLinks";

describe("isActivePath", () => {
  it("matches the section and its children only", () => {
    expect(isActivePath("/projects", "/projects")).toBe(true);
    expect(isActivePath("/projects/cyberresponse", "/projects")).toBe(true);
    expect(isActivePath("/projects-archive", "/projects")).toBe(false);
    expect(isActivePath("/", "/projects")).toBe(false);
  });
});
