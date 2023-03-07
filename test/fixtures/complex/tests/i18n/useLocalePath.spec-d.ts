import { assertType, expectTypeOf, vi } from 'vitest';
import { GlobalComponents } from 'vue';
import type { HistoryState, LocationQuery, LocationQueryRaw } from 'vue-router';
import { navigateTo, useLocalePath, useRouter } from '@typed-router';

// @ts-expect-error Ensure global imports are disabled
declare const globalDecl: (typeof globalThis)['useLocalePath'];

// Given
const localePath = useLocalePath();

// - Return types

const localeRouteLocation = localePath({
  name: 'user-foo-bar',
  params: { foo: '1' },
  query: { foo: 'bar' },
});

expectTypeOf(localeRouteLocation.name).toMatchTypeOf<'user-foo-bar'>();
expectTypeOf(localeRouteLocation.params).toMatchTypeOf<{
  foo: string | number;
  bar?: string | number | undefined;
}>();
expectTypeOf(localeRouteLocation.force).toMatchTypeOf<boolean>();
expectTypeOf(localeRouteLocation.hash).toMatchTypeOf<string>();
expectTypeOf(localeRouteLocation.query).toMatchTypeOf<LocationQueryRaw>();
expectTypeOf(localeRouteLocation.state).toMatchTypeOf<HistoryState>;

// -  Usage of localePath with useRouter

const router = useRouter();

// ! ------ Should Error ❌

// *  index.vue
// @ts-expect-error
router.push(localePath({ name: 'index' }, 'DE'));
// @ts-expect-error
router.push(localePath({ name: 'index', params: { id: 1 } }, 'es'));
// @ts-expect-error
router.push(localePath({ name: 'index', params: { id: 1 } }));
// @ts-expect-error
router.push(localePath({ name: 'blabla-baguette' }));

// * --- [id].vue
// @ts-expect-error
router.push(localePath({ name: 'user-id' }));
// @ts-expect-error
router.push(localePath({ name: 'user-id', params: { foo: 'bar' } }));

// * --- [foo]-[[bar]].vue
// @ts-expect-error
router.push(localePath({ name: 'user-foo-bar' }));
// @ts-expect-error
router.push(localePath({ name: 'user-foo-bar', params: { bar: 1 } }));

// * --- [...slug].vue
// @ts-expect-error
router.push(localePath({ name: 'user-slug' }));
// @ts-expect-error
router.push(localePath({ name: 'user-slug', params: { slug: 1 } }));

// * --- [one]-foo-[two].vue
// @ts-expect-error
router.push(localePath({ name: 'user-one-foo-two' }));
// @ts-expect-error
router.push(localePath({ name: 'user-one-foo-two', params: { one: 1 } }));

// * --- [id]/[slug].vue
// @ts-expect-error
router.push(localePath({ name: 'user-id-slug' }));
// @ts-expect-error
router.push(localePath({ name: 'user-id-slug', params: { id: 1 } }));

// * --- Routes added by modules
// @ts-expect-error
router.push(localePath({ name: 'test-module' }));

// * --- Path navigation
// @ts-expect-error
router.push(localePath('/fooooooooooo'));
// @ts-expect-error
router.push(localePath({ path: '/foo' }));

// $ ----- Should be valid ✅

router.push(localePath({ name: 'index' }));
router.push(localePath({ name: 'user-id', params: { id: 1 }, hash: 'baz' }, 'en'));
router.push(localePath({ name: 'user-foo-bar', params: { foo: 'bar' }, force: true }));
router.push(localePath({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } }, 'fr'));
router.push(localePath({ name: 'user-catch-slug', params: { slug: ['foo'] } }));
router.push(localePath({ name: 'user-catch-slug', params: { slug: [1, 2, 3] } }, 'en'));
router.push(localePath({ name: 'user-one-foo-two', params: { one: 1, two: '2' } }));
router.push(localePath({ name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } }));
router.push(localePath({ name: 'test-module', params: { foo: 1 }, query: { foo: 'bar' } }));

router.replace(localePath({ name: 'index' }));
router.replace(localePath({ name: 'user-id', params: { id: 1 }, hash: 'baz' }));

