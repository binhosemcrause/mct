import { Link } from "react-router";
import { acknowledgementOfCountry, site } from "~/config/site";

/**
 * Full-screen home splash: the logo glowing in the centre of the aura, the
 * Acknowledgement of Country along the bottom. The header overlays it (see SiteHeader).
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="aura relative flex min-h-svh flex-col overflow-hidden pt-28 text-white md:pt-32"
    >
      <h1 id="hero-title" className="sr-only">
        {site.name}: {site.tagline} Counselling and creative arts therapy in Chelsea, VIC.
      </h1>

      <div className="flex flex-1 items-center justify-center px-6 py-8">
        <Link to="/about/our-story" className="group block rounded-full" prefetch="intent">
          <img
            src="/brand/logomark-cream.webp"
            alt=""
            width={1006}
            height={1024}
            fetchPriority="high"
            className="breathe w-[min(78vw,38svh+12rem,36rem)] transition-transform duration-700 ease-organic group-hover:scale-[1.02] motion-reduce:transition-none"
          />
          <span className="sr-only">Read our story</span>
        </Link>
      </div>

      <div className="px-gutter pb-6 md:px-8">
        <h2 className="sr-only">Acknowledgement of Country</h2>
        <p className="text-halo max-w-none text-small leading-snug">{acknowledgementOfCountry}</p>
      </div>
    </section>
  );
}
