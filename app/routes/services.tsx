import { Link } from "react-router";
import type { Route } from "./+types/services";
import { pages } from "~/config/pages";
import { ServiceBlob, shapes } from "~/components/services/ServiceBlob";
import { services } from "~/content/services";
import { cx } from "~/lib/cx";
import { pageMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  const page = pages["/services"]!;
  return pageMeta({ title: page.title, description: page.description, path: "/services" });
}

export default function Services() {
  return (
    <section aria-labelledby="services-title" className="aura-soft relative overflow-hidden">
      <h1 id="services-title" className="sr-only">
        Our services
      </h1>
      <ul className="mx-auto flex max-w-xl flex-col px-gutter py-12 lg:relative lg:my-10 lg:aspect-[1482/602] lg:max-w-none lg:p-0">
        {services.map((service) => {
          const shape = shapes[service.slug];
          return (
            <li
              key={service.slug}
              className={cx(
                "relative",
                shape.mobile,
                "lg:absolute lg:mt-0 lg:aspect-auto",
                shape.stage,
              )}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group relative block size-full rounded-full no-underline"
                prefetch="intent"
              >
                <ServiceBlob
                  slug={service.slug}
                  name={service.name}
                  className="text-[clamp(1.75rem,1rem+1.7vw,2.75rem)]"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
