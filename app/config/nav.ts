/**
 * A nav entry is a link, a group (dropdown) of entries, or both: a link with
 * its own sub-links (e.g. Therapeutic Workshops).
 */
export interface NavItem {
  label: string;
  to?: string;
  children?: NavItem[];
}

export const primaryNav: NavItem[] = [
  {
    label: "About",
    children: [
      { label: "Our Story", to: "/about/our-story" },
      { label: "Therapy for All", to: "/about/therapy-for-all" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Counselling", to: "/services/counselling" },
      { label: "Creative Arts Therapy", to: "/services/creative-arts-therapy" },
      { label: "Dance Movement Therapy", to: "/services/dance-movement-therapy" },
      {
        label: "Therapeutic Workshops",
        to: "/services/workshops",
        children: [
          { label: "Corporate Wellbeing Workshops", to: "/services/workshops/corporate-wellbeing" },
          // Community workshops are run under the Therapy for All program
          { label: "Community Workshops", to: "/about/therapy-for-all" },
        ],
      },
    ],
  },
  { label: "Referrals & NDIS", to: "/referrals-ndis" },
  {
    label: "Resources",
    children: [
      { label: "Blog", to: "/resources/blog" },
      { label: "Frameworks", to: "/resources/frameworks" },
    ],
  },
  { label: "Creative Circle", to: "/creative-circle" },
  { label: "Contact", to: "/contact" },
];

/** Every link in the nav, depth-first (for the footer and tests). */
export function flattenNav(items: NavItem[] = primaryNav): { label: string; to: string }[] {
  return items.flatMap((item) => [
    ...(item.to ? [{ label: item.label, to: item.to }] : []),
    ...flattenNav(item.children ?? []),
  ]);
}

/** True when the current path is the item or one of its descendants. */
export function isActiveItem(item: NavItem, pathname: string): boolean {
  return item.to === pathname || (item.children ?? []).some((c) => isActiveItem(c, pathname));
}

/** Footer "Explore" links: a curated shortlist, not the full menu. */
export const footerLinks = [
  { label: "Therapy for all", to: "/about/therapy-for-all" },
  { label: "Counselling", to: "/services/counselling" },
  { label: "Creative arts therapy", to: "/services/creative-arts-therapy" },
  { label: "Dance movement therapy", to: "/services/dance-movement-therapy" },
  { label: "Corporate wellbeing workshops", to: "/services/workshops/corporate-wellbeing" },
  { label: "Creative circle", to: "/creative-circle" },
] as const;

export const bookCta = { label: "Book a free 15-min chat", to: "/contact#book" } as const;
