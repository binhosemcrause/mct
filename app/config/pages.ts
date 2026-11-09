/**
 * Page registry: unique title + description per path (SEO), and whether it's in the sitemap.
 * Also drives the stub pages for sections not built yet.
 */
export interface PageInfo {
  title: string;
  description: string;
  /** Short intro shown on the stub page */
  intro: string;
  inSitemap: boolean;
}

export const pages: Record<string, PageInfo> = {
  "/": {
    title: "Moving Circle Therapy — Counselling & Art Therapy in Chelsea VIC",
    description:
      "Counselling and creative arts therapy in Chelsea, VIC, for Bayside, the Mornington Peninsula and south-east Melbourne. No art skills needed. Book a free chat.",
    intro: "",
    inSitemap: true,
  },
  "/services": {
    title: "Services",
    description:
      "Counselling, creative arts therapy, dance movement therapy and therapeutic workshops in Chelsea, VIC — individual, group and online options.",
    intro:
      "Counselling, creative arts therapy, dance movement therapy and workshops — in person in Chelsea or online.",
    inSitemap: true,
  },
  "/services/counselling": {
    title: "Counselling in Chelsea & Bayside",
    description:
      "Person-centred counselling in Chelsea, VIC for stress, anxiety, grief, relationships and life changes. Individual, couples and adolescent sessions, in person or online.",
    intro: "Talk things through with someone who listens closely, at your own pace.",
    inSitemap: true,
  },
  "/services/creative-arts-therapy": {
    title: "Creative Arts Therapy Melbourne",
    description:
      "Creative arts therapy in Chelsea, south-east Melbourne: art, movement, music and play to explore what's hard to say. No artistic skill needed.",
    intro: "Use paint, clay, sound or movement to explore what's hard to put into words.",
    inSitemap: true,
  },
  "/services/workshops": {
    title: "Therapeutic & Workplace Wellbeing Workshops",
    description:
      "Small-group therapeutic workshops and workplace wellbeing programs across the Mornington Peninsula and Bayside, built around creativity, movement and connection.",
    intro: "Small-group sessions and workplace wellbeing programs.",
    inSitemap: true,
  },
  "/about/our-story": {
    title: "Our Story",
    description:
      "How Moving Circle Therapy began, the values behind our work and the practitioners you'll meet in our Chelsea studio.",
    intro: "How Moving Circle began, what we value and who you'll meet.",
    inSitemap: true,
  },
  "/about/therapy-for-all": {
    title: "Therapy for All & Community Workshops",
    description:
      "Therapy for All is our community program: reduced-fee places and community workshops so cost doesn't decide who gets support.",
    intro: "Our community program: reduced-fee places and community workshops.",
    inSitemap: true,
  },
  "/services/dance-movement-therapy": {
    title: "Dance Movement Therapy in Chelsea",
    description:
      "Dance movement therapy in Chelsea, VIC: using movement and the body to explore feelings, build connection and find steadier ground. No dance experience needed.",
    intro: "Use movement and the body to explore what words can't reach.",
    inSitemap: true,
  },
  "/services/workshops/corporate-wellbeing": {
    title: "Corporate Wellbeing Workshops",
    description:
      "Creative, movement-based wellbeing workshops for workplaces across Melbourne's south-east, Bayside and the Mornington Peninsula.",
    intro: "Creative wellbeing workshops for your team or workplace.",
    inSitemap: true,
  },
  "/referrals-ndis": {
    title: "Referrals & NDIS",
    description:
      "How to refer someone to Moving Circle Therapy, and how creative arts therapy and counselling can work with NDIS funding.",
    intro: "How referrals work, and how we work with NDIS participants.",
    inSitemap: true,
  },
  "/resources/blog": {
    title: "Blog",
    description:
      "Gentle, practical writing on wellbeing, creativity and movement from the practitioners at Moving Circle Therapy.",
    intro: "Writing on wellbeing, creativity and movement.",
    inSitemap: true,
  },
  "/resources/frameworks": {
    title: "Frameworks",
    description:
      "The therapeutic frameworks and approaches that guide how we work at Moving Circle Therapy.",
    intro: "The frameworks and approaches that guide our work.",
    inSitemap: true,
  },
  "/creative-circle": {
    title: "Creative Circle",
    description:
      "Creative Circle at Moving Circle Therapy, Chelsea VIC: a space to gather, make and move together.",
    intro: "A space to gather, make and move together.",
    inSitemap: true,
  },
  "/contact": {
    title: "Contact & Book",
    description:
      "Book a free 15-minute chat or send an enquiry to Moving Circle Therapy, 13/450 Nepean Highway, Chelsea VIC. Parking, access and transport details.",
    intro: "",
    inSitemap: true,
  },
  "/privacy": {
    title: "Privacy Policy",
    description:
      "How Moving Circle Therapy collects, stores and protects your personal information under the Australian Privacy Principles.",
    intro: "How we handle your personal information under the Australian Privacy Principles.",
    inSitemap: true,
  },
  "/terms": {
    title: "Terms of Use",
    description: "The terms for using the Moving Circle Therapy website and booking our services.",
    intro: "The terms for using this website and booking with us.",
    inSitemap: true,
  },
};
