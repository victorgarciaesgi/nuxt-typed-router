import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit';

export default defineNuxtModule({
  setup() {
    extendPages((routes) => {
      routes.push({
        path: '/testModule/:foo',
        name: 'test-module',
      });
    });
  },
});
