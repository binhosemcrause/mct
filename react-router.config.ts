import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  // Vercel build output only on Vercel; local `pnpm start` and e2e use the Node server
  presets: process.env.VERCEL ? [vercelPreset()] : [],
  // SSR stays on so the enquiry form's action runs on the server.
  ssr: true,
  // Content pages are pre-rendered to static HTML at build time: fastest load, best SEO.
  async prerender() {
    return [
      "/",
      "/contact",
      "/services",
      "/services/counselling",
      "/services/creative-arts-therapy",
      "/services/workshops",
      "/services/classes",
      "/practitioners",
      "/fees",
      "/whats-on",
      "/about",
      "/journal",
      "/privacy",
      "/terms",
      "/sitemap.xml",
      "/robots.txt",
    ];
  },
} satisfies Config;
