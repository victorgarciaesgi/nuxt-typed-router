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

  // @ts-expect-error
  assertType(router.push({ name: 'index', params: { id: '1' } }));
  // @ts-expect-error
  assertType(router.hasRoute('blabla'));
  // @ts-expect-error
  assertType(router.removeRoute('baguette'));

  // @ts-expect-error
  assertType(router.replace({ name: 'index', params: { id: '1' } }));

  // ---- [id].vue

  // @ts-expect-error
  assertType(router.push({ name: 'user-id' }));

  // @ts-expect-error
  assertType(router.push({ name: 'user-id', params: { foo: 'bar' } }));

  // ---- [foo]-[[bar]].vue

  // @ts-expect-error
  assertType(router.push({ name: 'user-foo-bar' }));
  // @ts-expect-error
  assertType(router.push({ name: 'user-foo-bar', params: { bar: 1 } }));

  // ---- [...slug].vue

  // @ts-expect-error
  assertType(router.push({ name: 'user-slug' }));
  // @ts-expect-error
  assertType(router.push({ name: 'user-slug', params: { slug: 1 } }));

  // ---- [one]-foo-[two].vue

  // @ts-expect-error
  assertType(router.push({ name: 'user-one-foo-two' }));
  // @ts-expect-error
  assertType(router.push({ name: 'user-one-foo-two', params: { one: 1 } }));

  // ---- [id]/[slug].vue

  // @ts-expect-error
  assertType(router.push({ name: 'user-id-slug' }));
  // @ts-expect-error
  assertType(router.push({ name: 'user-id-slug', params: { id: 1 } }));
});
