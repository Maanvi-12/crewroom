import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Crewroom" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Get started" })).toBeVisible();
});