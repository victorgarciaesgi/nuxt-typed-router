import { useNuxtApp } from '#app';
import { useRouter } from '@typed-router';

export const router = useRouter();
const { $typedRouter } = useNuxtApp();

// // @ts-expect-error
// $typedRouter.resolve({ name: 'index', params: { id: 1 } });

// @ts-expect-error
router.resolve({ name: 'index', params: { id: '1' } }); // Error

// @ts-expect-error
router.resolve({ name: 'blabla-baguette' }); // Error

// ---- [id].vue

// @ts-expect-error
router.resolve({ name: 'user-id' }); // Error

// @ts-expect-error
router.resolve({ name: 'user-id', params: { foo: 'bar' } }); // Error

router.resolve({ name: 'user-id', params: { id: 1 } }); // Good

// ---- [foo]-[[bar]].vue

// @ts-expect-error
router.resolve({ name: 'user-foo-bar' }); // Error
// @ts-expect-error
router.resolve({ name: 'user-foo-bar', params: { bar: 1 } }); // Error

router.resolve({ name: 'user-foo-bar', params: { foo: 'bar' } }); // Good

router.resolve({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } }); // Good

// ---- [...slug].vue

// @ts-expect-error
router.resolve({ name: 'user-slug' }); // Error
// @ts-expect-error
router.resolve({ name: 'user-slug', params: { slug: 1 } }); // Error

router.resolve({ name: 'user-slug', params: { slug: ['foo'] } }); // Good

router.resolve({ name: 'user-slug', params: { slug: [1, 2, 3] } }); // Good

// ---- [one]-foo-[two].vue

// @ts-expect-error
router.resolve({ name: 'user-one-foo-two' }); // Error
// @ts-expect-error
router.resolve({ name: 'user-one-foo-two', params: { one: 1 } }); // Error

router.resolve({ name: 'user-one-foo-two', params: { one: 1, two: '2' } }); // Good

// ---- [id]/[slug].vue

// @ts-expect-error
router.resolve({ name: 'user-id-slug' }); // Error
// @ts-expect-error
router.resolve({ name: 'user-id-slug', params: { id: 1 } }); // Error

router.resolve({ name: 'user-id-slug', params: { slug: '2' } }); // Good
