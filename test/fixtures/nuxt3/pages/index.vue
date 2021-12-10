<template>
  <div></div>
</template>

<script lang="ts">
import { useTypedRouter } from 'nuxt-typed-router';

export default defineComponent({
  setup() {
    const {} = useNuxtApp();

    router.push({ name: 'parent-child-one-child-one-sub-one', params: { id: '1' } });
  },
});
</script>
