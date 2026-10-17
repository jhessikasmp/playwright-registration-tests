
 // @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  // Executa testes de arquivos diferentes em paralelo
  fullyParallel: true,

  // Impede test.only no CI
  forbidOnly: !!process.env.CI,

  // Repete testes com falha somente no CI
  retries: process.env.CI ? 1 : 0,

  // Número de workers
  workers: process.env.CI ? 2 : undefined,

  // Relatório HTML
  reporter: 'html',

  // Arquivos reconhecidos como testes
  testMatch: '**/*.spec.js',

  // Configurações gerais
  use: {
    // Mostra o navegador
    headless: true,

    // Desacelera as ações para facilitar a inspeção
    launchOptions: {
      slowMo: 500,
    },

    // Grava trace na primeira nova tentativa
    trace: 'on-first-retry',
  },

  // Navegadores configurados
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Não precisamos de webServer porque os testes usam
  // o site público https://playwright.dev/
});
