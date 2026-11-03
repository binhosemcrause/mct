import { useId, type ComponentProps, type ReactNode } from "react";
import { cx } from "~/lib/cx";

/*
 * Accessible form fields. Every field gets:
 *  - a visible <label> (never placeholder-only)
 *  - optional hint, wired via aria-describedby
 *  - inline error with aria-invalid + aria-describedby (announced on focus)
 *  - "(optional)" marker instead of asterisks for required, which reads better aloud
 */

interface FieldBaseProps {
  label: ReactNode;
  name: string;
  /** Explicit id, e.g. so an error summary can link to the field */
  id?: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  className?: string;
}

const control =
  "w-full rounded-2xl border-2 border-charcoal/30 bg-white px-4 py-3 text-body text-charcoal transition-colors duration-200 placeholder:text-charcoal/60 hover:border-charcoal/60 focus:border-primary-dark focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary-dark aria-invalid:border-error";

function useFieldIds(name: string, explicitId?: string) {
  const uid = useId();
  const id = explicitId ?? `${name}-${uid}`;
  return { id, hintId: `${id}-hint`, errorId: `${id}-error` };
}

function describedBy(ids: ReturnType<typeof useFieldIds>, hint?: ReactNode, error?: string) {
  return cx(hint ? ids.hintId : null, error ? ids.errorId : null) || undefined;
}

function Label({
  htmlFor,
  optional,
  children,
}: {
  htmlFor: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="font-semibold">
      {children}
      {optional && <span className="font-normal text-charcoal/75"> (optional)</span>}
    </label>
  );
}

function Hint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-small text-charcoal/80">
      {children}
    </p>
  );
}

export function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="flex items-start gap-2 text-small font-semibold text-error">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="mt-0.5 size-4 shrink-0"
        fill="currentColor"
      >
        <path d="M10 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm-.9 4.2h1.8v5.6H9.1V5.7Zm.9 9.1a1.15 1.15 0 1 1 0-2.3 1.15 1.15 0 0 1 0 2.3Z" />
      </svg>
      {children}
    </p>
  );
}

export function TextField({
  label,
  name,
  id,
  hint,
  error,
  optional,
  className,
  ...input
}: FieldBaseProps & Omit<ComponentProps<"input">, "name">) {
  const ids = useFieldIds(name, id);
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <Label htmlFor={ids.id} optional={optional}>
        {label}
      </Label>
      {hint && <Hint id={ids.hintId}>{hint}</Hint>}
      <input
        id={ids.id}
        name={name}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(ids, hint, error)}
        className={control}
        {...input}
      />
      <FieldError id={ids.errorId}>{error}</FieldError>
    </div>
  );
}

export function TextareaField({
  label,
  name,
  id,
  hint,
  error,
  optional,
  className,
  ...textarea
}: FieldBaseProps & Omit<ComponentProps<"textarea">, "name">) {
  const ids = useFieldIds(name, id);
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <Label htmlFor={ids.id} optional={optional}>
        {label}
      </Label>
      {hint && <Hint id={ids.hintId}>{hint}</Hint>}
      <textarea
        id={ids.id}
        name={name}
        rows={5}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(ids, hint, error)}
        className={cx(control, "min-h-36 resize-y")}
        {...textarea}
      />
      <FieldError id={ids.errorId}>{error}</FieldError>
    </div>
  );
}

export function SelectField({
  label,
  name,
  id,
  hint,
  error,
  optional,
  className,
  options,
  placeholder = "Choose one",
  ...select
}: FieldBaseProps &
  Omit<ComponentProps<"select">, "name"> & {
    options: ReadonlyArray<{ value: string; label: string }>;
    placeholder?: string;
  }) {
  const ids = useFieldIds(name, id);
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <Label htmlFor={ids.id} optional={optional}>
        {label}
      </Label>
      {hint && <Hint id={ids.hintId}>{hint}</Hint>}
      <div className="relative">
        <select
          id={ids.id}
          name={name}
          required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(ids, hint, error)}
          className={cx(control, "appearance-none pr-12")}
          {...select}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="m5 8 5 5 5-5" />
        </svg>
      </div>
      <FieldError id={ids.errorId}>{error}</FieldError>
    </div>
  );
}

/** Radio buttons styled as pills, grouped in a fieldset with a legend. */
export function ChoiceGroup({
  legend,
  name,
  id,
  hint,
  error,
  optional,
  className,
  options,
  defaultValue,
}: Omit<FieldBaseProps, "label"> & {
  legend: ReactNode;
  options: ReadonlyArray<{ value: string; label: string }>;
  defaultValue?: string;
}) {
  const ids = useFieldIds(name, id);
  return (
    <fieldset
      className={cx("flex flex-col gap-3", className)}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(ids, hint, error)}
    >
      <legend className="mb-2 font-semibold">
        {legend}
        {optional && <span className="font-normal text-charcoal/75"> (optional)</span>}
      </legend>
      {hint && <Hint id={ids.hintId}>{hint}</Hint>}
      <div className="flex flex-wrap gap-3">
        {options.map((o, i) => (
          <label
            key={o.value}
            className="relative inline-flex min-h-12 cursor-pointer items-center rounded-pill border-2 border-charcoal/30 bg-white px-5 transition-colors hover:border-charcoal/60 has-checked:border-primary-dark has-checked:bg-primary-1/40 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary-dark"
          >
            <input
              id={i === 0 ? ids.id : undefined}
              type="radio"
              name={name}
              value={o.value}
              defaultChecked={defaultValue === o.value}
              required={!optional && i === 0}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="mr-2.5 grid size-4 place-items-center rounded-full border-2 border-charcoal/60 peer-checked:border-primary-dark after:size-1.5 after:rounded-full after:bg-primary-dark after:opacity-0 peer-checked:after:opacity-100"
            />
            {o.label}
          </label>
        ))}
      </div>
      <FieldError id={ids.errorId}>{error}</FieldError>
    </fieldset>
  );
}

export function CheckboxField({
  label,
  name,
  id,
  hint,
  error,
  optional,
  className,
  ...input
}: FieldBaseProps & Omit<ComponentProps<"input">, "name" | "type">) {
  const ids = useFieldIds(name, id);
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <div className="flex items-start gap-3">
        <input
          id={ids.id}
          type="checkbox"
          name={name}
          required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(ids, hint, error)}
          className="mt-1 size-6 shrink-0 cursor-pointer accent-primary-dark"
          {...input}
        />
        <label htmlFor={ids.id} className="cursor-pointer">
          {label}
        </label>
      </div>
      {hint && <Hint id={ids.hintId}>{hint}</Hint>}
      <FieldError id={ids.errorId}>{error}</FieldError>
    </div>
  );
}
