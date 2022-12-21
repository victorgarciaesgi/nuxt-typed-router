# 🚗🚦 Typed Router for Nuxt

<p align="center">
  <img width='100' src="https://raw.githubusercontent.com/victorgarciaesgi/nuxt-typed-router/master/.github/images/logo.png" alt="nuxt-typed-router logo">
</p>


[npm-version-src]: https://img.shields.io/npm/v/nuxt-typed-router.svg
[npm-version-href]: https://www.npmjs.com/package/nuxt-typed-router
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-typed-router.svg
[npm-total-downloads-src]: https://img.shields.io/npm/dt/nuxt-typed-router.svg
[npm-downloads-href]: https://www.npmjs.com/package/nuxt-typed-router

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![npm downloads][npm-total-downloads-src]][npm-downloads-href]
<img src='https://img.shields.io/npm/l/simple-graphql-to-typescript.svg'>

> Provide a type safe router to Nuxt with auto-generated typed definitions for route names and autocompletion for route params

- 🏎 Provides a hook `useTypedRouter` that returns an alias of `$typedRouter` and also a typed list of your routes
- 🚚 Expose a global method `$typedRouter` (clone of vue-router), but typed with the routes defined in `pages` directory
- 🚦 Provides auto-completion and errors for route params in `push` and `replace` methods

<br/>

Demo 🧪 : [nuxt-typed-router-demo](https://github.com/victorgarciaesgi/nuxt-typed-router-demo)

## Compatibility:

- Nuxt 3
- Nuxt 2 (via [`nuxt2` branch](https://github.com/victorgarciaesgi/nuxt-typed-router/tree/nuxt2))

<br/>
<p align="center">
  <img src="https://github.com/victorgarciaesgi/nuxt-typed-router/blob/master/.github/images/in-action.gif?raw=true"/>
</p>
<br/>

# Installation

### For Nuxt 3

```bash
yarn add -D nuxt-typed-router
# or
npm install -D nuxt-typed-router
```

### For Nuxt 2

For Nuxt 2 usage, check out the docs at the [`nuxt2` branch](https://github.com/victorgarciaesgi/nuxt-typed-router/tree/nuxt2)

```bash
yarn add -D nuxt-typed-router@legacy
# or
npm install -D nuxt-typed-router@legacy
```

# Configuration

First, register the module in the `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['nuxt-typed-router'],
  nuxtTypedRouter: {
    // options
  },
});
```

## Options:

```ts
interface ModuleOptions {
  /** Output directory where you cant the files to be saved
   * (ex: "./models")
   * @default "<srcDir>/generated"
   */
  outDir?: string;
  /** Name of the routesNames object (ex: "routesTree")
   * @default "routerPagesNames"
   * */
  routesObjectName?: string;
  /**
   * Set to false if you don't want a plugin generated
   * @default true
   */
  plugin?: boolean;
}
```

# Generated files

The module will generate 4 files each time you modify the `pages` folder :

- `~/<outDir>/__routes.ts` with the global object of the route names inside.
- `~/<outDir>/__useTypedRouter.ts` Composable to simply access your typed routes
- `~/<outDir>/typed-router.d.ts` containing the global typecript definitions and exports
- `~/plugins/__typed_router.ts` Plugin that will inject `$typedRouter` and `$routesList` (`@nuxt/kit` has problems registering plugin templates so this is a workaround)

# Usage in Vue/Nuxt

<br/>

### **_Requirements_**

You can specify the output dir of the generated files in your configuration. It defaults to `<srcDir>/generated`

```ts
export default defineNuxtConfig({
  buildModules: ['nuxt-typed-router'],
  nuxtTypedRouter: {
    outDir: './generated',
  },
});
```

# How it works

Given this structure

        ├── pages
            ├── index
                ├── content
                    ├── [id].vue
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

The generated route list will look like this

```ts
export const routerPagesNames = {
  forgotpassword: 'forgotpassword' as const,
  login: 'login' as const,
  resetPassword: 'reset-password' as const,
  index: {
    index: 'index' as const,
    communication: 'index-communication' as const,
    content: {
      id: 'index-content-id' as const,
    },
    statistics: 'index-statistics' as const,
    user: 'index-user' as const,
  },
};
export type TypedRouteList =
  | 'forgotpassword'
  | 'login'
  | 'reset-password'
  | 'index'
  | 'index-communication'
  | 'index-content-id'
  | 'index-statistics'
  | 'index-user';
```

> nuxt-typed-router will also create a plugin in your `<srcDir>/plugins` folder with the injected `$typedRouter` and `$routesList` helpers

# Usage with `useTypedRouter` hook

`useTypedRouter` is an exported composable from nuxt-typed-router. It contains a clone of `vue-router` but with strictly typed route names and params type-check

```vue
<script lang="ts">
// The path here is `~/generated` because I set `outDir: './generated'` in my module options
import { useTypedRouter } from '~/generated';

export default defineComponent({
  setup() {
    // Fully typed
    const { router, routes } = useTypedRouter();

    function navigate() {
      // Autocompletes the name and infer the params
      router.push({ name: routes.index.user, params: { user: 1 } }); // ✅ valid
      router.push({ name: routes.index.user, params: { foo: 1 } }); // ❌ invalid
    }

    return { navigate };
  },
});
</script>
```

# Usage with `$typedRouter` and `$routesList` injected helpers

`$typedRouter` is an injected clone of vue-router `$router`, but fully typed with all your routes.
It's available anywhere you have access to Nuxt context

```vue
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const { $typedRouter, $routesList } = useNuxtApp();

    function navigate() {
      $typedRouter.push({ name: $routesList.activate });
    }

    return {
      navigate,
    };
  },
});
</script>
```

# Usage outside Vue component

You can import the `useTypedRouter` composable from where it's generated.
Exemple with `pinia` store here

```ts
import pinia from 'pinia';
import { useTypedRouter } from '~/generated';

export const useFooStore = defineStore('foo', {
  actions: {
    bar() {
      const { router, routes } = useTypedRouter();
      router.push({ name: routes.index.user, params: { user: 2 } });
    },
  },
});
```

## Development

1. Clone this repository
2. Install dependencies using `yarn`
3. Build project for local tests `yarn build:local`
4. Start dev playground `yarn play`
5. Build project for deploy `yarn prepack`

## 📑 License

[MIT License](./LICENSE)
