import { assertType, test } from 'vitest';
import type { LocationQuery } from 'vue-router';

// ! ------ Should Error ❌

// *  index.vue
// @ts-expect-error
useLink({ to: { name: 'index', params: { id: 1 } } });
// @ts-expect-error
useLink({ to: { name: 'index', params: { id: 1 } } });
// @ts-expect-error
useLink({ to: { name: 'blabla-baguette' } });

// * --- [id].vue
// @ts-expect-error
useLink({ to: { name: 'user-id' } });
// @ts-expect-error
useLink({ to: { name: 'user-id', params: { foo: 'bar' } } });

// * --- [foo]-[[bar]].vue
// @ts-expect-error
useLink({ to: { name: 'user-foo-bar' } });
// @ts-expect-error
useLink({ to: { name: 'user-foo-bar', params: { bar: 1 } } });

// * --- [...slug].vue
// @ts-expect-error
useLink({ to: { name: 'user-catch-slug' } });
// @ts-expect-error
useLink({ to: { name: 'user-catch-slug', params: { slug: 1 } } });

// * --- [one]-foo-[two].vue
// @ts-expect-error
useLink({ to: { name: 'user-one-foo-two' } });
// @ts-expect-error
useLink({ to: { name: 'user-one-foo-two', params: { one: 1 } } });

// * --- [id]/[slug].vue
// @ts-expect-error
useLink({ to: { name: 'user-id-slug' } });
// @ts-expect-error
useLink({ to: { name: 'user-id-slug', params: { id: 1 } } });

// * --- Routes added by modules
// @ts-expect-error
useLink({ to: { name: 'test-module' } });

// $ ----- Should be valid ✅

useLink({ to: { name: 'index' } });
useLink({ to: { name: 'user-id', params: { id: 1 }, hash: 'baz' } });
useLink({ to: { name: 'user-foo-bar', params: { foo: 'bar' }, force: true } });
useLink({ to: { name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } } });
useLink({ to: { name: 'user-catch-slug', params: { slug: ['foo'] } } });
useLink({ to: { name: 'user-catch-slug', params: { slug: [1, 2, 3] } } });
useLink({ to: { name: 'user-one-foo-two', params: { one: 1, two: '2' } } });
useLink({ to: { name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } } });

// --- Path navigation

// ! ------ Should Error ❌

// @ts-expect-error
assertType(useLink({ to: '' }));
// @ts-expect-error
assertType(useLink({ to: '/admin ' }));
// @ts-expect-error
assertType(useLink({ to: '/admin/ /' }));
// @ts-expect-error
assertType(useLink({ to: `/ / // / / eefzr` }));
// @ts-expect-error
assertType(useLink({ to: '/elzhlzehflzhef' }));
// @ts-expect-error
assertType(useLink({ to: '/admin/foo/bar' }));
// @ts-expect-error
assertType(useLink({ to: '/admin/foo/bar/baz' }));
// @ts-expect-error
assertType(useLink({ to: `/admin/${id}/action-bar/taz?query` }));
// @ts-expect-error
assertType(useLink({ to: '/admin/panel/3O9393/bar' }));
// @ts-expect-error
assertType(useLink({ to: '/admin/foo/ profile/ezfje' }));
// @ts-expect-error
assertType(useLink({ to: '/admin/3U93U/settings/baz' }));
// @ts-expect-error
assertType(useLink({ to: '/admin/panel/?fjzk' }));
// @ts-expect-error
assertType(useLink({ to: '/admin/panel/938783/ ' }));
// @ts-expect-error
assertType(useLink({ to: '/user/3887/foo/bar/' }));
// @ts-expect-error
assertType(useLink({ to: '/admin/:id//' }));

// $ ----- Should be valid ✅

