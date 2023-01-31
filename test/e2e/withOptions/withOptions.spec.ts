import { fileURLToPath } from 'node:url';
import { setup } from '@nuxt/test-utils';
import { assertType, describe, it } from 'vitest';

describe('The strict option should behave correctly', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../fixtures/withOptions', import.meta.url)),
    setupTimeout: 120000,
    nuxtConfig: {
      nuxtTypedRouter: {
        strict: true,
      },
    },
  });

  it('should throw error with strict enabled', () => {
    type TypedRouter = import('../../fixtures/withOptions/.nuxt/typed-router').TypedRouter;

    const router = {
      push: vi.fn(),
    } as unknown as TypedRouter;

    // @ts-expect-error
    assertType(router.push('/foo'));
    // @ts-expect-error
    assertType(router.push({ path: '/login' }));
  });
});
