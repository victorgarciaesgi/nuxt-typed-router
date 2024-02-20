import type { NuxtPage } from '@nuxt/schema';

export function extractUnMatchingSiblings(
  mainRoute: NuxtPage,
  siblingRoutes?: NuxtPage[]
): NuxtPage[] | undefined {
  return siblingRoutes?.filter((s) => {
    return s.name !== mainRoute.name;
  });
}
