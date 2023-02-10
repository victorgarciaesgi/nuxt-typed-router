import { assertType, test } from 'vitest';
import type { RouteLocationMatched } from 'vue-router';
import { TypedRouteFromName, useLocaleRoute } from '@typed-router';

// @ts-expect-error Ensure global imports are disabled
declare const globalDecl: (typeof globalThis)['useLocaleRoute'];

const localeRoute = useLocaleRoute();

// ! ------ Should Error ❌

// @ts-expect-error
assertType(localeRoute({ name: 'index' }, 'DE'));
// *  index.vue
// @ts-expect-error
assertType(localeRoute({ name: 'index', params: { id: 1 } }, 'es'));
// @ts-expect-error
assertType(localeRoute({ name: 'index', params: { id: 1 } }));
// @ts-expect-error
assertType(localeRoute({ name: 'blabla-baguette' }));

// * --- [id].vue
// @ts-expect-error
assertType(localeRoute({ name: 'user-id' }));
// @ts-expect-error
assertType(localeRoute({ name: 'user-id', params: { foo: 'bar' } }));

// * --- [foo]-[[bar]].vue
// @ts-expect-error
assertType(localeRoute({ name: 'user-foo-bar' }));
// @ts-expect-error
assertType(localeRoute({ name: 'user-foo-bar', params: { bar: 1 } }));

// * --- [...slug].vue
// @ts-expect-error
assertType(localeRoute({ name: 'user-slug' }));
// @ts-expect-error
assertType(localeRoute({ name: 'user-slug', params: { slug: 1 } }));

// * --- [one]-foo-[two].vue
// @ts-expect-error
assertType(localeRoute({ name: 'user-one-foo-two' }));
// @ts-expect-error
assertType(localeRoute({ name: 'user-one-foo-two', params: { one: 1 } }));

// * --- [id]/[slug].vue
// @ts-expect-error
assertType(localeRoute({ name: 'user-id-slug' }));
// @ts-expect-error
assertType(localeRoute({ name: 'user-id-slug', params: { id: 1 } }));

// * --- Routes added by config extend
// @ts-expect-error
assertType(localeRoute({ name: 'test-extend' }));

// * --- Routes added by modules
// @ts-expect-error
assertType(localeRoute({ name: 'test-module' }));

// * --- Path navigation
// @ts-expect-error
assertType(localeRoute('/fooooo'));
// @ts-expect-error
assertType(localeRoute({ path: '/foooo' }));

// *  Basic types

test('Basic', () => {
  const resolved = localeRoute({ name: 'user-foo-bar', params: { foo: 1 } }, 'fr');

  assertType<TypedRouteFromName<'user-foo-bar'>>(resolved);
  assertType<'user-foo-bar'>(resolved.name);
  assertType<{
    foo: string;
    bar?: string | undefined;
  }>(resolved.params);
  assertType<string>(resolved.fullPath);
  assertType<string>(resolved.hash);
  assertType<string>(resolved.path);
  assertType<RouteLocationMatched[]>(resolved.matched);
});

// *  index.vue

test('index', () => {
  const resolved = localeRoute({ name: 'index' }, 'fr');

  assertType<TypedRouteFromName<'index'>>(resolved);
  assertType<'index'>(resolved.name);
  // @ts-expect-error
  assertType(resolved.params);
});

// * --- [id].vue

test('[id]', () => {
  const resolved = localeRoute({ name: 'user-id', params: { id: 1 } }, 'fr');

  assertType<TypedRouteFromName<'user-id'>>(resolved);
  assertType<'user-id'>(resolved.name);
  assertType<{ id: string }>(resolved.params);
});

// * --- [foo]-[[bar]].vue
test('[foo]-[[bar]]', () => {
  const resolved = localeRoute({ name: 'user-foo-bar', params: { foo: 1, bar: 1 } }, 'fr');

  assertType<TypedRouteFromName<'user-foo-bar'>>(resolved);
  assertType<'user-foo-bar'>(resolved.name);
  assertType<{
    foo: string;
    bar?: string | undefined;
  }>(resolved.params);
});

// * --- [...slug].vue
test('[...slug]', () => {
  const resolved = localeRoute({ name: 'user-slug', params: { slug: [1, 2] } }, 'fr');

  assertType<TypedRouteFromName<'user-slug'>>(resolved);
  assertType<'user-slug'>(resolved.name);
  assertType<{
    slug: string[];
  }>(resolved.params);
});

// * --- [one]-foo-[two].vue
test('[one]-foo-[two]', () => {
  const resolved = localeRoute({ name: 'user-one-foo-two', params: { one: 1, two: 2 } }, 'fr');

  assertType<TypedRouteFromName<'user-one-foo-two'>>(resolved);
  assertType<'user-one-foo-two'>(resolved.name);
  assertType<{
    one: string;
    two: string;
  }>(resolved.params);
});

// * --- [id]/[slug].vue

test('[id]/[slug]', () => {
  const resolved = localeRoute({ name: 'user-id-slug', params: { slug: 1, id: '1' } }, 'fr');

  assertType<TypedRouteFromName<'user-id-slug'>>(resolved);
  assertType<'user-id-slug'>(resolved.name);
  assertType<{
    id: string;
    slug: string;
  }>(resolved.params);
});

// * --- Routes added by config extend
test('Routes added by config extend', () => {
  const resolved = localeRoute({ name: 'test-extend', params: { id: 1 } }, 'fr');

  assertType<TypedRouteFromName<'test-extend'>>(resolved);
  assertType<'test-extend'>(resolved.name);
  assertType<{
    id: string;
  }>(resolved.params);
});

// * --- Routes added by modules

test('Routes added by modules', () => {
  const resolved = localeRoute({ name: 'test-module', params: { foo: 1 } }, 'fr');

  assertType<TypedRouteFromName<'test-module'>>(resolved);
  assertType<'test-module'>(resolved.name);
  assertType<{
    foo: string;
  }>(resolved.params);
});
