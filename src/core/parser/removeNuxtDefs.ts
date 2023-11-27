import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { createResolver } from '@nuxt/kit';
import { processPathAndWriteFile } from '../fs';

type RemoveNuxtDefinitionsOptions = {
  buildDir: string;
  autoImport: boolean;
};

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
      outDir: '.nuxt',
    });
  }

  // Remove global imports from .nuxt/types/imports.d.ts

  if (autoImport) {
    const importsFilePath = resolve(buildDir, 'types/imports.d.ts');
    if (existsSync(importsFilePath)) {
      let globalDefinitions = await readFile(importsFilePath, {
        encoding: 'utf8',
      });

      const importsToRemove = [
        'useRouter',
        'useRoute',
        'useLocalePath',
        'useLocaleRoute',
        'definePageMeta',
        'navigateTo',
      ].map((m) => new RegExp(`const ${m}: typeof import\\('.*'\\)\\['${m}'\\]`, 'gm'));

      importsToRemove.forEach((imp) => {
        globalDefinitions = globalDefinitions.replace(imp, '');
      });

      processPathAndWriteFile({
        content: globalDefinitions,
        fileName: 'types/imports.d.ts',
        outDir: '.nuxt',
      });
    }
  }
}
