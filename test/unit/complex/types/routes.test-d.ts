/// <reference path='../../../fixtures/complex/src/tests/routerTypes.spec-d.ts'/>

import { assertType, expectTypeOf } from 'vitest';
import type { RouteLocationMatched } from 'vue-router';
import type { TypedRoute, TypedRouteFromName } from '../../../fixtures/complex/.nuxt/typed-router';
import { array, optional, required } from '../../../utils/typecheck';

declare const route: TypedRoute;

test('route types should be correct', () => {
  let route2: TypedRouteFromName<'index'> = {} as any;
  expectTypeOf(route).toMatchTypeOf<TypedRoute>();

  assertType(route.query.foo);
  assertType(route2.query.foo);

  expectTypeOf(route.fullPath).toMatchTypeOf<string>();
  expectTypeOf(route.hash).toMatchTypeOf<string>();
  expectTypeOf(route.params).toMatchTypeOf<unknown>();
  expectTypeOf(route.path).toMatchTypeOf<string>();
  expectTypeOf(route.matched).toMatchTypeOf<RouteLocationMatched[]>();

  expectTypeOf(route2.fullPath).toMatchTypeOf<string>();
  expectTypeOf(route2.hash).toMatchTypeOf<string>();
  expectTypeOf(route2).not.toHaveProperty('params');
  expectTypeOf(route2.path).toMatchTypeOf<string>();
  expectTypeOf(route2.matched).toMatchTypeOf<RouteLocationMatched[]>();

  // @ts-expect-error
  const check = route.name === 'baguette';

  if (route.name === 'index') {
    let route2: TypedRouteFromName<'index'> = {} as any;
    // @ts-expect-error
    assertType(required(route.params.id));
    // @ts-expect-error
    assertType(required(route2.params.id));
  }

  // ---- [id].vue

  if (route.name === 'user-id') {
    let route2: TypedRouteFromName<'user-id'> = {} as any;
    // @ts-expect-error
    assertType(required(route.params.foo));
    // @ts-expect-error
    assertType(required(route2.params.foo));

    assertType(required(route.params.id));
    assertType(required(route2.params.id));
  }

  // ---- [foo]-[[bar]].vue

  if (route.name === 'user-foo-bar') {
    let route2: TypedRouteFromName<'user-foo-bar'> = {} as any;
    // @ts-expect-error
    assertType(required(route.params.id));
    // @ts-expect-error
    assertType(required(route2.params.id));

    assertType(optional(route.params.bar));
    assertType(optional(route2.params.bar));

    assertType(required(route.params.foo));
    assertType(required(route2.params.foo));
  }

  // ---- [...slug].vue

  if (route.name === 'user-slug') {
    let route2: TypedRouteFromName<'user-slug'> = {} as any;
    // @ts-expect-error
    assertType(required(route.params.id));
    // @ts-expect-error
    assertType(required(route2.params.id));

    // @ts-expect-error
    assertType(required(route.params.slug));
    // @ts-expect-error
    assertType(required(route2.params.slug));

    assertType(array(route.params.slug));
    assertType(array(route2.params.slug));
  }

  // ---- [one]-foo-[two].vue

  if (route.name === 'user-one-foo-two') {
    let route2: TypedRouteFromName<'user-one-foo-two'> = {} as any;
    // @ts-expect-error
    assertType(required(route.params.id));
    // @ts-expect-error
    assertType(required(route2.params.id));

    assertType(required(route.params.one));
    assertType(required(route2.params.one));

    assertType(required(route.params.two));
    assertType(required(route2.params.two));
  }
  // ---- [id]/[slug].vue

  if (route.name === 'user-id-slug') {
    let route2: TypedRouteFromName<'user-id-slug'> = {} as any;
    // @ts-expect-error
    assertType(required(route.params.foo));
    // @ts-expect-error
    assertType(required(route2.params.foo));

    assertType(required(route.params.id));
    assertType(required(route2.params.id));

    assertType(required(route.params.slug));
    assertType(required(route2.params.slug));
  }
});
