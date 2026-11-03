import { data } from "react-router";
import type { Route } from "./+types/page-stub";
import { Brushstroke } from "~/components/art/Brushstroke";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Layout";
import { bookCta } from "~/config/nav";
import { pages } from "~/config/pages";
import { pageMeta } from "~/lib/seo";

/** Temporary page for sections still being built — keeps nav links working, with real titles/meta. */
export function loader({ request }: Route.LoaderArgs) {
  // Single-fetch data requests arrive as "/services.data"
  const path = new URL(request.url).pathname.replace(/\.data$/, "").replace(/\/$/, "") || "/";
  const page = pages[path];
  if (!page) throw data("Not found", { status: 404 });
  return { path, page };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [];
  const { page, path } = loaderData;
  // Stubs stay out of search results until they have real content
  return pageMeta({ title: page.title, description: page.description, path, noindex: true });
}

export default function PageStub({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;
  return (
    <section aria-labelledby="page-title" className="paper-grain relative overflow-hidden">
      <Brushstroke
        variant="echo"
        className="spin-slow pointer-events-none absolute -top-32 -right-32 size-[30rem] text-primary-1/70"
      />
      <Container narrow className="relative py-section">
        <p className="text-eyebrow-style text-secondary-dark">Coming soon</p>
        <h1 id="page-title" className="mt-3 text-h1">
          {page.title}
        </h1>
        <p className="mt-6 text-lead">{page.intro}</p>
        <p className="mt-6">
          We're still finishing this page. In the meantime, we're happy to answer any question
          directly.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <ButtonLink to={bookCta.to} variant="cta" size="lg">
            {bookCta.label}
          </ButtonLink>
          <ButtonLink to="/" variant="outline" size="lg">
            Back to the home page
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
