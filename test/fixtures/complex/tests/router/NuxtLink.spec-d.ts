import { assertType, vi } from 'vitest';
import { GlobalComponents } from 'vue';

const NuxtLink: GlobalComponents['NuxtLink'] = vi.fn() as any;

// ! ------ Should Error ❌

// *  index.vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'index', params: { id: 1 } } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'index', params: { id: 1 } } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'blabla-baguette' } }));

// * --- [id].vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-id' } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-id', params: { foo: 'bar' } } }));

// * --- [foo]-[[bar]].vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-foo-bar' } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-foo-bar', params: { bar: 1 } } }));

// * --- [...slug].vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-slug' } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-slug', params: { slug: 1 } } }));

// * --- [one]-foo-[two].vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-one-foo-two' } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-one-foo-two', params: { one: 1 } } }));

// * --- [id]/[slug].vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-id-slug' } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-id-slug', params: { id: 1 } } }));

// * --- Routes added by modules
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'test-module' } }));

// --- Path navigation

// ! ------ Should Error ❌

// @ts-expect-error
assertType(new NuxtLink({ to: '' }));
// @ts-expect-error
assertType(new NuxtLink({ to: '/admin ' }));
// @ts-expect-error
assertType(new NuxtLink({ to: '/admin/ /' }));
// @ts-expect-error
assertType(new NuxtLink({ to: `/ / // / / eefzr` }));
// @ts-expect-error
assertType(new NuxtLink({ to: '/elzhlzehflzhef' }));
// @ts-expect-error
assertType(new NuxtLink({ to: '/admin/foo/bar' }));
// @ts-expect-error
assertType(new NuxtLink({ to: '/admin/foo/bar/baz' }));
// @ts-expect-error
assertType(new NuxtLink({ to: `/admin/${id}/action-bar/taz?query` }));
// @ts-expect-error
assertType(new NuxtLink({ to: '/admin/panel/3O9393/bar' }));
// @ts-expect-error
assertType(new NuxtLink({ to: '/admin/foo/ profile/ezfje' }));
// @ts-expect-error
assertType(new NuxtLink({ to: '/admin/3U93U/settings/baz' }));
// @ts-expect-error
assertType(new NuxtLink({ to: '/admin/panel/?fjzk' }));

// $ ----- Should be valid ✅

const id = '38789803';
assertType(new NuxtLink({ to: '/' }));
assertType(new NuxtLink({ to: '/baguette' }));
assertType(new NuxtLink({ to: '/admin/foo' }));
assertType(new NuxtLink({ to: '/admin/foo/' }));
assertType(new NuxtLink({ to: `/admin/${id}/action-bar#hash` }));
assertType(new NuxtLink({ to: `/admin/${id}/action-bar?query=bar` }));
assertType(new NuxtLink({ to: '/admin/foo/profile/' }));
assertType(new NuxtLink({ to: `/admin/${id}/settings` }));
assertType(new NuxtLink({ to: '/admin/panel/' }));
assertType(new NuxtLink({ to: '/admin/panel/938783/' }));
assertType(new NuxtLink({ to: '/user/38873-' }));
assertType(new NuxtLink({ to: '/user/38673/bar/#hash' }));
assertType(new NuxtLink({ to: '/user/ç9737/foo/articles?baz=foo' }));
assertType(new NuxtLink({ to: '/user/catch/1/2' }));
assertType(new NuxtLink({ to: '/user/test-' }));
assertType(new NuxtLink({ to: '/user' }));

// $ ----- Should be valid ✅

assertType(new NuxtLink({ to: { name: 'index' } }));
assertType(new NuxtLink({ to: { name: 'user-id', params: { id: 1 }, hash: 'baz' } }));
assertType(new NuxtLink({ to: { name: 'user-foo-bar', params: { foo: 'bar' }, force: true } }));
assertType(
  new NuxtLink({
    to: { name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } },
  })
);
assertType(new NuxtLink({ to: { name: 'user-catch-slug', params: { slug: ['foo'] } } }));
assertType(new NuxtLink({ to: { name: 'user-catch-slug', params: { slug: [1, 2, 3] } } }));
assertType(new NuxtLink({ to: { name: 'user-one-foo-two', params: { one: 1, two: '2' } } }));
assertType(
  new NuxtLink({
    to: { name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } },
  })
);

assertType(
  new NuxtLink({
    to: { name: 'test-module', params: { foo: 1 }, query: { foo: 'bar' } },
  })
);

// - With External prop

// $ ----- Should be valid ✅

assertType(new NuxtLink({ to: '/admin/:id/', external: false }));
assertType(new NuxtLink({ to: 'http://google.com', external: true }));
