# 🚦Typed Router Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![npm downloads][npm-total-downloads-src]][npm-downloads-href]
<img src='https://img.shields.io/npm/l/simple-graphql-to-typescript.svg'>

[npm-version-src]: https://img.shields.io/npm/v/nuxt-typed-router.svg
[npm-version-href]: https://www.npmjs.com/package/nuxt-typed-router
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-typed-router.svg
[npm-total-downloads-src]: https://img.shields.io/npm/dt/nuxt-typed-router.svg
[npm-downloads-href]: https://www.npmjs.com/package/nuxt-typed-router

> Provide a safe typed router to nuxt with auto-generated typed definitions for route names

# Features

- Expose a global method `$typedRouter` (clone of vue-router), but typed with the routes defined in `pages` directory
- Provides a hook `useTypedRouter` that returns an alias of `$typedRouter` and also a typed list of your routes
- Provides auto-completion and errors for route params in `push` and `replace` methods

# Installation

```bash
yarn add -D nuxt-typed-router@next

#or
npm install -D nuxt-typed-router@next
```

# Configuration

First, register the module in the `nuxt.config.[js|ts]`

```ts
export default defineNuxtConfig({
  ...,
  modules: [
    ['nuxt-typed-router', {
      // options
    }],
  ]
})
 // or

export default defineNuxtConfig({
  ...,
  modules: [
    ['nuxt-typed-router'],
  ],
  typedRouter: {
    // options
  }
})
```

## Note for Typescript users

Don't forget to add `nuxt-typed-router` types to your `tsconfig.json`

```json
{
  "compilerOptions": {
    // ...
    "types": ["nuxt-typed-router"]
  }
}
```

## Options:

```ts
type Options = {
  // Path to where you cant the file to be saved (ex: "./src/models/__routes.ts")
  outDir?: string;

  // Name of the routesNames object (ex: "routesTree")
  // Default: "routerPagesNames"
  routesObjectName?: string;
};
```

# Usage in Vue/Nuxt

## - `routerPagesNames` global object

The module will create a file with the global object of the route names inside.

### **_Requirements_**

You have to specify the path of the generated file in your configuration

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-typed-router'],
  typedRouter: {
    outDir: './models',
  },
});

// Or

export default defineNuxtConfig({
  modules: [
    [
      'nuxt-typed-router',
      {
        outDir: './models',
      },
    ],
  ],
});
```

### _Usage_

Given this structure

        ├── pages
            ├── index
                ├── content.vue
                ├── index.vue
                ├── communication.vue
                ├── statistics.vue
                ├── [user].vue
            ├── index.vue
            ├── forgotpassword.vue
            ├── reset-password.vue
        │   └── login.vue
        └── ...

The generated file will look like this

```javascript
export const routerPagesNames = {
  forgotpassword: 'forgotpassword',
  login: 'login',
  resetPassword: 'reset-password',
  index: {
    index: 'index',
    communication: 'index-communication',
    content: 'index-content',
    statistics: 'index-statistics',
    user: 'index-user',
  },
};
```

You can now just import it

```vue
<script setup lang="ts">
import { useTypedRouter } from 'nuxt-typed-router';

// Fully typed
const { router, routes } = useTypedRouter();

function navigate() {
  router.push({ name: routes.index.user, params: { user: 1 } });
}
</script>
```

## Development

1. Clone this repository
2. Install dependencies using `yarn`

## 📑 License

[MIT License](./LICENSE)
