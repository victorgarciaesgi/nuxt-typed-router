import path from 'path';
import { setupNuxtE2ETestForConfig } from './setupNuxtE2ETestForConfig';
import { globby } from 'globby';

describe.sequential('Testing E2E with different configs', async () => {
  try {
    const allConfigs = await globby('test/samples-config');
    for (let config of allConfigs) {
      const configFileName = path.parse(config).name;
      await setupNuxtE2ETestForConfig(configFileName);
    }
  } catch (e: any) {
    throw new Error(e);
  }
});
