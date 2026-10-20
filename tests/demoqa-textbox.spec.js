const { test, expect } = require("@playwright/test");

test("CT-001 - Preencher o campo Full Name", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");

  await page.getByPlaceholder("Full Name").fill("Maria Silva");

  await expect(page.getByPlaceholder("Full Name")).toHaveValue("Maria Silva");

  await page.getByPlaceholder("name@example.com").fill("maria@email.com");

  await expect(page.getByPlaceholder("name@example.com")).toHaveValue(
    "maria@email.com",
  );

  await page.getByPlaceholder("Current Address").fill("Via Roma 10");

  await expect(page.getByPlaceholder("Current Address")).toHaveValue(
    "Via Roma 10",
  );

  await page.locator("#permanentAddress").fill("Via Milano 20");

  await expect(page.locator("#permanentAddress")).toHaveValue("Via Milano 20");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.locator("#output")).toBeVisible();
  await expect(page.locator("#name")).toHaveText("Name:Maria Silva");
  await expect(page.locator("#email")).toHaveText("Email:maria@email.com");

  await expect(page.locator("#output")).toContainText(
    "Current Address :Via Roma 10",
  );

  await expect(page.locator("#output")).toContainText(
    "Permananet Address :Via Milano 20",
  );
});

test("CT-002 - Bloquear e-mail inválido", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");

  const email = page.getByPlaceholder("name@example.com");
  await email.fill("mariaemail.com");

  await expect(email).not.toHaveJSProperty("validity.valid", true);

  await page.getByRole("button", { name: "Submit" }).click();

await expect(page.locator("#output")).not.toBeVisible();
});

test("CT-003 - Enviar formulário vazio", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.locator("#name")).not.toBeVisible();
  await expect(page.locator("#email")).not.toBeVisible();
});

test("CT-004 - Bloquear e-mail com espaços", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");

  const email = page.getByPlaceholder("name@example.com");

  await email.fill("maria @email.com");

  await expect(email).not.toHaveJSProperty("validity.valid", true);

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.locator("#name")).not.toBeVisible();
  await expect(page.locator("#email")).not.toBeVisible();
});

test("CT-005 - Aceitar nome longo", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");

  const nomeLongo = "A".repeat(3000);

  await page.getByPlaceholder("Full Name").fill(nomeLongo);
  await page.getByPlaceholder("name@example.com").fill("maria@email.com");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.locator("#name")).toHaveText(`Name:${nomeLongo}`);
});