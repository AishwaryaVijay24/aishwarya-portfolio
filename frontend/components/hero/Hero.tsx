import Link from "next/link";

import { Magnetic } from "@/components/motion/Magnetic";
import { site } from "@/lib/config/site";
import { HeroField } from "./HeroField";

/**
 * Home hero (DESIGN.md §8): identity + message + interactive technical visual + motion.
 * Asymmetric: the message sits in quiet space upper right, the name anchors low left.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-name"
      data-night-band
      className="night-band on-night grid min-h-[clamp(620px,100svh,980px)] grid-cols-12 grid-rows-[auto_auto_1fr_auto] gap-x-6 px-[var(--rail)] pt-[calc(env(safe-area-inset-top,0px)+84px)] pb-12 lg:grid-rows-[auto_1fr_auto_auto] lg:pt-[calc(env(safe-area-inset-top,0px)+96px)]"
    >
      <HeroField />

      <p className="label col-span-full flex items-center gap-2.5 text-[11px] text-night-muted">
        <span className="size-1.5 rounded-full bg-lilac" aria-hidden="true" />
        Portfolio · Phase 1
      </p>

      <div
        data-hero-message
        className="col-span-full row-start-2 grid max-w-[480px] gap-[18px] self-center pt-7 lg:col-span-6 lg:col-start-7 lg:justify-self-end lg:py-6"
      >
        <p className="condensed text-[clamp(26px,3vw,38px)] leading-[1.08] font-semibold tracking-[-0.02em] text-balance">
          AI × <em className="display-word text-[1.12em] text-lilac">Software</em> Engineering
        </p>
        <p className="max-w-[38ch] text-[17px] text-night-muted">{site.statement}</p>
        <div className="mt-1.5 flex flex-wrap gap-3">
          <Magnetic>
            <Link href="/projects" className="btn btn-primary">
              Explore my work <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/ai-lab" className="btn btn-ghost">
              Talk to my AI
            </Link>
          </Magnetic>
        </div>
      </div>

      <h1 id="hero-name" className="col-span-full row-start-3 mt-10 grid self-end leading-[0.86] lg:mt-0 lg:self-auto">
        <span className="display-word text-[clamp(52px,15vw,110px)] tracking-[-0.03em] text-lilac lg:text-[clamp(52px,9vw,140px)]">
          {site.firstName}
        </span>
        <span className="condensed pl-[0.3em] text-[clamp(52px,15vw,110px)] font-bold tracking-[-0.035em] [font-stretch:75%] lg:pl-[0.55em] lg:text-[clamp(52px,9vw,140px)]">
          {site.lastName}
        </span>
      </h1>

      <div className="col-span-full row-start-4 mt-11 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 font-mono text-xs leading-normal text-night-muted">
        <p className="max-w-[52ch]">{site.heroCaption}</p>
        <span className="label hidden items-center gap-2 text-[11px] sm:inline-flex" aria-hidden="true">
          <span className="block h-7 w-px origin-top animate-pulse bg-current" />
          Scroll
        </span>
      </div>
    </section>
  );
}
