/// <reference path='../../../fixtures/complex/.nuxt/typed-router/index.ts'/>

import { assertType } from 'vitest';
import { LocationQuery, RouteLocationMatched } from 'vue-router';
import {
  useLocalePath,
  useLocaleRoute,
  navigateTo,
  TypedRouteFromName,
  TypedRouter,
} from '../../../fixtures/complex/.nuxt/typed-router';
import type {
  TypedLocaleRoute,
  TypedToLocalePath,
} from '../../../fixtures/complex/.nuxt/typed-router/__i18n-router';

declare const router: TypedRouter;

test('useLocalePath types should be correct', async () => {
  const localePath = useLocalePath() as TypedToLocalePath;

  const route = await navigateTo(
    localePath({ name: 'user-one-foo-two', params: { one: 1, two: 2 } })
  );

  if (route instanceof Error) {
    //
  } else if (route) {
    expectTypeOf(route.name).toMatchTypeOf<'user-one-foo-two'>();
    expectTypeOf(route.params).toMatchTypeOf<{
      one: string | number;
      two: string | number;
    }>();
    expectTypeOf(route.query).toMatchTypeOf<LocationQuery>();
  }

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'index', params: { id: 1 } }, 'es')));

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'index', params: { id: 1 } })));

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'blabla-baguette' })));

  // ---- [id].vue

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-id' })));

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-id', params: { foo: 'bar' } })));

  // ---- [foo]-[[bar]].vue

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-foo-bar' })));
  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-foo-bar', params: { bar: 1 } })));

  // ---- [...slug].vue

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-slug' })));
  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-slug', params: { slug: 1 } })));

  // ---- [one]-foo-[two].vue

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-one-foo-two' })));
  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-one-foo-two', params: { one: 1 } })));

  // ---- [id]/[slug].vue

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-id-slug' })));
  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-id-slug', params: { id: 1 } })));

  // ---- Routes added by config extend

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'test-extend' })));

  // ---- Routes added by modules

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'test-module' })));
});

test('localeRoute types should be correct', () => {
  let localeRoute: TypedLocaleRoute = useLocaleRoute() as TypedLocaleRoute;
  const resolved = localeRoute({ name: 'user-foo-bar', params: { foo: 1 } }, 'fr');

  expectTypeOf(resolved).toMatchTypeOf<TypedRouteFromName<'user-foo-bar'>>();

  expectTypeOf(resolved.fullPath).toMatchTypeOf<string>();
  expectTypeOf(resolved.hash).toMatchTypeOf<string>();
  expectTypeOf(resolved.params).toMatchTypeOf<{
    foo: string;
    bar?: string | undefined;
  }>();
  expectTypeOf(resolved.path).toMatchTypeOf<string>();
  expectTypeOf(resolved.matched).toMatchTypeOf<RouteLocationMatched[]>();
});
