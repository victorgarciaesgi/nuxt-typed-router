/// <reference path='../../fixtures/simple/tests/routerTypes.spec-d.ts'/>

import { assertType, expectTypeOf } from 'vitest';
import type { TypedRoute } from '../../fixtures/simple/.nuxt/typed-router';
import { array, optional, required } from '../../utils/typecheck';

declare const route: TypedRoute;

test('router types should be correct', () => {
  expectTypeOf(route).toMatchTypeOf<TypedRoute>();

  // @ts-expect-error
  const check = route.name === 'baguette';

  if (route.name === 'index') {
    // @ts-expect-error
    assertType(required(route.params.id));
  }

  // ---- [id].vue

  if (route.name === 'user-id') {
    // @ts-expect-error
    assertType(required(route.params.foo));

    assertType(required(route.params.id));
  }

  // ---- [foo]-[[bar]].vue

  if (route.name === 'user-foo-bar') {
    // @ts-expect-error
    assertType(required(route.params.id));

    assertType(optional(route.params.bar));

    assertType(required(route.params.foo));
  }

  // ---- [...slug].vue

  if (route.name === 'user-slug') {
    // @ts-expect-error
    assertType(required(route.params.id));

    // @ts-expect-error
    assertType(required(route.params.slug));

    assertType(array(route.params.slug));
  }

  // ---- [one]-foo-[two].vue

  if (route.name === 'user-one-foo-two') {
    // @ts-expect-error
    assertType(required(route.params.id));

    assertType(required(route.params.one));

    assertType(required(route.params.two));
  }
  // ---- [id]/[slug].vue

  if (route.name === 'user-id-slug') {
    // @ts-expect-error
    assertType(required(route.params.foo));

    assertType(required(route.params.id));

    assertType(required(route.params.slug));
  }
});
