import { Link } from "react-router";
import { Underline } from "~/components/art/Brushstroke";
import { ArrowIcon, ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Layout";
import { bookCta } from "~/config/nav";
import { site } from "~/config/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="paper-grain relative flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden bg-secondary-1"
    >
      {/* Oversized wordmark behind the logo: decorative, the name is already in the header */}
      <div className="relative flex flex-1 items-center justify-center py-12">
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 100"
          className="absolute inset-x-0 top-1/2 hidden w-full -translate-y-1/2 px-[2vw] md:block"
        >
          <text
            x="500"
            y="92"
            textAnchor="middle"
            textLength="980"
            lengthAdjust="spacing"
            className="fill-dominant-1 font-body text-[116px] font-bold uppercase"
          >
            Moving Circle
          </text>
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 600 220"
          className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2 px-[3vw] md:hidden"
        >
          {["Moving", "Circle"].map((word, i) => (
            <text
              key={word}
              x="300"
              y={i === 0 ? 104 : 214}
              textAnchor="middle"
              textLength="590"
              lengthAdjust="spacing"
              className="fill-dominant-1 font-body text-[133px] font-bold uppercase"
            >
              {word}
            </text>
          ))}
        </svg>

        <Link
          to="/about/our-story"
          className="group relative z-10 block rounded-full no-underline"
          prefetch="intent"
        >
          <img
            src="/brand/logomark-solid.webp"
            alt=""
            width={503}
            height={512}
            fetchPriority="high"
            className="relative w-[min(58vw,22rem)] drop-shadow-[0_40px_60px_rgb(31_98_153/0.35)] transition-transform duration-500 ease-organic group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <span className="sr-only">Read our story</span>
        </Link>
      </div>

      <Container className="relative z-10 grid items-end gap-8 pb-10 lg:grid-cols-12 lg:gap-6">
        <h1 id="hero-title" className="flex flex-col gap-3 lg:col-span-5">
          <span className="text-eyebrow-style font-body">
            Counselling & creative arts therapy · Chelsea, VIC
          </span>
          <span className="text-h2 tracking-tight">
            Every{" "}
            <span className="relative inline-block whitespace-nowrap text-primary-dark italic">
              movement
              <Underline className="text-secondary-dark" />
            </span>{" "}
            is a story.
          </span>
        </h1>
        <p className="max-w-[30rem] lg:col-span-4">{site.promise}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-3 lg:flex-col lg:items-stretch">
          <ButtonLink to={bookCta.to} variant="cta" size="lg">
            {bookCta.label}
          </ButtonLink>
          <ButtonLink to="#services" variant="outline" size="lg" icon={<ArrowIcon />}>
            Explore services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/** Slow ribbon of the practice's materials. Decorative; stops under reduced motion. */
export function MaterialsRibbon() {
  const words = ["words", "paint", "movement", "sound", "clay", "breath", "play", "stories"];
  const row = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {words.map((w) => (
        <span key={w} className="flex items-center gap-8">
          <span className="text-h2 italic">{w}</span>
          <span className="size-3 rounded-full bg-primary-1" />
        </span>
      ))}
    </span>
  );
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-charcoal/10 bg-dominant-1 py-6"
    >
      <div className="marquee-track flex w-max text-charcoal/80">
        {row}
        {row}
      </div>
    </div>
  );
}
