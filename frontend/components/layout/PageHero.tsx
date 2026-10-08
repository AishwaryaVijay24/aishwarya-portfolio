import { NetworkArt } from "@/components/projects/NetworkArt";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Seed for the decorative network graph, so each page gets its own. */
  seed: number;
};

/** The Night band at the top of inner pages: same visual language as the home hero, no 3D. */
export function PageHero({ eyebrow, title, lede, seed }: Props) {
  return (
    <header className="night-band on-night px-[var(--rail)] pt-[calc(env(safe-area-inset-top,0px)+128px)] pb-16" data-night-band>
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[min(560px,70%)] opacity-60" aria-hidden="true">
        <NetworkArt seed={seed} />
      </div>
      <p className="label text-night-muted">{eyebrow}</p>
      <h1 className="condensed mt-4 max-w-[16ch] text-[clamp(44px,7vw,92px)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance [&_em]:text-lilac">
        {title}
      </h1>
      {lede && <p className="mt-6 max-w-[56ch] text-lg text-night-muted">{lede}</p>}
    </header>
  );
}
