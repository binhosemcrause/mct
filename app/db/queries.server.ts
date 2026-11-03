import { count, isNotNull } from "drizzle-orm";
import type { EnquiryInput } from "~/lib/enquiry-schema";
import { db } from "./client.server";
import { enquiries, posts } from "./schema";

export class DatabaseUnavailableError extends Error {
  constructor() {
    super("DATABASE_URL is not configured");
  }
}

export async function createEnquiry(input: EnquiryInput) {
  if (!db) throw new DatabaseUnavailableError();
  const [row] = await db
    .insert(enquiries)
    .values({
      name: input.name,
      preferredName: input.preferredName || null,
      pronouns: input.pronouns || null,
      email: input.email,
      phone: input.phone || null,
      contactMethod: input.contactMethod,
      service: input.service,
      format: input.format,
      message: input.message || null,
      consentAt: new Date(),
    })
    .returning({ id: enquiries.id });
  return row;
}

/** Used to decide whether the Journal appears in navigation. Never throws. */
export async function countPublishedPosts(): Promise<number> {
  if (!db) return 0;
  try {
    const [row] = await db.select({ n: count() }).from(posts).where(isNotNull(posts.publishedAt));
    return row?.n ?? 0;
  } catch (error) {
    console.error("countPublishedPosts failed", error);
    return 0;
  }
}
