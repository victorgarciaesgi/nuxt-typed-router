import { NuxtRouteConfig } from '@nuxt/types/config/router';

/** Mutate the list of routes */
export function transformRouteNames(existingRoutes: NuxtRouteConfig[], stripAtFromName: boolean) {
  const recursiveMatch = (route: NuxtRouteConfig, parent?: NuxtRouteConfig) => {
    if (route.path && route.path.startsWith('%40') && !!parent) {
      route.path = route.path.split('%40')[1];
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
      }
    }
    if (route.children) {
      route.children.forEach((child) => recursiveMatch(child, route));
    }
  };
  existingRoutes.map((route) => recursiveMatch(route));
}
