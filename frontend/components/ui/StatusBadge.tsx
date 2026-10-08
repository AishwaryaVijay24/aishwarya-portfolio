type Props = { label: string; tone?: "current" | "neutral"; onNight?: boolean };

/** Status of a project or phase. Status is always shown as text, never by colour alone. */
export function StatusBadge({ label, tone = "neutral", onNight = false }: Props) {
  const style =
    tone === "current"
      ? onNight
        ? "bg-lilac text-night"
        : "bg-violet text-on-violet"
      : onNight
        ? "text-night-muted shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--night-muted)_50%,transparent)]"
        : "text-muted shadow-[inset_0_0_0_1px_var(--line)]";
  return <span className={`label inline-block rounded px-2.5 py-[7px] text-[11px] whitespace-nowrap ${style}`}>{label}</span>;
}
