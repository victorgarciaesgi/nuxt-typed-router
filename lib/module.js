"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const chalk_1 = __importDefault(require("chalk"));
const save_1 = require("./save");
const utils_1 = require("./utils");
const typedRouterModule = function (moduleOptions) {
    const { filePath = `${this.options.srcDir}/__routes.js`, routesObjectName = 'routerPagesNames', stripAtFromName = false, } = { ...this.options.typedRouter, ...moduleOptions };
    this.nuxt.hook('build:extendRoutes', async (existingRoutes) => {
        try {
            this.extendRoutes(async (routes) => {
                utils_1.transformRouteNames(routes, stripAtFromName);
                let routesObjectString = '{';
                let routeObjectJs = {};
                const recursiveTypedRoutes = (route, level, routeObject) => {
                    const routeName = route.name;
                    if (route.children) {
                        const [parentName, parentName2] = route.path.split('/');
                        const nameKey = lodash_1.camelCase(parentName || parentName2 || 'index');
                        routesObjectString += `${nameKey}:{`;
                        routeObject[nameKey] = {};
                        route.children.map((r) => recursiveTypedRoutes(r, level + 1, routeObject[nameKey]));
                        routesObjectString += '},';
                    }
                    else if (routeName) {
                        let splitted = routeName.split('-');
                        splitted = splitted.slice(level, splitted.length);
                        const keyName = lodash_1.camelCase(splitted.join('-')) || 'index';
                        routesObjectString += `'${keyName}': '${routeName}',`;
                        routeObject[keyName] = routeName;
                    }
                };
                routes.map((r) => recursiveTypedRoutes(r, 0, routeObjectJs));
                routesObjectString += '}';
                const templateRoutes = `export const ${routesObjectName} = ${routesObjectString};`;
                await save_1.saveRoutesFiles(filePath, templateRoutes);
            });
        }
        catch (e) {
            console.error(chalk_1.default.red('Error while generating routes definitions model'), '\n' + e);
        }
    });
};
module.exports = typedRouterModule;
module.exports.meta = require('../package.json');
