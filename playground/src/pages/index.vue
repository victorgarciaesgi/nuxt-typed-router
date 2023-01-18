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

function navigate() {
  console.log(route.params.foo);
  router.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });
}
</script>
