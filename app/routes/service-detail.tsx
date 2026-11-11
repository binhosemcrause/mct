import { data } from "react-router";
import type { Route } from "./+types/service-detail";
import { ServiceBlob, shapes } from "~/components/services/ServiceBlob";
import { pages } from "~/config/pages";
import { services, type ServiceSlug } from "~/content/services";
import { cx } from "~/lib/cx";
import { pageMeta } from "~/lib/seo";

/** The text panel takes a soft wash of its shape's colour, as in the design. */
const panelTint: Record<ServiceSlug, string> = {
  counselling: "bg-sun/25",
  "creative-arts-therapy": "bg-secondary-1/45",
  "dance-movement-therapy": "bg-accent-1/20",
  workshops: "bg-primary-1/35",
};

export function loader({ request }: Route.LoaderArgs) {
  // Single-fetch data requests arrive as "/services/counselling.data"
  const path = new URL(request.url).pathname.replace(/\.data$/, "").replace(/\/$/, "");
  const service = services.find((s) => `/services/${s.slug}` === path);
  const page = pages[path];
  if (!service || !page) throw data("Not found", { status: 404 });
  return { path, page, service };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [];
  const { page, path, service } = loaderData;
  // Pages still waiting on their copy stay out of search results
  return pageMeta({
    title: page.title,
    description: page.description,
    path,
    noindex: !service.description,
  });
}

/** One service: its shape on the left, what it is on the right (stacked on phones). */
export default function ServiceDetail({ loaderData }: Route.ComponentProps) {
  const { service } = loaderData;
  const shape = shapes[service.slug];
  return (
    <section
      aria-labelledby="service-title"
      className="aura-soft relative grid overflow-hidden lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]"
    >
      <div className="flex items-center justify-center px-gutter py-12 lg:py-16">
        <div
          className="relative w-[min(80%,30rem)] lg:w-[min(72%,34rem)]"
          style={{ aspectRatio: shape.viewBox.split(" ").slice(2).join(" / ") }}
        >
          <ServiceBlob
            slug={service.slug}
            name={service.name}
            as="h1"
            id="service-title"
            className="text-[clamp(2rem,1rem+2.4vw,3.5rem)]"
          />
        </div>
      </div>
      <div
        className={cx("px-gutter pt-8 pb-16 lg:mr-[3%] lg:px-10 lg:pt-8", panelTint[service.slug])}
      >
        <p className="max-w-[40rem] text-[clamp(1.125rem,0.5rem+1.25vw,1.625rem)] leading-[1.55] text-ink">
          {service.description ?? "Coming soon."}
        </p>
      </div>
    </section>
  );
}
