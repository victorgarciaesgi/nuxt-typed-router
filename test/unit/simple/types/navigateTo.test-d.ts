/// <reference path='../../../fixtures/simple/tests/routerTypes.spec-d.ts'/>

import { assertType } from 'vitest';
import { navigateTo } from '../../../fixtures/simple/.nuxt/typed-router';

test('router types should be correct', () => {
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

  assertType(navigateTo({ name: 'user-id', params: { id: 1 } })); // Good

  // ---- [foo]-[[bar]].vue

  // @ts-expect-error
  assertType(navigateTo({ name: 'user-foo-bar' })); // Error
  // @ts-expect-error
  assertType(navigateTo({ name: 'user-foo-bar', params: { bar: 1 } })); // Error

  assertType(navigateTo({ name: 'user-foo-bar', params: { foo: 'bar' } })); // Good

  assertType(navigateTo({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } })); // Good

  // ---- [...slug].vue

  // @ts-expect-error
  assertType(navigateTo({ name: 'user-slug' })); // Error
  // @ts-expect-error
  assertType(navigateTo({ name: 'user-slug', params: { slug: 1 } })); // Error

  assertType(navigateTo({ name: 'user-slug', params: { slug: ['foo'] } })); // Good

  assertType(navigateTo({ name: 'user-slug', params: { slug: [1, 2, 3] } })); // Good

  // ---- [one]-foo-[two].vue

  // @ts-expect-error
  assertType(navigateTo({ name: 'user-one-foo-two' })); // Error
  // @ts-expect-error
  assertType(navigateTo({ name: 'user-one-foo-two', params: { one: 1 } })); // Error

  assertType(navigateTo({ name: 'user-one-foo-two', params: { one: 1, two: '2' } })); // Good

  // ---- [id]/[slug].vue

  // @ts-expect-error
  assertType(navigateTo({ name: 'user-id-slug' })); // Error
  // @ts-expect-error
  assertType(navigateTo({ name: 'user-id-slug', params: { id: 1 } })); // Error

  assertType(navigateTo({ name: 'user-id-slug', params: { slug: '2' } })); // Good
});
