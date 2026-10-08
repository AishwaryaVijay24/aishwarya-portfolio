export function SpotlightSkeleton() {
  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-12" aria-busy="true" aria-label="Loading projects">
      <div className="skeleton aspect-[16/11] lg:col-span-7" />
      <div className="grid content-center gap-3 lg:col-span-5">
        <div className="skeleton h-4 w-1/3" />
        <div className="skeleton h-12 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
      </div>
    </div>
  );
}

export function RowsSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="mt-12 grid gap-8" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="grid gap-2">
          <div className="skeleton h-7 w-2/3" />
          <div className="skeleton h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}
