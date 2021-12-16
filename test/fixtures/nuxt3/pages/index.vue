<template>
  <div>
    <button type="button" @click="navigate">Click me to navigate</button>
  </div>
</template>

<script setup lang="ts">
import { useTypedRouter } from 'nuxt-typed-router';

const { router, routes } = useTypedRouter();

function navigate() {
  router.push({ name: 'parent-child-two-profile-id-slug', params: {} });
}
</script>
