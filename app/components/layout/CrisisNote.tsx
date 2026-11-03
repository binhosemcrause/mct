import { crisisNote } from "~/config/site";
import { cx } from "~/lib/cx";

/** Calm, always-visible safety information. Required on the footer and contact page. */
export function CrisisNote({ className, inverse }: { className?: string; inverse?: boolean }) {
  return (
    <aside
      aria-label="Crisis support"
      className={cx(
        "flex gap-4 rounded-card border-2 p-5",
        inverse
          ? "border-dominant-1/40 text-dominant-1"
          : "border-secondary-dark/40 bg-secondary-1/40 text-charcoal",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="mt-0.5 size-6 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M12 21s-7.5-4.6-9.3-9.4C1.4 8 3.7 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3.5 0 5.8 3.5 4.5 7.1C19.5 16.4 12 21 12 21Z" />
      </svg>
      <p>
        <strong className="font-semibold">{crisisNote.lead}</strong> {crisisNote.body}{" "}
        {crisisNote.lines.map((line, i) => (
          <span key={line.tel}>
            {i > 0 && (i === crisisNote.lines.length - 1 ? ", or " : ", ")}
            {line.name !== "Emergency" && `${line.name} `}
            <a
              href={`tel:${line.tel}`}
              className={cx(
                "font-semibold whitespace-nowrap",
                inverse ? "text-dominant-1" : "text-charcoal",
              )}
            >
              {line.number}
            </a>
          </span>
        ))}
        .
      </p>
    </aside>
  );
}
