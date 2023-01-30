import { addPluginTemplate } from '@nuxt/kit';
import { createPluginFile } from '../generators';

export async function handleAddPlugin() {
  const pluginName = '__typed-router.plugin.ts';

  addPluginTemplate({
    filename: pluginName,
    getContents: createPluginFile,
    mode: 'all',
  });
}
