import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Progressive scroll reveal. Elements with `data-reveal` fade up once when they
 * enter the viewport. Content is fully visible without JS, and CSS skips the
 * animation entirely under prefers-reduced-motion (see app.css).
 */
export function useScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

/** Spread onto an element to make it reveal, optionally staggered. */
export function reveal(delayMs = 0) {
  return {
    "data-reveal": "",
    style: delayMs ? ({ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties) : undefined,
  };
}
