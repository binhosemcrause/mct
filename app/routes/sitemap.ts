import { pages } from "~/config/pages";
import { absoluteUrl } from "~/lib/seo";

/** Pages that are live (not stubs). Add paths here as each page is built. */
export const LIVE_PATHS = ["/", "/contact", "/services"] as const;

export function loader() {
  const urls = LIVE_PATHS.filter((p) => pages[p]?.inSitemap)
    .map(
      (p) =>
        `  <url><loc>${absoluteUrl(p)}</loc><changefreq>monthly</changefreq><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
