<script setup lang="ts">
  // Mirrors @nuxtjs/mdc's ProseA component, which links with `href` instead of `to` (#158)
  import type { PropType } from 'vue';

  const props = defineProps({
    href: {
      type: String,
      default: '',
    },
    target: {
      type: String as PropType<
        '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined
      >,
      default: undefined,
      required: false,
    },
  });
</script>

<template>
  <NuxtLink :href="props.href" :target="props.target">
    <slot />
  </NuxtLink>
  <NuxtLink href="/admin/panel">Typed href</NuxtLink>
  <!-- @vue-expect-error -->
  <NuxtLink href="/fooooooooooo">Invalid href</NuxtLink>
</template>
