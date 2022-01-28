/*eslint-disable */

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  /* eslint-disable-next-line */
  const routesList = <%= options.routesList %> ;

  return {
    provide: {
      typedRouter: app.router,
      routesList
    },
  };
})

