import type { ComponentProps, ElementType, ReactNode } from "react";
import { cx } from "~/lib/cx";

export function Container({
  className,
  narrow,
  ...props
}: ComponentProps<"div"> & { narrow?: boolean }) {
  return (
    <div
      className={cx(
        "mx-auto w-full px-gutter",
        narrow ? "max-w-prose" : "max-w-content",
        className,
      )}
      {...props}
    />
  );
}

const tones = {
  plain: "bg-dominant-1 text-charcoal",
  sand: "bg-dominant-2 text-charcoal",
  primary: "bg-primary-1 text-charcoal",
  secondary: "bg-secondary-1 text-charcoal",
  deep: "bg-primary-dark text-dominant-1",
} as const;
export type SectionTone = keyof typeof tones;

/** A page section with vertical rhythm and a background tone. Label it via `aria-labelledby`. */
export function Section({
  tone = "plain",
  className,
  ...props
}: ComponentProps<"section"> & { tone?: SectionTone }) {
  return <section className={cx("relative py-section", tones[tone], className)} {...props} />;
}

interface SectionHeaderProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "start" | "center";
  /** Heading level — keep the page outline logical (default h2) */
  as?: Extract<ElementType, "h2" | "h3">;
  /** For sections on the `deep` tone */
  inverse?: boolean;
  className?: string;
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  align = "start",
  as: Heading = "h2",
  inverse,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cx(
        "mb-12 flex max-w-[44rem] flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cx("text-eyebrow-style", inverse ? "text-dominant-1" : "text-secondary-dark")}
        >
          {eyebrow}
        </p>
      )}
      <Heading id={id} className="text-h2">
        {title}
      </Heading>
      {intro && (
        <div className={cx("text-lead", inverse ? "text-dominant-1" : "text-charcoal/90")}>
          {intro}
        </div>
      )}
    </header>
  );
}
