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
};

/** A section label that lands on the page thread, plus a heading whose words rise in sequence. */
export function SectionHeading({ index, label, title, lede, id, level = "h2" }: Props) {
  return (
    <div>
      <p className="label tick flex items-center gap-3 text-muted" data-knot>
        <span className="text-violet">{index}</span> {label}
      </p>
      <Reveal
        as={level}
        id={id}
        className="condensed mt-3.5 text-[clamp(38px,6vw,76px)] leading-none font-semibold tracking-[-0.03em] text-balance [&_em]:text-[1.08em] [&_em]:text-violet"
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
