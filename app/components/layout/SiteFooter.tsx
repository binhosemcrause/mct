import { Link } from "react-router";
import { Brushstroke } from "~/components/art/Brushstroke";
import { Container } from "~/components/ui/Layout";
import { footerLinks } from "~/config/nav";
import { acknowledgementOfCountry, site } from "~/config/site";
import { CrisisNote } from "./CrisisNote";
import { Logo } from "./Logo";

export function SiteFooter() {
  const { contact } = site;
  const year = new Date().getFullYear();
  return (
    <footer className="paper-grain relative overflow-hidden bg-paper text-ink">
      <Brushstroke
        variant="echo"
        className="pointer-events-none absolute -top-40 -right-40 size-[34rem] text-primary-1"
      />
      <Container className="relative grid gap-12 pt-20 pb-10 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          {/* Brand wordmark: Garet in accent orange (logotypes are exempt from contrast rules) */}
          <div data-brand className="font-brand text-accent-1">
            <Logo size="lg" mark />
          </div>
          <div className="flex max-w-sm flex-col gap-3">
            <p className="font-bold italic">{site.tagline}</p>
            <p>
              Supporting individuals and groups through movement, creativity and connection. Our
              qualified creative arts therapists and counsellors offer creative arts therapy, dance
              movement therapy, counselling and group therapy programs to support mental health and
              wellbeing needs.
            </p>
          </div>
        </div>

        {/* w-fit: the column is as wide as its widest line (the email), so the crisis box matches it */}
        <div className="flex w-fit flex-col gap-3 lg:col-span-4">
          <h2 className="text-eyebrow-style font-body text-accent-1">Get in touch</h2>
          <p className="flex items-center gap-3">
            <ContactIcon name="location" width={68} height={100} />
            Melbourne
          </p>
          <p>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-3 text-ink no-underline hover:underline"
            >
              <ContactIcon name="email" width={138} height={96} />
              {contact.email}
            </a>
          </p>
          <p>
            <a
              href={contact.instagram}
              rel="me noopener"
              target="_blank"
              className="inline-flex items-center gap-3 text-ink no-underline hover:underline"
            >
              <ContactIcon name="instagram" width={122} height={115} />
              movingcircletherapy
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>
          </p>
          {/* w-0 min-w-full: fills the column without widening it */}
          <CrisisNote className="mt-4 w-0 min-w-full" />
        </div>

        <nav aria-label="Footer" className="lg:col-span-4">
          <h2 className="text-eyebrow-style mb-3 font-body text-accent-1">Explore</h2>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="whitespace-nowrap text-ink no-underline hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-ink/15 pt-8 lg:col-span-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small">
            <li>
              <Link to="/privacy" className="text-ink">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-ink">
                Terms of use
              </Link>
            </li>
            <li>
              © {year} {site.name}
            </li>
          </ul>
        </div>

        {/* Last thing on every page */}
        <p className="font-body text-small lg:col-span-12">
          <span className="font-semibold">Acknowledgement of Country. </span>
          {acknowledgementOfCountry}
        </p>
      </Container>
    </footer>
  );
}

/** Hand-drawn contact icons (decorative: each sits beside its text label). */
function ContactIcon({ name, width, height }: { name: string; width: number; height: number }) {
  return (
    <span aria-hidden="true" className="grid w-9 shrink-0 place-items-center">
      <img
        src={`/brand/icons/${name}.png`}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        className="h-7 w-auto max-w-9 object-contain"
      />
    </span>
  );
}
