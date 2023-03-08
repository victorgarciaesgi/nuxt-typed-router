<template>
  <div>
    <button @click="navigate"> Navigate button </button>
    <nuxt-link :to="{ name: 'admin-id', params: { id: 1 } }">Navigate Link</nuxt-link>
    <nuxt-link to="/foo">Navigate Link</nuxt-link>
    <nuxt-link :to="localePath('/admin/:id')">Navigate Link</nuxt-link>
    <nuxt-layout></nuxt-layout>
  </div>
</template>

<script setup lang="ts">
import { TypedRouteLocationRawFromName, helpers } from '@typed-router';

// definePageMeta({
//   redirect: (route) => helpers.route({ name: 'admin-id', params: { id: 1 } }),
// });

definePageMeta({
  title: 'foo',
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
  router.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });
  router.push('/user?foo');

  router.push(localePath('/admin/888'));

  const u = 'krzfzlkj' as string;
  const t = '///';

  const route = localePath(`/user/${u}/:slug/articles`);
  const route2 = localePath(`/user/${t}/:slug/articles`); // Should error
  router.push('/');
  navigateTo(localePath('/'));
  router.push({ path: '/' });

  router.push('/user/:id/:slug/articles#baz');
  router.push('/baguette'); // Should error
  router.push('/admin/888'); // ✅

  router.push('/');
}
</script>
