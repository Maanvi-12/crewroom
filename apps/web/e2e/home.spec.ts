import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Get real team experience");
  await expect(page.getByRole("link", { name: "Get started" })).toBeVisible();
});