import { NetworkArt } from "@/components/projects/NetworkArt";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Seed for the decorative network graph, so each page gets its own. */
  seed: number;
  font?: "condensed" | "serif" | "wide" | "mono";
  /** Decorative layer behind the title; defaults to the network graph. */
  art?: React.ReactNode;
};

const FONT = {
  condensed: "condensed font-semibold tracking-[-0.03em] text-[clamp(44px,7vw,92px)] leading-[0.95]",
  serif: "type-serif text-[clamp(46px,7.4vw,98px)] leading-[0.98]",
  wide: "type-wide text-[clamp(42px,6.6vw,88px)] leading-[0.98]",
  mono: "type-mono text-[clamp(38px,5.6vw,72px)] leading-[1.02]",
};

/** The Night band at the top of inner pages: same visual language as the home hero, no 3D. */
export function PageHero({ eyebrow, title, lede, seed, font = "condensed", art }: Props) {
  return (
    <header className="night-band on-night px-[var(--rail)] pt-[calc(env(safe-area-inset-top,0px)+128px)] pb-16" data-night-band>
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[min(560px,70%)] opacity-60" aria-hidden="true">
        {art ?? <NetworkArt seed={seed} />}
      </div>
      <p className="label text-night-muted">{eyebrow}</p>
      <h1 className={`mt-4 max-w-[16ch] text-balance [&_em]:text-lilac ${FONT[font]}`}>
        {title}
      </h1>
      {lede && <p className="mt-6 max-w-[56ch] text-lg text-night-muted">{lede}</p>}
    </header>
  );
}
