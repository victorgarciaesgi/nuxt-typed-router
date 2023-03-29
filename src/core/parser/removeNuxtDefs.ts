import { readFile } from 'fs/promises';
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
  const componentDefinitions = await readFile(resolve(buildDir, 'components.d.ts'), {
    encoding: 'utf8',
  });
  const replacedNuxtLink = componentDefinitions.replace(
    /'NuxtLink': typeof import\(".*"\)\['default'\]/gm,
    ''
  );

  processPathAndWriteFile({
    content: replacedNuxtLink,
    fileName: 'components.d.ts',
    outDir: '.nuxt',
  });

  // Remove global imports from .nuxt/types/imports.d.ts

  if (autoImport) {
    let globalDefinitions = await readFile(resolve(buildDir, 'types/imports.d.ts'), {
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
