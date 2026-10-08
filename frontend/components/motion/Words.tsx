import { Children, Fragment, isValidElement, type ReactNode } from "react";

/**
 * Splits heading content into words that rise one after another (CSS in globals.css,
 * triggered by a parent Reveal). Elements such as <em> stay whole and count as one word.
 * Screen readers get the plain text via the parent heading; the split is visual only.
 */
export function Words({ children }: { children: ReactNode }) {
  const parts: ReactNode[] = [];
  const walk = (node: ReactNode) => {
    Children.forEach(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        String(child)
          .split(/(\s+)/)
          .forEach((piece) => piece && parts.push(piece));
      } else if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
        walk(child.props.children);
      } else if (child !== null && child !== undefined && typeof child !== "boolean") {
        parts.push(child);
      }
    });
  };
  walk(children);

  let index = 0;
  return (
    <span className="words">
      {parts.map((part, i) =>
        typeof part === "string" && /^\s+$/.test(part) ? (
          " "
        ) : (
          <span key={i} className="w">
            <span style={{ "--i": index++ } as React.CSSProperties}>{part}</span>
          </span>
        ),
      )}
    </span>
  );
}
