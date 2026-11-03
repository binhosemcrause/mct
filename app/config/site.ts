/**
 * Single source of truth for practice facts used across pages, footer and schema.org markup.
 *
 * Values marked `TODO` are NOT confirmed — they render as visible placeholders
 * (see `isPlaceholder`) so they can't slip into production unnoticed.
 * Confirmed from movingcircletherapy.com (Nov 2026): name, address, email, team names/roles.
 */

export const TODO = "TODO" as const;
export const isPlaceholder = (value: string | null | undefined) => !value || value.startsWith(TODO);

export const site = {
  name: "Moving Circle Therapy",
  shortName: "Moving Circle",
  tagline: "Every movement is a story.",
  promise: "A safe, creative space to understand yourself — through words, art and movement.",
  description:
    "Counselling and creative arts therapy in Chelsea, Victoria. A warm, person-centred practice using words, art and movement — no artistic skill needed.",
  url: "https://movingcircletherapy.com",
  locale: "en_AU",
  language: "en-AU",

  contact: {
    email: "aditi@movingcircletherapy.com",
    phone: `${TODO}: phone number`,
    /** E.164 form for tel: links, e.g. +61400000000 */
    phoneE164: `${TODO}`,
    instagram: `${TODO}: Instagram profile URL`,
    bookingUrl: `${TODO}: Cliniko / Halaxy / SimplyBook booking link`,
    responseTime: "within 24 hours (Monday to Friday)",
  },

  address: {
    streetAddress: "13/450 Nepean Highway",
    locality: "Chelsea",
    region: "VIC",
    postcode: "3196",
    country: "AU",
    // Approximate; confirm against Google Maps pin before launch
    geo: { latitude: -38.0525, longitude: 145.1166 },
  },

  /**
   * Opening hours in schema.org form, e.g.
   * { days: ["Monday", "Tuesday"], opens: "09:00", closes: "17:00" }.
   * TODO: unknown — the current website doesn't list hours. Empty = shown as placeholder.
   */
  hours: [] as ReadonlyArray<{ days: readonly string[]; opens: string; closes: string }>,

  serviceArea: ["Chelsea", "Mornington Peninsula", "Bayside", "south-east Melbourne"],
} as const;

export const crisisNote = {
  lead: "This service isn't for emergencies.",
  body: "If you're in crisis, call",
  lines: [
    { name: "Emergency", number: "000", tel: "000" },
    { name: "Lifeline", number: "13 11 14", tel: "131114" },
    { name: "Beyond Blue", number: "1300 22 4636", tel: "1300224636" },
  ],
} as const;

export const acknowledgementOfCountry =
  "Moving Circle Therapy acknowledges the Bunurong People, the Traditional Custodians of the lands and waters where we live and work. We pay our respects to Elders past and present, and recognise that sovereignty was never ceded.";
