import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { createResolver } from '@nuxt/kit';
import { processPathAndWriteFile } from '../fs';

type RemoveNuxtDefinitionsOptions = {
  buildDir: string;
  autoImport: boolean;
};

const NUXT_GLOBALS_TO_REMOVE = [
  'useRouter',
  'useRoute',
  'useLink',
  'useLocalePath',
  'useLocaleRoute',
  'definePageMeta',
  'navigateTo',
];

/**
 * Removes Nuxt's untyped global declarations from `.nuxt/types/imports.d.ts`
 * so they don't clash with the typed ones declared by nuxt-typed-router.
 *
 * Handles both unimport output formats:
 * - `const useRouter: typeof import('...')['useRouter']` (unimport < 5.5)
 * - `const useRouter: typeof import('...').useRouter` (unimport >= 5.5, Nuxt >= 4.5)
 */
export function removeNuxtGlobalImports(content: string): string {
  return NUXT_GLOBALS_TO_REMOVE.reduce(
    (output, name) =>
      output.replace(
        new RegExp(
          `const ${name}: typeof import\\('[^']*'\\)(?:\\['${name}'\\]|\\.${name}\\b)`,
          'gm'
        ),
        ''
      ),
    content
  );
}

export async function removeNuxtDefinitions({
  buildDir,
  autoImport,
}: RemoveNuxtDefinitionsOptions): Promise<void> {
  const { resolve } = createResolver(import.meta.url);

  // Remove NuxtLink from .nuxt/components.d.ts
  const componentFilePath = resolve(buildDir, 'components.d.ts');
  if (existsSync(componentFilePath)) {
    const componentDefinitions = await readFile(componentFilePath, {
      encoding: 'utf8',
    });
    const replacedNuxtLink = componentDefinitions.replace(
      /'NuxtLink': typeof import\(".*"\)\['default'\]|'NuxtLinkLocale': typeof import\(".*"\)\['default'\]/gm,
      ''
    );

    processPathAndWriteFile({
      content: replacedNuxtLink,
      fileName: 'components.d.ts',
      outDir: buildDir,
    });
  }

  // Remove global imports from .nuxt/types/imports.d.ts

  if (autoImport) {
    const importsFilePath = resolve(buildDir, 'types/imports.d.ts');
    if (existsSync(importsFilePath)) {
      const globalDefinitions = await readFile(importsFilePath, {
        encoding: 'utf8',
      });

      processPathAndWriteFile({
        content: removeNuxtGlobalImports(globalDefinitions),
        fileName: 'types/imports.d.ts',
        outDir: buildDir,
      });
    }
  }
}
