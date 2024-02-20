import { addPluginTemplate } from '@nuxt/kit';
import { createPluginFile } from '../generators';

/** Create a Nuxt plugin to add `$typedRouter` and `$typedRoute` */
export async function handleAddPlugin() {
  const pluginName = '__typed-router.plugin.ts';

  addPluginTemplate({
    filename: pluginName,
    getContents: createPluginFile,
    mode: 'all',
  });
}
