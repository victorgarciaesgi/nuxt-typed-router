import { describe, expect, it } from 'vitest';
import { removeNuxtGlobalImports } from '../../src/core/parser/removeNuxtDefs';

const path = '../../node_modules/nuxt/dist/app/composables/router';

describe('removeNuxtGlobalImports', () => {
  it('removes globals in the bracket format (unimport < 5.5)', () => {
    const output = removeNuxtGlobalImports(`declare global {
  const navigateTo: typeof import('${path}')['navigateTo']
  const useRoute: typeof import('${path}')['useRoute']
  const useRouter: typeof import('${path}')['useRouter']
  const useState: typeof import('${path}')['useState']
}`);

    expect(output).not.toMatch(/const (navigateTo|useRoute|useRouter):/);
    expect(output).toContain(`const useState: typeof import('${path}')['useState']`);
  });

  it('removes globals in the dot format (unimport >= 5.5, Nuxt >= 4.5)', () => {
    const output = removeNuxtGlobalImports(`declare global {
  const definePageMeta: typeof import('${path}').definePageMeta;
  const navigateTo: typeof import('${path}').navigateTo;
  const useLocalePath: typeof import('${path}').useLocalePath;
  const useLocaleRoute: typeof import('${path}').useLocaleRoute;
  const useRoute: typeof import('${path}').useRoute;
  const useRouter: typeof import('${path}').useRouter;
  const useState: typeof import('${path}').useState;
}`);

    expect(output).not.toMatch(
      /const (definePageMeta|navigateTo|useLocalePath|useLocaleRoute|useRoute|useRouter):/
    );
    expect(output).toContain(`const useState: typeof import('${path}').useState;`);
  });

  it('keeps globals that only share a prefix with a removed one', () => {
    const output = removeNuxtGlobalImports(
      `const useRouteAnnouncer: typeof import('${path}').useRouteAnnouncer;`
    );

    expect(output).toContain('useRouteAnnouncer');
  });
});
