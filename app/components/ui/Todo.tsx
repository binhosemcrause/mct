import { Fragment } from "react";
import { isPlaceholder } from "~/config/site";

/**
 * Renders unconfirmed content (values starting with "TODO") as a visibly dashed
 * placeholder, so missing facts are obvious in review and never look final.
 */
export function Todo({ children }: { children: string }) {
  return (
    <mark
      data-todo
      className="rounded-md border border-dashed border-secondary-dark bg-secondary-1 px-1.5 py-0.5 text-[0.9em] text-charcoal"
    >
      {children.replace(/^TODO:?\s*/, "")}
    </mark>
  );
}

/** A single fact: shows the value, or a <Todo> if it's still a placeholder. */
export function Fact({ value, fallback }: { value: string; fallback?: string }) {
  if (isPlaceholder(value)) return <Todo>{fallback ?? value}</Todo>;
  return <>{value}</>;
}

/** Prose that may contain inline "TODO: …" segments (ending at a full stop or end of string). */
export function TextWithTodos({ text }: { text: string }) {
  const parts = text.split(/(TODO:[^.]*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("TODO") ? <Todo key={i}>{part}</Todo> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
