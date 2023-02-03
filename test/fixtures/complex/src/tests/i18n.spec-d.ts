import { useLocalePath, useRouter, navigateTo, useLocaleRoute } from '@typed-router';
import { required, optional } from '../../../../utils/typecheck';
import type { TypedNuxtLinkProps } from '../../.nuxt/typed-router/typed-router';

const localePath = useLocalePath();
const router = useRouter();
const localeRoute = useLocaleRoute();

router.push(localePath({ name: 'user-id', params: { id: 1 } }, 'fr'));
let toProp: TypedNuxtLinkProps = {} as TypedNuxtLinkProps;
toProp.to = localePath({ name: 'user-id', params: { id: 1 } }, 'fr');
toProp.to = localePath({ name: 'index' }, 'fr');

navigateTo(localePath({ name: 'user-id', params: { id: 1 } })); // Good

navigateTo(localePath({ name: 'user-foo-bar', params: { foo: 'bar' } })); // Good

navigateTo(localePath({ name: 'user-foo-bar', params: { foo: 'bar', bar: 'baz' } })); // Good

navigateTo(localePath({ name: 'user-slug', params: { slug: ['foo'] } })); // Good

navigateTo(localePath({ name: 'user-slug', params: { slug: [1, 2, 3] } })); // Good

navigateTo(localePath({ name: 'user-one-foo-two', params: { one: 1, two: '2' } })); // Good

navigateTo(localePath({ name: 'user-id-slug', params: { slug: '2' } })); // Good

const resolved = localeRoute({ name: 'user-foo-bar___en', params: { foo: 1 } });

console.log(resolved.query.foo);

required(resolved.params.foo);
optional(resolved.params.bar);
