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
          <Logo size="lg" mark />
          <p className="max-w-sm">
            Supporting individuals and groups through movement, creativity and connection. Our
            qualified creative arts therapists and counsellors offer creative arts therapy, dance
            movement therapy, counselling and group therapy programs to support mental health and
            wellbeing needs.
          </p>
          <p className="text-item italic">{site.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-3">
          <h2 className="text-eyebrow-style font-body text-ink">Visit or get in touch</h2>
          <p>Melbourne</p>
          <p>
            <a href={`mailto:${contact.email}`} className="text-ink">
              {contact.email}
            </a>
          </p>
          <p>
            <a href={contact.instagram} rel="me noopener" target="_blank" className="text-ink">
              @movingcircletherapy
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="text-eyebrow-style mb-3 font-body text-ink">Explore</h2>
          <ul className="flex flex-col gap-2">
            {footerLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-6 lg:col-span-3">
          <CrisisNote />
        </div>

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
