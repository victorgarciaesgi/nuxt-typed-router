/// <reference path='../../../fixtures/complex/src/tests/routerTypes.spec-d.ts'/>

import { assertType, expectTypeOf } from 'vitest';
import type { TypedRoute } from '../../../fixtures/complex/.nuxt/typed-router';
import { array, optional, required } from '../../../utils/typecheck';

declare const route: TypedRoute;

test('router types should be correct', () => {
  expectTypeOf(route).toMatchTypeOf<TypedRoute>();

  assertType(route.query.foo);

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

  // ---- Routes added by config extend

  if (route.name === 'test-extend') {
    // @ts-expect-error
    assertType(required(route.params.blabla));

    assertType(required(route.params.id));
  }

  // ---- Routes added by modules

  if (route.name === 'test-module') {
    // @ts-expect-error
    assertType(required(route.params.blabla));

    assertType(required(route.params.foo));
  }
});
