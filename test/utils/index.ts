import type { NuxtConfig } from '@nuxt/schema';
import { globbySync } from 'globby';

export function timeout(count: number) {
  return new Promise((resolve) => setTimeout(resolve, count));
}

export function getConfigFromName(configName: string, config: NuxtConfig): NuxtConfig {
  const files = globbySync(`test/fixtures/sample-project/tests/[${configName}]`);
  return {
    ...config,
    nuxtTypedRouter: {
      ...config.nuxtTypedRouter,
      ignoreRoutes: ['[...404].vue', '[tests]/**/*.vue'],
    },
    typescript: {
      tsConfig: {
        files: [
          ...files.map((m) => m.replace('test/fixtures/sample-project', '..')),
          `../src/pages/[tests]/[${configName}].vue`,
        ],
        exclude: ['../tests/**/*', '../src/pages/[tests]/**/*.vue'],
      },
    },
  };
}
