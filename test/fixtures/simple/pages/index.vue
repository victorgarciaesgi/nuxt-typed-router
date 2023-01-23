<template>
  <div>
    <button id="useRouter" @click="navigate"> Navigate button </button>
    <nuxt-link id="nuxtLink" :to="{ name: 'user-id-slug', params: { id: 'foo', slug: 'bar' } }"
      >Navigate link</nuxt-link
    >
    <button id="navigateTo" @click="testNavigateTo"> NavigateTo button </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute('user-foo-bar');
const router = useRouter();

function navigate() {
  router.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });
}

function testNavigateTo() {
  navigateTo({ name: 'user-id-slug', params: { id: '1', slug: 'foo' } });
}
</script>
