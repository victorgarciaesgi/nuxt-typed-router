import { useNuxtApp } from '#app';
import { assertType } from 'vitest';
import type { TypedRouter } from '@typed-router';

// Given
const { $typedRouter } = useNuxtApp();

assertType<TypedRouter>($typedRouter);

// -  Usage of localePath with useRouter

// ! ------ Should Error ❌

// *  index.vue
// @ts-expect-error
$typedRouter.push({ name: 'index', params: { id: 1 } });
// @ts-expect-error
$typedRouter.push({ name: 'index', params: { id: 1 } });
// @ts-expect-error
$typedRouter.push({ name: 'blabla-baguette' });

// * --- [id].vue
// @ts-expect-error
$typedRouter.push({ name: 'user-id' });
// @ts-expect-error
$typedRouter.push({ name: 'user-id', params: { foo: 'bar' } });

// * --- [foo]-[[bar]].vue
// @ts-expect-error
$typedRouter.push({ name: 'user-foo-bar' });
// @ts-expect-error
$typedRouter.push({ name: 'user-foo-bar', params: { bar: 1 } });

// * --- [...slug].vue
// @ts-expect-error
$typedRouter.push({ name: 'user-slug' });
// @ts-expect-error
$typedRouter.push({ name: 'user-slug', params: { slug: 1 } });

// * --- [one]-foo-[two].vue
// @ts-expect-error
$typedRouter.push({ name: 'user-one-foo-two' });
// @ts-expect-error
$typedRouter.push({ name: 'user-one-foo-two', params: { one: 1 } });

// * --- [id]/[slug].vue
// @ts-expect-error
$typedRouter.push({ name: 'user-id-slug' });
// @ts-expect-error
$typedRouter.push({ name: 'user-id-slug', params: { id: 1 } });

// * --- Routes added by modules
// @ts-expect-error
$typedRouter.push({ name: 'test-module' });

// * --- Path navigation
// @ts-expect-error
$typedRouter.push('/admin/:id/foo');

// $ ----- Should be valid ✅

$typedRouter.push({ name: 'index' });
$typedRouter.push({ name: 'user-id', params: { id: 1 }, hash: 'baz' });
$typedRouter.push({ name: 'user-foo-bar', params: { foo: 'bar' }, force: true });
$typedRouter.push({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } });
$typedRouter.push({ name: 'user-catch-slug', params: { slug: ['foo'] } });
$typedRouter.push({ name: 'user-catch-slug', params: { slug: [1, 2, 3] } });
$typedRouter.push({ name: 'user-one-foo-two', params: { one: 1, two: '2' } });
$typedRouter.push({ name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } });
$typedRouter.push({ name: 'test-module', params: { foo: 1 }, query: { foo: 'bar' } });

$typedRouter.replace({ name: 'index' });
$typedRouter.replace({ name: 'user-id', params: { id: 1 }, hash: 'baz' });

// * Resolved routes

const resolved1 = $typedRouter.resolve({ name: 'index' });
assertType<'index'>(resolved1.name);
// @ts-expect-error
assertType<'index'>(resolved1.params);

const resolved2 = $typedRouter.resolve({ name: 'user-id', params: { id: 1 }, hash: 'baz' });
assertType<'user-id'>(resolved2.name);
assertType<{ id: string }>(resolved2.params);
