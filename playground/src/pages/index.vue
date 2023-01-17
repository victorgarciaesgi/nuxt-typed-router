<template>
  <div>
    <button @click="navigate"> Navigate </button>
    <nuxt-link :to="{ name: 'parent-id-slug', params: { id: 'foo', slug: 'bar' } }"></nuxt-link>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('parent-foo-bar');
const router = useRouter();

function navigate() {
  console.log(route.params.foo);
  router.push({ name: 'parent-id-slug', params: { slug: 'bar', id: 1 } });
}
</script>
