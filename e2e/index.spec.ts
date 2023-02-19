import { test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";

test("The page has no a11y violations", async ({ page }) => {
  await page.goto("/");
  await injectAxe(page);
  await checkA11y(page);
});
