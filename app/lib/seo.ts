import type { MetaDescriptor } from "react-router";
import { isPlaceholder, site } from "~/config/site";

interface PageMetaInput {
  /** Page-specific title; the site name is appended */
  title: string;
  /** 120–160 characters, unique per page */
  description: string;
  path: string;
  image?: { url: string; alt: string };
  noindex?: boolean;
}

const defaultImage = {
  url: "/og-default.jpg",
  alt: "The Moving Circle Therapy logomark beside paint and brushes on paper.",
};

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

/** Unique title, description, canonical, Open Graph (with alt) and Twitter tags. */
export function pageMeta({
  title,
  description,
  path,
  image = defaultImage,
  noindex,
}: PageMetaInput): MetaDescriptor[] {
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  const url = absoluteUrl(path);
  const img = absoluteUrl(image.url);
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: site.locale },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: image.alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image:alt", content: image.alt },
  ];
}

/**
 * schema.org MedicalBusiness (a LocalBusiness subtype) for the practice.
 * Unconfirmed fields (phone, hours, Instagram) are omitted rather than published as placeholders.
 */
export function businessJsonLd() {
  const { contact, address } = site;
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "@id": `${site.url}/#practice`,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: absoluteUrl("/brand/logomark.png"),
    image: absoluteUrl("/og-default.jpg"),
    email: contact.email,
    ...(isPlaceholder(contact.phoneE164) ? {} : { telephone: contact.phoneE164 }),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postcode,
      addressCountry: address.country,
    },
    geo: { "@type": "GeoCoordinates", ...address.geo },
    areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
    ...(site.hours.length
      ? {
          openingHoursSpecification: site.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
    ...(isPlaceholder(contact.instagram) ? {} : { sameAs: [contact.instagram] }),
    knowsLanguage: site.language,
    availableService: [
      { "@type": "MedicalTherapy", name: "Counselling" },
      { "@type": "MedicalTherapy", name: "Creative arts therapy" },
      { "@type": "Service", name: "Therapeutic workshops" },
      { "@type": "Service", name: "Creative arts classes" },
    ],
  };
}

export function jsonLdScript(data: unknown): MetaDescriptor {
  return { "script:ld+json": data } as MetaDescriptor;
}
