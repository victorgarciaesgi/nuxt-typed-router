<template>
  <div>
    <button type="button" @click="navigate">Click me to navigate</button>
  </div>
</template>

<script setup lang="ts">
import { useTypedRouter } from '../generated';
import { callOutsideComponent } from '../store';

const { router, routes } = useTypedRouter();
const { $routesList, $typedRouter } = useNuxtApp();
function navigate() {
  // console.log($typedRouter, $routesList);
  // router.push({ name: 'activate' });
  router.push({ name: routes.activate });
  callOutsideComponent();
}
</script>
