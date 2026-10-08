import Link from "next/link";

import { PageHero } from "@/components/layout/PageHero";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        seed={404}
        title={
          <>
            Nothing <em className="display-word">here</em>
          </>
        }
        lede="This page does not exist, or it has moved."
      />
      <div className="flex flex-wrap gap-3 px-[var(--rail)] py-16">
        <Link href="/" className="btn btn-solid">
          Go home <span className="arrow" aria-hidden="true">→</span>
        </Link>
        <Link href="/projects" className="btn btn-outline">
          See projects
        </Link>
      </div>
    </>
  );
}
