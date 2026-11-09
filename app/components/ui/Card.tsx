import { Link } from "react-router";
import { Brushstroke } from "~/components/art/Brushstroke";
import { ArrowIcon } from "~/components/ui/Button";
import { Photo } from "~/components/ui/Photo";
import type { Service } from "~/content/services";
import { cx } from "~/lib/cx";

const toneBg = {
  primary: "bg-primary-1",
  secondary: "bg-secondary-1",
  sand: "bg-dominant-2",
} as const;
const toneInk = {
  primary: "text-primary-dark",
  secondary: "text-secondary-dark",
  sand: "text-secondary-dark",
} as const;

/**
 * Service card. The whole card is clickable via the heading link's ::after
 * overlay, but only one link is in the tab order and its text is descriptive.
 */
export function ServiceCard({
  service,
  index,
  headingLevel: H = "h3",
}: {
  service: Service;
  index: number;
  headingLevel?: "h2" | "h3";
}) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <article
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-card p-3 transition-[translate,box-shadow] duration-500 ease-organic focus-within:-translate-y-1 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(43_38_48/0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        toneBg[service.tone],
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
        {"photo" in service.visual ? (
          <Photo
            name={service.visual.photo}
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
            className="size-full transition-transform duration-700 ease-organic group-hover:scale-[1.03] motion-reduce:transition-none"
            shape="rounded"
          />
        ) : (
          <div className="grid size-full place-items-center bg-dominant-1/60">
            <Brushstroke
              variant={service.visual.art}
              className={cx("drift size-4/5", toneInk[service.tone])}
            />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-3 pt-6 pb-4">
        <span aria-hidden="true" className="text-small font-semibold text-charcoal">
          {number}
        </span>
        <H className="text-item">{service.name}</H>
        <p className="flex-1">{service.benefit}</p>
        <Link
          to={`/services/${service.slug}`}
          className="mt-2 inline-flex items-center gap-2 font-semibold text-charcoal decoration-2 after:absolute after:inset-0 after:rounded-card after:content-['']"
        >
          {service.linkLabel}
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}
