import { setupNuxtTestWithConfig } from './utils';

describe('Testing with different configs', async () => {
  try {
    await setupNuxtTestWithConfig('classic');
    await setupNuxtTestWithConfig('withStrict');
    await setupNuxtTestWithConfig('withPlugin');
  } catch (e: any) {
    throw new Error(e);
  }
});
