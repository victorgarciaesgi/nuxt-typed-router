

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


## Provide a type safe router to Nuxt

- Supports all programmatic navigation utils (`NuxtLink`, `useRouter`, `navigateTo`, `useRoute`, `useLocalePath`, etc...)
- Supports optional params and catchAll routes
- Autocompletes routes paths, names and params
- Throw error if route path is invalid
- Out of the box `i18n` support
- Supports routes extended by config and modules

<br/>

<br/>
<p align="center">
  <img src="https://github.com/victorgarciaesgi/nuxt-typed-router/blob/master/.github/images/nuxt-typed-router.gif?raw=true"/>
</p>
<br/>




# Documentation

[![Documentation](https://github.com/victorgarciaesgi/nuxt-typed-router/blob/master/.github/images/redirectDoc.svg?raw=true)](https://nuxt-typed-router.vercel.app/)

# Play with it
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/github-7e4xvw?file=store/testRouter.ts)

Demo repo 🧪 : [nuxt-typed-router-demo](https://github.com/victorgarciaesgi/nuxt-typed-router-demo)

## Cool video about it from LearnVue!

[![Watch the video](https://img.youtube.com/vi/jiYoAiFb71Y/default.jpg)](https://www.youtube.com/watch?v=jiYoAiFb71Y&t)


<br/>

# Compatibility:

- Nuxt 3


# Quick start

### For Nuxt 3

```bash
yarn add -D nuxt-typed-router
# or
npm install -D nuxt-typed-router
# or
pnpm install -D nuxt-typed-router
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
3. Build project for local tests `pnpm run test`
4. Start dev playground `pnpm run prepack && pnpm run dev`
5. Build project for deploy `pnpm prepack`

## 📑 License

[MIT License](./LICENSE)
