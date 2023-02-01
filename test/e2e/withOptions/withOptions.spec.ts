import { fileURLToPath } from 'node:url';
import { setup } from '@nuxt/test-utils';
import { assertType } from 'vitest';

test('The strict option should behave correctly with strict: true', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../fixtures/withOptions', import.meta.url)),
    setupTimeout: 120000,
    nuxtConfig: {
      nuxtTypedRouter: {
        strict: true,
      },
    },
  });

  type TypedRouter = import('../../fixtures/withOptions/.nuxt/typed-router').TypedRouter;
  type TypedNuxtLinkProps =
    import('../../fixtures/withOptions/.nuxt/typed-router/typed-router').TypedNuxtLinkProps;

  const router = {
    push: vi.fn(),
  } as unknown as TypedRouter;

  let toProp: TypedNuxtLinkProps = {} as TypedNuxtLinkProps;

  // @ts-expect-error
  assertType(router.push('/foo'));
  // @ts-expect-error
  assertType(router.push({ path: '/login' }));

  // @ts-expect-error
  assertType((toProp.to = '/login'));
  // @ts-expect-error
  assertType((toProp.to = { path: '/login' }));
});

test('The strict option should behave correctly with partial strict options', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../fixtures/withOptions', import.meta.url)),
    setupTimeout: 120000,
    nuxtConfig: {
      nuxtTypedRouter: {
        strict: {
          NuxtLink: {
            strictRouteLocation: true,
          },
          router: {
            strictToArgument: true,
          },
        },
      },
    },
  });

  type TypedRouter = import('../../fixtures/withOptions/.nuxt/typed-router').TypedRouter;
  type TypedNuxtLinkProps =
    import('../../fixtures/withOptions/.nuxt/typed-router/typed-router').TypedNuxtLinkProps;

  const router = {
    push: vi.fn(),
  } as unknown as TypedRouter;

  let toProp: TypedNuxtLinkProps = {} as TypedNuxtLinkProps;

  assertType(router.push('/foo'));
  // @ts-expect-error
  assertType(router.push({ path: '/login' }));

  // @ts-expect-error
  assertType((toProp.to = '/login'));
  assertType((toProp.to = { path: '/login' }));
});
