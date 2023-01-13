<script setup lang="ts">
const { page } = useContent();
</script>

<template>
  <div class="flex flex-col min-h-screen relative">
    <Container :fluid="page?.fluid" :padded="page?.padded" class="max-w-7xl mx-auto flex-grow">
      <article>
        <slot />
      </article>
    </Container>
  </div>
</template>
