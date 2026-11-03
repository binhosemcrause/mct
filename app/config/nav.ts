export interface NavItem {
  label: string;
  to: string;
}

/** Journal stays out of the nav until there are enough posts to be worth visiting. */
export const JOURNAL_MIN_POSTS = 3;

export function primaryNav({ journalPostCount }: { journalPostCount: number }): NavItem[] {
  return [
    { label: "Services", to: "/services" },
    { label: "Practitioners", to: "/practitioners" },
    { label: "Fees & funding", to: "/fees" },
    { label: "What's on", to: "/whats-on" },
    { label: "About", to: "/about" },
    ...(journalPostCount >= JOURNAL_MIN_POSTS ? [{ label: "Journal", to: "/journal" }] : []),
    { label: "Contact", to: "/contact" },
  ];
}

export const bookCta = { label: "Book a free 15-min chat", to: "/contact#book" } as const;
