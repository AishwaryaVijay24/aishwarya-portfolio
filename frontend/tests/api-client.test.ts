import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Outside a Next.js request there is no connection to wait for.
vi.mock("next/server", () => ({ connection: async () => {} }));

import { apiGet } from "@/lib/api/client";
import { arrayOf, isProject, type Project } from "@/lib/api/types";

const project: Project = {
  slug: "cyberresponse",
  title: "CyberResponse",
  summary: null,
  description: null,
  status: "prototype",
  technologies: [],
  period: null,
  category: null,
  highlights: [],
  repository_url: null,
  demo_url: null,
  paper_url: null,
  visual: "network",
  featured: true,
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("apiGet", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("API_BASE_URL", "http://backend:8000/");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it("returns validated data and calls the configured backend without caching", async () => {
    fetchMock.mockResolvedValue(json([project]));
    const result = await apiGet("/api/projects", arrayOf(isProject));
    expect(result).toEqual({ ok: true, data: [project] });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://backend:8000/api/projects");
    expect(init.cache).toBe("no-store");
  });

  it("maps 404 on a single-item lookup to not_found", async () => {
    fetchMock.mockResolvedValue(json({ detail: "Not found" }, 404));
    expect(await apiGet("/api/projects/missing", isProject, { notFoundMeansMissing: true })).toEqual({ ok: false, error: "not_found" });
  });

  it("treats 404 on a list endpoint as an unavailable backend", async () => {
    // e.g. API_BASE_URL pointing at a different service
    fetchMock.mockResolvedValue(json({ detail: "Not Found" }, 404));
    expect(await apiGet("/api/projects", arrayOf(isProject))).toEqual({ ok: false, error: "unavailable" });
  });

  it("maps server errors to unavailable", async () => {
    fetchMock.mockResolvedValue(json({ detail: "boom" }, 500));
    expect(await apiGet("/api/projects", arrayOf(isProject))).toEqual({ ok: false, error: "unavailable" });
  });

  it("maps network failures to unavailable", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));
    expect(await apiGet("/api/projects", arrayOf(isProject))).toEqual({ ok: false, error: "unavailable" });
  });

  it("rejects responses with an unexpected shape", async () => {
    fetchMock.mockResolvedValue(json([{ ...project, status: "launched" }]));
    expect(await apiGet("/api/projects", arrayOf(isProject))).toEqual({ ok: false, error: "invalid_response" });
  });

  it("never puts error details in the result", async () => {
    fetchMock.mockRejectedValue(new Error("connect ECONNREFUSED 10.0.0.5:8000"));
    const result = await apiGet("/api/projects", arrayOf(isProject));
    expect(JSON.stringify(result)).not.toContain("ECONNREFUSED");
  });
});
