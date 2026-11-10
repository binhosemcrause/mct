# Moving Circle Therapy — website

Counselling and creative arts therapy practice in Chelsea, VIC. Tagline: _Your journey to holistic wellbeing through art and movement._

React Router 8 (framework mode, pre-rendered) · React 19 · TypeScript · Tailwind CSS 4 · Drizzle ORM · Neon Postgres.

## Getting started

```bash
pnpm install
cp .env.example .env        # add your Neon DATABASE_URL (optional for UI work)
pnpm dev                    # http://localhost:5173
```

Without `DATABASE_URL` the whole site still runs; only enquiry submission returns a friendly "couldn't send" error.

### Database (Neon, free tier)

1. Create a project at [neon.tech](https://neon.tech) (region: Sydney, `ap-southeast-2`).
2. Copy the **pooled** connection string into `.env` as `DATABASE_URL`.
3. `pnpm db:migrate` — applies `drizzle/` migrations.

After changing `app/db/schema.ts`: `pnpm db:generate --name <change>` then `pnpm db:migrate`.

## Scripts

| Command                           | What it does                                         |
| --------------------------------- | ---------------------------------------------------- |
| `pnpm dev`                        | Dev server with HMR                                  |
| `pnpm build` / `pnpm start`       | Production build (pre-renders pages) / serve it      |
| `pnpm check`                      | typecheck + lint + format check + unit tests         |
| `pnpm test`                       | Vitest unit/component tests                          |
| `pnpm test:e2e`                   | Playwright + axe (WCAG 2.2 AA) on mobile and desktop |
| `pnpm db:generate` / `db:migrate` | Drizzle migrations                                   |

## Before launch — content to confirm

Unconfirmed facts are marked `TODO` in code and render as **dashed purple placeholders** on the site.
`grep -rn "TODO" app/` lists them all. Main ones: phone, opening hours, booking-platform link,
practitioner qualifications and registration numbers, Therapy for All fee details, parking/access/transport,
real photos (studio, materials, portraits) and consented testimonials.

## Fonts

The footer wordmark uses **Garet** (Spacetype, licensed — not on Google Fonts). Put the web files in
`public/fonts/` as `garet-book.woff2` (400) and `garet-heavy.woff2` (700). Until then it falls back to Josefin Sans.

## Design system

Tokens: `app/app.css` (`@theme`), from `DESIGN.md`. Live reference: `/design-system` (not indexed).
