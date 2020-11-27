// @ts-nocheck
import pagesNamesModel from './generated.ts';
declare module 'vue/types/vue' {
  interface Vue {
    $routesNames: typeof pagesNamesModel;
  }
}
