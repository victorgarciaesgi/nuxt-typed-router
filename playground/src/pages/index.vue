<template>
  <div>
    <button @click="navigate"> Navigate button </button>
    <nuxt-link to="/admin/foo">Navigate Link</nuxt-link>
    <nuxt-link to="/admin/foo/bar">Navigate Link</nuxt-link>
    <test name="foo"></test>
  </div>
</template>

<script setup lang="ts">
// const route = useRoute('user-foo-bar');
const router = useRouter();

const localePath = useLocalePath();
const localeRoute = useLocaleRoute();

navigateTo(localePath('/admin/foo/bar'));

router.push('/admin/foo');
router.push('/user/:id/:slug/articles/');

// const route = localeRoute({ name: 'index___en', query: { foo: '1' } });
// if (route) {
//   navigateTo(route.fullPath);
// }

// router.push({ path: '/login' });

// await navigateTo({ name: 'user-id-posts', params: { id: 1 } });

function navigate() {
  router.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });
}
</script>
