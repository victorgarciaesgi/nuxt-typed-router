import type { NuxtConfig } from '@nuxt/schema';
import TestModuleRoute from './src/modules/testAddRoute';
import { getConfigFromName } from '../../utils';

const configName = process.env.NUXT_ROUTER_CONFIG_NAME;

let additionalConfig: NuxtConfig | undefined;

if (configName) {
  const config = require(`../../samples-config/${configName}.ts`);
  additionalConfig = getConfigFromName(configName, config);
}

export default defineNuxtConfig({
  modules: ['nuxt-typed-router', TestModuleRoute],
  srcDir: './src',
  ...additionalConfig,
});
