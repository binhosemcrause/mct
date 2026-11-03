import { data } from "react-router";
import type { Route } from "./+types/contact";
import { Brushstroke } from "~/components/art/Brushstroke";
import { EnquiryForm, type EnquiryActionData } from "~/components/forms/EnquiryForm";
import { CrisisNote } from "~/components/layout/CrisisNote";
import { ButtonAnchor } from "~/components/ui/Button";
import { Container } from "~/components/ui/Layout";
import { Fact, Todo } from "~/components/ui/Todo";
import { pages } from "~/config/pages";
import { isPlaceholder, site } from "~/config/site";
import { createEnquiry, DatabaseUnavailableError } from "~/db/queries.server";
import { parseEnquiry } from "~/lib/enquiry-schema";
import { notifyNewEnquiry } from "~/lib/notify.server";
import { businessJsonLd, jsonLdScript, pageMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  const page = pages["/contact"]!;
  return [
    ...pageMeta({ title: page.title, description: page.description, path: "/contact" }),
    jsonLdScript(businessJsonLd()),
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const form = await request.formData();
  const parsed = parseEnquiry(form);

  if (!parsed.ok) {
    const values = Object.fromEntries(
      [...form.entries()].filter(([k, v]) => typeof v === "string" && k !== "website"),
    ) as Record<string, string>;
    return data<EnquiryActionData>(
      { status: "invalid", errors: parsed.errors, values },
      { status: 400 },
    );
  }

  // Honeypot filled → pretend success, store nothing
  if (parsed.data.website) return { status: "success" } satisfies EnquiryActionData;

  try {
    const row = await createEnquiry(parsed.data);
    if (row) await notifyNewEnquiry(row.id, parsed.data).catch((e) => console.error(e));
    return { status: "success" } satisfies EnquiryActionData;
  } catch (error) {
    // Never log form contents — they may include health information
    console.error(
      "Enquiry save failed:",
      error instanceof DatabaseUnavailableError ? error.message : error,
    );
    return data<EnquiryActionData>(
      {
        status: "error",
        message: `Sorry, your enquiry couldn't be sent just now. Please try again, or email ${site.contact.email}.`,
      },
      { status: 503 },
    );
  }
}

export default function Contact({ actionData }: Route.ComponentProps) {
  const { contact, address } = site;
  const mapQuery = encodeURIComponent(
    `${address.streetAddress}, ${address.locality} ${address.region} ${address.postcode}`,
  );
  const { latitude: lat, longitude: lon } = address.geo;
  const bbox = [lon - 0.006, lat - 0.004, lon + 0.006, lat + 0.004].join(",");

  return (
    <>
      <section aria-labelledby="contact-title" className="paper-grain relative overflow-hidden">
        <Brushstroke
          variant="echo"
          className="spin-slow pointer-events-none absolute -top-40 -right-40 size-[32rem] text-primary-1/70"
        />
        <Container className="relative pt-16 pb-12 lg:pt-24">
          <p className="text-eyebrow-style text-secondary-dark">Contact & book</p>
          <h1 id="contact-title" className="mt-3 max-w-3xl text-h1">
            Let's find a time to talk.
          </h1>
          <p className="mt-6 max-w-2xl text-lead">
            Book a free 15-minute chat online, or send us a note and we'll reach out. There's no
            commitment, and you don't need a referral.
          </p>
        </Container>
      </section>

      <Container className="grid gap-16 pb-section lg:grid-cols-12">
        <div className="flex flex-col gap-16 lg:col-span-7">
          <section
            id="book"
            aria-labelledby="book-title"
            className="scroll-mt-28 rounded-card bg-primary-1 p-8 md:p-10"
          >
            <h2 id="book-title" className="text-h2">
              Book online
            </h2>
            <p className="mt-4">
              Pick a time that suits you for a free 15-minute phone or video chat. You'll get a
              confirmation email straight away.
            </p>
            <div className="mt-8">
              {isPlaceholder(contact.bookingUrl) ? (
                <Todo>{contact.bookingUrl}</Todo>
              ) : (
                <ButtonAnchor
                  href={contact.bookingUrl}
                  variant="cta"
                  size="lg"
                  target="_blank"
                  rel="noopener"
                >
                  Book a free 15-min chat
                  <span className="sr-only"> (opens booking site in a new tab)</span>
                </ButtonAnchor>
              )}
            </div>
          </section>

          <section aria-labelledby="enquire-title">
            <h2 id="enquire-title" className="text-h2">
              Or send an enquiry
            </h2>
            <p className="mt-4 mb-10">
              Not sure yet? Tell us a little, and we'll suggest a starting point.
            </p>
            <EnquiryForm actionData={actionData} />
          </section>
        </div>

        <aside
          aria-label="Contact details and visiting information"
          className="flex flex-col gap-8 lg:col-span-5"
        >
          <CrisisNote />

          <section aria-labelledby="details-title" className="rounded-card bg-dominant-2 p-7">
            <h2 id="details-title" className="text-item">
              Contact details
            </h2>
            <dl className="mt-5 grid gap-4">
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
                    <a href={`tel:${contact.phoneE164}`}>{contact.phone}</a>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow-style text-secondary-dark">Studio</dt>
                <dd className="mt-1">
                  <address className="not-italic">
                    {address.streetAddress}
                    <br />
                    {address.locality} {address.region} {address.postcode}
                  </address>
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="visit-title" className="flex flex-col gap-5">
            <h2 id="visit-title" className="text-item">
              Getting here
            </h2>
            <iframe
              title="Map showing Moving Circle Therapy at 13/450 Nepean Highway, Chelsea"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-card border border-charcoal/15"
            />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener"
            >
              Get directions in Google Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <h3 className="mt-2 text-[1.5rem]">Access</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="font-semibold">Parking: </span>
                <Todo>TODO: parking details (on-site / street, accessible bays)</Todo>
              </li>
              <li>
                <span className="font-semibold">Step-free access: </span>
                <Todo>TODO: entrance, lift, accessible toilet</Todo>
              </li>
              <li>
                <span className="font-semibold">Public transport: </span>
                <Todo>TODO: walk from Chelsea station (Frankston line) and nearby bus routes</Todo>
              </li>
              <li>
                <span className="font-semibold">Online sessions: </span>
                available if travelling isn't easy.
              </li>
            </ul>
          </section>
        </aside>
      </Container>
    </>
  );
}
