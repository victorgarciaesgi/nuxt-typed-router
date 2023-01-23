<template>
  <div>
    <button id="useRouter" @click="navigate"> Navigate button </button>
    <nuxt-link id="nuxtLink" :to="{ name: 'user-id-slug', params: { id: 'foo', slug: 'bar' } }"
      >Navigate link</nuxt-link
    >
    <button id="navigateTo" @click="testNavigateTo"> NavigateTo button </button>
    <button id="plugin" @click="testNavigatePlugin"> NavigateTo plugin </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter, navigateTo } from '@typed-router';
import { useNuxtApp } from '#app';

const route = useRoute('user-foo-bar');
const router = useRouter();
const { $typedRouter, $typedRoute } = useNuxtApp();

function navigate() {
  router.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });
  /** @ts-expect-error */
  console.log(route.params.id);
}

function testNavigateTo() {
  navigateTo({ name: 'user-id-slug', params: { id: '1', slug: 'foo' } });
}

function testNavigatePlugin() {
  $typedRouter.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });

  // @ts-expect-error
  $typedRouter.resolve({ name: 'index', params: { id: 1 } });
}
</script>
