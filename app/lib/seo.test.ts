import { describe, expect, it } from "vitest";
import { pages } from "~/config/pages";
import { flattenNav, footerLinks, primaryNav } from "~/config/nav";
import { businessJsonLd, pageMeta } from "./seo";

describe("pageMeta", () => {
  it("builds unique title, canonical and OG tags with alt text", () => {
    const meta = pageMeta({ title: "Fees & Funding", description: "d", path: "/fees" });
    expect(meta).toContainEqual({ title: "Fees & Funding | Moving Circle Therapy" });
    expect(meta).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: "https://movingcircletherapy.com/fees",
    });
    expect(meta).toContainEqual({ property: "og:locale", content: "en_AU" });
    expect(meta.find((m) => "property" in m && m.property === "og:image:alt")).toBeTruthy();
  });

  it("adds noindex when asked", () => {
    expect(pageMeta({ title: "x", description: "d", path: "/x", noindex: true })).toContainEqual({
      name: "robots",
      content: "noindex, nofollow",
    });
  });
});

describe("page registry", () => {
  it("has a unique title and description for every page", () => {
    const entries = Object.values(pages);
    expect(new Set(entries.map((p) => p.title)).size).toBe(entries.length);
    expect(new Set(entries.map((p) => p.description)).size).toBe(entries.length);
  });

  it("keeps descriptions within search-snippet length", () => {
    for (const [path, page] of Object.entries(pages)) {
      expect(page.description.length, path).toBeLessThanOrEqual(170);
    }
  });
});

describe("businessJsonLd", () => {
  it("describes a MedicalBusiness in Chelsea VIC without placeholder values", () => {
    const ld = businessJsonLd();
    expect(ld["@type"]).toContain("MedicalBusiness");
    expect(ld.address.addressLocality).toBe("Chelsea");
    expect(ld.address.postalCode).toBe("3196");
    expect(JSON.stringify(ld)).not.toContain("TODO");
  });
});

describe("primaryNav", () => {
  it("has the agreed top-level tabs in order", () => {
    expect(primaryNav.map((i) => i.label)).toEqual([
      "About",
      "Services",
      "Referrals & NDIS",
      "Resources",
      "Creative Circle",
      "Contact",
    ]);
  });

  it("sends Community Workshops to the Therapy for All page", () => {
    expect(flattenNav().find((l) => l.label === "Community Workshops")?.to).toBe(
      "/about/therapy-for-all",
    );
  });

  it("only links to pages that exist in the page registry", () => {
    for (const { to } of [...flattenNav(), ...footerLinks]) expect(pages[to], to).toBeDefined();
  });
});
