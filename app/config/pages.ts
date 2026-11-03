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
      "Counselling, creative arts therapy, therapeutic workshops and creative arts classes in Chelsea, VIC — individual, couples, adolescent, group and online options.",
    intro:
      "Counselling, creative arts therapy, workshops and classes — in person in Chelsea or online.",
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
  "/services/classes": {
    title: "Creative Arts Classes in Chelsea",
    description:
      "Relaxed painting, drawing and dance classes for children, teens and adults in Chelsea, VIC. All ages, all abilities, no experience needed.",
    intro: "Relaxed painting, drawing and dance classes for all ages.",
    inSitemap: true,
  },
  "/practitioners": {
    title: "Our Practitioners",
    description:
      "Meet the counsellors and creative arts therapists at Moving Circle Therapy in Chelsea, VIC — their qualifications, registrations, approach and languages.",
    intro: "The people you'll meet, their training and how they work.",
    inSitemap: true,
  },
  "/fees": {
    title: "Fees & Funding",
    description:
      "Session fees, sliding-scale and concession rates, NDIS, private health and EAP information, and our cancellation policy at Moving Circle Therapy.",
    intro: "Clear prices, concession rates and funding options.",
    inSitemap: true,
  },
  "/whats-on": {
    title: "Workshops & Classes — What's On",
    description:
      "Upcoming creative workshops and classes in Chelsea, VIC. See dates, prices and places available, and reserve your spot.",
    intro: "Upcoming workshops and classes — reserve a spot.",
    inSitemap: true,
  },
  "/about": {
    title: "About Moving Circle",
    description:
      "The story behind Moving Circle Therapy, our values, our Therapy for All community mission, and our Acknowledgement of Country.",
    intro: "Our story, our values and our community mission.",
    inSitemap: true,
  },
  "/journal": {
    title: "Journal",
    description:
      "Gentle, practical writing on wellbeing, creativity and movement from the practitioners at Moving Circle Therapy.",
    intro: "Writing on wellbeing, creativity and movement.",
    inSitemap: false,
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
