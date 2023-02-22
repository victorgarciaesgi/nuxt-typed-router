# Tests

Tests are divided in multiple ways

- e2e
- fixtures unit test for types with `vue-tsc`
- Unit test with `vitest typecheck`


Files to update for testing:

- e2e/base.spec.ts
- fixtures/simple/components/*.vue
- fixtures/simple/tests/*.ts
- fixtures/complex/components/*.vue
- fixtures/complex/tests/*.ts


Cannot use pnpm workspaces because of a Nuxt bug with workspaces

`simple` fixture repo is for a vanilla config project.

`complex` fixture is for a heavily modified config project (like plugin, srcDir modified etc..)