import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("has unique SEO metadata and business schema", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Moving Circle Therapy/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en-AU");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Chelsea/);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", /.+/);
    const ld = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
    );
    expect(ld["@type"]).toContain("MedicalBusiness");
    expect(ld.address.addressLocality).toBe("Chelsea");
  });

  test("splash shows the logo; Acknowledgement of Country is in the footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Your journey to holistic wellbeing through art and movement.",
    );
    await expect(page.getByRole("link", { name: "Read our story" })).toBeVisible();
    await expect(
      page.getByRole("contentinfo").getByText(/Wurundjeri Woi-wurrung and Bunurong peoples/),
    ).toBeAttached();
    await expect(
      page.getByRole("contentinfo").getByText("This service isn't for emergencies."),
    ).toBeAttached();
  });

  test("keyboard users can skip to content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
  });

  test("mobile menu opens, closes with Escape and returns focus", async ({ page, isMobile }) => {
    test.skip(!isMobile, "menu toggle only shows on small screens");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(
      page
        .getByRole("navigation", { name: "Main" })
        .getByRole("link", { name: "Community Workshops" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test("centre logo leads to Our Story", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Read our story" }).click();
    await expect(page).toHaveURL(/\/about\/our-story$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Our Story");
  });

  test("desktop dropdowns open, nest workshops and close with Escape", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "dropdowns only show on wide screens");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    const services = nav.getByRole("button", { name: "Services menu" });
    await services.click();
    await expect(services).toHaveAttribute("aria-expanded", "true");
    await expect(nav.getByRole("link", { name: "Corporate Wellbeing Workshops" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(services).toHaveAttribute("aria-expanded", "false");
    await expect(services).toBeFocused();
    await nav.getByRole("button", { name: "About" }).click();
    await nav.getByRole("link", { name: "Therapy for All" }).click();
    await expect(page).toHaveURL(/\/about\/therapy-for-all$/);
  });

  test("the Services menu item opens the services page", async ({ page, isMobile }) => {
    test.skip(isMobile, "top-level links only show on wide screens");
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("link", { name: "Services", exact: true })
      .click();
    await expect(page).toHaveURL(/\/services$/);
    for (const name of [
      "Counselling",
      "Creative Arts Therapy",
      "Dance Movement Therapy",
      "Therapeutic Workshops",
    ])
      await expect(page.getByRole("main").getByRole("link", { name })).toBeVisible();
  });

  test("serves sitemap.xml and robots.txt", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain("<loc>https://movingcircletherapy.com/</loc>");
    expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
  });
});
