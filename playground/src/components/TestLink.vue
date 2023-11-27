<template>
  <NuxtLink :to="props.to"></NuxtLink>
</template>

<script
  setup
  lang="ts"
  generic="T extends RoutesNamesList, P extends string, E extends boolean = false"
>
import type { RoutesNamesList, NuxtRoute } from '@typed-router';

const props = defineProps<{
  to: NuxtRoute<T, P, E>;
  external?: E;
}>();

function navigate<T extends RoutesNamesList, P extends string>(to: NuxtRoute<T, P>) {}
</script>

<style lang="scss" scoped></style>
