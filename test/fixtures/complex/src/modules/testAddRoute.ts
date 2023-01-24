import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit';

export default defineNuxtModule({
  setup() {
    const { resolve } = createResolver(import.meta.url);
    extendPages((routes) => {
      routes.push({
        file: resolve('../components/testRouter.vue'),
        path: '/testModule/:foo',
        name: 'test-module',
      });
    });
  },
});
