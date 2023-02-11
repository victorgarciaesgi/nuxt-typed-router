<template>
  <div>
    <button @click="navigate"> Navigate button </button>
    <nuxt-link :to="{ name: 'admin-id', params: { id: 1 } }">Navigate Link</nuxt-link>
    <nuxt-link to="/admin/:id/foo">Navigate Link</nuxt-link>
    <nuxt-link :to="localePath('/admin/:id')">Navigate Link</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { GlobalComponents } from 'vue';
import { PageMeta } from '#app';
import { definePageMeta, TypedRouteLocationRawFromName, helpers } from '@typed-router';

definePageMeta({
  validate(route) {
    return route.name === 'index';
  },
  redirect: '/admin/:id/oo',
});

const t = 'zfef';
const u = 'krzfzlkj' as string;

type test<T> = string extends T ? true : false;

type foo = test<typeof u>;

const router = useRouter();

const localePath = useLocalePath();
const localeRoute = useLocaleRoute();

router.push(localePath('/admin/888'));
const route = localePath('/user/:id/:slug/articles');
navigateTo({ path: '/admin/:id' });
router.push({ path: '' });

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
