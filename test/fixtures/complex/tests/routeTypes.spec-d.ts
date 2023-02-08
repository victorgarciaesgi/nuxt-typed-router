import { array, optional, required } from '../../../utils';
import { useRoute } from '@typed-router';

export const route = useRoute();

// @ts-expect-error
const params: Record<string, any> = route.params; // Params are unknown

if (route.name === 'index') {
  const route2 = useRoute('index');
  // @ts-expect-error
  required(route.params.id);
  // @ts-expect-error
  required(route2.params.id);
}

// ---- [id].vue

if (route.name === 'user-id') {
  const route2 = useRoute('user-id');
  // @ts-expect-error
  required(route.params.foo);
  // @ts-expect-error
  required(route2.params.foo);

  required(route.params.id);
  required(route2.params.id);
}

// ---- [foo]-[[bar]].vue

if (route.name === 'user-foo-bar') {
  const route2 = useRoute('user-foo-bar');
  // @ts-expect-error
  required(route.params.id);
  // @ts-expect-error
  required(route2.params.id);

  optional(route.params.bar);
  optional(route2.params.bar);

  required(route.params.foo);
  required(route2.params.foo);
}

// ---- [...slug].vue

if (route.name === 'user-slug') {
  const route2 = useRoute('user-slug');
  // @ts-expect-error
  required(route.params.id);
  // @ts-expect-error
  required(route2.params.id);

  // @ts-expect-error
  required(route.params.slug);
  // @ts-expect-error
  required(route2.params.slug);

  array(route.params.slug);
  array(route2.params.slug);
}

// ---- [one]-foo-[two].vue

if (route.name === 'user-one-foo-two') {
  const route2 = useRoute('user-one-foo-two');
  // @ts-expect-error
  required(route.params.id);
  // @ts-expect-error
  required(route2.params.id);

  required(route.params.one);
  required(route2.params.one);

  required(route.params.two);
  required(route2.params.two);
}
// ---- [id]/[slug].vue

if (route.name === 'user-id-slug') {
  const route2 = useRoute('user-id-slug');
  // @ts-expect-error
  required(route.params.foo);
  // @ts-expect-error
  required(route2.params.foo);

  required(route.params.id);
  required(route2.params.id);

  required(route.params.slug);
  required(route2.params.slug);
}
