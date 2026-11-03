import { photos, type PhotoKey } from "~/content/photos";
import { cx } from "~/lib/cx";

const shapes = {
  blob: "blob",
  arch: "rounded-t-[999px] rounded-b-card",
  rounded: "rounded-card",
  circle: "rounded-full",
} as const;

interface Props {
  name: PhotoKey;
  /** `sizes` attribute — describe the rendered width at each breakpoint */
  sizes: string;
  shape?: keyof typeof shapes;
  className?: string;
  /** Above-the-fold images: load eagerly with high priority (LCP) */
  priority?: boolean;
}

/**
 * Responsive, lazy-loaded photo. While the registry marks it as a placeholder,
 * a visible label says which REAL photo should replace it.
 */
export function Photo({ name, sizes, shape = "rounded", className, priority }: Props) {
  const p = photos[name];
  const srcSet = p.widths.map((w) => `${p.src}-${w}.webp ${w}w`).join(", ");
  return (
    <figure className={cx("relative overflow-hidden bg-dominant-2", shapes[shape], className)}>
      <img
        src={`${p.src}-1024.webp`}
        srcSet={srcSet}
        sizes={sizes}
        width={p.width}
        height={p.height}
        alt={p.alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className="size-full object-cover"
      />
      {p.placeholder && (
        <PlaceholderTag
          position={
            shape === "blob" || shape === "circle" ? "inset-x-[18%] bottom-[16%]" : undefined
          }
        >
          {p.replaceWith}
        </PlaceholderTag>
      )}
    </figure>
  );
}

export function PlaceholderTag({
  children,
  position = "inset-x-3 bottom-3",
}: {
  children: string;
  /** Positioning classes; curved shapes need the label pulled inwards */
  position?: string;
}) {
  return (
    <figcaption
      className={cx(
        "absolute mx-auto w-fit max-w-[90%] rounded-pill bg-charcoal/85 px-3 py-1 text-center text-[0.8125rem] leading-snug text-dominant-1",
        position,
      )}
    >
      <span className="font-semibold">Placeholder · </span>
      {children}
    </figcaption>
  );
}

/** Empty frame for portraits not yet supplied — no stock faces. */
export function PortraitPlaceholder({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <figure
      className={cx(
        "relative grid aspect-[4/5] place-items-center overflow-hidden rounded-t-[999px] rounded-b-card border-2 border-dashed border-primary-dark/50 bg-primary-1/25",
        className,
      )}
    >
      <span aria-hidden="true" className="font-display text-h1 text-primary-dark">
        {initials}
      </span>
      <PlaceholderTag>{`Real portrait of ${name}`}</PlaceholderTag>
    </figure>
  );
}
