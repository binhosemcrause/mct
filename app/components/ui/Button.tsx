import type { ComponentProps, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";
import { cx } from "~/lib/cx";

/**
 * - `cta`       the ONLY place the accent colour appears (Book / Enquire / Reserve).
 * - `primary`   strong secondary action on light backgrounds.
 * - `outline`   quiet action; works on light and soft-fill backgrounds.
 * - `inverse`   outline for dark (primary-dark) bands.
 */
export type ButtonVariant = "cta" | "primary" | "outline" | "inverse";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-body font-semibold no-underline transition-[background-color,color,border-color,translate] duration-300 ease-organic select-none hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  cta: "bg-accent-1 text-charcoal hover:bg-accent-dark hover:text-dominant-1",
  primary: "bg-primary-dark text-dominant-1 hover:bg-charcoal",
  outline: "border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-dominant-1",
  inverse: "border-2 border-dominant-1 text-dominant-1 hover:bg-dominant-1 hover:text-primary-dark",
};

const sizes: Record<ButtonSize, string> = {
  // min 44px target (WCAG 2.5.8 asks 24, we go well beyond for touch comfort)
  md: "min-h-12 px-6 py-2.5 text-small",
  lg: "min-h-14 px-8 py-3 text-body",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cx(base, variants[variant], sizes[size], className);
}

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

export function ButtonLink({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: LinkProps & StyleProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {icon}
    </Link>
  );
}

/** For external URLs (booking platform, tel:, mailto:) */
export function ButtonAnchor({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: ComponentProps<"a"> & StyleProps) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {icon}
    </a>
  );
}

export function Button({
  variant,
  size,
  icon,
  className,
  children,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {icon}
    </button>
  );
}

export function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12c4-1 10-1 15 0M14 6.5c2 2.2 3.6 3.9 5 5.5-1.4 1.6-3 3.3-5 5.5" />
    </svg>
  );
}