const id = '38789803';
assertType(useLink({ to: '/' }));
assertType(useLink({ to: '/baguette' }));
assertType(useLink({ to: '/admin/foo' }));
assertType(useLink({ to: '/admin/foo/' }));
assertType(useLink({ to: `/admin/${id}/action-bar#hash` }));
assertType(useLink({ to: `/admin/${id}/action-bar?query=bar` }));
assertType(useLink({ to: '/admin/foo/profile/' }));
assertType(useLink({ to: `/admin/${id}/settings` }));
assertType(useLink({ to: '/admin/panel/' }));
assertType(useLink({ to: '/admin/panel/938783/' }));
assertType(useLink({ to: '/user/38873-' }));
assertType(useLink({ to: '/user/38673/bar/#hash' }));
assertType(useLink({ to: '/user/ç9737/foo/articles?baz=foo' }));
assertType(useLink({ to: '/user/catch/1/2' }));
assertType(useLink({ to: '/user/test-' }));
assertType(useLink({ to: '/user' }));

// - Resolved routes

// *  index.vue
test('', async () => {
  const resolvedNavigateToRoute = useLink({
    to: {
      name: 'index',
    },
  });

  if (resolvedNavigateToRoute) {
    assertType<'index'>(resolvedNavigateToRoute.route.value.name);
    // @ts-expect-error
    assertType(resolvedNavigateToRoute.params);
  }
});

// * --- [id].vue
test('', async () => {
  const resolvedNavigateToRoute = await useLink({
    to: {
      name: 'user-id',
      params: {
        id: 1,
      },
    },
  });

  if (resolvedNavigateToRoute) {
    assertType<'user-id'>(resolvedNavigateToRoute.route.value.name);
    assertType<{
      id: string;
    }>(resolvedNavigateToRoute.route.value.params);
  }
});

// * --- [foo]-[[bar]].vue
test('', async () => {
  const resolvedNavigateToRoute = await useLink({
    to: {
      name: 'user-foo-bar',
      params: {
        foo: 1,
        bar: 1,
      },
    },
  });

  if (resolvedNavigateToRoute) {
    assertType<'user-foo-bar'>(resolvedNavigateToRoute.route.value.name);
    assertType<{
      foo: string;
      bar?: string | undefined;
    }>(resolvedNavigateToRoute.route.value.params);
  }
});

// * --- [...slug].vue
test('', async () => {
  const resolvedNavigateToRoute = await useLink({
    to: {
      name: 'user-catch-slug',
      params: {
        slug: [1, 2, 3],
      },
    },
  });

  if (resolvedNavigateToRoute) {
    assertType<'user-catch-slug'>(resolvedNavigateToRoute.route.value.name);
    assertType<{
      slug: string[];
    }>(resolvedNavigateToRoute.route.value.params);
  }
});

// * --- [one]-foo-[two].vue

const resolvedNavigateToRoute = await useLink({
  to: {
    name: 'user-one-foo-two',
    params: { one: 1, two: 2 },
  },
});

if (resolvedNavigateToRoute) {
  assertType<'user-one-foo-two'>(resolvedNavigateToRoute.route.value.name);
  assertType<{
    one: string | number;
    two: string | number;
  }>(resolvedNavigateToRoute.route.value.params);
  assertType<LocationQuery>(resolvedNavigateToRoute.route.value.query);
}

// * --- [id]/[slug].vue
test('', async () => {
  const resolvedNavigateToRoute = await useLink({
    to: {
      name: 'user-id-slug',
      params: {
        slug: 1,
        id: 1,
      },
    },
  });

  if (resolvedNavigateToRoute) {
    assertType<'user-id-slug'>(resolvedNavigateToRoute.route.value.name);
    assertType<{
      id: string;
      slug: string;
    }>(resolvedNavigateToRoute.route.value.params);
  }
});

// - With paths

// * --- [foo]-[[bar]].vue
test('', async () => {
  const resolvedNavigateToRoute = await useLink({ to: '/admin/3883/action-376773' });

  if (resolvedNavigateToRoute) {
    assertType<'admin-id-action-slug'>(resolvedNavigateToRoute.route.value.name);
    assertType<{
      id: string;
      slug: string;
    }>(resolvedNavigateToRoute.route.value.params);

    // @ts-expect-error
    assertType<'admin-id'>(resolvedNavigateToRoute.route.value.name);
  }
});
