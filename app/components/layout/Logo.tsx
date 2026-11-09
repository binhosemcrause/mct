import { Link } from "react-router";
import { cx } from "~/lib/cx";

/**
 * Wordmark linking home. The header uses the text alone (top-left); the mark is
 * optional because the home hero shows it large in the centre.
 */
export function Logo({
  className,
  size = "md",
  mark = false,
}: {
  className?: string;
  size?: "md" | "lg";
  mark?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cx("inline-flex items-center gap-3 text-charcoal no-underline", className)}
    >
      {mark && (
        <img
          src="/brand/logomark-256.webp"
          alt=""
          width={256}
          height={261}
          className={size === "lg" ? "h-20 w-auto" : "h-12 w-auto"}
        />
      )}
      <span
        className={cx(
          "font-semibold tracking-tight",
          size === "lg" ? "text-item leading-tight" : "text-[1.25rem] whitespace-nowrap",
        )}
      >
        Moving Circle Therapy
      </span>
      <span className="sr-only"> — home</span>
    </Link>
  );
}
