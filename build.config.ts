import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  declaration: true,
  rollup: { cjsBridge: true },
  entries: ['./src/module', { input: 'src/templates/', outDir: 'dist/templates' }],
  externals: ['@nuxt/kit', '@nuxt/schema', 'vue'],
});
