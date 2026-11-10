import type { Route } from "./+types/design-system";
import { Brushstroke, type BrushVariant } from "~/components/art/Brushstroke";
import { CrisisNote } from "~/components/layout/CrisisNote";
import { ArrowIcon, Button, ButtonLink } from "~/components/ui/Button";
import { ServiceCard } from "~/components/ui/Card";
import {
  CheckboxField,
  ChoiceGroup,
  SelectField,
  TextareaField,
  TextField,
} from "~/components/ui/Field";
import { Container, Section, SectionHeader } from "~/components/ui/Layout";
import { Photo, PortraitPlaceholder } from "~/components/ui/Photo";
import { Todo } from "~/components/ui/Todo";
import { services } from "~/content/services";
import { pageMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  return pageMeta({
    title: "Design system",
    description: "Living reference for Moving Circle Therapy's design tokens and components.",
    path: "/design-system",
    noindex: true,
  });
}

const colours = [
  { token: "dominant-1", hex: "#F4F5EE", role: "Main background (60%)", ink: "text-charcoal" },
  {
    token: "dominant-2",
    hex: "#F1E8DC",
    role: "Secondary background, cards",
    ink: "text-charcoal",
  },
  { token: "charcoal", hex: "#2B2630", role: "Primary text", ink: "text-dominant-1" },
  {
    token: "primary-1",
    hex: "#8DB4D6",
    role: "Soft fills (30%) — charcoal text only",
    ink: "text-charcoal",
  },
  {
    token: "primary-dark",
    hex: "#1F6299",
    role: "Links, dark bands, active states",
    ink: "text-dominant-1",
  },
  {
    token: "secondary-1",
    hex: "#D6C6E3",
    role: "Supporting fills — charcoal text only",
    ink: "text-charcoal",
  },
  {
    token: "secondary-dark",
    hex: "#7A45A8",
    role: "Eyebrows, supporting emphasis",
    ink: "text-dominant-1",
  },
  { token: "accent-1", hex: "#FF854D", role: "CTA buttons ONLY", ink: "text-charcoal" },
  { token: "accent-dark", hex: "#993608", role: "CTA hover/pressed ONLY", ink: "text-dominant-1" },
];

const swatchBg: Record<string, string> = {
  "dominant-1": "bg-dominant-1",
  "dominant-2": "bg-dominant-2",
  charcoal: "bg-charcoal",
  "primary-1": "bg-primary-1",
  "primary-dark": "bg-primary-dark",
  "secondary-1": "bg-secondary-1",
  "secondary-dark": "bg-secondary-dark",
  "accent-1": "bg-accent-1",
  "accent-dark": "bg-accent-dark",
};

const typeScale = [
  {
    token: "text-h0",
    name: "Display · Josefin Sans 600 · 72",
    sample: "Your journey to holistic wellbeing through art and movement.",
  },
  {
    token: "text-h1",
    name: "Screen title · Josefin Sans 600 · 60",
    sample: "Let's find a time to talk.",
  },
  {
    token: "text-h2",
    name: "Section · Josefin Sans 600 · 48",
    sample: "Four ways in. One circle.",
  },
  {
    token: "text-item",
    name: "Item title · Josefin Sans 600 · 36",
    sample: "Creative Arts Therapy",
  },
  {
    token: "text-lead",
    name: "Lead paragraph · Josefin Sans 400 · 32",
    sample: "A safe, creative space to understand yourself.",
  },
  {
    token: "text-body",
    name: "Body · Josefin Sans 400 · 18 / 1.6",
    sample: "Use paint, clay, sound or movement to explore what's hard to put into words.",
  },
];

const arts: BrushVariant[] = ["echo", "swirl", "scribble", "wave", "dabs"];

