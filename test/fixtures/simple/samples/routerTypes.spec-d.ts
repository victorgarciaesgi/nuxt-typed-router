import { useRouter } from '@typed-router';

export const router = useRouter();

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
