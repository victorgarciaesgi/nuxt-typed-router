<template>
  <nuxt-link :to="{ name: 'activate' }"> Navigate </nuxt-link>
</template>

<script setup lang="ts">
import { useTypedRouter } from '@typed-router';

const router = useTypedRouter();
</script>
