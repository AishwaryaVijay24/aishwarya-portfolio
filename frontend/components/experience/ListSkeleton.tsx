export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="mt-12 grid gap-8" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="grid grid-cols-[minmax(70px,120px)_1fr] gap-6">
          <div className="skeleton h-12 w-16" />
          <div className="grid gap-2">
            <div className="skeleton h-6 w-2/3" />
            <div className="skeleton h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
