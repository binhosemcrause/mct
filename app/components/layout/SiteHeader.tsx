import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { ButtonLink } from "~/components/ui/Button";
import { Container } from "~/components/ui/Layout";
import { bookCta, isActiveItem, type NavItem } from "~/config/nav";
import { cx } from "~/lib/cx";
import { Logo } from "./Logo";

const topItem = (active: boolean, overlay: boolean) =>
  cx(
    "relative inline-flex items-center gap-1.5 rounded-pill px-3 py-2 whitespace-nowrap no-underline transition-colors",
    "text-[1.375rem] tracking-wide lowercase",
    overlay
      ? // Home splash: white over the aura gradient
        "text-halo text-white hover:bg-white/15"
      : // Every other page: brand orange on the cream bar
        "text-ember hover:bg-dominant-2",
    active && "font-bold",
  );

const menuLink = ({ isActive }: { isActive: boolean }) =>
  cx(
    "block rounded-2xl px-4 py-2.5 text-ink no-underline hover:bg-dominant-2 xl:whitespace-nowrap",
    isActive && "bg-primary-1/50",
  );

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={cx(
        "size-3 transition-transform duration-200 motion-reduce:transition-none",
        open && "rotate-180",
      )}
    >
      <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

/** Links inside a dropdown; a child with its own children shows them indented beneath it. */
function SubList({ items, nested = false }: { items: NavItem[]; nested?: boolean }) {
  return (
    <ul className={cx("flex flex-col gap-0.5", nested && "ml-4 border-l-2 border-primary-1 pl-2")}>
      {items.map((item) => (
        <li key={item.label}>
          {item.to && (
            <NavLink to={item.to} end className={menuLink} prefetch="intent">
              {item.label}
            </NavLink>
          )}
          {item.children && <SubList items={item.children} nested />}
        </li>
      ))}
    </ul>
  );
}

/** Disclosure-pattern dropdown: a button toggles a list of links (no ARIA menu roles). */
function Dropdown({
  item,
  open,
  onToggle,
  onClose,
  overlay,
}: {
  item: NavItem;
  overlay: boolean;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const panelId = useId();
  const { pathname } = useLocation();
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      className="relative"
      // Close when keyboard focus leaves the item and its panel
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node | null)) onClose();
      }}
    >
      {item.to ? (
        // Group with its own page (Services): the label navigates, the chevron opens the list
        <span className="inline-flex items-center">
          <NavLink
            to={item.to}
            end
            className={() => cx(topItem(isActiveItem(item, pathname), overlay), "pr-1")}
            prefetch="intent"
          >
            {item.label}
          </NavLink>
          <button
            type="button"
            className={cx(topItem(false, overlay), "px-2")}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${item.label} menu`}
            onClick={onToggle}
          >
            <Chevron open={open} />
          </button>
        </span>
      ) : (
        <button
          type="button"
          className={topItem(isActiveItem(item, pathname), overlay)}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {item.label}
          <Chevron open={open} />
        </button>
      )}
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-0 z-50 mt-2 w-max rounded-card border border-charcoal/10 bg-dominant-1 p-2 shadow-[0_24px_48px_-24px_rgb(43_38_48/0.35)]"
      >
        <SubList items={item.children ?? []} />
      </div>
    </li>
  );
}

export function SiteHeader({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  // The home page header floats transparently over the splash
  const overlay = pathname === "/";

  // Close menus on navigation (state adjusted during render, not in an effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setOpenGroup(null);
  }

  // Escape closes and returns focus to whichever toggle opened the menu
  useEffect(() => {
    if (!open && !openGroup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openGroup) {
        const toggle = navRef.current?.querySelector<HTMLButtonElement>(
          'button[aria-expanded="true"]',
        );
        setOpenGroup(null);
        toggle?.focus();
      } else {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // Click outside closes an open dropdown
    const onPointer = (e: PointerEvent) => {
      if (openGroup && !navRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, openGroup]);

  return (
    <header
      className={cx(
        "z-40",
        overlay
          ? "absolute inset-x-0 top-0 text-white"
          : "sticky top-0 bg-paper text-ink shadow-[0_1px_0_rgb(22_59_95/0.06)]",
      )}
    >
      <Container
        className={cx(
          "flex items-center justify-between gap-6",
          "max-w-none md:px-8",
          overlay ? "min-h-28" : "min-h-24",
        )}
      >
        {/* Wordmark in Garet: white on the home splash, orange elsewhere */}
        <div data-brand className={cx("font-brand", overlay ? "text-halo" : "text-accent-1")}>
          <Logo />
        </div>

        <nav ref={navRef} aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-2 2xl:gap-6">
            {nav.map((item) =>
              item.children ? (
                <Dropdown
                  key={item.label}
                  item={item}
                  open={openGroup === item.label}
                  onToggle={() => setOpenGroup((g) => (g === item.label ? null : item.label))}
                  onClose={() => setOpenGroup((g) => (g === item.label ? null : g))}
                  overlay={overlay}
                />
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.to!}
                    className={({ isActive }) => topItem(isActive, overlay)}
                    prefetch="intent"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3 xl:hidden">
          <button
            ref={buttonRef}
            type="button"
            className={cx(
              "inline-flex min-h-12 items-center gap-2 rounded-pill border-2 px-4 font-semibold xl:hidden",
              overlay ? "text-halo border-white bg-white/10" : "border-ember text-ember",
            )}
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

      {/* Mobile: every group is shown open, so there's nothing hidden behind extra taps */}
      <nav
        id={menuId}
        aria-label="Main"
        hidden={!open}
        className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-charcoal/10 bg-dominant-1 xl:hidden"
      >
        <Container className="py-6">
          <ul className="flex flex-col gap-4">
            {nav.map((item) =>
              item.children ? (
                <li key={item.label}>
                  {item.to ? (
                    <NavLink
                      to={item.to}
                      end
                      className="text-eyebrow-style block rounded-2xl px-4 pb-1 text-secondary-dark no-underline hover:bg-dominant-2"
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <p className="text-eyebrow-style px-4 pb-1 text-secondary-dark">{item.label}</p>
                  )}
                  <SubList items={item.children} />
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink
                    to={item.to!}
                    className={({ isActive }) =>
                      cx(
                        // Same purple label style as the group headings above
                        "text-eyebrow-style block rounded-2xl px-4 py-2 text-secondary-dark no-underline hover:bg-dominant-2",
                        isActive && "bg-primary-1/50 text-charcoal",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
          <div className="mt-6">
            <ButtonLink to={bookCta.to} variant="cta" size="lg" className="w-full">
              {bookCta.label}
            </ButtonLink>
          </div>
        </Container>
      </nav>
    </header>
  );
}
