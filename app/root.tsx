import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { SiteFooter } from "~/components/layout/SiteFooter";
import { SiteHeader } from "~/components/layout/SiteHeader";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Layout";
import { primaryNav } from "~/config/nav";
import { site } from "~/config/site";
import { useScrollReveal } from "~/lib/reveal";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/brand/icon-32.png", type: "image/png", sizes: "32x32" },
  { rel: "apple-touch-icon", href: "/brand/icon-180.png" },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const nav = primaryNav;
  return (
    <html lang={site.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f4f5ee" />
        <meta name="format-detection" content="telephone=no" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-pill bg-charcoal px-5 py-3 font-semibold text-dominant-1 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <SiteHeader nav={nav} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useScrollReveal();
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  let details = notFound
    ? "We couldn't find that page. It may have moved while we tidied things up."
    : "Something went wrong on our side. Please try again, or email us and we'll help.";
  let stack: string | undefined;
  if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Container narrow className="py-section">
      <title>
        {notFound ? `Page not found | ${site.name}` : `Something went wrong | ${site.name}`}
      </title>
      <p className="text-eyebrow-style text-secondary-dark">{notFound ? "404" : "Error"}</p>
      <h1 className="mt-3 text-h1">
        {notFound ? "This path wanders off." : "Sorry — that didn't work."}
      </h1>
      <p className="mt-6 text-lead">{details}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink to="/" variant="primary">
          Back to the home page
        </ButtonLink>
        <ButtonLink to="/contact" variant="outline">
          Contact us
        </ButtonLink>
      </div>
      {stack && (
        <pre className="mt-10 overflow-x-auto rounded-card bg-dominant-2 p-4 text-small">
          <code>{stack}</code>
        </pre>
      )}
    </Container>
  );
}
