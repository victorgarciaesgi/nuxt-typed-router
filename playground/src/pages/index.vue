<template>
  <button @click="navigate"> Navigate </button>
</template>

<script setup lang="ts">
const route = useRoute('parent-foo-bar');
const router = useRouter();
router.push({ name: 'parent-foo-bar', params: { foo: 1 } });
console.log(route.params.bar);

function navigate() {}
</script>
