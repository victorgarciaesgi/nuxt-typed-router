<template>
  <NuxtLink :to="props.to" :external="props.external"></NuxtLink>
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
</script>

<style lang="scss" scoped></style>
