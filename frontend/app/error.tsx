"use client";

import Link from "next/link";

// Route error boundary. Shows a calm message only; error details stay in the server logs.
export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div className="px-[var(--rail)] pt-40 pb-24">
      <p className="label text-violet">Something went wrong</p>
      <h1 className="condensed mt-4 text-[clamp(40px,6vw,72px)] leading-none font-semibold tracking-[-0.03em]">This page could not load</h1>
      <p className="mt-5 max-w-[56ch] text-lg text-muted">Please try again. If it keeps happening, the rest of the site should still work.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => retry()} className="btn btn-solid">
          Try again
        </button>
        <Link href="/" className="btn btn-outline">
          Go home
        </Link>
      </div>
    </div>
  );
}
