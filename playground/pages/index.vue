<template>
  <div>
    <button type="button" @click="navigate">Click me to navigate</button>
  </div>
</template>

<script setup lang="ts">
import { useTypedRouter } from '../../dist/runtime/useTypedRouter';
import { callOutsideComponent } from '../store';

const { router, routes } = useTypedRouter();
function navigate() {
  // console.log($typedRouter, $routesList);
  // router.push({ name: 'activate' });
  callOutsideComponent();
}
</script>