export default function DesignSystem() {
  return (
    <>
      <Container className="pt-16 pb-8">
        <p className="text-eyebrow-style text-secondary-dark">Internal reference · not indexed</p>
        <h1 className="mt-3 text-h1">Design system</h1>
        <p className="mt-4 max-w-2xl text-lead">
          Tokens live in <code>app/app.css</code> (<code>@theme</code>). Components live in{" "}
          <code>app/components</code>. Build new pages from these pieces only.
        </p>
      </Container>

      <Section aria-labelledby="ds-colour">
        <Container>
          <SectionHeader
            id="ds-colour"
            title="Colour"
            intro={<p>Accent orange is reserved for Book / Enquire / Reserve buttons.</p>}
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colours.map((c) => (
              <li
                key={c.token}
                className={`flex min-h-36 flex-col justify-end rounded-card border border-charcoal/10 p-5 ${swatchBg[c.token]} ${c.ink}`}
              >
                <span className="font-semibold">{c.token}</span>
                <span className="text-small">
                  {c.hex} — {c.role}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="ds-type">
        <Container>
          <SectionHeader
            id="ds-type"
            title="Typography"
            intro={<p>Sizes are fluid: DESIGN.md values are the desktop maximums.</p>}
          />
          <dl className="flex flex-col gap-8">
            {typeScale.map((t) => (
              <div
                key={t.token}
                className="grid gap-2 border-t border-charcoal/15 pt-4 md:grid-cols-[16rem_1fr]"
              >
                <dt className="text-small">
                  <code>{t.token}</code>
                  <br />
                  {t.name}
                </dt>
                <dd
                  className={`${t.token} ${t.token.match(/h0|h1|h2|item/) ? "font-semibold" : ""}`}
                >
                  {t.sample}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section aria-labelledby="ds-buttons">
        <Container>
          <SectionHeader id="ds-buttons" title="Buttons & links" />
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink to="/contact" variant="cta">
              Book a free 15-min chat
            </ButtonLink>
            <ButtonLink to="/services" variant="primary">
              Explore services
            </ButtonLink>
            <ButtonLink to="/contact" variant="outline" icon={<ArrowIcon />}>
              See fees and funding
            </ButtonLink>
            <Button variant="cta" size="lg">
              Large CTA
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-card bg-primary-dark p-6">
            <ButtonLink to="/contact" variant="cta">
              CTA on deep band
            </ButtonLink>
            <ButtonLink to="/contact" variant="inverse">
              Inverse outline
            </ButtonLink>
          </div>
          <p className="mt-8">
            Inline link: <a href="#ds-buttons">learn how fees and funding work</a>. Link text always
            describes the destination — never “More info”.
          </p>
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="ds-cards">
        <Container>
          <SectionHeader id="ds-cards" title="Cards & media" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <li key={s.slug}>
                <ServiceCard service={s} index={i} />
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Photo name="artMaterials" shape="blob" sizes="33vw" className="aspect-square" />
            <Photo name="studioCushions" shape="arch" sizes="33vw" className="aspect-[4/5]" />
            <PortraitPlaceholder name="Practitioner Name" />
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="ds-art">
        <Container>
          <SectionHeader
            id="ds-art"
            title="Brushstroke illustrations"
            intro={<p>Use these instead of stock photos of people.</p>}
          />
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {arts.map((a, i) => (
              <li
                key={a}
                className="flex flex-col items-center gap-3 rounded-card bg-dominant-2 p-6"
              >
                <Brushstroke
                  variant={a}
                  className={
                    [
                      "text-primary-dark",
                      "text-secondary-dark",
                      "text-primary-dark",
                      "text-secondary-dark",
                      "text-primary-1",
                    ][i]
                  }
                />
                <code>{a}</code>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="ds-forms">
        <Container narrow>
          <SectionHeader id="ds-forms" title="Form fields" />
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <TextField label="Your name" name="ds-name" />
            <TextField
              label="Email"
              name="ds-email"
              type="email"
              error="That email doesn't look quite right — please check it."
              defaultValue="hello@"
            />
            <TextField
              label="Pronouns"
              name="ds-pronouns"
              optional
              hint="For example: she/her, he/him, they/them."
            />
            <SelectField
              label="Service"
              name="ds-service"
              options={[{ value: "a", label: "Counselling" }]}
            />
            <ChoiceGroup
              legend="In person or online?"
              name="ds-format"
              options={[
                { value: "in", label: "In person" },
                { value: "on", label: "Online" },
              ]}
            />
            <TextareaField label="How would you like to be supported?" name="ds-msg" optional />
            <CheckboxField label="I agree to the privacy policy." name="ds-consent" />
          </form>
        </Container>
      </Section>

      <Section aria-labelledby="ds-trust">
        <Container narrow>
          <SectionHeader id="ds-trust" title="Trust & placeholders" />
          <CrisisNote />
          <p className="mt-8">
            Unconfirmed facts render like this: <Todo>TODO: phone number</Todo>. Search the codebase
            for <code>TODO</code> to find them all.
          </p>
        </Container>
      </Section>
    </>
  );
}
