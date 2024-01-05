import type { NuxtConfig } from '@nuxt/schema';
import TestModuleRoute from './src/modules/testAddRoute';
import { globbySync } from 'globby';

const configName = process.env.NUXT_ROUTER_CONFIG_NAME;

let additionalConfig: NuxtConfig | undefined;

console.log({ configName });

if (configName) {
  const config = require(`../../samples-config/${configName}.ts`);
  const files = globbySync(`test/fixtures/sample-project/tests/[${configName}]`);
  additionalConfig = {
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

export default defineNuxtConfig({
  modules: ['nuxt-typed-router', TestModuleRoute],
  srcDir: './src',
  ...additionalConfig,
});
