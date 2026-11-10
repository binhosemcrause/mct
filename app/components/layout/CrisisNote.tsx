import { crisisNote } from "~/config/site";
import { cx } from "~/lib/cx";

/** Calm, always-visible safety information. Required on the footer and contact page. */
export function CrisisNote({ className, inverse }: { className?: string; inverse?: boolean }) {
  return (
    <aside
      aria-label="Crisis support"
      className={cx(
        "rounded-card p-5",
        inverse ? "border-2 border-dominant-1/40 text-dominant-1" : "bg-primary-1 text-ink",
        className,
      )}
    >
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
                inverse ? "text-dominant-1" : "text-ink",
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
