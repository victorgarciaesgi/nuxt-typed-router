import { Nuxt } from '@nuxt/schema';
import { processPathAndWriteFile } from '../../fs';
import { createRuntimePluginFile } from '../runtime';

type HandlePluginFileSaveArgs = {
  nuxt: Nuxt;
  srcDir: string;
  routesDeclTemplate: string;
};

export function handlePluginFileSave({
  nuxt,
  srcDir,
  routesDeclTemplate,
}: HandlePluginFileSaveArgs) {
  const pluginName = '__typed-router.ts';

  nuxt.hook('build:done', async () => {
    const pluginFolder = `${srcDir}/plugins`;
    await processPathAndWriteFile({
      outDir: pluginFolder,
      srcDir,
      fileName: pluginName,
      content: createRuntimePluginFile(routesDeclTemplate),
    });
  });
}
