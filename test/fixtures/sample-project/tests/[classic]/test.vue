<template>
  <div>
    <button id="useRouter" @click="navigate"> Navigate button </button>
    <nuxt-link id="nuxtLink" :to="{ name: 'admin-id', params: { id: 'foo' } }"
      >Navigate link</nuxt-link
    >
    <NuxtLink to="/user/foo/bar/">Foo</NuxtLink>
    <nuxt-link to="http://vicflix.dev" external></nuxt-link>
    <button id="navigateTo" @click="testNavigateTo"> NavigateTo button </button>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#imports';
import { useRoute, useRouter, navigateTo } from '@typed-router';

const route = useRoute('user-foo-bar');
const router = useRouter();

function navigate() {
  router.push({ name: 'user-id-slug', params: { slug: 'bar', id: 1 } });
  /** @ts-expect-error */
  console.log(route.params.id);
}

function testNavigateTo() {
  navigateTo({ name: 'user-id-slug', params: { id: '1', slug: 'foo' } });
}
</script>
