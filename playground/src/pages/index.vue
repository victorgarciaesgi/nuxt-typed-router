<template>
  <div> Route name: {{ $route.name }} </div>
</template>

<script setup lang="ts">
import { TypedRouteLocationRawFromName, helpers, TypedRouteLocation } from '@typed-router';

definePageMeta({
  name: 'foo-bar',
});

const router = useRouter();
</script>
