import { Words } from "@/components/motion/Words";

import { Reveal } from "./Reveal";

type Props = {
  index: string;
  label: string;
  /** Heading content. Wrap one word in <em className="display-word"> for the expressive moment. */
  title: React.ReactNode;
  lede?: React.ReactNode;
  id: string;
  level?: "h1" | "h2";
  /** Heading voice; sections use different ones so they do not all read alike. */
  font?: "condensed" | "serif" | "wide" | "mono";
  /** Accent for the index number and emphasised word. */
  tone?: "violet" | "sky" | "teal" | "orchid";
};

const FONT = {
  condensed: "condensed font-semibold tracking-[-0.03em] text-[clamp(38px,6vw,76px)] leading-none",
  serif: "type-serif text-[clamp(40px,6.2vw,80px)] leading-[1.02]",
  wide: "type-wide text-[clamp(36px,5.4vw,70px)] leading-[1.02]",
  mono: "type-mono text-[clamp(32px,4.6vw,58px)] leading-[1.05]",
};
// Literal class names so Tailwind generates them.
const TONE = { violet: "text-violet", sky: "text-[var(--sky-ink)]", teal: "text-[var(--teal-ink)]", orchid: "text-[var(--orchid-ink)]" };
const EM_TONE = {
  violet: "[&_em]:text-violet",
  sky: "[&_em]:text-[var(--sky-ink)]",
  teal: "[&_em]:text-[var(--teal-ink)]",
  orchid: "[&_em]:text-[var(--orchid-ink)]",
};

/** A section label that lands on the page thread, plus a heading whose words rise in sequence. */
export function SectionHeading({ index, label, title, lede, id, level = "h2", font = "condensed", tone = "violet" }: Props) {
  return (
    <div>
      <p className="label tick flex items-center gap-3 text-muted" data-knot>
        <span className={TONE[tone]}>{index}</span> {label}
      </p>
      <Reveal
        as={level}
        id={id}
        className={`mt-3.5 text-balance [&_em]:text-[1.08em] ${FONT[font]} ${EM_TONE[tone]}`}
      >
        <Words>{title}</Words>
      </Reveal>
      {lede && (
        <Reveal as="p" from="up" delay={250} className="mt-5 max-w-[60ch] text-lg text-muted">
          {lede}
        </Reveal>
      )}
    </div>
  );
}
