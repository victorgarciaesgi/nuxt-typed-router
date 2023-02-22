import { fileURLToPath } from 'node:url';
import path from 'path';
import { setup } from '@nuxt/test-utils';
import { assertType } from 'vitest';
import { runTypesDiagnostics } from '../../../../utils';
import { useRouter } from '../../.nuxt/typed-router';
import { TypedNuxtLink } from '../../.nuxt/typed-router/typed-router';

test('The strict option should behave correctly with strict: true', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../fixtures/withOptions', import.meta.url)),
    setupTimeout: 120000,
    nuxtConfig: {
      nuxtTypedRouter: {
        strict: true,
      },
    },
  } as any);

  const diagnostic = await runTypesDiagnostics(__dirname, __filename);

  expect(diagnostic.length).toBe(0);

  const NuxtLink: TypedNuxtLink = vi.fn() as any;

  const router = { push: vi.fn() } as unknown as ReturnType<typeof useRouter>;

  // @ts-expect-error
  assertType(router.push('/foo'));
  // @ts-expect-error
  assertType(router.push({ path: '/login' }));

  // @ts-expect-error
  assertType(new NuxtLink('/login'));
  // @ts-expect-error
  assertType(new NuxtLink({ path: '/goooo' }));
});
