import { Link } from "react-router";
import { Brushstroke } from "~/components/art/Brushstroke";
import { ArrowIcon, ButtonAnchor, ButtonLink } from "~/components/ui/Button";
import { ServiceCard } from "~/components/ui/Card";
import { Container, Section, SectionHeader } from "~/components/ui/Layout";
import { PortraitPlaceholder } from "~/components/ui/Photo";
import { Fact, TextWithTodos } from "~/components/ui/Todo";
import { bookCta } from "~/config/nav";
import { isPlaceholder, site } from "~/config/site";
import {
  accessRoutes,
  firstSessionSteps,
  reasons,
  testimonials,
  testimonialSlots,
} from "~/content/home";
import { practitioners } from "~/content/practitioners";
import { services } from "~/content/services";
import { cx } from "~/lib/cx";
import { reveal } from "~/lib/reveal";

/* ── Is this for me? ─────────────────────────────────────────────── */

const chipTones = ["bg-primary-1", "bg-secondary-1", "bg-dominant-1", "bg-white"];
const chipTilt = ["-rotate-2", "rotate-1", "rotate-0", "-rotate-1", "rotate-2"];

export function IsThisForMe() {
  return (
    <Section tone="sand" aria-labelledby="for-me-title" className="paper-grain overflow-hidden">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5" {...reveal()}>
          <SectionHeader
            id="for-me-title"
            eyebrow="Is this for me?"
            title="You don't need a reason that sounds “big enough”."
            intro={
              <p>
                People come to us when something feels heavy, tangled or stuck — or when they simply
                want to feel more like themselves again. Some of the most common reasons:
              </p>
            }
          />
        </div>
        <ul
          className="flex flex-wrap content-center gap-3 md:gap-4 lg:col-span-7"
          aria-label="Common reasons people come to Moving Circle"
        >
          {reasons.map((reason, i) => (
            <li
              key={reason}
              {...reveal(i * 60)}
              className={cx(
                "rounded-pill border border-charcoal/15 px-5 py-3 text-[1.25rem] leading-tight md:px-6 md:text-[1.5rem]",
                chipTones[i % chipTones.length],
                chipTilt[i % chipTilt.length],
              )}
            >
              {reason}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ── Services overview ───────────────────────────────────────────── */

export function ServicesOverview() {
  return (
    <Section aria-labelledby="services-title" id="services" className="scroll-mt-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            id="services-title"
            eyebrow="How we can work together"
            title="Four ways in. One circle."
            intro={<p>Choose what feels right — we can always adjust as we go.</p>}
            className="mb-0"
          />
          <Link
            to="/services"
            className="mb-2 inline-flex shrink-0 items-center gap-2 font-semibold"
          >
            Compare all services and formats
            <ArrowIcon />
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <li key={service.slug} {...reveal(i * 90)} className={cx(i % 2 === 1 && "lg:mt-10")}>
              <ServiceCard service={service} index={i} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ── What is creative arts therapy? ─────────────────────────────── */

const modes = [
  { name: "Art", body: "Paint, draw, collage or sculpt — the process matters, not the result." },
  {
    name: "Movement",
    body: "Notice how feelings live in the body, and let them shift through gentle movement.",
  },
  {
    name: "Sound & story",
    body: "Rhythm, voice, play and storytelling, for when words feel too small.",
  },
];

export function WhatIsCreativeArtsTherapy() {
  return (
    <Section tone="plain" aria-labelledby="cat-title" className="overflow-hidden pt-24 lg:pt-32">
      <Container className="grid items-center gap-16 lg:grid-cols-12">
        <div
          className="relative order-last mx-auto w-full max-w-md lg:order-first lg:col-span-5"
          aria-hidden="true"
        >
          <div className="blob relative aspect-square bg-secondary-1">
            <Brushstroke
              variant="swirl"
              className="drift absolute inset-[12%] text-secondary-dark"
            />
          </div>
          <p className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 -rotate-3 rounded-pill bg-charcoal px-6 py-3 text-item text-dominant-1 italic">
            No artistic skill needed.
          </p>
        </div>
        <div className="lg:col-span-7 lg:pl-8" {...reveal()}>
          <SectionHeader
            id="cat-title"
            eyebrow="What is creative arts therapy?"
            title="Therapy that doesn't rely only on words."
            intro={
              <p>
                Creative arts therapy is counselling that also uses making and moving. A qualified
                therapist guides you to explore feelings through art, movement, sound and story —
                then helps you make sense of what comes up. It's not an art class, and{" "}
                <strong className="font-semibold">nothing you make is judged</strong>.
              </p>
            }
          />
          <ul className="grid gap-6 sm:grid-cols-3">
            {modes.map((m) => (
              <li key={m.name} className="border-t-2 border-charcoal pt-4">
                <h3 className="text-[1.5rem]">{m.name}</h3>
                <p className="mt-2 text-small">{m.body}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/services/creative-arts-therapy"
            className="mt-10 inline-flex items-center gap-2 font-semibold"
          >
            Learn about creative arts therapy
            <ArrowIcon />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

/* ── Meet the practitioners ─────────────────────────────────────── */

export function PractitionersPreview() {
  return (
    <Section tone="plain" aria-labelledby="team-title">
      <Container>
        <SectionHeader
          id="team-title"
          eyebrow="Meet the practitioners"
          title="Qualified, registered, and genuinely kind."
          intro={<p>You'll always know who you're working with and how they're trained.</p>}
        />
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {practitioners.map((p, i) => (
            <li key={p.slug} {...reveal(i * 90)}>
              <article className="flex flex-col gap-4">
                {p.portrait ? (
                  <img
                    src={p.portrait}
                    alt={`Portrait of ${p.name}`}
                    loading="lazy"
                    className="aspect-[4/5] w-full max-w-64 rounded-t-[999px] rounded-b-card object-cover sm:max-w-none"
                  />
                ) : (
                  <PortraitPlaceholder name={p.name} className="max-w-64 sm:max-w-none" />
                )}
                <div>
                  <h3 className="text-item">{p.name}</h3>
                  <p className="mt-1 font-semibold text-primary-dark">{p.role}</p>
                  <p className="mt-2 text-small">
                    <Fact value={p.credentials} />
                  </p>
                  <p className="mt-1 text-small">
                    <span className="sr-only">Registration: </span>
                    <Fact value={p.registration} />
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <Link to="/about/our-story" className="mt-12 inline-flex items-center gap-2 font-semibold">
          Read more about our team
          <ArrowIcon />
        </Link>
      </Container>
    </Section>
  );
}

/* ── Your first session ─────────────────────────────────────────── */

export function FirstSession() {
  return (
    <Section tone="sand" aria-labelledby="first-title" className="paper-grain overflow-hidden">
      <Container>
        <SectionHeader
          id="first-title"
          eyebrow="Your first session"
          title="Three gentle steps."
          intro={<p>Starting therapy can feel like a lot. Here's exactly what happens.</p>}
          align="center"
        />
        <div className="relative">
          {/* Flowing line linking the steps on wide screens */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute top-8 left-0 hidden h-24 w-full text-primary-dark/40 md:block"
          >
            <path
              d="M120 60 C 300 -10, 420 130, 600 60 S 900 -10, 1080 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          </svg>
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            {firstSessionSteps.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col items-center text-center"
                {...reveal(i * 120)}
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    "blob grid size-28 place-items-center text-h2 italic",
                    ["bg-primary-1", "bg-secondary-1", "bg-dominant-1"][i],
                  )}
                >
                  {i + 1}
                </span>
                <h3 className="mt-6 text-item">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-14 flex justify-center">
          <ButtonLink to={bookCta.to} variant="cta" size="lg">
            {bookCta.label}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

/* ── Therapy for All ────────────────────────────────────────────── */

export function TherapyForAll() {
  return (
    <Section tone="deep" aria-labelledby="access-title" className="overflow-hidden">
      <Brushstroke
        variant="wave"
        stretch
        className="pointer-events-none absolute inset-x-0 -top-10 h-80 w-full text-primary-1/25"
      />
      <Container className="relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            id="access-title"
            eyebrow="Therapy for All"
            inverse
            title="Cost shouldn't decide who gets support."
            intro={
              <p>
                Saying “everyone's welcome” isn't enough, so here's how access actually works. If
                none of these fit, tell us — we'll try to find a way.
              </p>
            }
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <ButtonLink to="/contact?topic=access" variant="cta">
              Ask about reduced fees
            </ButtonLink>
            <ButtonLink to="/about/therapy-for-all" variant="inverse">
              About Therapy for All
            </ButtonLink>
          </div>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {accessRoutes.map((route, i) => (
            <li
              key={route.title}
              {...reveal(i * 80)}
              className="rounded-card border border-dominant-1/25 bg-dominant-1/5 p-6"
            >
              <h3 className="text-[1.5rem] text-dominant-1">{route.title}</h3>
              <p className="mt-3 text-dominant-1">
                <TextWithTodos text={route.body} />
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ── Testimonials ───────────────────────────────────────────────── */

export function Testimonials() {
  const published = testimonials.filter((t) => t.consent);
  const slots = Math.max(0, testimonialSlots - published.length);
  return (
    <Section tone="plain" aria-labelledby="voices-title">
      <Container>
        <SectionHeader
          id="voices-title"
          eyebrow="In their words"
          title="Shared with permission."
          intro={<p>Quotes are anonymised and published only with written consent.</p>}
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {published.map((t) => (
            <li key={t.quote} className="rounded-card bg-dominant-2 p-8" {...reveal()}>
              <figure className="flex h-full flex-col gap-6">
                <blockquote className="flex-1 text-[1.375rem] leading-snug italic">
                  <p>“{t.quote}”</p>
                </blockquote>
                <figcaption className="text-small font-semibold">— {t.attribution}</figcaption>
              </figure>
            </li>
          ))}
          {Array.from({ length: slots }, (_, i) => (
            <li
              key={`slot-${i}`}
              data-todo
              className="grid min-h-56 place-items-center rounded-card border-2 border-dashed border-secondary-dark/50 bg-secondary-1/30 p-8 text-center"
            >
              <p className="text-small">
                <span className="block font-semibold">Testimonial slot {i + 1}</span>
                Awaiting a consented, anonymised client quote.
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ── Final CTA ──────────────────────────────────────────────────── */

export function FinalCta() {
  const { contact, address } = site;
  return (
    <Section tone="primary" aria-labelledby="cta-title" className="overflow-hidden">
      <Brushstroke
        variant="echo"
        className="spin-slow pointer-events-none absolute -bottom-56 -left-40 size-[40rem] text-dominant-1/60"
      />
      <Container className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 id="cta-title" className="text-h1">
            Ready when you are.
          </h2>
          <p className="mt-6 max-w-xl text-lead">
            Start with a free, no-pressure 15-minute chat. We usually reply {contact.responseTime},
            and everything you share is confidential.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <ButtonLink to={bookCta.to} variant="cta" size="lg">
              {bookCta.label}
            </ButtonLink>
            <ButtonLink to="/contact" variant="outline" size="lg">
              Send an enquiry
            </ButtonLink>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-5">
          <dl className="grid gap-4 rounded-card bg-dominant-1 p-7">
            <div>
              <dt className="text-eyebrow-style text-secondary-dark">Studio</dt>
              <dd className="mt-1">
                {address.streetAddress}, {address.locality} {address.region} {address.postcode}
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow-style text-secondary-dark">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow-style text-secondary-dark">Phone</dt>
              <dd className="mt-1">
                {isPlaceholder(contact.phoneE164) ? (
                  <Fact value={contact.phone} />
                ) : (
                  <ButtonAnchor href={`tel:${contact.phoneE164}`} variant="outline">
                    Call {contact.phone}
                  </ButtonAnchor>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </Section>
  );
}
