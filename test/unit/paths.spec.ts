import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'pathe';
import ts from 'typescript';
import { afterAll, describe, expect, it } from 'vitest';
import { createPathsFiles } from '../../src/core/output/generators/files/__paths.file';
import type { GeneratorOutput, RoutePathsDecl } from '../../src/types';

/**
 * Generates `__paths.d.ts` for a set of routes, then type-checks assertions against it
 * with the TypeScript compiler. Returns the diagnostics of the assertions file.
 */
function typecheckPaths(routes: RoutePathsDecl[], assertions: string) {
  const dir = mkdtempSync(join(tmpdir(), 'nuxt-typed-router-paths-'));
  tempDirs.push(dir);

  const pathsFile = createPathsFiles({
    routesPaths: routes,
    routesList: routes.map((r) => r.name!),
  } as GeneratorOutput);

  writeFileSync(join(dir, 'paths.ts'), pathsFile);
  writeFileSync(
    join(dir, 'assertions.ts'),
    `import type { RouteNameFromPath, TypedPathParameter } from './paths';
    type Equal<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
    type Expect<T extends true> = T;
    declare function push<T extends string>(path: TypedPathParameter<T>): void;
    ${assertions}`
  );

  const program = ts.createProgram([join(dir, 'assertions.ts')], {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
  });

  return ts
    .getPreEmitDiagnostics(program)
    .map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
}

const tempDirs: string[] = [];
afterAll(() => tempDirs.forEach((dir) => rmSync(dir, { recursive: true, force: true })));

// pages/[...slug].vue, pages/files/[name].json.vue, pages/index.vue, pages/posts/[[slug]].vue, pages/users/[id].vue
const issueRoutes: RoutePathsDecl[] = [
  { name: 'slug', path: '/:slug(.*)*', isLocale: false },
  { name: 'files-name.json', path: '/files/:name.json', isLocale: false },
  { name: 'index', path: '/', isLocale: false },
  { name: 'posts-slug', path: '/posts/:slug?', isLocale: false },
  { name: 'users-id', path: '/users/:id', isLocale: false },
];

describe('Generated path types', () => {
  it('accepts the base path of a trailing optional param', () => {
    const errors = typecheckPaths(
      issueRoutes.filter((r) => r.name !== 'slug'),
      `
      push('/posts');
      push('/posts/');
      push('/posts?foo=bar');
      push('/posts#hash');
      push('/posts/my-post');
      push('/posts/my-post?foo=bar');
      // @ts-expect-error
      push('/posts/my-post/extra');
      // @ts-expect-error
      push('/postsfoo');
      type _1 = Expect<Equal<RouteNameFromPath<'/posts'>, 'posts-slug'>>;
      type _2 = Expect<Equal<RouteNameFromPath<'/posts/foo'>, 'posts-slug'>>;
      `
    );
    expect(errors).toEqual([]);
  });

  it('accepts params followed by a static suffix in the same segment', () => {
    const errors = typecheckPaths(
      issueRoutes.filter((r) => r.name !== 'slug'),
      `
      push('/files/report.json');
      push('/files/report.json?download=1');
      // @ts-expect-error
      push('/files/report.json/extra');
      // @ts-expect-error
      push('/files/.json');
      type _1 = Expect<Equal<RouteNameFromPath<'/files/report.json'>, 'files-name.json'>>;
      `
    );
    expect(errors).toEqual([]);
  });

  it('ranks a root catch-all after static and param routes', () => {
    const errors = typecheckPaths(
      issueRoutes,
      `
      type _1 = Expect<Equal<RouteNameFromPath<'/users/5'>, 'users-id'>>;
      type _2 = Expect<Equal<RouteNameFromPath<'/posts'>, 'posts-slug'>>;
      type _3 = Expect<Equal<RouteNameFromPath<'/files/report.json'>, 'files-name.json'>>;
      type _4 = Expect<Equal<RouteNameFromPath<'/anything/else'>, 'slug'>>;
      `
    );
    expect(errors).toEqual([]);
  });

  it('ranks a root param route after static routes', () => {
    const errors = typecheckPaths(
      [
        { name: 'id', path: '/:id', isLocale: false },
        { name: 'about', path: '/about', isLocale: false },
      ],
      `
      type _1 = Expect<Equal<RouteNameFromPath<'/about'>, 'about'>>;
      type _2 = Expect<Equal<RouteNameFromPath<'/foo'>, 'id'>>;
      `
    );
    expect(errors).toEqual([]);
  });
});
