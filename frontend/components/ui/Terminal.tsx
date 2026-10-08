/** Small terminal detail used on the AI Lab. Content is passed as plain lines. */
export function Terminal({ lines, label }: { lines: { prompt?: boolean; text: string }[]; label: string }) {
  return (
    <div className="on-night overflow-hidden rounded-[10px] bg-night font-mono text-[13px] leading-[1.75] text-on-night" role="img" aria-label={label}>
      <div className="flex gap-1.5 border-b border-on-night/10 px-3.5 py-3" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <i key={i} className="size-[9px] rounded-full bg-on-night/30" />
        ))}
      </div>
      <pre className="px-[18px] pt-4 pb-5 whitespace-pre-wrap" aria-hidden="true">
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line.prompt ? (
              <>
                <span className="text-lilac">~</span> {line.text}
              </>
            ) : (
              <span className="text-night-muted">{line.text}</span>
            )}
          </span>
        ))}
        <span className="block">
          <span className="text-lilac">~</span> <span className="cursor-block" />
        </span>
      </pre>
    </div>
  );
}
