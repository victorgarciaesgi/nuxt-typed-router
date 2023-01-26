import { Nuxt } from '@nuxt/schema';
import { processPathAndWriteFile } from '../../fs';
import { createPluginFile } from '../generators';
import { addPluginTemplate } from '@nuxt/kit';

type HandlePluginFileSaveArgs = {
  nuxt: Nuxt;
  routesDeclTemplate: string;
};

export async function handleAddPlugin() {
  const pluginName = '__typed-router.plugin.ts';
  // const srcDir = nuxt.options.srcDir;

  const plugin = addPluginTemplate({
    filename: pluginName,
    getContents: createPluginFile,
    mode: 'all',
  });

  async function savePlugin() {
    // const pluginFolder = `${srcDir}/plugins`;
    // await processPathAndWriteFile({
    //   outDir: pluginFolder,
    //   rootDir: srcDir,
    //   fileName: pluginName,
    //   content: createPluginFile(),
    // });
  }

  // nuxt.hook('build:done', savePlugin);
  // nuxt.hook('prepare:types', savePlugin);
}
