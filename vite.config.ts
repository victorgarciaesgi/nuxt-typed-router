import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    passWithNoTests: true,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    sequence: {
      concurrent: false,
      hooks: 'list',
      setupFiles: 'list',
    },
  },
  resolve: {
    alias: {
      $$: path.resolve(__dirname, './test'),
    },
  },
});
