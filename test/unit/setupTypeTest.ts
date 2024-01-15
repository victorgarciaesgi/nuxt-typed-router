import { timeout } from '$$/utils';
import { $ } from 'zx';

export async function setupNuxtTestWithConfig(configName: string) {
  try {
    await $`NUXT_ROUTER_CONFIG_NAME=${configName} pnpm run test:types-fixtures`;
    await timeout(100);
  } catch (e) {
    return Promise.reject(`Typecheck failed for config: [${configName}]: ${e}`);
  }
}
