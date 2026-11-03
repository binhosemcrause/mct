import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Neon over HTTP — no connection pool to manage, works on serverless and Node.
 * Returns null when DATABASE_URL is unset so static builds and local UI work
 * still run; callers decide whether that's acceptable.
 */
function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return drizzle({ client: neon(url), schema, casing: "snake_case" });
}

export const db = createDb();
export type Db = NonNullable<typeof db>;
