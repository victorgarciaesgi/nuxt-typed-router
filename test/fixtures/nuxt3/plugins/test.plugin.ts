export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: () => 'hello',
    },
  };
});
