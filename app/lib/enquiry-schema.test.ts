import { describe, expect, it } from "vitest";
import { parseEnquiry } from "./enquiry-schema";

const valid = {
  name: "Sam",
  email: "sam@example.com",
  contactMethod: "email",
  service: "counselling",
  format: "online",
  consent: "on",
};

describe("parseEnquiry", () => {
  it("accepts a minimal valid enquiry and defaults optional fields", () => {
    const result = parseEnquiry(valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.message).toBe("");
      expect(result.data.pronouns).toBe("");
    }
  });

  it("returns friendly, field-keyed errors", () => {
    const result = parseEnquiry({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.name).toBe("Please tell us your name.");
      expect(result.errors.email).toMatch(/email/i);
      expect(result.errors.consent).toMatch(/privacy policy/);
      expect(result.errors.service).toBeDefined();
    }
  });

  it("requires a phone number when the person asks for a call or text", () => {
    const result = parseEnquiry({ ...valid, contactMethod: "sms" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.phone).toMatch(/phone number/);
  });

  it.each(["0412 345 678", "+61 412 345 678", "(03) 9123 4567", "0391234567"])(
    "accepts Australian phone number %s",
    (phone) => {
      expect(parseEnquiry({ ...valid, phone }).ok).toBe(true);
    },
  );

  it.each(["12345", "555-0100", "+1 202 555 0100"])("rejects non-Australian number %s", (phone) => {
    const result = parseEnquiry({ ...valid, phone });
    expect(result.ok).toBe(false);
  });

  it("rejects values outside the allowed options", () => {
    const result = parseEnquiry({ ...valid, service: "astrology" });
    expect(result.ok).toBe(false);
  });

  it("flags a filled honeypot as invalid input", () => {
    expect(parseEnquiry({ ...valid, website: "spam.example" }).ok).toBe(false);
  });

  it("parses FormData", () => {
    const fd = new FormData();
    Object.entries(valid).forEach(([k, v]) => fd.set(k, v));
    expect(parseEnquiry(fd).ok).toBe(true);
  });
});
