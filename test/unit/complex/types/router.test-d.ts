/// <reference path='../../../fixtures/complex/src/tests/routerTypes.spec-d.ts'/>

import { assertType, expectTypeOf } from 'vitest';
import type { TypedRouter } from '../../../fixtures/complex/.nuxt/typed-router';

declare const router: TypedRouter;

test('router types should be correct', () => {
  expectTypeOf(router).toMatchTypeOf<TypedRouter>();

  assertType(router.resolve({ name: 'index', query: { foo: 'bar' } }));

  // @ts-expect-error
  assertType(router.resolve({ name: 'index', params: { id: '1' } })); // Error

  // @ts-expect-error
  assertType(router.resolve({ name: 'blabla-baguette' })); // Error

  // ---- [id].vue

  // @ts-expect-error
  assertType(router.resolve({ name: 'user-id' })); // Error

  // @ts-expect-error
  assertType(router.resolve({ name: 'user-id', params: { foo: 'bar' } })); // Error

  assertType(router.resolve({ name: 'user-id', params: { id: 1 } })); // Good

  // ---- [foo]-[[bar]].vue

  // @ts-expect-error
  assertType(router.resolve({ name: 'user-foo-bar' })); // Error
  // @ts-expect-error
  assertType(router.resolve({ name: 'user-foo-bar', params: { bar: 1 } })); // Error

  assertType(router.resolve({ name: 'user-foo-bar', params: { foo: 'bar' } })); // Good

  assertType(router.resolve({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } })); // Good

  // ---- [...slug].vue

  // @ts-expect-error
  assertType(router.resolve({ name: 'user-slug' })); // Error
  // @ts-expect-error
  assertType(router.resolve({ name: 'user-slug', params: { slug: 1 } })); // Error

  assertType(router.resolve({ name: 'user-slug', params: { slug: ['foo'] } })); // Good

  assertType(router.resolve({ name: 'user-slug', params: { slug: [1, 2, 3] } })); // Good

  // ---- [one]-foo-[two].vue

  // @ts-expect-error
  assertType(router.resolve({ name: 'user-one-foo-two' })); // Error
  // @ts-expect-error
  assertType(router.resolve({ name: 'user-one-foo-two', params: { one: 1 } })); // Error

  assertType(router.resolve({ name: 'user-one-foo-two', params: { one: 1, two: '2' } })); // Good

  // ---- [id]/[slug].vue

  // @ts-expect-error
  assertType(router.resolve({ name: 'user-id-slug' })); // Error
  // @ts-expect-error
  assertType(router.resolve({ name: 'user-id-slug', params: { id: 1 } })); // Error

  assertType(router.resolve({ name: 'user-id-slug', params: { slug: '2' } })); // Good

  // ---- Routes added by config extend

  // @ts-expect-error
  assertType(router.resolve({ name: 'test-extend' })); // Error

  // ---- Routes added by modules

  // @ts-expect-error
  assertType(router.resolve({ name: 'test-module' })); // Error
});
