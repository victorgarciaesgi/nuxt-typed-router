# 🚦Typed Router Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

> Provide a safe typed router to nuxt with auto-generated typed definitions for route names

# Motivation

Nuxt is great because it generate the router based on your pages directory. It generates all the pages name and it abstract a lot of boilerplate.

Problem: If you want a type-safe routing flow, the current model can be hard to maintain if you modify the page file name and is error prone in big projects.

Solution: Thanks to Nuxt powerful hook system, this module reads all your routes and generate typings and enums accordingly

# Installation

```bash
yarn add nuxt-typed-router

#or
npm install nuxt-typed-router
```

# Configuration

First, register the module in the `nuxt.config.[js|ts]`

```javascript
const config = {
  ...,
  modules: [
    'nuxt-typed-router',
  ]
}
```

Or

```javascript
const config = {
  ...,
  modules: [
    ['nuxt-typed-router', {
      // options
    }],
  ]
}
```

Options:

```ts
type Options = {
  // Path to where you cant the file to be saved (ex: "./src/models/__routes.ts")
  filePath?: string;
  // Name of the routesNames object (ex: "routesTree")
  // Default: "routerPagesNames"
  routesObjectName?: string;
};
```

# Usage in Vue/Nuxt

Nuxt-typed-router provides two ways to have name-based typed routing

## - `routerPagesNames` global object

The module will create a file with the global object of the route names inside.

### **_Requirements_**

You have to specify the path of the generated file in your configuration

```javascript
// nuxt.config.js
const config = {
  typedRouter: {
    filePath: './models/__routes.js', // or .ts,
  },
};

// Or

const config = {
  modules: [
    [
      'nuxt-typed-router',
      {
        filePath: './models/__routes.js', // or .ts,
      },
    ],
  ],
};
```

### _Usage_

Given this structure

        ├── pages
            ├── index
                ├── content.vue
                ├── index.vue
                ├── communication.vue
                ├── statistics.vue
                ├── users.vue
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
    users: 'index-users',
  },
};
```

You can just import it now

```javascript
import { routerPagesNames } from '~/models/__routes.js';

export default {
  mounted() {
    this.$router.push({ name: routerPagesNames.index.content });
  },
};
```

## - `$typedRouter`

A global `$typedRouter` method is added to the Nuxt context and is accessible in your components and context. It's an alias of Vue `$router`, but the typings are modified so the `name` options is typed with the routes names generated from the pages directory

### _Why not directly modifying the types of `$router` and `$route` ?_

That was the idea when I builded this module initially, but I got confronted with Typescript limitations for modifying already defined third-party lib typings.

If I wanted to modify vue-router types, i could have just written this:

```typescript
declare module 'vue-router/types' {
  export interface Location {
    name: 'login' | 'home';
  }
}
```

Unfortunately that's not possible, Typescript throws this errors:

- `Subsequent property declarations must have the same type. Property 'name' must be of type 'string', but here has type '"login" | "home"`

- `All declarations of 'name' must have identical modifiers`

So the only way for now is to have an alternative `$typedRouter`, or a global enum-like object.

### _Requirements_

For your IDE to augment the Vue types, you need to explicitly import the module in your Nuxt config

```javascript
// nuxt.config.js
import 'nuxt-typed-router';
```

### _Usage_

The usage is exactly the same as `$router`

Given this structure

        ├── pages
            ├── index
                ├── content.vue
                ├── index.vue
                ├── communication.vue
                ├── statistics.vue
                ├── users.vue
            ├── index.vue
            ├── forgotpassword.vue
            ├── reset-password.vue
        │   └── login.vue
        └── ...

![$typedRouter](https://github.com/victorgarciaesgi/nuxt-typed-router/blob/master/captures/$typedrouter.png?raw=true)

**This module also provide `$typedRoute`, wich is an alias to Vue `$route`, but with typed name property**

### **_Caveats_**

The generated enum is located in the `node_modules` folder.

Because of Intellisense limitations, the types from node_modules are not lived updated, so you need to either reload the window or restart Intellisense when you add a Page/ modify the name of a Page for it to take into account the pages names freshly generated

## Development

1. Clone this repository
2. Install dependencies using `yarn` or `npm install`

## 📑 License

[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-typed-router
[npm-version-href]: https://www.npmjs.com/package/nuxt-typed-router
[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-typed-router
[npm-downloads-href]: https://www.npmjs.com/package/nuxt-typed-router