// --- Path navigation

// ! ------ Should Error ❌

// @ts-expect-error
assertType(router.push(localePath('')));
// @ts-expect-error
assertType(router.push(localePath('/admin ')));
// @ts-expect-error
assertType(router.push(localePath('/admin/ /')));
// @ts-expect-error
assertType(router.push(localePath(`/ / // / / eefzr`)));
// @ts-expect-error
assertType(router.push(localePath('/elzhlzehflzhef')));
// @ts-expect-error
assertType(router.push(localePath('/admin/foo/bar')));
// @ts-expect-error
assertType(router.push(localePath('/admin/foo/bar/baz')));
// @ts-expect-error
assertType(router.push(localePath(`/admin/${id}/action-bar/taz?query`)));
// @ts-expect-error
assertType(router.push(localePath('/admin/panel/3O9393/bar')));
// @ts-expect-error
assertType(router.push(localePath('/admin/foo/ profile/ezfje')));
// @ts-expect-error
assertType(router.push(localePath('/admin/3U93U/settings/baz')));
// @ts-expect-error
assertType(router.push(localePath('/admin/panel/?fjzk')));

// $ ----- Should be valid ✅

const id = '38789803';
assertType(router.push(localePath('/')));
assertType(router.push(localePath('/baguette')));
assertType(router.push(localePath('/admin/foo')));
assertType(router.push(localePath('/admin/foo/')));
assertType(router.push(localePath(`/admin/${id}/action-bar#hash`)));
assertType(router.push(localePath(`/admin/${id}/action-bar?query=bar`)));
assertType(router.push(localePath('/admin/foo/profile/')));
assertType(router.push(localePath(`/admin/${id}/settings`)));
assertType(router.push(localePath('/admin/panel/')));
assertType(router.push(localePath('/admin/panel/938783/')));
assertType(router.push(localePath('/user/38873-')));
assertType(router.push(localePath('/user/38673/bar/#hash')));
assertType(router.push(localePath('/user/ç9737/foo/articles?baz=foo')));
assertType(router.push(localePath('/user/catch/1/2')));
assertType(router.push(localePath('/user/test-')));
assertType(router.push(localePath('/user')));

// * Resolved routes

const resolved1 = router.resolve(localePath({ name: 'index' }));
assertType<'index'>(resolved1.name);
// @ts-expect-error
assertType<'index'>(resolved1.params);

const resolved2 = router.resolve(localePath({ name: 'user-id', params: { id: 1 }, hash: 'baz' }));
assertType<'user-id'>(resolved2.name);
assertType<{ id: string }>(resolved2.params);

// -  Usage of localePath with NuxtLink

const NuxtLink: GlobalComponents['NuxtLink'] = vi.fn() as any;

// ! ------ Should Error ❌

// *  index.vue
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'index' }, 'DE') }));
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'index', params: { id: 1 } }, 'es') }));
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'blabla-baguette' }) }));

// * --- [id].vue
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'user-id' }) }));
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'user-id', params: { foo: 'bar' } }) }));

// * --- [foo]-[[bar]].vue
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'user-foo-bar' }) }));
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'user-foo-bar', params: { bar: 1 } }) }));

// * --- [...slug].vue
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'user-slug' }) }));
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'user-slug', params: { slug: 1 } }) }));

// * --- [one]-foo-[two].vue
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'user-one-foo-two' }) }));
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'user-one-foo-two', params: { one: 1 } }) }));

// * --- [id]/[slug].vue
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'user-id-slug' }) }));
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'user-id-slug', params: { id: 1 } }) }));

// * --- Routes added by modules
// @ts-expect-error
assertType(new NuxtLink({ to: localePath({ name: 'test-module' }) }));

// $ ----- Should be valid ✅

