import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = ["/", "/contact", "/services", "/design-system"];

for (const path of paths) {
  test(`${path} has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      // The wordmark is a logotype, which WCAG exempts from contrast requirements
      .exclude("[data-brand]")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(" | ")}`),
    ).toEqual([]);
  });

  test(`${path} has exactly one h1 and no skipped heading levels`, async ({ page }) => {
    await page.goto(path);
    const levels = await page
      .locator("main :is(h1,h2,h3,h4,h5,h6), footer :is(h2,h3)")
      .evaluateAll((els) =>
        els.filter((el) => el.closest("[hidden]") === null).map((el) => Number(el.tagName[1])),
      );
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    for (let i = 1; i < levels.length; i++) {
      expect(
        levels[i]! - levels[i - 1]!,
        `jump from h${levels[i - 1]} to h${levels[i]}`,
      ).toBeLessThanOrEqual(1);
    }
  });
}
