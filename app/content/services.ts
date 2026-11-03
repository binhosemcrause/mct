import type { PhotoKey } from "./photos";
import type { BrushVariant } from "~/components/art/Brushstroke";

export type ServiceSlug = "counselling" | "creative-arts-therapy" | "workshops" | "classes";

export interface Service {
  slug: ServiceSlug;
  name: string;
  /** One-line benefit, written to the reader */
  benefit: string;
  /** Descriptive link text — never "Learn more" on its own */
  linkLabel: string;
  /** Real photo if available, otherwise an abstract brushstroke illustration */
  visual: { photo: PhotoKey } | { art: BrushVariant };
  tone: "primary" | "secondary" | "sand";
}

export const services: readonly Service[] = [
  {
    slug: "counselling",
    name: "Counselling",
    benefit:
      "Talk things through with someone who listens closely, and find steadier ground at your own pace.",
    linkLabel: "Learn about counselling",
    visual: { photo: "studioCushions" },
    tone: "primary",
  },
  {
    slug: "creative-arts-therapy",
    name: "Creative Arts Therapy",
    benefit: "Use paint, clay, sound or movement to explore what's hard to put into words.",
    linkLabel: "Learn about creative arts therapy",
    visual: { photo: "artMaterials" },
    tone: "secondary",
  },
  {
    slug: "workshops",
    name: "Therapeutic Workshops",
    benefit:
      "Small-group sessions and workplace wellbeing programs built around creativity and connection.",
    linkLabel: "Explore therapeutic workshops",
    visual: { art: "swirl" },
    tone: "sand",
  },
  {
    slug: "classes",
    name: "Creative Arts Classes",
    benefit:
      "Relaxed painting, drawing and dance classes for all ages — just for the joy of making.",
    linkLabel: "See creative arts classes",
    visual: { art: "scribble" },
    tone: "primary",
  },
];

export const serviceOptions = [
  { value: "counselling", label: "Counselling" },
  { value: "creative-arts-therapy", label: "Creative arts therapy" },
  { value: "workshops", label: "Therapeutic workshops" },
  { value: "classes", label: "Creative arts classes" },
  { value: "workplace", label: "Workplace wellbeing program" },
  { value: "unsure", label: "I'm not sure yet" },
] as const;
