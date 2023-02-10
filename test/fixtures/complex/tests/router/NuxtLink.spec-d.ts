import { assertType, vi } from 'vitest';
import { GlobalComponents } from 'vue';

const NuxtLink: GlobalComponents['NuxtLink'] = vi.fn() as any;

// ! ------ Should Error ❌

// *  index.vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'index', params: { id: 1 } } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'index', params: { id: 1 } } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'blabla-baguette' } }));

// * --- [id].vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-id' } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-id', params: { foo: 'bar' } } }));

// * --- [foo]-[[bar]].vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-foo-bar' } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-foo-bar', params: { bar: 1 } } }));

// * --- [...slug].vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-slug' } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-slug', params: { slug: 1 } } }));

// * --- [one]-foo-[two].vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-one-foo-two' } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-one-foo-two', params: { one: 1 } } }));

// * --- [id]/[slug].vue
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-id-slug' } }));
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'user-id-slug', params: { id: 1 } } }));

// * --- Routes added by config extend
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'test-extend' } }));

// * --- Routes added by modules
// @ts-expect-error
assertType(new NuxtLink({ to: { name: 'test-module' } }));

// * --- Path navigation
// @ts-expect-error
assertType(new NuxtLink({ to: '/goooo' }));
// @ts-expect-error
assertType(new NuxtLink({ to: { path: '/fooooo' } }));

// $ ----- Should be valid ✅

assertType(new NuxtLink({ to: { name: 'index' } }));
assertType(new NuxtLink({ to: { name: 'user-id', params: { id: 1 }, hash: 'baz' } }));
assertType(new NuxtLink({ to: { name: 'user-foo-bar', params: { foo: 'bar' }, force: true } }));
assertType(
  new NuxtLink({
    to: { name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } },
  })
);
assertType(new NuxtLink({ to: { name: 'user-slug', params: { slug: ['foo'] } } }));
assertType(new NuxtLink({ to: { name: 'user-slug', params: { slug: [1, 2, 3] } } }));
assertType(new NuxtLink({ to: { name: 'user-one-foo-two', params: { one: 1, two: '2' } } }));
assertType(
  new NuxtLink({
    to: { name: 'user-id-slug', params: { slug: '2' }, query: { foo: 'bar' } },
  })
);
assertType(
  new NuxtLink({
    to: { name: 'test-extend', params: { id: 1 }, query: { foo: 'bar' } },
  })
);
assertType(
  new NuxtLink({
    to: { name: 'test-module', params: { foo: 1 }, query: { foo: 'bar' } },
  })
);
