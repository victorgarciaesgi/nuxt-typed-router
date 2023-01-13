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
<img src='https://img.shields.io/npm/l/nuxt-typed-router.svg'>

## Provide a type safe router to Nuxt with auto-generated typed definitions for route names and autocompletion for route params

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

### Nuxt 2 legacy

Nuxt 2 version is no longer maintained, but still available in [`nuxt2` branch](https://github.com/victorgarciaesgi/nuxt-typed-router/tree/nuxt2)

```bash
yarn add -D nuxt-typed-router@legacy
# or
npm install -D nuxt-typed-router@legacy
```

# Quick start

First, register the module in the `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['nuxt-typed-router'],
});
```


## Development

1. Clone this repository
2. Install dependencies using `pnpm`
3. Build project for local tests `pnpm build:local`
4. Start dev playground `pnpm play`
5. Build project for deploy `pnpm prepack`

## 📑 License

[MIT License](./LICENSE)
