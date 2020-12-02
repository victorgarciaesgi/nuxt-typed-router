"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRouteNames = void 0;
function transformRouteNames(existingRoutes, stripAtFromName) {
    const recursiveMatch = (route, parent) => {
        var _a;
        if (route.path && route.path.startsWith('%40') && !!parent) {
            route.path = route.path.split('%40')[1];
            if (stripAtFromName && route.name) {
                const [left, right] = (_a = route.name) === null || _a === void 0 ? void 0 : _a.split('@');
                route.name = `${left}${right}`;
            }
            const parentsChildren = parent.children;
            if (parentsChildren) {
                let defaultName = null;
                if (route.name) {
                    defaultName = route.name;
                }
                else if (route.children) {
                    const child = route.children.find((f) => f.path === '');
                    if (child) {
                        defaultName = child.name;
                    }
                }
                else {
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
exports.transformRouteNames = transformRouteNames;
