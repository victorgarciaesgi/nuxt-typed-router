/// <reference path='../../../fixtures/complex/src/tests/routerTypes.spec-d.ts'/>

import { assertType } from 'vitest';
import { LocationQuery, RouteLocationMatched } from 'vue-router';
import {
  useLocalePath,
  useLocaleRoute,
  navigateTo,
  TypedRouteFromName,
} from '../../../fixtures/complex/.nuxt/typed-router';
import type {
  TypedLocaleRoute,
  TypedToLocalePath,
} from '../../../fixtures/complex/.nuxt/typed-router/__i18n-router';
import { optional, required } from '../../../utils/typecheck';

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
  assertType(navigateTo(localePath({ name: 'index', params: { id: 1 } }, 'es'))); // Error

  assertType(navigateTo(localePath({ name: 'index', query: { id: 1 } }, 'fr')));
  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'index', params: { id: 1 } }))); // Error

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'blabla-baguette' }))); // Error

  // ---- [id].vue

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-id' }))); // Error

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-id', params: { foo: 'bar' } }))); // Error

  assertType(navigateTo(localePath({ name: 'user-id', params: { id: 1 } }))); // Good

  // ---- [foo]-[[bar]].vue

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-foo-bar' }))); // Error
  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-foo-bar', params: { bar: 1 } }))); // Error

  assertType(navigateTo(localePath({ name: 'user-foo-bar', params: { foo: 'bar' } }))); // Good

  assertType(navigateTo(localePath({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } }))); // Good

  // ---- [...slug].vue

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-slug' }))); // Error
  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-slug', params: { slug: 1 } }))); // Error

  assertType(navigateTo(localePath({ name: 'user-slug', params: { slug: ['foo'] } }))); // Good

  assertType(navigateTo(localePath({ name: 'user-slug', params: { slug: [1, 2, 3] } }))); // Good

  // ---- [one]-foo-[two].vue

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-one-foo-two' }))); // Error
  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-one-foo-two', params: { one: 1 } }))); // Error

  assertType(navigateTo(localePath({ name: 'user-one-foo-two', params: { one: 1, two: '2' } }))); // Good

  // ---- [id]/[slug].vue

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-id-slug' }))); // Error
  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'user-id-slug', params: { id: 1 } }))); // Error

  assertType(navigateTo(localePath({ name: 'user-id-slug', params: { slug: '2' } }))); // Good

  // ---- Routes added by config extend

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'test-extend' }))); // Error

  // ---- Routes added by modules

  // @ts-expect-error
  assertType(navigateTo(localePath({ name: 'test-module' }))); // Error
});

test('route types should be correct', () => {
  let localeRoute: TypedLocaleRoute = useLocaleRoute() as TypedLocaleRoute;
  const resolved = localeRoute({ name: 'user-foo-bar___en', params: { foo: 1 } });

  expectTypeOf(resolved).toMatchTypeOf<TypedRouteFromName<'user-foo-bar___en'>>();

  assertType(resolved.query.foo);

  expectTypeOf(resolved.fullPath).toMatchTypeOf<string>();
  expectTypeOf(resolved.hash).toMatchTypeOf<string>();
  expectTypeOf(resolved.params).toMatchTypeOf<{
    foo: string;
    bar?: string | undefined;
  }>();
  expectTypeOf(resolved.path).toMatchTypeOf<string>();
  expectTypeOf(resolved.matched).toMatchTypeOf<RouteLocationMatched[]>();

  assertType(required(resolved.params.foo));
  assertType(optional(resolved.params.bar));
});
