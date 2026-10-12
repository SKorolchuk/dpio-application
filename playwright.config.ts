import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright 1.64 configuration file.
 * Migrated from legacy Protractor architecture.
 */
export default defineConfig({
  // Directory where Playwright spec files will be stored
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  workers: process.env["CI"] ? 1 : undefined,
  
  // Modern built-in HTML reporter replacing jasmine-spec-reporter
  reporter: [["html", { outputFolder: "e2e-results" }]],
  
  use: {
    // Dynamic baseUrl evaluation aligned with your legacy configuration
    baseURL: `http://localhost:${process.env["PORT"] || 4200}`,
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
  },

  // Browser profiles configuration matching legacy capabilities
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],

  // Automatically start Vite development server before running tests
  webServer: {
    command: "npm run start",
    url: `http://localhost:${process.env["PORT"] || 4200}`,
    reuseExistingServer: !process.env["CI"],
    timeout: 120000,
  },
});
