import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 60000,
    maxWorkers: 1,
    fileParallelism: false,
  },
  resolve: {
    alias: {
      $$: path.resolve(__dirname, './test'),
    },
  },
});
