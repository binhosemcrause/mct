import { useEffect, useRef, useState } from "react";
import { Form, Link, useNavigation } from "react-router";
import { Button } from "~/components/ui/Button";
import {
  CheckboxField,
  ChoiceGroup,
  SelectField,
  TextareaField,
  TextField,
} from "~/components/ui/Field";
import { site } from "~/config/site";
import { serviceOptions } from "~/content/services";
import {
  contactMethods,
  parseEnquiry,
  sessionFormats,
  type EnquiryErrors,
} from "~/lib/enquiry-schema";

export type EnquiryActionData =
  | { status: "success" }
  | { status: "invalid"; errors: EnquiryErrors; values: Record<string, string> }
  | { status: "error"; message: string };

const fieldId = (name: string) => `enquiry-${name}`;

const fieldName = (target: EventTarget) =>
  target instanceof HTMLInputElement ||
  target instanceof HTMLSelectElement ||
  target instanceof HTMLTextAreaElement
    ? target.name
    : "";

const fieldOrder = [
  "name",
  "email",
  "phone",
  "contactMethod",
  "service",
  "format",
  "message",
  "consent",
] as const;

/**
 * Works without JavaScript (plain POST to the route action). With JS it adds
 * inline validation on blur and an error summary that receives focus on submit.
 */
export function EnquiryForm({
  actionData,
  defaultService,
}: {
  actionData?: EnquiryActionData;
  defaultService?: string;
}) {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const serverErrors = actionData?.status === "invalid" ? actionData.errors : {};
  const values = actionData?.status === "invalid" ? actionData.values : {};

  const [errors, setErrors] = useState<EnquiryErrors>(serverErrors);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // New server response → adopt its errors (adjusted during render, not in an effect)
  const [lastActionData, setLastActionData] = useState(actionData);
  if (actionData !== lastActionData) {
    setLastActionData(actionData);
    setErrors(serverErrors);
  }

  useEffect(() => {
    if (actionData?.status === "invalid") summaryRef.current?.focus();
  }, [actionData]);

  useEffect(() => {
    if (actionData?.status === "success") successRef.current?.focus();
  }, [actionData]);

  if (actionData?.status === "success") {
    return (
      <div role="status" className="rounded-card bg-primary-1 p-8 md:p-10">
        <h3 ref={successRef} tabIndex={-1} className="text-h2 focus:outline-none">
          Thank you — we'll be in touch within 24 hours.
        </h3>
        <p className="mt-4 text-lead">
          Your enquiry has reached us safely. We'll contact you the way you asked. If anything
          changes in the meantime, email{" "}
          <a href={`mailto:${site.contact.email}`} className="text-charcoal">
            {site.contact.email}
          </a>
          .
        </p>
      </div>
    );
  }

  function validate(form: HTMLFormElement, only?: Set<string>) {
    const result = parseEnquiry(new FormData(form));
    const next = result.ok ? {} : result.errors;
    if (!only) return next;
    return Object.fromEntries(Object.entries(next).filter(([k]) => only.has(k))) as EnquiryErrors;
  }

  const visibleErrors = fieldOrder.filter((k) => errors[k]);

  return (
    <Form
      method="post"
      noValidate
      className="flex flex-col gap-8"
      onBlur={(e) => {
        const name = fieldName(e.target);
        if (!name) return;
        const nextTouched = new Set(touched).add(name);
        setTouched(nextTouched);
        setErrors(validate(e.currentTarget, nextTouched));
      }}
      onChange={(e) => {
        // Clear an error as soon as the field becomes valid
        const name = fieldName(e.target);
        if (name && errors[name as keyof EnquiryErrors])
          setErrors(validate(e.currentTarget, touched));
      }}
      onSubmit={(e) => {
        const all = validate(e.currentTarget);
        if (Object.keys(all).length) {
          e.preventDefault();
          setErrors(all);
          setTouched(new Set(fieldOrder));
          requestAnimationFrame(() => summaryRef.current?.focus());
        }
      }}
    >
      {actionData?.status === "error" && (
        <div role="alert" className="rounded-card border-2 border-error bg-white p-5">
          <p className="font-semibold text-error">{actionData.message}</p>
        </div>
      )}

      <div
        ref={summaryRef}
        tabIndex={-1}
        hidden={visibleErrors.length === 0}
        aria-labelledby="enquiry-error-summary"
        className="rounded-card border-2 border-error bg-white p-5 focus:outline-3 focus:outline-offset-2 focus:outline-error"
      >
        <h3 id="enquiry-error-summary" className="font-body text-body font-semibold text-error">
          {visibleErrors.length === 1
            ? "There's one thing to check"
            : `There are ${visibleErrors.length} things to check`}
        </h3>
        <ul className="mt-3 flex list-disc flex-col gap-1 pl-5">
          {visibleErrors.map((k) => (
            <li key={k}>
              <a href={`#${fieldId(k)}`} className="text-error">
                {errors[k]}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          id={fieldId("name")}
          label="Your name"
          name="name"
          autoComplete="name"
          defaultValue={values.name}
          error={errors.name}
          className="md:col-span-2"
        />
        <TextField
          label="Preferred name"
          name="preferredName"
          optional
          autoComplete="nickname"
          defaultValue={values.preferredName}
        />
        <TextField
          label="Pronouns"
          name="pronouns"
          optional
          hint="For example: she/her, he/him, they/them."
          defaultValue={values.pronouns}
        />
        <TextField
          id={fieldId("email")}
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          defaultValue={values.email}
          error={errors.email}
        />
        <TextField
          id={fieldId("phone")}
          label="Phone"
          name="phone"
          type="tel"
          optional
          autoComplete="tel"
          inputMode="tel"
          hint="Needed if you'd like a call or text."
          defaultValue={values.phone}
          error={errors.phone}
        />
      </div>

      <ChoiceGroup
        id={fieldId("contactMethod")}
        legend="How should we contact you?"
        name="contactMethod"
        options={contactMethods}
        defaultValue={values.contactMethod ?? "email"}
        error={errors.contactMethod}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <SelectField
          id={fieldId("service")}
          label="What are you interested in?"
          name="service"
          options={serviceOptions}
          defaultValue={values.service ?? defaultService ?? ""}
          error={errors.service}
        />
        <ChoiceGroup
          id={fieldId("format")}
          legend="In person or online?"
          name="format"
          options={sessionFormats}
          defaultValue={values.format}
          error={errors.format}
        />
      </div>

      <TextareaField
        id={fieldId("message")}
        label="How would you like to be supported?"
        name="message"
        optional
        hint="Share as much or as little as you like. A sentence is plenty — we'll talk more on the call."
        defaultValue={values.message}
        error={errors.message}
      />

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <CheckboxField
        id={fieldId("consent")}
        name="consent"
        error={errors.consent}
        label={
          <>
            I've read the <Link to="/privacy">privacy policy</Link> and agree to Moving Circle
            storing my details to respond to this enquiry.
          </>
        }
      />

      <div className="flex flex-col gap-4 rounded-card bg-dominant-2 p-5 text-small sm:flex-row sm:items-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6 shrink-0 text-primary-dark"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
          <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
        </svg>
        <p>
          Everything you share is confidential and only seen by our practitioners. We reply{" "}
          {site.contact.responseTime}.
        </p>
      </div>

      <div>
        <Button
          type="submit"
          variant="cta"
          size="lg"
          disabled={submitting}
          aria-disabled={submitting}
        >
          {submitting ? "Sending…" : "Send my enquiry"}
        </Button>
      </div>
    </Form>
  );
}
