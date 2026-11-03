# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` — dev server; `pnpm build && pnpm start` — production build (pre-renders pages) and serve
- `pnpm check` — typecheck + lint + prettier check + unit tests (run before finishing any change)
- `pnpm test` — Vitest; single file: `pnpm vitest run app/lib/enquiry-schema.test.ts`; single test: add `-t "name"`
- `pnpm test:e2e` — Playwright + axe against the production build (mobile + desktop projects); single: `pnpm test:e2e tests/e2e/home.spec.ts --project=desktop`
- `pnpm db:generate --name <change>` then `pnpm db:migrate` after editing `app/db/schema.ts` (needs `DATABASE_URL` in `.env`)

## Architecture

- **React Router 8 framework mode.** Routes are declared explicitly in `app/routes.ts`. `ssr: true` plus a `prerender` list in `react-router.config.ts`: content pages are static HTML; the server only handles actions (the `/contact` enquiry form). When adding a route, add it to `prerender` and, once it has real content, to `LIVE_PATHS` in `app/routes/sitemap.ts`.
- **Unbuilt pages** all map to `routes/page-stub.tsx` (one route id per path, `noindex`) so the nav never dead-ends. Replace a stub by pointing its path at a new module.
- **Single sources of truth:** practice facts in `app/config/site.ts`; per-page title/description in `app/config/pages.ts` (unit test enforces uniqueness and length); nav in `app/config/nav.ts` (Journal hidden until ≥3 published posts, counted in the root loader); copy/data in `app/content/*`.
- **Placeholders:** unconfirmed values start with `TODO`. Render them via `<Fact>` / `<TextWithTodos>` / `<Todo>` (`components/ui/Todo.tsx`) so they show as dashed placeholders. Never invent practice facts (fees, registrations, hours, credentials). `businessJsonLd()` omits placeholder values.
- **Enquiry flow:** `lib/enquiry-schema.ts` (zod) is shared by the client (blur validation and error summary in `components/forms/EnquiryForm.tsx`) and the server action in `routes/contact.tsx`, so the form works without JS. Data goes to `db/queries.server.ts` (Drizzle over Neon HTTP; `db` is `null` when `DATABASE_URL` is unset), then `lib/notify.server.ts` sends an optional Resend email. Never log or email the free-text message; it may contain health information.
- `*.server.ts` modules must only be imported from loaders and actions.

## Design rules (from DESIGN.md — tokens in `app/app.css` `@theme`)

- Default Tailwind colours are disabled. Use only the brand tokens. Accent orange (`accent-1`/`accent-dark`) is **only** for CTA buttons (`variant="cta"`). Text on any `*-1` soft fill must be `charcoal`. `error` is a functional colour for forms only.
- Headings: Fraunces with `"SOFT" 100, "WONK" 1` (set globally). Body: Josefin Sans, 18px / 1.6. Use the type tokens `text-h0…text-item`, `text-lead`, `text-body`, `text-small`.
- Build pages from `components/ui` (Button, Section, SectionHeader, Container, Card, Field, Photo) and `components/art/Brushstroke`. `/design-system` shows them all.
- No stock photos of people. Use `<Brushstroke>` art until real photos (with consent) arrive. Placeholder photos are registered in `content/photos.ts` with a visible "replace with" label.
- Scroll motion: spread `reveal()` onto elements. CSS disables all motion under `prefers-reduced-motion`. Don't put Tailwind `translate-*` on an element that also has `data-reveal` (they share the `translate` property).
- Accessibility: one `h1` per page, no skipped levels, sections labelled with `aria-labelledby`, descriptive link text (never "More info"). E2E tests enforce axe WCAG 2.2 AA and the heading order.
- Copy: Australian English (counselling, colour), warm and plain, speaking to "you".
