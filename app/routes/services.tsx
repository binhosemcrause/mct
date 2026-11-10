import { Link } from "react-router";
import type { Route } from "./+types/services";
import { pages } from "~/config/pages";
import { services, type ServiceSlug } from "~/content/services";
import { cx } from "~/lib/cx";
import { pageMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  const page = pages["/services"]!;
  return pageMeta({ title: page.title, description: page.description, path: "/services" });
}

/**
 * Each service is an organic shape. On wide screens they float in a loose cluster
 * (positions in % of the stage, `lg:` classes); on phones they stack, alternating left and right.
 */
const shapes: Record<
  ServiceSlug,
  { path: string; viewBox: string; fill: string; stage: string; mobile: string }
> = {
  counselling: {
    viewBox: "0 0 200 180",
    path: "M96 6c40-2 70 12 86 44 16 34 18 76-6 104-26 30-84 28-124 16C14 158 0 126 4 92 8 56 40 8 96 6Z",
    fill: "fill-sun",
    stage: "lg:left-[8%] lg:top-[15%] lg:w-[25%] lg:h-[54%]",
    mobile: "self-start w-[80%] aspect-[10/9]",
  },
  "creative-arts-therapy": {
    viewBox: "0 0 200 220",
    path: "M126 8c34 2 54 30 58 66 4 34-2 62 4 92 6 34-30 54-74 50-44-4-98-14-110-48-12-34 18-58 34-96C54 34 88 6 126 8Z",
    fill: "fill-secondary-1",
    stage: "lg:left-[30%] lg:top-[40%] lg:w-[23%] lg:h-[58%]",
    mobile: "self-end w-[78%] aspect-[10/11] -mt-8",
  },
  "dance-movement-therapy": {
    viewBox: "0 0 200 260",
    path: "M120 6c30-4 58 14 60 42 2 18-8 28-2 44 12 28 20 58 8 88-10 24-26 30-30 50-6 22-24 30-44 26-22-4-30-20-34-36-6-20-26-22-48-34C8 172 2 148 6 124c4-28 18-44 16-62-2-26 22-44 52-42 18 1 26-11 46-14Z",
    fill: "fill-accent-1",
    stage: "lg:left-[44.5%] lg:top-[1%] lg:w-[22%] lg:h-[67%]",
    mobile: "self-start w-[70%] aspect-[10/13] -mt-6",
  },
  workshops: {
    viewBox: "0 0 220 200",
    path: "M160 8c34 2 54 30 56 70 2 46-10 86-48 106-40 20-104 14-140-14C2 150 0 110 18 84c18-26 56-24 82-44C124 22 132 6 160 8Z",
    fill: "fill-primary-1",
    stage: "lg:left-[66%] lg:top-[24%] lg:w-[25%] lg:h-[56%]",
    mobile: "self-end w-[80%] aspect-[11/10] -mt-8",
  },
};

export default function Services() {
  return (
    <section aria-labelledby="services-title" className="aura-soft relative overflow-hidden">
      <h1 id="services-title" className="sr-only">
        Our services
      </h1>
      <ul className="mx-auto flex max-w-xl flex-col px-gutter py-12 lg:relative lg:aspect-[1486/620] lg:max-w-none lg:p-0">
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
                className="group relative grid size-full place-items-center rounded-full text-ink no-underline"
                prefetch="intent"
              >
                <svg
                  aria-hidden="true"
                  viewBox={shape.viewBox}
                  preserveAspectRatio="none"
                  className={cx(
                    "absolute inset-0 size-full transition-transform duration-700 ease-organic group-hover:scale-[1.04] group-hover:rotate-2 motion-reduce:transition-none",
                    shape.fill,
                  )}
                >
                  <path d={shape.path} />
                </svg>
                <span className="relative max-w-[11ch] px-4 text-center text-[clamp(1.75rem,1rem+1.7vw,2.75rem)] leading-tight tracking-wide lowercase">
                  {service.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
