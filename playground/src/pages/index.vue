<template>
  <div>
    <button @click="navigate"> Navigate button </button>
    <nuxt-link :to="{ name: 'user-id-slug', params: { id: 'foo', slug: 'bar' } }"
      >Navigate Link</nuxt-link
    >
  </div>
</template>

<script setup lang="ts">
const route = useRoute('user-foo-bar');
const router = useRouter();

await navigateTo({ name: 'user-id-posts', params: { id: 1 } });

function navigate() {
  console.log(route.params.foo);
  router.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });
}
</script>
