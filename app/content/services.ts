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
  /** Shown beside the shape on the service's own page; omit while the copy is being written */
  description?: string;
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
    description:
      "Counselling provides emotional support, guidance, and strategies to help you navigate personal, emotional, or psychological challenges. Our team of qualified clinicians use a client-centred approach and provide tools to navigate stress, anxiety, depression, relationship difficulties, self-esteem issues, life transitions, or past trauma. We offer individual counselling, couple and relationship counselling, grief and trauma counselling, and adolescence counselling.",
  },
  {
    slug: "creative-arts-therapy",
    name: "Creative Arts Therapy",
    benefit: "Use paint, clay, sound or movement to explore what's hard to put into words.",
    linkLabel: "Learn about creative arts therapy",
    visual: { photo: "artMaterials" },
    tone: "secondary",
    description:
      "Creative Arts Therapy is a holistic, evidence-based approach that integrates various art forms such as painting, drawing, sculpture, music, dance, movement, drama, and storytelling to support mental health, emotional regulation, and physical wellbeing. Our experienced qualified clinicians provide a safe and supportive environment where creativity becomes a powerful tool to reach your fullest potential. We provide both one-on-one therapy and group therapy sessions.",
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
    description:
      "Our Therapeutic Workshops bring people into safe, supportive spaces where they can explore creativity, movement, mindfulness, and emotional expression. Whether you’re seeking personal growth in a group therapy setting or a workplace looking to enhance wellbeing, our workshops are tailored to foster connection, resilience, and balance.",
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
