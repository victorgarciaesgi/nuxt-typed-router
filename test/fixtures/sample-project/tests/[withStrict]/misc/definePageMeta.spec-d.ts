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
definePageMeta({ redirect: '/' });
