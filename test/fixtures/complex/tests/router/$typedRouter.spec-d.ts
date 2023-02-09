import { useNuxtApp } from '#app';
const { $typedRouter } = useNuxtApp();

// @ts-expect-error
$typedRouter.resolve({ name: 'index', params: { id: 1 } });
