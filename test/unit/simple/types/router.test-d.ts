/// <reference path='../../../fixtures/simple/tests/routerTypes.spec-d.ts'/>

import { assertType, expectTypeOf } from 'vitest';
import type { LocationQuery } from 'vue-router';
import type { TypedRouter, TypedRoute } from '../../../fixtures/simple/.nuxt/typed-router';

declare const router: TypedRouter;

test('router types should be correct', () => {
  expectTypeOf(router).toMatchTypeOf<TypedRouter>();

  // - Resolved routes

  const resolved = router.resolve({
    name: 'user-id-slug',
    params: { slug: 'foo' },
    query: { foo: 'bar' },
  });

  expectTypeOf(router.currentRoute.value).toMatchTypeOf<TypedRoute>();

  expectTypeOf(resolved.name).toMatchTypeOf<'user-id-slug'>();
  expectTypeOf(resolved.params).toMatchTypeOf<{
    id?: string | number | undefined;
    slug: string | number;
  }>();
  expectTypeOf(resolved.query).toMatchTypeOf<LocationQuery>();

  // - Misc

  assertType(router.push({ name: 'index', query: { foo: 'bar' } }));

  // @ts-expect-error
  assertType(router.push({ name: 'index', params: { id: '1' } })); // Error
  // @ts-expect-error
  assertType(router.hasRoute('blabla')); // Error
  // @ts-expect-error
  assertType(router.removeRoute('baguette')); // Error

  // @ts-expect-error
  assertType(router.replace({ name: 'index', params: { id: '1' } })); // Error

  // ---- [id].vue

  // @ts-expect-error
  assertType(router.push({ name: 'user-id' })); // Error

  // @ts-expect-error
  assertType(router.push({ name: 'user-id', params: { foo: 'bar' } })); // Error

  assertType(router.push({ name: 'user-id', params: { id: 1 } })); // Good

  // ---- [foo]-[[bar]].vue

  // @ts-expect-error
  assertType(router.push({ name: 'user-foo-bar' })); // Error
  // @ts-expect-error
  assertType(router.push({ name: 'user-foo-bar', params: { bar: 1 } })); // Error

  assertType(router.push({ name: 'user-foo-bar', params: { foo: 'bar' } })); // Good

  assertType(router.push({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } })); // Good

  // ---- [...slug].vue

  // @ts-expect-error
  assertType(router.push({ name: 'user-slug' })); // Error
  // @ts-expect-error
  assertType(router.push({ name: 'user-slug', params: { slug: 1 } })); // Error

  assertType(router.push({ name: 'user-slug', params: { slug: ['foo'] } })); // Good

  assertType(router.push({ name: 'user-slug', params: { slug: [1, 2, 3] } })); // Good

  // ---- [one]-foo-[two].vue

  // @ts-expect-error
  assertType(router.push({ name: 'user-one-foo-two' })); // Error
  // @ts-expect-error
  assertType(router.push({ name: 'user-one-foo-two', params: { one: 1 } })); // Error

  assertType(router.push({ name: 'user-one-foo-two', params: { one: 1, two: '2' } })); // Good

  // ---- [id]/[slug].vue

  // @ts-expect-error
  assertType(router.push({ name: 'user-id-slug' })); // Error
  // @ts-expect-error
  assertType(router.push({ name: 'user-id-slug', params: { id: 1 } })); // Error

  assertType(router.push({ name: 'user-id-slug', params: { slug: '2' } })); // Good
});
