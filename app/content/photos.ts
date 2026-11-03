/**
 * Image registry. Every photo here is a TEMPORARY royalty-free stand-in (Pexels).
 * `replaceWith` describes the real photo the practice should supply; it is shown
 * on the image as a visible label while `placeholder` is true.
 * Photos of clients/participants need written consent before use.
 * No stock photos of people: where there's no real photo yet, use <Brushstroke> art instead.
 */
export interface Photo {
  src: string; // base path without width suffix
  widths: readonly number[];
  width: number; // intrinsic aspect reference
  height: number;
  alt: string;
  placeholder: boolean;
  replaceWith: string;
}

const widths = [640, 1024, 1600] as const;

export const photos = {
  artMaterials: {
    src: "/images/art-materials",
    widths,
    width: 1600,
    height: 1067,
    alt: "Hands painting bright pink, yellow and blue shapes on paper spread across the studio floor.",
    placeholder: true,
    replaceWith: "Real photo: art materials laid out in the Chelsea studio",
  },
  studioCushions: {
    src: "/images/studio-cushions",
    widths,
    width: 1600,
    height: 1067,
    alt: "A soft couch with patterned and orange cushions in a calm, sunlit room.",
    placeholder: true,
    replaceWith: "Real photo: the counselling room",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
