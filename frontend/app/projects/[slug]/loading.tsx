export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading project">
      <div className="night-band px-[var(--rail)] pt-[calc(env(safe-area-inset-top,0px)+112px)] pb-16" data-night-band>
        <div className="h-4 w-28 rounded bg-on-night/15" />
        <div className="mt-8 h-16 w-2/3 max-w-xl rounded bg-on-night/15" />
        <div className="mt-6 h-5 w-1/2 max-w-md rounded bg-on-night/10" />
      </div>
    </div>
  );
}
