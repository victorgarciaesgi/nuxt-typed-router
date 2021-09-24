import { NuxtRouteConfig } from '@nuxt/types/config/router';
export declare function transformRouteNames(existingRoutes: NuxtRouteConfig[], stripAtFromName: boolean): void;
export declare function extractChunkMain(chunkName?: string): string | undefined;
export declare function extractChunkRouteName(chunkName?: string): string | undefined;
export declare function extractMatchingSiblings(mainRoute: NuxtRouteConfig, siblingRoutes?: NuxtRouteConfig[]): NuxtRouteConfig[] | undefined;
export declare function extractUnMatchingSiblings(mainRoute: NuxtRouteConfig, siblingRoutes?: NuxtRouteConfig[]): NuxtRouteConfig[] | undefined;
