import type { ApiErrorKind } from "@/lib/api/client";

const ERROR_COPY: Record<ApiErrorKind, string> = {
  unavailable: "The portfolio API could not be reached. Please try again in a moment.",
  invalid_response: "The portfolio API sent data this page could not read.",
  not_found: "This content could not be found.",
};

/** Shown when portfolio data fails to load. Never includes technical details. */
export function ErrorState({ what, error }: { what: string; error: ApiErrorKind }) {
  return (
    <div role="status" className="mt-10 rounded-[10px] border border-dashed border-line bg-surface/60 p-6">
      <p className="font-semibold">{what} are unavailable right now.</p>
      <p className="mt-1 text-muted">{ERROR_COPY[error]}</p>
    </div>
  );
}

/** Shown when a list loads successfully but has nothing in it yet. */
export function EmptyState({ message }: { message: string }) {
  return (
    <div role="status" className="mt-10 rounded-[10px] border border-dashed border-line p-6 text-muted">
      {message}
    </div>
  );
}
