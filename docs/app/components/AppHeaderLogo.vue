<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2.5 shrink-0">
    <UColorModeImage
      v-if="appConfig.header?.logo?.dark || appConfig.header?.logo?.light"
      :light="appConfig.header?.logo?.light || appConfig.header?.logo?.dark"
      :dark="appConfig.header?.logo?.dark || appConfig.header?.logo?.light"
      :alt="appConfig.header?.logo?.alt || appConfig.header?.title"
      class="h-7 w-auto shrink-0"
    />
    <span class="font-semibold text-base text-[var(--ui-text-highlighted)]">
      {{ appConfig.header?.title }}
    </span>
  </NuxtLink>
</template>
