<template>
  <div>
    <button type="button" @click="navigate">Click me to navigate</button>
    <nuxt-link :to="{ name: 'parent-child-two-profile-id', params: { id: 1 } }">
      Navigate
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { callOutsideComponent } from '../store';
import { useTypedRoute, useTypedRouter } from '@typed-router';

const route = useTypedRoute('parent-child-two-profile-id');
console.log(route.params.id);

// @ts-expect-error
console.log(route.params.foo); // error

const route2 = useTypedRoute();
if (route2.name === 'parent-child-two-profile-id-slug') {
  console.log(route2.params.id);

  // @ts-expect-error
  console.log(route2.params.bar); // error
}

const router = useTypedRouter();
function navigate() {
  callOutsideComponent();
  // @ts-expect-error
  router.push({ name: 'parent-child-two-profile-id-slug' }); // error

  router.push({
    name: 'parent-child-one',
  });

  // good
}
</script>
