import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/*
 * Enquiries contain sensitive personal (health-adjacent) information.
 * APP 11: keep only what's needed, restrict access, and delete when no longer required
 * — see `retainUntil` and scripts/purge-enquiries (to add with the admin tooling).
 */

export const contactMethod = pgEnum("contact_method", ["email", "phone", "sms"]);
export const sessionFormat = pgEnum("session_format", ["in-person", "online", "either"]);
export const enquiryStatus = pgEnum("enquiry_status", ["new", "contacted", "booked", "closed"]);
export const eventKind = pgEnum("event_kind", ["workshop", "class", "community"]);

export const enquiries = pgTable(
  "enquiries",
  {
    id: uuid().primaryKey().defaultRandom(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    name: text().notNull(),
    preferredName: text(),
    pronouns: text(),
    email: text().notNull(),
    phone: text(),
    contactMethod: contactMethod().notNull(),
    service: text().notNull(),
    format: sessionFormat().notNull(),
    message: text(),
    consentAt: timestamp({ withTimezone: true }).notNull(),
    status: enquiryStatus().notNull().default("new"),
    retainUntil: timestamp({ withTimezone: true })
      .notNull()
      .default(sql`now() + interval '2 years'`),
  },
  (t) => [index("enquiries_status_created_idx").on(t.status, t.createdAt)],
);

export const events = pgTable(
  "events",
  {
    id: uuid().primaryKey().defaultRandom(),
    slug: text().notNull().unique(),
    kind: eventKind().notNull(),
    title: text().notNull(),
    summary: text().notNull(),
    startsAt: timestamp({ withTimezone: true }).notNull(),
    endsAt: timestamp({ withTimezone: true }).notNull(),
    location: text().notNull(),
    /** Price in cents (AUD). 0 = free. */
    priceCents: integer().notNull().default(0),
    capacity: integer().notNull(),
    isPublished: boolean().notNull().default(false),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("events_published_starts_idx").on(t.isPublished, t.startsAt),
    check("events_capacity_positive", sql`${t.capacity} > 0`),
    check("events_ends_after_starts", sql`${t.endsAt} > ${t.startsAt}`),
  ],
);

export const reservations = pgTable(
  "reservations",
  {
    id: uuid().primaryKey().defaultRandom(),
    eventId: uuid()
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    name: text().notNull(),
    email: text().notNull(),
    spots: integer().notNull().default(1),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("reservations_event_idx").on(t.eventId),
    check("reservations_spots_positive", sql`${t.spots} > 0`),
  ],
);

export const posts = pgTable(
  "posts",
  {
    id: uuid().primaryKey().defaultRandom(),
    slug: text().notNull().unique(),
    title: text().notNull(),
    excerpt: text().notNull(),
    /** Markdown */
    body: text().notNull(),
    author: text().notNull(),
    publishedAt: timestamp({ withTimezone: true }),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("posts_published_idx").on(t.publishedAt)],
);
