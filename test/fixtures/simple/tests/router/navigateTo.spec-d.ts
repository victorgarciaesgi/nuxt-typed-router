import { assertType } from 'vitest';
import { LocationQuery } from 'vue-router';
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
navigateTo({ name: 'user-catch-slug' });
// @ts-expect-error
navigateTo({ name: 'user-catch-slug', params: { slug: 1 } });

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

// * --- Routes added by config extend
// @ts-expect-error
navigateTo({ name: 'test-extend' });

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

// --- Path navigation

// ! ------ Should Error ❌

// @ts-expect-error
assertType(navigateTo(''));
// @ts-expect-error
assertType(navigateTo('/admin '));
// @ts-expect-error
assertType(navigateTo('/admin/ /'));
// @ts-expect-error
assertType(navigateTo(`/ / // / / eefzr`));
// @ts-expect-error
assertType(navigateTo('/elzhlzehflzhef'));
// @ts-expect-error
assertType(navigateTo('/admin/foo/bar'));
// @ts-expect-error
assertType(navigateTo('/admin/foo/bar/baz'));
// @ts-expect-error
assertType(navigateTo(`/admin/${id}/action-bar/taz?query`));
// @ts-expect-error
assertType(navigateTo('/admin/panel/3O9393/bar'));
// @ts-expect-error
assertType(navigateTo('/admin/foo/ profile/ezfje'));
// @ts-expect-error
assertType(navigateTo('/admin/3U93U/settings/baz'));
// @ts-expect-error
assertType(navigateTo('/admin/panel/?fjzk'));
assertType(navigateTo('/admin/panel/938783/'));
assertType(navigateTo('/user/38873-'));
assertType(navigateTo('/user/38673/bar/'));
assertType(navigateTo('/user/ç9737/foo/articles?baz=foo'));
assertType(navigateTo('/user/catch/1/2'));
assertType(navigateTo('/user/test-'));
assertType(navigateTo('/user'));

// $ ----- Should be valid ✅

const id = '38789803';
assertType(navigateTo('/'));
assertType(navigateTo('/baguette'));
assertType(navigateTo('/admin/foo'));
assertType(navigateTo('/admin/foo/'));
assertType(navigateTo(`/admin/${id}/action-bar#hash`));
assertType(navigateTo(`/admin/${id}/action-bar?query=bar`));
assertType(navigateTo('/admin/foo/profile/'));
assertType(navigateTo(`/admin/${id}/settings`));
assertType(navigateTo('/admin/panel/'));
assertType(navigateTo('/admin/panel/938783/'));
assertType(navigateTo('/user/38873-'));
assertType(navigateTo('/user/38673/bar/#hash'));
assertType(navigateTo('/user/ç9737/foo/articles?baz=foo'));
assertType(navigateTo('/user/catch/1/2'));
assertType(navigateTo('/user/test-'));
assertType(navigateTo('/user'));

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

// - With paths

// * --- [foo]-[[bar]].vue
test('', async () => {
  const resolvedNavigateToRoute = await navigateTo('/admin/3883/action-376773');

  if (resolvedNavigateToRoute && !(resolvedNavigateToRoute instanceof Error)) {
    assertType<'admin-id-action-slug'>(resolvedNavigateToRoute.name);
    assertType<{
      id: string;
      slug: string;
    }>(resolvedNavigateToRoute.params);

    // @ts-expect-error
    assertType<'admin-id'>(resolvedNavigateToRoute.name);
  }
});
