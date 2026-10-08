import "server-only";

import { unstable_rethrow } from "next/navigation";
import { connection } from "next/server";

import type { Guard } from "./types";

/**
 * Server-side client for the FastAPI backend.
 *
 * Browser → Next.js (this module) → FastAPI → PostgreSQL.
 * Every call returns a result instead of throwing, so pages can render
 * error and empty states. Details are logged on the server and never sent
 * to the browser.
 */

export type ApiErrorKind = "not_found" | "unavailable" | "invalid_response";

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiErrorKind };

const TIMEOUT_MS = 5000;

export function apiBaseUrl(): string {
  return (process.env.API_BASE_URL ?? "http://localhost:8000").replace(/\/+$/, "");
}

type Options = {
  /**
   * Set for single-item lookups, where 404 means "no such item".
   * For list endpoints a 404 means the backend is missing or misconfigured.
   */
  notFoundMeansMissing?: boolean;
};

export async function apiGet<T>(path: string, guard: Guard<T>, { notFoundMeansMissing = false }: Options = {}): Promise<ApiResult<T>> {
  // Portfolio data is read per request, never baked into the build.
  await connection();
  const url = `${apiBaseUrl()}${path}`;
  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (cause) {
    // Let Next.js's own control-flow errors (e.g. prerender interrupts) through.
    unstable_rethrow(cause);
    console.error(`[api] GET ${url} failed: ${cause instanceof Error ? cause.message : String(cause)}. Is API_BASE_URL correct?`);
    return { ok: false, error: "unavailable" };
  }

  if (response.status === 404 && notFoundMeansMissing) return { ok: false, error: "not_found" };
  if (!response.ok) {
    const hint = response.status === 404 ? " (endpoint missing: is API_BASE_URL pointing at the portfolio backend?)" : "";
    console.error(`[api] GET ${url} returned ${response.status}${hint}`);
    return { ok: false, error: "unavailable" };
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    console.error(`[api] GET ${url} returned invalid JSON`);
    return { ok: false, error: "invalid_response" };
  }

  if (!guard(body)) {
    console.error(`[api] GET ${url} returned an unexpected shape`);
    return { ok: false, error: "invalid_response" };
  }
  return { ok: true, data: body };
}
