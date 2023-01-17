import { Nuxt } from '@nuxt/schema';
import { processPathAndWriteFile } from '../../fs';
import { createRuntimePluginFile } from '../runtime';

type HandlePluginFileSaveArgs = {
  nuxt: Nuxt;
  rootDir: string;
  routesDeclTemplate: string;
};

export function handlePluginFileSave({
  nuxt,
  rootDir,
  routesDeclTemplate,
}: HandlePluginFileSaveArgs) {
  const pluginName = '__typed-router.ts';

  nuxt.hook('build:done', async () => {
    const pluginFolder = `${rootDir}/plugins`;
    await processPathAndWriteFile({
      outDir: pluginFolder,
      rootDir,
      fileName: pluginName,
      content: createRuntimePluginFile(routesDeclTemplate),
    });
  });
}
