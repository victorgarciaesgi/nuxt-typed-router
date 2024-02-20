import { assertType } from 'vitest';
import type { LocationQuery } from 'vue-router';
import test from 'node:test';

// ! ------ Should Error ❌

// *  index.vue
// @ts-expect-error
navigateTo({ name: 'index', params: { id: 1 } });
// @ts-expect-error
navigateTo({ name: 'index', params: { id: 1 } });
// @ts-expect-error
navigateTo({ name: 'blabla-baguette' });

// * --- [id].vue
// @ts-expect-error
navigateTo({ name: 'user-id' });
// @ts-expect-error
navigateTo({ name: 'user-id', params: { foo: 'bar' } });

// * --- [foo]-[[bar]].vue
// @ts-expect-error
navigateTo({ name: 'user-foo-bar' });
// @ts-expect-error
navigateTo({ name: 'user-foo-bar', params: { bar: 1 } });

// * --- [...slug].vue
// @ts-expect-error
navigateTo({ name: 'user-slug' });
// @ts-expect-error
navigateTo({ name: 'user-slug', params: { slug: 1 } });

// * --- [one]-foo-[two].vue
// @ts-expect-error
navigateTo({ name: 'user-one-foo-two' });
// @ts-expect-error
navigateTo({ name: 'user-one-foo-two', params: { one: 1 } });

// * --- [id]/[slug].vue
// @ts-expect-error
navigateTo({ name: 'user-id-slug' });
// @ts-expect-error
navigateTo({ name: 'user-id-slug', params: { id: 1 } });

// * --- Routes added by modules
// @ts-expect-error
navigateTo({ name: 'test-module' });

// $ ----- Should be valid ✅

navigateTo({ name: 'index' }, { external: true });
navigateTo({ name: 'user-id', params: { id: 1 }, hash: 'baz' });
navigateTo({ name: 'user-foo-bar', params: { foo: 'bar' }, force: true });
navigateTo({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } });
navigateTo({ name: 'user-catch-slug', params: { slug: ['foo'] } });
navigateTo({ name: 'user-catch-slug', params: { slug: [1, 2, 3] } });
navigateTo({ name: 'user-one-foo-two', params: { one: 1, two: '2' } });
navigateTo({ name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } });
navigateTo({ name: 'test-module', params: { foo: 1 }, query: { foo: 'bar' } });

// --- Path navigation

// ! ------ Should Error ❌

// @ts-expect-error
assertType(navigateTo('/'));

// - Resolved routes

// *  index.vue
test('', async () => {
  const resolvedNavigateToRoute = await navigateTo({
    name: 'index',
  });

  if (resolvedNavigateToRoute && !(resolvedNavigateToRoute instanceof Error)) {
    assertType<'index'>(resolvedNavigateToRoute.name);
    // @ts-expect-error
    assertType(resolvedNavigateToRoute.params);
  }
});

// * --- [id].vue
test('', async () => {
  const resolvedNavigateToRoute = await navigateTo({
    name: 'user-id',
    params: {
      id: 1,
    },
  });

  if (resolvedNavigateToRoute && !(resolvedNavigateToRoute instanceof Error)) {
    assertType<'user-id'>(resolvedNavigateToRoute.name);
    assertType<{
      id: string;
    }>(resolvedNavigateToRoute.params);
  }
});

// * --- [foo]-[[bar]].vue
test('', async () => {
  const resolvedNavigateToRoute = await navigateTo({
    name: 'user-foo-bar',
    params: {
      foo: 1,
      bar: 1,
    },
  });

  if (resolvedNavigateToRoute && !(resolvedNavigateToRoute instanceof Error)) {
    assertType<'user-foo-bar'>(resolvedNavigateToRoute.name);
    assertType<{
      foo: string;
      bar?: string | undefined;
    }>(resolvedNavigateToRoute.params);
  }
});

// * --- [...slug].vue
test('', async () => {
  const resolvedNavigateToRoute = await navigateTo({
    name: 'user-catch-slug',
    params: {
      slug: [1, 2, 3],
    },
  });

  if (resolvedNavigateToRoute && !(resolvedNavigateToRoute instanceof Error)) {
    assertType<'user-catch-slug'>(resolvedNavigateToRoute.name);
    assertType<{
      slug: string[];
    }>(resolvedNavigateToRoute.params);
  }
});

// * --- [one]-foo-[two].vue

const resolvedNavigateToRoute = await navigateTo({
  name: 'user-one-foo-two',
  params: { one: 1, two: 2 },
});

if (resolvedNavigateToRoute && !(resolvedNavigateToRoute instanceof Error)) {
  assertType<'user-one-foo-two'>(resolvedNavigateToRoute.name);
  assertType<{
    one: string | number;
    two: string | number;
  }>(resolvedNavigateToRoute.params);
  assertType<LocationQuery>(resolvedNavigateToRoute.query);
}

// * --- [id]/[slug].vue
test('', async () => {
  const resolvedNavigateToRoute = await navigateTo({
    name: 'user-id-slug',
    params: {
      slug: 1,
      id: 1,
    },
  });

  if (resolvedNavigateToRoute && !(resolvedNavigateToRoute instanceof Error)) {
    assertType<'user-id-slug'>(resolvedNavigateToRoute.name);
    assertType<{
      id: string;
      slug: string;
    }>(resolvedNavigateToRoute.params);
  }
});

// * --- Routes added by modules
test('', async () => {
  const resolvedNavigateToRoute = await navigateTo({
    name: 'test-module',
    params: {
      foo: 1,
    },
  });

  if (resolvedNavigateToRoute && !(resolvedNavigateToRoute instanceof Error)) {
    assertType<'test-module'>(resolvedNavigateToRoute.name);
    assertType<{
      foo: string;
    }>(resolvedNavigateToRoute.params);
  }
});
