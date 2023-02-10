import { assertType } from 'vitest';
import { TypedRouter, useRouter } from '@typed-router';

// @ts-expect-error Ensure global imports are disabled
declare const globalDecl: (typeof globalThis)['useRouter'];

// Given
const router = useRouter();

assertType<TypedRouter>(router);

// -  Usage of useRouter with useRouter

// ! ------ Should Error ❌

// *  index.vue
// @ts-expect-error
router.push({ name: 'index', params: { id: 1 } });
// @ts-expect-error
router.push({ name: 'index', params: { id: 1 } });
// @ts-expect-error
router.push({ name: 'blabla-baguette' });

// * --- [id].vue
// @ts-expect-error
router.push({ name: 'user-id' });
// @ts-expect-error
router.push({ name: 'user-id', params: { foo: 'bar' } });

// * --- [foo]-[[bar]].vue
// @ts-expect-error
router.push({ name: 'user-foo-bar' });
// @ts-expect-error
router.push({ name: 'user-foo-bar', params: { bar: 1 } });

// * --- [...slug].vue
// @ts-expect-error
router.push({ name: 'user-slug' });
// @ts-expect-error
router.push({ name: 'user-slug', params: { slug: 1 } });

// * --- [one]-foo-[two].vue
// @ts-expect-error
router.push({ name: 'user-one-foo-two' });
// @ts-expect-error
router.push({ name: 'user-one-foo-two', params: { one: 1 } });

// * --- [id]/[slug].vue
// @ts-expect-error
router.push({ name: 'user-id-slug' });
// @ts-expect-error
router.push({ name: 'user-id-slug', params: { id: 1 } });

// * --- Routes added by config extend
// @ts-expect-error
router.push({ name: 'test-extend' });

// * --- Routes added by modules
// @ts-expect-error
router.push({ name: 'test-module' });

// * --- Path navigation
// @ts-expect-error
router.push('/fooooooooooo');
// @ts-expect-error
router.push({ path: '/foo' });

// $ ----- Should be valid ✅

router.push({ name: 'index' });
router.push({ name: 'user-id', params: { id: 1 }, hash: 'baz' });
router.push({ name: 'user-foo-bar', params: { foo: 'bar' }, force: true });
router.push({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } });
router.push({ name: 'user-catch-slug', params: { slug: ['foo'] } });
router.push({ name: 'user-catch-slug', params: { slug: [1, 2, 3] } });
router.push({ name: 'user-one-foo-two', params: { one: 1, two: '2' } });
router.push({ name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } });

router.replace({ name: 'index' });
router.replace({ name: 'user-id', params: { id: 1 }, hash: 'baz' });

// * Resolved routes

const resolved1 = router.resolve({ name: 'index' });
assertType<'index'>(resolved1.name);
// @ts-expect-error
assertType<'index'>(resolved1.params);

const resolved2 = router.resolve({ name: 'user-id', params: { id: 1 }, hash: 'baz' });
assertType<'user-id'>(resolved2.name);
assertType<{ id: string }>(resolved2.params);
