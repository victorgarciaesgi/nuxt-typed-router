import pagesNamesModel from './generated.ts';
declare module 'vue/types/vue' {
    interface Vue {
        $routesNames: typeof pagesNamesModel;
    }
}
//# sourceMappingURL=vue.d.ts.map