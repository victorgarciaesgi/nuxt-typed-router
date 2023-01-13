

<p align="center">
  <img src="https://raw.githubusercontent.com/victorgarciaesgi/nuxt-typed-router/master/.github/images/cover.png" alt="nuxt-typed-router cover">
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

- Automaticaly provides types check and autocomplete to `NuxtLink`
- Exports a `useTypedRouter` and `useTypedRoute` composable
- Supports routes defined in `config.extendRoutes`
- Infer route params based on route name
- Provide global `$typedRouter` util

<br/>

<br/>
<p align="center">
  <img src="https://github.com/victorgarciaesgi/nuxt-typed-router/blob/master/.github/images/nuxt-router.gif?raw=true"/>
</p>
<br/>


# Documentation

[![Open in StackBlitz](https://github.com/victorgarciaesgi/nuxt-typed-router/blob/master/.github/images/redirectDoc.svg?raw=true)](TODO---------)

# Play with it
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/github-7e4xvw?file=store/testRouter.ts)

Demo repo 🧪 : [nuxt-typed-router-demo](https://github.com/victorgarciaesgi/nuxt-typed-router-demo)

<br/>

# Compatibility:

- Nuxt 3
- Nuxt 2 (via [`nuxt2` branch](https://github.com/victorgarciaesgi/nuxt-typed-router/tree/nuxt2))



# Quick start

### For Nuxt 3

```bash
yarn add -D nuxt-typed-router
# or
npm install -D nuxt-typed-router
```

### Nuxt 2 legacy

Nuxt 2 version is no longer maintained, but still available in [`nuxt2` branch](https://github.com/victorgarciaesgi/nuxt-typed-router/tree/nuxt2)
It only has route name autocomplete functionnality

```bash
yarn add -D nuxt-typed-router@legacy
# or
npm install -D nuxt-typed-router@legacy
```

# Configuration
Register the module in the `nuxt.config.ts`, done!

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
