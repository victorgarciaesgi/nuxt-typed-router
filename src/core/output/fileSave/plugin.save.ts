import { Nuxt } from '@nuxt/schema';
import { processPathAndWriteFile } from '../../fs';
import { createPluginFile } from '../generators';

type HandlePluginFileSaveArgs = {
  nuxt: Nuxt;
  routesDeclTemplate: string;
};

export function handlePluginFileSave({ nuxt, routesDeclTemplate }: HandlePluginFileSaveArgs) {
  const pluginName = '__typed-router.ts';
  const srcDir = nuxt.options.srcDir;

  async function savePlugin() {
    const pluginFolder = `${srcDir}/plugins`;
    await processPathAndWriteFile({
      outDir: pluginFolder,
      rootDir: srcDir,
      fileName: pluginName,
      content: createPluginFile(routesDeclTemplate),
    });
  }

  nuxt.hook('build:done', savePlugin);
  nuxt.hook('prepare:types', savePlugin);
}
