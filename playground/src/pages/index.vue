<template>
  <div>
    <button @click="navigate"> Navigate button </button>
    <nuxt-link to="/admin/foo">Navigate Link</nuxt-link>
    <nuxt-link to="/admin/foo/bar">Navigate Link</nuxt-link>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const localePath = useLocalePath();
const localeRoute = useLocaleRoute();

router.push(localePath('/'));
const route = localePath('/admin/37883');

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
