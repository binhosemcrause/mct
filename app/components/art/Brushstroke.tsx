import { useId } from "react";
import { cx } from "~/lib/cx";

/**
 * Abstract movement illustrations — the brand's "echo" graphic language
 * (repeated organic lines). Use instead of stock photos of people.
 * Decorative by default (aria-hidden); pass `label` to expose as an image.
 */
export type BrushVariant = "echo" | "swirl" | "scribble" | "wave" | "dabs";

interface Props {
  variant: BrushVariant;
  className?: string;
  label?: string;
  /** Stretch to fill a non-square box (for wide bands) */
  stretch?: boolean;
}

/** Organic closed loop: a circle whose radius wobbles with low-frequency harmonics */
function organicLoop(cx0: number, cy0: number, r: number, seed: number) {
  const pts: string[] = [];
  const steps = 72;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wobble =
      1 +
      0.07 * Math.sin(2 * t + seed) +
      0.045 * Math.sin(3 * t + seed * 1.7) +
      0.025 * Math.sin(5 * t + seed * 0.6);
    const x = cx0 + Math.cos(t) * r * wobble;
    const y = cy0 + Math.sin(t) * r * wobble * 1.04;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ") + "Z";
}

function Echo() {
  const rings = Array.from({ length: 11 }, (_, i) => i);
  return (
    <g fill="none" strokeLinecap="round" strokeWidth="2.2">
      {rings.map((i) => (
        <path
          key={i}
          d={organicLoop(200 + i * 1.6, 200 - i * 1.2, 34 + i * 15, 0.9 + i * 0.22)}
          stroke="currentColor"
          opacity={1 - i * 0.055}
        />
      ))}
    </g>
  );
}

function Swirl() {
  // A loose spiral built from expanding arcs, echoing the logomark's line work
  const lines = Array.from({ length: 7 }, (_, i) => i);
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3">
      {lines.map((i) => {
        const o = i * 9;
        return (
          <path
            key={i}
            d={`M${60 + o} ${330 - o} C ${40 + o} ${180 - o}, ${170 + o} ${70 + o * 0.4}, ${250 - o * 0.3} ${150 + o * 0.2} S ${340 - o} ${300 - o}, ${220 + o * 0.5} ${290 - o * 0.6} S ${150 + o * 0.4} ${200 + o * 0.2}, ${205} ${185 + o * 0.3}`}
            opacity={1 - i * 0.09}
          />
        );
      })}
    </g>
  );
}

function Scribble() {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path
        strokeWidth="14"
        d="M52 128c38-30 70-34 92-6 20 26-30 52-6 74 30 28 82-58 118-36 34 20-20 76 8 96 26 18 68-28 84-12"
        opacity=".9"
      />
      <path
        strokeWidth="5"
        d="M70 300c26-18 44-8 60 6s34 18 56-2 40-22 62-4 38 16 60-6"
        opacity=".7"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} strokeWidth="6" d={`M${250 + i * 18} ${60 + i * 4}l-14 46`} opacity=".8" />
      ))}
    </g>
  );
}

function Wave() {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5">
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M-10 ${150 + i * 12} C 80 ${90 + i * 10}, 140 ${230 + i * 6}, 210 ${170 + i * 9} S 330 ${100 + i * 12}, 420 ${160 + i * 10}`}
          opacity={1 - i * 0.08}
        />
      ))}
    </g>
  );
}

function Dabs() {
  const dabs = [
    [90, 110, 38, -18],
    [250, 90, 30, 24],
    [170, 220, 44, 8],
    [310, 250, 26, -32],
    [80, 290, 28, 40],
  ] as const;
  return (
    <g fill="currentColor">
      {dabs.map(([x, y, r, rot], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={r * 1.45}
          ry={r * 0.72}
          transform={`rotate(${rot} ${x} ${y})`}
          opacity={0.85 - i * 0.1}
        />
      ))}
    </g>
  );
}

const variants = { echo: Echo, swirl: Swirl, scribble: Scribble, wave: Wave, dabs: Dabs };

export function Brushstroke({ variant, className, label, stretch }: Props) {
  const titleId = useId();
  const Art = variants[variant];
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio={stretch ? "none" : undefined}
      className={cx("block", className)}
      {...(label
        ? { role: "img", "aria-labelledby": titleId }
        : { "aria-hidden": true, focusable: false })}
    >
      {label && <title id={titleId}>{label}</title>}
      <Art />
    </svg>
  );
}

/** Hand-drawn underline for emphasising a word in a heading */
export function Underline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      className={cx("pointer-events-none absolute -bottom-2 left-0 h-[0.35em] w-full", className)}
    >
      <path
        d="M4 16C60 6 140 4 296 10M20 20c70-6 150-8 250-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
