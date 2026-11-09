import type { PhotoKey } from "./photos";
import type { BrushVariant } from "~/components/art/Brushstroke";

export type ServiceSlug =
  "counselling" | "creative-arts-therapy" | "dance-movement-therapy" | "workshops";

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
    slug: "dance-movement-therapy",
    name: "Dance Movement Therapy",
    benefit:
      "Let your body lead: gentle, guided movement to notice, express and ease what you're carrying.",
    linkLabel: "Learn about dance movement therapy",
    visual: { art: "scribble" },
    tone: "sand",
  },
  {
    slug: "workshops",
    name: "Therapeutic Workshops",
    benefit:
      "Small-group sessions and workplace wellbeing programs built around creativity and connection.",
    linkLabel: "Explore therapeutic workshops",
    visual: { art: "swirl" },
    tone: "primary",
  },
];

export const serviceOptions = [
  { value: "counselling", label: "Counselling" },
  { value: "creative-arts-therapy", label: "Creative arts therapy" },
  { value: "dance-movement-therapy", label: "Dance movement therapy" },
  { value: "workshops", label: "Community workshops" },
  { value: "workplace", label: "Corporate wellbeing workshops" },
  { value: "unsure", label: "I'm not sure yet" },
] as const;
