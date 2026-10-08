import { Reveal } from "@/components/ui/Reveal";

export type NumberedItem = {
  key: string;
  title: React.ReactNode;
  /** Short mono line: dates, venue, stack. */
  meta?: React.ReactNode;
  detail?: React.ReactNode;
  aside?: React.ReactNode;
};

/**
 * Numbered, ruled list (DESIGN.md §7). Numbers are only used where order means
 * something (chronology, phases). Rules extend from the page thread.
 */
export function NumberedList({ items, label }: { items: NumberedItem[]; label: string }) {
  return (
    <ol className="mt-12" aria-label={label}>
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.key}
          delay={i * 90}
          className="numbered-row grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 sm:grid-cols-[minmax(70px,120px)_1fr_auto]"
        >
          <span className="display-word col-span-2 text-[clamp(44px,6vw,72px)] leading-[0.9] text-violet sm:col-span-1" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="row-main grid min-w-0 gap-1.5">
            <h3 className="condensed text-[clamp(22px,2.4vw,28px)] leading-[1.1] font-semibold tracking-[-0.01em]">{item.title}</h3>
            {item.meta && <div className="font-mono text-[13px] leading-relaxed text-muted">{item.meta}</div>}
            {item.detail && <div className="max-w-[60ch] text-muted">{item.detail}</div>}
          </div>
          {item.aside && <div className="self-start sm:self-baseline">{item.aside}</div>}
        </Reveal>
      ))}
    </ol>
  );
}
