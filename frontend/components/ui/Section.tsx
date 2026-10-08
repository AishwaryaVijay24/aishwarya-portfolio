/** A content section inside the threaded body. */
export function Section({ id, labelledBy, children, last = false }: { id?: string; labelledBy: string; children: React.ReactNode; last?: boolean }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative max-w-[1120px] pt-[clamp(80px,12vw,150px)] ${last ? "pb-[clamp(80px,10vw,120px)]" : ""}`}>
      {children}
    </section>
  );
}
