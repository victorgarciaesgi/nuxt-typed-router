<template>
  <div>
    <button @click="navigate"> Navigate button </button>
    <nuxt-link :to="{ name: 'user' }">Navigate Link</nuxt-link>
  </div>
</template>

<script setup lang="ts">
// const route = useRoute('user-foo-bar');
const router = useRouter();

const localePath = useLocalePath();
const localeRoute = useLocaleRoute();

navigateTo(localePath({ name: 'user' }));

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
