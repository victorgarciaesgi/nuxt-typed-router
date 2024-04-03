import { assertType } from 'vitest';
import { definePageMeta } from '@typed-router';

// Given

// -  Usage of useRouter with useRouter

// ! ------ Should Error ❌

// *  index.vue
definePageMeta({ redirect: { name: 'index' } });
// @ts-expect-error
definePageMeta({ redirect: { name: 'index', params: { id: 1 } } });
// @ts-expect-error
definePageMeta({ redirect: { name: 'blabla-baguette' } });

// * --- [id].vue
// @ts-expect-error
definePageMeta({ redirect: { name: 'user-id' } });
// @ts-expect-error
definePageMeta({ redirect: { name: 'user-id', params: { foo: 'bar' } } });

// * --- [foo]-[[bar]].vue
// @ts-expect-error
definePageMeta({ redirect: { name: 'user-foo-bar' } });
// @ts-expect-error
definePageMeta({ redirect: { name: 'user-foo-bar', params: { bar: 1 } } });

// * --- [...slug].vue
// @ts-expect-error
definePageMeta({ redirect: { name: 'user-slug' } });
// @ts-expect-error
definePageMeta({ redirect: { name: 'user-slug', params: { slug: 1 } } });

// * --- [one]-foo-[two].vue
// @ts-expect-error
definePageMeta({ redirect: { name: 'user-one-foo-two' } });
// @ts-expect-error
definePageMeta({ redirect: { name: 'user-one-foo-two', params: { one: 1 } } });

// * --- [id]/[slug].vue
// @ts-expect-error
definePageMeta({ redirect: { name: 'user-id-slug' } });
// @ts-expect-error
definePageMeta({ redirect: { name: 'user-id-slug', params: { id: 1 } } });

// * --- Routes added by modules
// @ts-expect-error
definePageMeta({ redirect: { name: 'test-module' } });

// * --- Path navigation
// @ts-expect-error
definePageMeta({ redirect: '/fooooooooooo' });

// @ts-expect-error
definePageMeta({ redirect: { path: '/foo' } });

// $ ----- Should be valid ✅

definePageMeta({ redirect: { name: 'index' } });
definePageMeta({ redirect: { name: 'user-id', params: { id: 1 }, hash: 'baz' } });
definePageMeta({ redirect: { name: 'user-foo-bar', params: { foo: 'bar' }, force: true } });
definePageMeta({ redirect: { name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } } });
definePageMeta({ redirect: { name: 'user-catch-slug', params: { slug: ['foo'] } } });
definePageMeta({ redirect: { name: 'user-catch-slug', params: { slug: [1, 2, 3] } } });
definePageMeta({ redirect: { name: 'user-one-foo-two', params: { one: 1, two: '2' } } });
definePageMeta({
  redirect: { name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } },
});

// --- Path navigation

// ! ------ Should Error ❌

// @ts-expect-error
assertType(definePageMeta({ redirect: '' }));
// @ts-expect-error
assertType(definePageMeta({ redirect: '/admin ' }));
// @ts-expect-error
assertType(definePageMeta({ redirect: '/admin/ /' }));
// @ts-expect-error
assertType(definePageMeta({ redirect: `/ / // / / eefzr` }));
// @ts-expect-error
assertType(definePageMeta({ redirect: '/elzhlzehflzhef' }));
// @ts-expect-error
assertType(definePageMeta({ redirect: '/admin/foo/bar' }));
// @ts-expect-error
assertType(definePageMeta({ redirect: '/admin/foo/bar/baz' }));
// @ts-expect-error
assertType(definePageMeta({ redirect: `/admin/${id}/action-bar/taz?query` }));
// @ts-expect-error
assertType(definePageMeta({ redirect: '/admin/panel/3O9393/bar' }));
// @ts-expect-error
assertType(definePageMeta({ redirect: '/admin/foo/ profile/ezfje' }));
// @ts-expect-error
assertType(definePageMeta({ redirect: '/admin/3U93U/settings/baz' }));
// @ts-expect-error
assertType(definePageMeta({ redirect: '/admin/panel/?fjzk' }));

// $ ----- Should be valid ✅

const id = '38789803';
assertType(definePageMeta({ redirect: '/' }));
assertType(definePageMeta({ redirect: '/baguette' }));
assertType(definePageMeta({ redirect: '/admin/foo' }));
assertType(definePageMeta({ redirect: '/admin/foo/' }));
assertType(definePageMeta({ redirect: `/admin/${id}/action-bar#hash` }));
assertType(definePageMeta({ redirect: `/admin/${id}/action-bar?query=bar` }));
assertType(definePageMeta({ redirect: '/admin/foo/profile/' }));
assertType(definePageMeta({ redirect: `/admin/${id}/settings` }));
assertType(definePageMeta({ redirect: '/admin/panel/' }));
assertType(definePageMeta({ redirect: '/admin/panel/938783/' }));
assertType(definePageMeta({ redirect: '/user/38873-' }));
assertType(definePageMeta({ redirect: '/user/38673/bar/#hash' }));
assertType(definePageMeta({ redirect: '/user/ç9737/foo/articles?baz=foo' }));
assertType(definePageMeta({ redirect: '/user/catch/1/2' }));
assertType(definePageMeta({ redirect: '/user/test-' }));
assertType(definePageMeta({ redirect: '/user' }));
