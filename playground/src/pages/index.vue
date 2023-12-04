<template>
  <div>
    <button @click="navigate"> Navigate button </button>
    <nuxt-link :to="{ name: 'admin-id', params: { id: 1 } }">Navigate Link</nuxt-link>
    <!-- Should error -->
    <nuxt-link to="/foo">Navigate Link</nuxt-link>

    <nuxt-link to="/admin/888?foo">Navigate Link</nuxt-link>

    <nuxt-link :to="{ name: 'admin-id', params: { id: 1 } }">Navigate Link</nuxt-link>
    <nuxt-link :to="localePath({ name: 'user' })">Navigate Link</nuxt-link>
    <nuxt-layout></nuxt-layout>

    <TestLink to="/efze" external></TestLink>
    <NuxtLinkLocale to="/" />
  </div>
</template>

<script setup lang="ts">
import type { TypedRouteLocationRawFromName, helpers, TypedRouteLocation } from '@typed-router';
import TestLink from '~/components/TestLink.vue';
// definePageMeta({
//   redirect: (route) => helpers.route({ name: 'admin-id', params: { id: 1 } }),
// });

definePageMeta({
  name: 'foo-bar',
  redirect: { name: 'admin-id', params: { id: 1 } },
});

const router = useRouter();

const localePath = useLocalePath();
const localeRoute = useLocaleRoute();

// const route = localeRoute({ name: 'index___en', query: { foo: '1' } });
// if (route) {
//   navigateTo(route.fullPath);
// }

// router.push({ path: '/login' });

function navigate() {
  const testAssert = '/foo' as TypedRouteLocation;
  const testAssert2 = { name: 'foo' } as TypedRouteLocation;
  router.push(testAssert);
  navigateTo(testAssert2);
  router.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });
  router.push('/user?foo');

  router.push(localePath('/admin/888'));

  const u = 'krzfzlkj' as string;
  const t = '///';

  const route2 = localePath(`/user/${t}/:slug/articles`); // Should error
  navigateTo('/admin/foo'); // Should error
  router.push('/admin'); // Should error

  const route = localePath(`/user/${u}/:slug/articles`);
  router.push('/');
  navigateTo('ednzelfjle', { external: true });
  const route4 = navigateTo('/test/:foo');
  router.push({ path: '/' });

  router.push('/user/:id/:slug/articles#baz');
  router.push('/admin/888'); // ✅

  router.push('/');
}
</script>
