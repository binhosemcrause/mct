import { TODO } from "~/config/site";

export interface Practitioner {
  slug: string;
  name: string;
  role: string;
  /** Short credential line shown next to the name, e.g. "MA Creative Arts Therapy" */
  credentials: string;
  /** Professional body + registration number, shown near the name (trust requirement) */
  registration: string;
  focus: readonly string[];
  languages: readonly string[];
  /** Path to a real portrait; null = labelled placeholder frame */
  portrait: string | null;
}

// Names and roles confirmed from movingcircletherapy.com. Everything marked TODO must come from the practice.
export const practitioners: readonly Practitioner[] = [
  {
    slug: "aditi-sawarkar",
    name: "Aditi Sawarkar",
    role: "Practice Director & Creative Arts Therapist",
    credentials: `${TODO}: qualifications`,
    registration: `${TODO}: e.g. ANZACATA Professional Member #0000`,
    focus: [],
    languages: [],
    portrait: null,
  },
  {
    slug: "jasmine-ahluwalia",
    name: "Jasmine Ahluwalia",
    role: "Creative Director & Creative Arts Therapist",
    credentials: `${TODO}: qualifications`,
    registration: `${TODO}: e.g. ANZACATA Professional Member #0000`,
    focus: [],
    languages: [],
    portrait: null,
  },
  {
    slug: "anamika-kaur",
    name: "Anamika Kaur",
    role: "Counsellor & Social Worker",
    credentials: `${TODO}: qualifications`,
    registration: `${TODO}: e.g. ACA Level 2 #0000 / AASW #0000`,
    focus: [],
    languages: [],
    portrait: null,
  },
];
