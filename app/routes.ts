import { type RouteConfig, index, route } from "@react-router/dev/routes";

/*
 * Pages not built yet share `routes/page-stub.tsx` (unique id per path) so the
 * navigation never leads to a dead end. Replace each with its own module as it's built.
 */
const stub = (path: string) => route(path, "routes/page-stub.tsx", { id: `stub:${path}` });

export default [
  index("routes/home.tsx"),
  route("contact", "routes/contact.tsx"),
  route("design-system", "routes/design-system.tsx"),

  stub("about/our-story"),
  stub("about/therapy-for-all"),
  stub("services"),
  stub("services/counselling"),
  stub("services/creative-arts-therapy"),
  stub("services/dance-movement-therapy"),
  stub("services/workshops"),
  stub("services/workshops/corporate-wellbeing"),
  stub("referrals-ndis"),
  stub("resources/blog"),
  stub("resources/frameworks"),
  stub("creative-circle"),
  stub("privacy"),
  stub("terms"),

  route("sitemap.xml", "routes/sitemap.ts"),
  route("robots.txt", "routes/robots.ts"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
