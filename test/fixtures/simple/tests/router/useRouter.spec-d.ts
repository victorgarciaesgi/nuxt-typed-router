import { assertType, test } from 'vitest';
import type { TypedRouter } from '@typed-router';

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
router.replace('/admin');

// --- Path navigation

// ! ------ Should Error ❌

// @ts-expect-error
assertType(router.push(''));
// @ts-expect-error
assertType(router.push('/admin '));
// @ts-expect-error
assertType(router.push('/admin/ /'));
// @ts-expect-error
assertType(router.push(`/ / // / / eefzr`));
// @ts-expect-error
assertType(router.push('/elzhlzehflzhef'));
// @ts-expect-error
assertType(router.push('/admin/foo/bar'));
// @ts-expect-error
assertType(router.push('/admin/foo/bar/baz'));
// @ts-expect-error
assertType(router.push(`/admin/${id}/action-bar/taz?query`));
// @ts-expect-error
assertType(router.push('/admin/panel/3O9393/bar'));
// @ts-expect-error
assertType(router.push('/admin/foo/ profile/ezfje'));
// @ts-expect-error
assertType(router.push('/admin/3U93U/settings/baz'));
// @ts-expect-error
assertType(router.push('/admin/panel/?fjzk'));

// $ ----- Should be valid ✅

const id = '38789803';
assertType(router.push('/'));
assertType(router.push('/baguette'));
assertType(router.push('/admin/foo'));
assertType(router.push('/admin/foo/'));
assertType(router.push(`/admin/${id}/action-bar#hash`));
assertType(router.push(`/admin/${id}/action-bar?query=bar`));
assertType(router.push('/admin/foo/profile/'));
assertType(router.push(`/admin/${id}/settings`));
assertType(router.push('/admin/panel/'));
assertType(router.push('/admin/panel/938783/'));
assertType(router.push('/user/38873-'));
assertType(router.push('/user/38673/bar/#hash'));
assertType(router.push('/user/ç9737/foo/articles?baz=foo'));
assertType(router.push('/user/catch/1/2'));
assertType(router.push('/user/test-'));
assertType(router.push('/user'));

// * Resolved routes

test('', () => {
  const resolved = router.resolve({ name: 'index' });
  assertType<'index'>(resolved.name);
  // @ts-expect-error
  assertType<'index'>(resolved.params);
});

test('', () => {
  const resolved = router.resolve({ name: 'user-id', params: { id: 1 }, hash: 'baz' });
  assertType<'user-id'>(resolved.name);
  assertType<{ id: string }>(resolved.params);

  // @ts-expect-error
  assertType<'user-eojzpejfze'>(resolved.name);
});

test('', () => {
  const resolved = router.resolve('/admin/foo/');
  assertType<'admin-id'>(resolved.name);
  assertType<{ id: string }>(resolved.params);

  // @ts-expect-error
  assertType<'jzeifjlfej'>(resolved.name);
  // @ts-expect-error
  assertType<{ foo: string }>(resolved.params);
});
