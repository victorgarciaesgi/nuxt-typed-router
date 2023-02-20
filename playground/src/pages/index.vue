<template>
  <div>
    <button @click="navigate"> Navigate button </button>
    <nuxt-link :to="{ name: 'admin-id', params: { id: 1 } }">Navigate Link</nuxt-link>
    <nuxt-link to="/foo">Navigate Link</nuxt-link>
    <nuxt-link :to="localePath('/admin/:id')">Navigate Link</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, TypedRouteLocationRawFromName, helpers } from '@typed-router';

definePageMeta({
  redirect: (route) => helpers.route({ name: 'admin-id', params: { id: 1 } }),
});

definePageMeta('index', {
  redirect: '/admin/foo/ar',
});

const t = 'zfef';
const u = 'krzfzlkj' as string;

const router = useRouter();

const localePath = useLocalePath();
const localeRoute = useLocaleRoute();

router.push(localePath('/admin/888'));
const route = localePath('/user/:id/:slug/articles');
navigateTo({ path: '/admin/:id' });
router.push({ path: '/' });

router.push('/user/:id/:slug/articles#baz');
router.push('/baguette'); // Error
router.push('/admin/888'); // ✅

router.push('/');

// const route = localeRoute({ name: 'index___en', query: { foo: '1' } });
// if (route) {
//   navigateTo(route.fullPath);
// }

// router.push({ path: '/login' });

function navigate() {
  router.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });
}
</script>
