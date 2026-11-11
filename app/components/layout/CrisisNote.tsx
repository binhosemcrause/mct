import { crisisNote } from "~/config/site";
import { cx } from "~/lib/cx";

/** Calm, always-visible safety information. Required on the footer and contact page. */
export function CrisisNote({ className, inverse }: { className?: string; inverse?: boolean }) {
  return (
    <aside
      aria-label="Crisis support"
      className={cx(
        "rounded-card p-5",
        inverse ? "border-2 border-dominant-1/40 text-dominant-1" : "bg-mist text-ink",
        className,
      )}
    >
      <p>
        <strong className="font-semibold">{crisisNote.lead}</strong> {crisisNote.body}
      </p>
      <dl className="mt-4 flex flex-col gap-3">
        {crisisNote.lines.map((line) => (
          <div key={line.tel}>
            <dt>{line.name}</dt>
            <dd>
              <a
                href={`tel:${line.tel}`}
                className={cx(
                  "font-semibold whitespace-nowrap",
                  inverse ? "text-dominant-1" : "text-ink",
                )}
              >
                {line.number}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
