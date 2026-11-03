import { Link } from "react-router";
import { Brushstroke } from "~/components/art/Brushstroke";
import { Container } from "~/components/ui/Layout";
import { Fact, Todo } from "~/components/ui/Todo";
import type { NavItem } from "~/config/nav";
import { acknowledgementOfCountry, isPlaceholder, site } from "~/config/site";
import { CrisisNote } from "./CrisisNote";
import { Logo } from "./Logo";

export function SiteFooter({ nav }: { nav: NavItem[] }) {
  const { contact, address } = site;
  const year = new Date().getFullYear();
  return (
    <footer className="paper-grain relative overflow-hidden bg-dominant-2">
      <Brushstroke
        variant="echo"
        className="pointer-events-none absolute -top-40 -right-40 size-[34rem] text-primary-1"
      />
      <Container className="relative grid gap-12 pt-20 pb-10 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Logo size="lg" />
          <p className="max-w-sm">
            Counselling and creative arts therapy in Chelsea, for people across the Mornington
            Peninsula, Bayside and south-east Melbourne.
          </p>
          <p className="font-display text-item italic">{site.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-3">
          <h2 className="text-eyebrow-style font-body text-secondary-dark">
            Visit or get in touch
          </h2>
          <address className="not-italic">
            {address.streetAddress}
            <br />
            {address.locality} {address.region} {address.postcode}
          </address>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p>
            {isPlaceholder(contact.phoneE164) ? (
              <Fact value={contact.phone} />
            ) : (
              <a href={`tel:${contact.phoneE164}`}>{contact.phone}</a>
            )}
          </p>
          <div>
            <h3 className="sr-only">Opening hours</h3>
            {site.hours.length === 0 ? (
              <Todo>TODO: opening hours</Todo>
            ) : (
              <ul>
                {site.hours.map((h) => (
                  <li key={h.days.join()}>
                    {h.days.length > 1 ? `${h.days[0]} – ${h.days.at(-1)}` : h.days[0]}: {h.opens}–
                    {h.closes}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p>
            {isPlaceholder(contact.instagram) ? (
              <Fact value={contact.instagram} />
            ) : (
              <a href={contact.instagram} rel="me noopener" target="_blank">
                Follow Moving Circle on Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="text-eyebrow-style mb-3 font-body text-secondary-dark">Explore</h2>
          <ul className="flex flex-col gap-2">
            {[{ label: "Home", to: "/" }, ...nav].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-charcoal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-6 lg:col-span-3">
          <CrisisNote />
        </div>

        <div className="flex flex-col gap-6 border-t border-charcoal/15 pt-8 lg:col-span-12 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-3xl text-small">
            <span className="font-semibold">Acknowledgement of Country. </span>
            {acknowledgementOfCountry}
          </p>
          <ul className="flex shrink-0 flex-wrap gap-x-6 gap-y-2 text-small">
            <li>
              <Link to="/privacy" className="text-charcoal">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-charcoal">
                Terms of use
              </Link>
            </li>
            <li>
              © {year} {site.name}
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
