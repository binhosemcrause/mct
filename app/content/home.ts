import { TODO } from "~/config/site";

export const reasons = [
  "Stress that won't switch off",
  "Anxiety",
  "Grief and loss",
  "Life transitions",
  "Relationships",
  "Self-esteem",
  "Trauma",
  "Feeling stuck or flat",
  "Wanting to reconnect with your creativity",
] as const;

export const firstSessionSteps = [
  {
    title: "Reach out",
    body: "Send a short enquiry or book online. Share as much or as little as you like.",
  },
  {
    title: "Free 15-minute chat",
    body: "A relaxed phone or video call to see if we're a good fit. No pressure, no commitment.",
  },
  {
    title: "Your first session",
    body: "We start where you are. You set the pace, and you never have to share more than feels right.",
  },
] as const;

/**
 * "Therapy for All" access routes. Facts in [brackets] must be confirmed by the practice
 * before launch — the brief lists sliding scale / concession / NDIS / community programs.
 */
export const accessRoutes = [
  {
    title: "Sliding-scale fees",
    body: `Pay what fits your situation, from ${TODO}: lowest fee to the standard rate. Just ask — no paperwork or proof required.`,
  },
  {
    title: "Concession spots",
    body: `${TODO}: number of reduced-fee places held each week for concession, Health Care and student card holders.`,
  },
  {
    title: "NDIS participants",
    body: `${TODO}: confirm self-managed / plan-managed support and the relevant NDIS line items.`,
  },
  {
    title: "Community programs",
    body: "Free and low-cost creative workshops run with local schools, charities and not-for-profits. Community organisations can partner with us.",
  },
] as const;

export interface Testimonial {
  quote: string;
  attribution: string; // anonymised, e.g. "Adult client, 2026"
  consent: boolean; // must be true to be published
}

/** Empty until real, consented, anonymised quotes are supplied. Placeholder slots render meanwhile. */
export const testimonials: readonly Testimonial[] = [];
export const testimonialSlots = 3;
