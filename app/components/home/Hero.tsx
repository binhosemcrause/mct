import { Brushstroke, Underline } from "~/components/art/Brushstroke";
import { ArrowIcon, ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Layout";
import { Photo } from "~/components/ui/Photo";
import { bookCta } from "~/config/nav";
import { site } from "~/config/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="paper-grain relative overflow-hidden">
      <Container className="grid items-center gap-12 pt-12 pb-20 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20 lg:pb-28">
        <div className="relative z-10 flex flex-col gap-8 lg:col-span-7">
          <h1 id="hero-title" className="flex flex-col gap-5">
            <span className="text-eyebrow-style font-body text-secondary-dark">
              Counselling & creative arts therapy · Chelsea, VIC
            </span>
            <span className="text-h0 tracking-tight">
              Every{" "}
              <span className="relative inline-block whitespace-nowrap text-primary-dark italic">
                movement
                <Underline className="text-secondary-dark" />
              </span>{" "}
              is a story.
            </span>
          </h1>
          <p className="max-w-[34rem] text-lead">{site.promise}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <ButtonLink to={bookCta.to} variant="cta" size="lg">
              {bookCta.label}
            </ButtonLink>
            <ButtonLink to="#services" variant="outline" size="lg" icon={<ArrowIcon />}>
              Explore services
            </ButtonLink>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small" aria-label="At a glance">
            {["No art skills needed", "In person or online", "Free intro chat"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2 rounded-full bg-primary-dark" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-5">
          <Brushstroke
            variant="echo"
            className="spin-slow absolute -inset-[18%] size-[136%] text-primary-1"
          />
          <Brushstroke
            variant="dabs"
            className="drift absolute -right-6 -bottom-8 size-36 text-secondary-1 md:size-44"
          />
          <Photo
            name="artMaterials"
            shape="blob"
            priority
            sizes="(min-width: 1024px) 34rem, 90vw"
            className="relative aspect-[4/5] w-full shadow-[0_40px_80px_-40px_rgb(31_98_153/0.45)]"
          />
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
          <span className="font-display text-h2 italic">{w}</span>
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
