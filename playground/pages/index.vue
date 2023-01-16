<template>
  <nuxt-link :to="{ name: 'parent-foo-bar', params: { foo: 1 } }"> Navigate </nuxt-link>
</template>

<script setup lang="ts">
import { useTypedRoute, useTypedRouter } from '@typed-router';
</script>
