import { expect, test } from "@playwright/test";

test.describe("enquiry form", () => {
  test("shows an error summary and inline errors when submitted empty", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send my enquiry" }).click();
    const summary = page.getByRole("heading", { name: /things to check/ });
    await expect(summary).toBeVisible();
    await page.getByRole("link", { name: "Please tell us your name." }).click();
    await expect(page.getByRole("textbox", { name: "Your name" })).toBeFocused();
  });

  test("server validates even without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/contact");
    await page.getByRole("textbox", { name: "Your name" }).fill("Sam");
    await page.getByRole("button", { name: "Send my enquiry" }).click();
    await expect(page.getByRole("textbox", { name: "Your name" })).toHaveValue("Sam");
    await expect(page.getByRole("textbox", { name: "Email" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await context.close();
  });

  test("shows the crisis note on the contact page", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.getByRole("main").getByRole("complementary", { name: "Crisis support" }),
    ).toBeVisible();
  });
});
