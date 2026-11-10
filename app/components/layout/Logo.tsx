import { Link } from "react-router";
import { cx } from "~/lib/cx";

/**
 * Wordmark linking home: "moving circle" with "THERAPY" centred beneath.
 * The mark is optional because the home splash shows it large in the centre.
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
      className={cx("inline-flex items-center gap-3 text-inherit no-underline", className)}
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
      <span className="flex flex-col items-center leading-none whitespace-nowrap">
        <span
          className={cx(
            "font-bold tracking-tight lowercase",
            size === "lg" ? "text-[2.25rem]" : "text-[1.625rem] md:text-[2rem]",
          )}
        >
          moving circle
        </span>
        <span
          className={cx(
            "mt-1 tracking-[0.08em] uppercase",
            size === "lg" ? "text-[1.25rem]" : "text-[0.9375rem] md:text-[1.0625rem]",
          )}
        >
          Therapy
        </span>
      </span>
      <span className="sr-only"> — home</span>
    </Link>
  );
}