assertType(new NuxtLink({ to: localePath({ name: 'index' }) }));
assertType(
  new NuxtLink({ to: localePath({ name: 'user-id', params: { id: 1 }, hash: 'baz' }, 'en') })
);
assertType(
  new NuxtLink({ to: localePath({ name: 'user-foo-bar', params: { foo: 'bar' }, force: true }) })
);
assertType(
  new NuxtLink({
    to: localePath({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } }, 'fr'),
  })
);
assertType(
  new NuxtLink({ to: localePath({ name: 'user-catch-slug', params: { slug: ['foo'] } }) })
);
assertType(
  new NuxtLink({ to: localePath({ name: 'user-catch-slug', params: { slug: [1, 2, 3] } }, 'en') })
);
assertType(
  new NuxtLink({ to: localePath({ name: 'user-one-foo-two', params: { one: 1, two: '2' } }) })
);
assertType(
  new NuxtLink({
    to: localePath({ name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } }),
  })
);

assertType(
  new NuxtLink({
    to: localePath({ name: 'test-module', params: { foo: 1 }, query: { foo: 'bar' } }),
  })
);

// * with path

assertType(
  new NuxtLink({
    to: localePath('/user'),
  })
);

// -  Usage of localePath with navigateTo

// ! ------ Should Error ❌

// *  index.vue
// @ts-expect-error
navigateTo(localePath({ name: 'index' }, 'DE'));
// @ts-expect-error
navigateTo(localePath({ name: 'index', params: { id: 1 } }, 'es'));
// @ts-expect-error
navigateTo(localePath({ name: 'index', params: { id: 1 } }));
// @ts-expect-error
navigateTo(localePath({ name: 'blabla-baguette' }));

// * --- [id].vue
// @ts-expect-error
navigateTo(localePath({ name: 'user-id' }));
// @ts-expect-error
navigateTo(localePath({ name: 'user-id', params: { foo: 'bar' } }));

// * --- [foo]-[[bar]].vue
// @ts-expect-error
navigateTo(localePath({ name: 'user-foo-bar' }));
// @ts-expect-error
navigateTo(localePath({ name: 'user-foo-bar', params: { bar: 1 } }));

// * --- [...slug].vue
// @ts-expect-error
navigateTo(localePath({ name: 'user-catch-slug' }));
// @ts-expect-error
navigateTo(localePath({ name: 'user-catch-slug', params: { slug: 1 } }));

// * --- [one]-foo-[two].vue
// @ts-expect-error
navigateTo(localePath({ name: 'user-one-foo-two' }));
// @ts-expect-error
navigateTo(localePath({ name: 'user-one-foo-two', params: { one: 1 } }));

// * --- [id]/[slug].vue
// @ts-expect-error
navigateTo(localePath({ name: 'user-id-slug' }));
// @ts-expect-error
navigateTo(localePath({ name: 'user-id-slug', params: { id: 1 } }));

// * --- Routes added by modules
// @ts-expect-error
navigateTo(localePath({ name: 'test-module' }));

// $ ----- Should be valid ✅

navigateTo(localePath({ name: 'index' }));
navigateTo(localePath({ name: 'user-id', params: { id: 1 }, hash: 'baz' }, 'en'));
navigateTo(localePath({ name: 'user-foo-bar', params: { foo: 'bar' }, force: true }));
navigateTo(localePath({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } }, 'fr'));
navigateTo(localePath({ name: 'user-catch-slug', params: { slug: ['foo'] } }));
navigateTo(localePath({ name: 'user-catch-slug', params: { slug: [1, 2, 3] } }, 'en'));
navigateTo(localePath({ name: 'user-one-foo-two', params: { one: 1, two: '2' } }));
navigateTo(localePath({ name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } }));
navigateTo(localePath({ name: 'test-module', params: { foo: 1 }, query: { foo: 'bar' } }));

navigateTo(localePath('/user'));

// * --- Resolved types added by modules

const resolvedNavigateToRoute = await navigateTo(
  localePath({
    name: 'user-one-foo-two',
    params: { one: 1, two: 2 },
  })
);

if (resolvedNavigateToRoute && !(resolvedNavigateToRoute instanceof Error)) {
  expectTypeOf(resolvedNavigateToRoute.name).toMatchTypeOf<'user-one-foo-two'>();
  expectTypeOf(resolvedNavigateToRoute.params).toMatchTypeOf<{
    one: string | number;
    two: string | number;
  }>();
  expectTypeOf(resolvedNavigateToRoute.query).toMatchTypeOf<LocationQuery>();
}
