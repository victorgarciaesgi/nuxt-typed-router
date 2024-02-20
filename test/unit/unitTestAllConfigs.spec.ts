import path from 'path';
import { setupNuxtTestWithConfig } from './setupTypeTest';
import { globby } from 'globby';

describe.sequential('Testing types with different configs', async () => {
  try {
    const allConfigs = await globby('test/samples-config', { absolute: false });
    for (let config of allConfigs) {
      const configFileName = path.parse(config).name;
      await setupNuxtTestWithConfig(configFileName);
    }
  } catch (e: any) {
    throw new Error(e);
  }
});
