import { NuxtRouteConfig } from '@nuxt/types/config/router';

/** Mutate the list of routes */
export function transformRouteNames(existingRoutes: NuxtRouteConfig[], stripAtFromName: boolean) {
  const recursiveMatch = (route: NuxtRouteConfig, parent?: NuxtRouteConfig) => {
    if (route.path && route.path.startsWith('@') && !!parent) {
      route.path = route.path.split('@')[1];
      if (stripAtFromName && route.name) {
        const [left, right] = route.name?.split('@');
        route.name = `${left}${right}`;
      }
      const parentsChildren = parent.children;
      if (parentsChildren) {
        let defaultName = null;
        if (route.name) {
          defaultName = route.name;
        } else if (route.children) {
          const child = route.children.find((f: any) => f.path === '');
          if (child) {
            defaultName = child.name;
          }
        } else {
          defaultName = null;
        }
        parentsChildren.push({
          path: '',
          name: `${parent.name}-index`,
          redirect: {
            ...(defaultName && { name: defaultName }),
            ...(!defaultName && { path: route.path }),
          },
        });
        delete parent.name;
      }
    }
    if (route.children) {
      route.children.forEach((child) => recursiveMatch(child, route));
    }
  };
  existingRoutes.map((route) => recursiveMatch(route));
}

export function extractChunkMain(chunkName?: string): string | undefined {
  let chunkArray = chunkName?.split('/');
  chunkArray?.pop();
  return chunkArray?.join('/');
}

export function extractChunkRouteName(chunkName?: string): string | undefined {
  return chunkName?.split('/')[chunkName.length - 1];
}

export function extractMatchingSiblings(
  mainRoute: NuxtRouteConfig,
  siblingRoutes?: NuxtRouteConfig[]
) {
  return siblingRoutes?.filter((s) => {
    const chunkName = extractChunkMain(mainRoute.chunkName);
    if (chunkName && s.name) {
      const siblingChunkName = extractChunkMain(s.chunkName);
      if (!siblingChunkName) return false;
      return chunkName === siblingChunkName;
    }
    return false;
  });
}

export function extractUnMatchingSiblings(
  mainRoute: NuxtRouteConfig,
  siblingRoutes?: NuxtRouteConfig[]
) {
  return siblingRoutes?.filter((s) => {
    const chunkName = extractChunkMain(mainRoute.chunkName);
    if (chunkName) {
      const siblingChunkName = extractChunkMain(s.chunkName);
      if (!siblingChunkName) return false;
      return chunkName !== siblingChunkName;
    }
    return false;
  });
}
