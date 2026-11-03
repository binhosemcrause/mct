import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Layout";
import { bookCta, type NavItem } from "~/config/nav";
import { cx } from "~/lib/cx";
import { Logo } from "./Logo";

const navLink = ({ isActive }: { isActive: boolean }) =>
  cx(
    "relative rounded-pill px-3 py-2 font-semibold whitespace-nowrap text-charcoal no-underline transition-colors hover:bg-dominant-2",
    isActive && "bg-primary-1/50",
  );

export function SiteHeader({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  // Close on navigation (state adjusted during render, not in an effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape closes and returns focus to the toggle
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-dominant-1/90 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-dominant-1">
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLink} prefetch="intent">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink to={bookCta.to} variant="cta" className="whitespace-nowrap">
              {bookCta.label}
            </ButtonLink>
          </div>
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex min-h-12 items-center gap-2 rounded-pill border-2 border-charcoal px-4 font-semibold xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cx(
                  "absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 motion-reduce:transition-none",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cx(
                  "absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 motion-reduce:transition-none",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
            Menu
          </button>
        </div>
      </Container>

      <nav
        id={menuId}
        aria-label="Main"
        hidden={!open}
        className="border-t border-charcoal/10 bg-dominant-1 xl:hidden"
      >
        <Container className="py-6">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cx(
                      "block rounded-2xl px-4 py-3 font-display text-item text-charcoal no-underline hover:bg-dominant-2",
                      isActive && "bg-primary-1/50",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-6 sm:hidden">
            <ButtonLink to={bookCta.to} variant="cta" size="lg" className="w-full">
              {bookCta.label}
            </ButtonLink>
          </div>
        </Container>
      </nav>
    </header>
  );
}
