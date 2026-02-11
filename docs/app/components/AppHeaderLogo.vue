<script setup lang="ts">
  const appConfig = useAppConfig();
</script>

<template>
  <NuxtLink to="/" class="flex items-center gap-2.5 shrink-0">
    <img
      src="/logo.png"
      :alt="appConfig.header?.logo?.alt || appConfig.header?.title"
      class="h-7 w-auto shrink-0"
    />
    <span class="font-semibold text-base text-[var(--ui-text-highlighted)]">
      {{ appConfig.header?.title }}
    </span>
  </NuxtLink>
</template>
