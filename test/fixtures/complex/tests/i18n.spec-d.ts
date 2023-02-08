import { useRouter, navigateTo, useLocalePath, useLocaleRoute } from '@typed-router';
import { expectTypeOf } from 'vitest';
import type { LocationQuery } from 'vue-router';
import { required, optional } from '../../../utils/typecheck';
import type { TypedNuxtLinkProps } from '../.nuxt/typed-router/typed-router';

const localePath = useLocalePath();
const router = useRouter();

router.push(localePath({ name: 'user-id', params: { id: 1 } }, 'fr'));
let toProp: TypedNuxtLinkProps<string> = {} as TypedNuxtLinkProps<string>;
toProp.to = localePath({ name: 'user-id', params: { id: 1 } }, 'fr');
toProp.to = localePath({ name: 'index' }, 'fr');

const route = await navigateTo(
  localePath({ name: 'user-one-foo-two', params: { one: 1, two: 2 } }, 'en')
);

if (route instanceof Error) {
  //
} else if (route) {
  expectTypeOf(route.name).toMatchTypeOf<'user-one-foo-two'>();
  expectTypeOf(route.params).toMatchTypeOf<{
    one: string | number;
    two: string | number;
  }>();
  expectTypeOf(route.query).toMatchTypeOf<LocationQuery>();
}

navigateTo(localePath({ name: 'user-id', params: { id: 1 } })); // Good

navigateTo(localePath({ name: 'user-foo-bar', params: { foo: 'bar' } })); // Good

navigateTo(localePath({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } })); // Good

navigateTo(localePath({ name: 'user-slug', params: { slug: ['foo'] } })); // Good

navigateTo(localePath({ name: 'user-slug', params: { slug: [1, 2, 3] } })); // Good

navigateTo(localePath({ name: 'user-one-foo-two', params: { one: 1, two: '2' } })); // Good

navigateTo(localePath({ name: 'user-id-slug', params: { slug: '2' } })); // Good


// @ts-expect-error
navigateTo(localePath({ name: 'index', params: { id: 1 } }, 'es')));

// @ts-expect-error
navigateTo(localePath({ name: 'index', params: { id: 1 } }));

// @ts-expect-error
navigateTo(localePath({ name: 'blabla-baguette' }));

// ---- [id].vue

// @ts-expect-error
navigateTo(localePath({ name: 'user-id' }));

// @ts-expect-error
navigateTo(localePath({ name: 'user-id', params: { foo: 'bar' } }));

// ---- [foo]-[[bar]].vue

// @ts-expect-error
navigateTo(localePath({ name: 'user-foo-bar' }));
// @ts-expect-error
navigateTo(localePath({ name: 'user-foo-bar', params: { bar: 1 } }));

// ---- [...slug].vue

// @ts-expect-error
navigateTo(localePath({ name: 'user-slug' }));
// @ts-expect-error
navigateTo(localePath({ name: 'user-slug', params: { slug: 1 } }));

// ---- [one]-foo-[two].vue

// @ts-expect-error
navigateTo(localePath({ name: 'user-one-foo-two' }));
// @ts-expect-error
navigateTo(localePath({ name: 'user-one-foo-two', params: { one: 1 } }));

// ---- [id]/[slug].vue

// @ts-expect-error
navigateTo(localePath({ name: 'user-id-slug' }));
// @ts-expect-error
navigateTo(localePath({ name: 'user-id-slug', params: { id: 1 } }));

// ---- Routes added by config extend

// @ts-expect-error
navigateTo(localePath({ name: 'test-extend' }));

// ---- Routes added by modules

// @ts-expect-error
navigateTo(localePath({ name: 'test-module' }));

const localeRoute = useLocaleRoute();


const resolved = localeRoute({ name: 'user-foo-bar', params: { foo: 1 } });
