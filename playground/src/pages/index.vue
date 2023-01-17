<template>
  <div>
    <button @click="navigate"> Navigate </button>
    <nuxt-link :to="{ name: 'parent-id-slug', params: { slug: 'foo' } }"></nuxt-link>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('parent-foo-bar');
const router = useRouter();
router.push({ name: 'parent-foo-bar', params: { foo: 1 } });
console.log(route.params.bar);

function navigate() {
  router.push({ name: 'parent-id-slug', params: { slug: 'bar' } });
}
</script>
