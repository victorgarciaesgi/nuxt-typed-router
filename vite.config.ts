import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 10000,
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      $$: path.resolve(__dirname, './test'),
    },
  },
});
