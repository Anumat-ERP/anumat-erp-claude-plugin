import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Fail the run rather than pass silently when someone leaves .only in.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: { baseURL: process.env.BASE_URL ?? 'http://localhost:3000', trace: 'on-first-retry' },
});
