<template>
  <div>
    <button type="button" @click="navigate">Click me to navigate</button>
    <nuxt-link :to="{ name: 'parent-child-two-id', params: { id: 1 } }"></nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { useTypedRoute, useTypedRouter } from '../generated';
import { callOutsideComponent } from '../store';

const { router } = useTypedRouter();

const route = useTypedRoute();
if (route.name === 'parent-child-two-id') {
  console.log(route.params);
}
function navigate() {
  router.push({ name: 'parent-child-two-profile-id-slug-articles' });
  callOutsideComponent();
}
</script>
