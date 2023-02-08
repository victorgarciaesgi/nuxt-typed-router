import { assertType, expectTypeOf, vi } from 'vitest';
import type { HistoryState, LocationQueryRaw } from 'vue-router';
import { TypedNuxtLink } from '../../.nuxt/typed-router/typed-router';
import { useLocalePath, useRouter } from '@typed-router';

// Given
const localePath = useLocalePath();

// -  Usage of localePath with useRouter

const router = useRouter();

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

// ! ------ Should Error ❌

// @ts-expect-error
router.push(localePath({ name: 'index' }, 'DE'));
// *  index.vue
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

// * --- Routes added by config extend
// @ts-expect-error
router.push(localePath({ name: 'test-extend' }));

// * --- Routes added by modules
// @ts-expect-error
router.push(localePath({ name: 'test-module' }));

// $ ----- Should be valid ✅

router.push(localePath({ name: 'index' }));
router.push(localePath({ name: 'user-id', params: { id: 1 }, hash: 'baz' }, 'en'));
router.push(localePath({ name: 'user-foo-bar', params: { foo: 'bar' }, force: true }));
router.push(localePath({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } }, 'fr'));
router.push(localePath({ name: 'user-slug', params: { slug: ['foo'] } }));
router.push(localePath({ name: 'user-slug', params: { slug: [1, 2, 3] } }, 'en'));
router.push(localePath({ name: 'user-one-foo-two', params: { one: 1, two: '2' } }));
router.push(localePath({ name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } }));

router.replace(localePath({ name: 'index' }));
router.replace(localePath({ name: 'user-id', params: { id: 1 }, hash: 'baz' }));

// * Resolved routes

const resolved1 = router.resolve(localePath({ name: 'index' }));
assertType<'index'>(resolved1.name);
// @ts-expect-error
assertType<'index'>(resolved1.params);

const resolved2 = router.resolve(localePath({ name: 'user-id', params: { id: 1 }, hash: 'baz' }));
assertType<'user-id'>(resolved2.name);
assertType<{ id: string }>(resolved2.params);

// -  Usage of localePath with NuxtLink

const NuxtLink: TypedNuxtLink = vi.fn() as any;
