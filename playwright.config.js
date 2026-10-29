const { defineConfig, devices } = require('@playwright/test');
const { defineBddConfig } = require('playwright-bdd');

const testDir = defineBddConfig({
  features: 'playwright/e2e/**/*.feature',
  steps: ['playwright/stepDefinitions/**/*.steps.js', 'support/bddTest.steps.js'],
  outputDir: '.features-gen',
});

module.exports = defineConfig({
  testDir,
  timeout: 75000,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.UI_BASE_URL || 'https://www.demoblaze.com/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
