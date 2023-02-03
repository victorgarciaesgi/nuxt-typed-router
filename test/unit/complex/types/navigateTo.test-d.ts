/// <reference path='../../../fixtures/complex/src/tests/routerTypes.spec-d.ts'/>

import { assertType } from 'vitest';
import { LocationQuery } from 'vue-router';
import { navigateTo } from '../../../fixtures/complex/.nuxt/typed-router';

test('navigateTo types should be correct', async () => {
  const route = await navigateTo({ name: 'user-one-foo-two', params: { one: 1, two: 2 } });
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

  assertType(navigateTo({ name: 'index', query: { id: 1 } }));
  // @ts-expect-error
  assertType(navigateTo({ name: 'index', params: { id: 1 } })); // Error

  // @ts-expect-error
  assertType(navigateTo({ name: 'blabla-baguette' })); // Error

  // ---- [id].vue

  // @ts-expect-error
  assertType(navigateTo({ name: 'user-id' })); // Error

  // @ts-expect-error
  assertType(navigateTo({ name: 'user-id', params: { foo: 'bar' } })); // Error

  // ---- [foo]-[[bar]].vue

  // @ts-expect-error
  assertType(navigateTo({ name: 'user-foo-bar' })); // Error
  // @ts-expect-error
  assertType(navigateTo({ name: 'user-foo-bar', params: { bar: 1 } })); // Error

  // ---- [...slug].vue

  // @ts-expect-error
  assertType(navigateTo({ name: 'user-slug' })); // Error
  // @ts-expect-error
  assertType(navigateTo({ name: 'user-slug', params: { slug: 1 } })); // Error

  // ---- [one]-foo-[two].vue

  // @ts-expect-error
  assertType(navigateTo({ name: 'user-one-foo-two' })); // Error
  // @ts-expect-error
  assertType(navigateTo({ name: 'user-one-foo-two', params: { one: 1 } })); // Error

  // ---- [id]/[slug].vue

  // @ts-expect-error
  assertType(navigateTo({ name: 'user-id-slug' })); // Error
  // @ts-expect-error
  assertType(navigateTo({ name: 'user-id-slug', params: { id: 1 } })); // Error

  // ---- Routes added by config extend

  // @ts-expect-error
  assertType(navigateTo({ name: 'test-extend' })); // Error

  // ---- Routes added by modules

  // @ts-expect-error
  assertType(navigateTo({ name: 'test-module' })); // Error
});
