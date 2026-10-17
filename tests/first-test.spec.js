
import { test, expect } from '@playwright/test';

test('deve validar a navegação para a documentação', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    const link = page.getByRole('link', { name: 'Get started' });

    await expect(link).toBeVisible();
    await expect(link).toBeEnabled();
    await expect(link).toHaveAttribute('href', /docs\/intro/);

    await link.click();

    await expect(page).toHaveURL(/docs\/intro/);
    await expect(page.locator('body')).toBeVisible();

    await page.pause();
});
