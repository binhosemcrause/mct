import type { Route } from "./+types/home";
import { Hero } from "~/components/home/Hero";
import { pages } from "~/config/pages";
import { businessJsonLd, jsonLdScript, pageMeta } from "~/lib/seo";

export function meta(_: Route.MetaArgs) {
  const page = pages["/"]!;
  return [
    ...pageMeta({ title: page.title, description: page.description, path: "/" }),
    jsonLdScript(businessJsonLd()),
  ];
}

export default function Home() {
  return <Hero />;
}
