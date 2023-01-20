<template>
  <div>
    <button @click="navigate"> Navigate button </button>
    <nuxt-link :to="{ name: 'user-id-slug', params: { id: 'foo', slug: 'bar' } }"
      >Navigate link</nuxt-link
    >
  </div>
</template>

<script setup lang="ts">
const route = useRoute('user-foo-bar');
const router = useRouter();

function navigate() {
  router.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });
}
</script>
