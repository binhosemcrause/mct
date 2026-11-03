import { Link } from "react-router";
import { cx } from "~/lib/cx";

export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <Link
      to="/"
      className={cx("inline-flex items-center gap-3 text-charcoal no-underline", className)}
    >
      <img
        src="/brand/logomark-256.webp"
        alt=""
        width={256}
        height={261}
        className={size === "lg" ? "h-20 w-auto" : "h-12 w-auto"}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            "font-display font-semibold tracking-tight",
            size === "lg" ? "text-item" : "text-[1.375rem]",
          )}
          style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
        >
          Moving Circle
        </span>
        <span className="text-eyebrow-style mt-1 text-[0.75rem] text-primary-dark">Therapy</span>
      </span>
      <span className="sr-only"> — home</span>
    </Link>
  );
}
