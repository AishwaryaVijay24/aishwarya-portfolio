import { ArrowUpRight, FileText } from "@/components/ui/icons";
import { Words } from "@/components/motion/Words";
import { Reveal } from "@/components/ui/Reveal";
import type { Publication } from "@/lib/api/types";
import { site } from "@/lib/config/site";

/** Rotating circular label: a slow technical motif. Decorative only. */
function Seal({ text }: { text: string }) {
  return (
    <svg viewBox="0 0 200 200" className="spin-slow size-[150px] text-violet md:size-[190px]" aria-hidden="true">
      <defs>
        <path id="seal-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeOpacity="0.25" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="3 5" />
      <text className="fill-current font-mono" style={{ fontSize: 12.5, letterSpacing: "0.32em" }}>
        <textPath href="#seal-path">{text}</textPath>
      </text>
    </svg>
  );
}

/** Editorial feature for a publication: large title, authors with the site owner highlighted. */
export function PublicationFeature({ publication }: { publication: Publication }) {
  return (
    <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
      <div className="grid gap-6">
        <Reveal from="left" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-violet text-on-violet" aria-hidden="true">
            <FileText size={18} />
          </span>
          <span className="label text-violet">Published research</span>
        </Reveal>
        <Reveal as="p" className="condensed max-w-[22ch] text-[clamp(30px,4.2vw,56px)] leading-[1.02] font-semibold tracking-[-0.025em] text-balance">
          <Words>{publication.title}</Words>
        </Reveal>
        {publication.authors.length > 0 && (
          <Reveal from="up" delay={200} as="p" className="max-w-[60ch] text-muted">
            {publication.authors.map((a, i) => (
              <span key={a}>
                {a === site.name ? <strong className="font-semibold text-ink">{a}</strong> : a}
                {i < publication.authors.length - 1 ? ", " : ""}
              </span>
            ))}
          </Reveal>
        )}
        <Reveal from="up" delay={280} className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {publication.venue && <span className="font-mono text-sm text-muted">{publication.venue}</span>}
          {publication.url && (
            <a href={publication.url} target="_blank" rel="noreferrer" className="btn btn-solid">
              Read on IEEE Xplore <ArrowUpRight size={16} className="icon-nudge" aria-hidden="true" />
            </a>
          )}
        </Reveal>
      </div>
      <Reveal from="scale" delay={150} className="justify-self-start lg:justify-self-end">
        <Seal text={`PUBLISHED · ${publication.year ?? ""} · IEEE · PEER REVIEWED · `} />
      </Reveal>
    </div>
  );
}
