---
seo:
  title: Nuxt Typed Router Documentation
  description: Provide a type safe router to Nuxt with auto-generated typed definitions for route paths, names and params
navigation: false
---

::u-page-hero
#title
Nuxt Typed Router

#description
Provide a type safe router to Nuxt with auto-generated typed definitions for route paths, names and params

#links
  :::u-button
  ---
  color: neutral
  size: xl
  to: /guide
  trailing-icon: i-lucide-arrow-right
  ---
  Get Started
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-github
  size: xl
  to: https://github.com/victorgarciaesgi/nuxt-typed-router
  target: _blank
  variant: outline
  ---
  View on GitHub
  :::
::

::u-page-section
#title
What you can do

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-typescript
  to: /usage/how-to-use
  ---
  #title
  Type safety

  #description
  Throws errors when route path/name/params doesn't match any page
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  to: /guide
  ---
  #title
  Zero config

  #description
  Just plug the module and watch the magic. Supports `autoImport: false`
  :::

  :::u-page-feature
  ---
  icon: i-lucide-globe
  to: /usage/i18n
  ---
  #title
  i18n support

  #description
  Out of the box support for prefixed i18n routes
  :::

  :::u-page-feature
  ---
  icon: i-lucide-eye
  to: /guide/configuration
  ---
  #title
  Attentive

  #description
  Watches changes in your router structure to automatically reload your types
  :::
::

::u-page-section
#title
See it in action

#description
Autocompletes and type-checks routes paths, names and params

  :::div{.flex.justify-center}
  ![Nuxt Typed Router demo](https://github.com/victorgarciaesgi/nuxt-typed-router/blob/master/.github/images/nuxt-typed-router.gif?raw=true){.rounded-lg.max-w-full}
  :::
::

::u-page-section
#title
Install with one command

#description
  :::div{.flex.justify-center}
  ```bash
  npx nuxi@latest module add typed-router
  ```
  :::
::
