<template>
  <div>
    <button type="button" @click="navigate">Click me to navigate</button>
  </div>
</template>

<script setup lang="ts">
import { useTypedRouter } from '../../dist/runtime/useTypedRouter';

const { router, routes } = useTypedRouter();
console.log(routes);

function navigate() {
  router.push({ name: 'activate' });
}
</script>
