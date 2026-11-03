CREATE TYPE "public"."contact_method" AS ENUM('email', 'phone', 'sms');--> statement-breakpoint
CREATE TYPE "public"."enquiry_status" AS ENUM('new', 'contacted', 'booked', 'closed');--> statement-breakpoint
CREATE TYPE "public"."event_kind" AS ENUM('workshop', 'class', 'community');--> statement-breakpoint
CREATE TYPE "public"."session_format" AS ENUM('in-person', 'online', 'either');--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"preferred_name" text,
	"pronouns" text,
	"email" text NOT NULL,
	"phone" text,
	"contact_method" "contact_method" NOT NULL,
	"service" text NOT NULL,
	"format" "session_format" NOT NULL,
	"message" text,
	"consent_at" timestamp with time zone NOT NULL,
	"status" "enquiry_status" DEFAULT 'new' NOT NULL,
	"retain_until" timestamp with time zone DEFAULT now() + interval '2 years' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"kind" "event_kind" NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"starts_at" timestamp with time zone NOT NULL,
	"ends_at" timestamp with time zone NOT NULL,
	"location" text NOT NULL,
	"price_cents" integer DEFAULT 0 NOT NULL,
	"capacity" integer NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug"),
	CONSTRAINT "events_capacity_positive" CHECK ("events"."capacity" > 0),
	CONSTRAINT "events_ends_after_starts" CHECK ("events"."ends_at" > "events"."starts_at")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"body" text NOT NULL,
	"author" text NOT NULL,
	"published_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"spots" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "reservations_spots_positive" CHECK ("reservations"."spots" > 0)
);
--> statement-breakpoint
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "enquiries_status_created_idx" ON "enquiries" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "events_published_starts_idx" ON "events" USING btree ("is_published","starts_at");--> statement-breakpoint
CREATE INDEX "posts_published_idx" ON "posts" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "reservations_event_idx" ON "reservations" USING btree ("event_id");