import { NuxtRouteConfig } from '@nuxt/types/config/router';
export declare function extractMatchingSiblings(mainRoute: NuxtRouteConfig, siblingRoutes?: NuxtRouteConfig[]): NuxtRouteConfig[] | undefined;
export declare function extractUnMatchingSiblings(mainRoute: NuxtRouteConfig, siblingRoutes?: NuxtRouteConfig[]): NuxtRouteConfig[] | undefined;
export declare function extractChunkRouteName(chunkName?: string): string | undefined;
