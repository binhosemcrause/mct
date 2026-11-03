import { z } from "zod";
import { serviceOptions } from "~/content/services";

/** Shared by the browser (inline validation) and the server action (source of truth). */

export const contactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "sms", label: "Text message" },
] as const;

export const sessionFormats = [
  { value: "in-person", label: "In person (Chelsea)" },
  { value: "online", label: "Online" },
  { value: "either", label: "Either is fine" },
] as const;

const values = <T extends ReadonlyArray<{ value: string }>>(opts: T) =>
  opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

// Australian numbers: allow spaces, brackets, +61 prefix
const AU_PHONE = /^(?:\+?61|0)[2-478](?:[ -]?\d){8}$/;

export const enquirySchema = z
  .object({
    name: z
      .string({ error: "Please tell us your name." })
      .trim()
      .min(1, "Please tell us your name.")
      .max(120),
    preferredName: z.string().trim().max(120).optional().default(""),
    pronouns: z.string().trim().max(60).optional().default(""),
    email: z
      .string({ error: "Please add your email so we can reply." })
      .trim()
      .min(1, "Please add your email so we can reply.")
      .email("That email doesn't look quite right — please check it."),
    phone: z
      .string()
      .trim()
      .optional()
      .default("")
      .refine(
        (v) => v === "" || AU_PHONE.test(v.replace(/[()\s]/g, "")),
        "Please enter an Australian phone number, like 0412 345 678.",
      ),
    contactMethod: z.enum(values(contactMethods), {
      error: "Please choose how you'd like us to contact you.",
    }),
    service: z.enum(values(serviceOptions), {
      error: "Please choose a service, or “I'm not sure yet”.",
    }),
    format: z.enum(values(sessionFormats), { error: "Please choose in person, online or either." }),
    message: z
      .string()
      .trim()
      .max(4000, "Please keep this under 4000 characters — you can tell us more when we talk.")
      .optional()
      .default(""),
    consent: z.literal("on", {
      error: "Please confirm you've read the privacy policy so we can store your enquiry.",
    }),
    // Honeypot: real people never see or fill this field
    website: z.string().max(0).optional().default(""),
  })
  .superRefine((v, ctx) => {
    if ((v.contactMethod === "phone" || v.contactMethod === "sms") && !v.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Please add a phone number so we can call or text you.",
      });
    }
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export function parseEnquiry(form: FormData | Record<string, unknown>) {
  const raw = form instanceof FormData ? Object.fromEntries(form) : form;
  const result = enquirySchema.safeParse(raw);
  if (result.success) return { ok: true as const, data: result.data };
  const errors: EnquiryErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof EnquiryInput;
    errors[key] ??= issue.message;
  }
  return { ok: false as const, errors };
}
