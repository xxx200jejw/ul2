import { defineConfig, devices } from '@playwright/test';

// All files live in the repository root (no tests/ folder):
//   *.api.spec.ts  → project "api"      (HTTP tests against server.js, no browser)
//   *.ui.spec.ts   → project "ui"       (browser tests against the local MiniShop, shop.html)
//   *.spec.ts      → project "chromium" (browser tests against demo.playwright.dev)
//   *.test.js      → Jest (unit tests), ignored by Playwright
export default defineConfig({
  testDir: '.',
  testMatch: /.*\.spec\.ts/,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: { trace: 'on', screenshot: 'only-on-failure' },
  projects: [
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
      use: { baseURL: 'http://localhost:3000' },
    },
    {
      name: 'ui',
      testMatch: /.*\.ui\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4000' },
    },
    {
      name: 'chromium',
      testIgnore: /.*\.(api|ui)\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: 'https://demo.playwright.dev' },
    },
  ],
  // Playwright starts both local servers before the tests and stops them afterwards.
  webServer: [
    { command: 'node server.js', url: 'http://localhost:3000/health', reuseExistingServer: true },
    { command: 'node shop-server.js', url: 'http://localhost:4000/health', reuseExistingServer: true },
  ],
});
