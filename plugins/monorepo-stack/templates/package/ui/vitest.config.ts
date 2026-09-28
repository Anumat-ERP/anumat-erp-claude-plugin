import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { baseTestConfig } from '@repo/test-config';

export default defineConfig({
  plugins: [react()],
  ...baseTestConfig({ setupFiles: ['@repo/testing/setup/msw'] }),
});
