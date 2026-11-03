import type { EnquiryInput } from "./enquiry-schema";

/**
 * Tells the practice a new enquiry has arrived. Uses Resend's HTTP API when
 * RESEND_API_KEY and ENQUIRY_NOTIFY_TO are set; otherwise it's a no-op.
 * The email deliberately excludes the free-text message: sensitive details
 * stay in the database, not in inboxes.
 */
export async function notifyNewEnquiry(id: string, input: EnquiryInput) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_TO;
  const from =
    process.env.ENQUIRY_NOTIFY_FROM ?? "Moving Circle website <website@movingcircletherapy.com>";
  if (!key || !to) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      subject: `New enquiry: ${input.service}`,
      text: [
        `A new enquiry (ref ${id}) is waiting.`,
        `Service: ${input.service} · Format: ${input.format}`,
        `Preferred contact: ${input.contactMethod}`,
        "",
        "Open the enquiries table to read it. We've left the details out of this email to protect the person's privacy.",
      ].join("\n"),
    }),
  });
  if (!res.ok) console.error("Enquiry notification failed", res.status);
}
