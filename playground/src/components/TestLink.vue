<template>
  <NuxtLink :to="props.to" :external="props.external"></NuxtLink>
</template>

<script setup lang="ts" generic="R extends RoutesNamesList, E extends boolean = false">
import type { RoutesNamesList, NuxtRoute } from '@typed-router';

const props = defineProps<{
  to: NuxtRoute<never, never, E>;
  external?: E;
}>();
</script>

<style lang="scss" scoped></style>
