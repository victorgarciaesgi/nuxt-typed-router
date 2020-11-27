"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const prettier = __importStar(require("prettier"));
const lodash_1 = require("lodash");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const log_symbols_1 = __importDefault(require("log-symbols"));
require("./templates/nuxt-typed-router");
const typedRouterModule = function (moduleOptions) {
    const { filePath = `${this.options.srcDir}/__routes.js`, routesObjectName = 'routerPagesNames', stripAtFromName = false, } = { ...this.options.typedRouter, ...moduleOptions };
    this.nuxt.hook('build:extendRoutes', async (routes) => {
        try {
            this.extendRoutes(async (existingRoutes) => {
                let formatedRoutes;
                const recursiveMatch = (route, parent) => {
                    var _a;
                    if (route.path && route.path.startsWith('@') && !!parent) {
                        route.path = route.path.split('@')[1];
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
                formatedRoutes = existingRoutes;
                let routesObject = '{';
                const recursiveTypedRoutes = (route, level) => {
                    const routeName = route.name;
                    if (route.children) {
                        const [parentName, parentName2] = route.path.split('/');
                        routesObject += `${lodash_1.camelCase(parentName || parentName2 || 'index')}:{`;
                        route.children.map((r) => recursiveTypedRoutes(r, level + 1));
                        routesObject += '},';
                    }
                    else if (routeName) {
                        let splitted = routeName.split('-');
                        splitted = splitted.slice(level, splitted.length);
                        routesObject += `'${lodash_1.camelCase(splitted.join('-')) || 'index'}': '${routeName}',`;
                    }
                };
                formatedRoutes.map((r) => recursiveTypedRoutes(r, 0));
                routesObject += '}';
                const template = `export const ${routesObjectName} = ${routesObject};`;
                const templateForLocal = `export default ${routesObject};`;
                try {
                    let prettierFoundOptions = await prettier.resolveConfig(process.cwd());
                    if (!prettierFoundOptions) {
                        prettierFoundOptions = require('../.prettierrc');
                    }
                    const formatedModelsFile = prettier.format(template, {
                        ...prettierFoundOptions,
                        parser: 'typescript',
                    });
                    const savePath = path_1.default.resolve(process.cwd(), filePath);
                    await fs_1.default.writeFileSync(savePath, formatedModelsFile);
                    await fs_1.default.writeFileSync(path_1.default.resolve(__dirname, './generated.js'), templateForLocal);
                    console.log(log_symbols_1.default.success, `Route definition file generated at ${chalk_1.default.blue(savePath)}`);
                    this.addPlugin({
                        src: path_1.default.resolve(__dirname, './templates/nuxt-typed-router.js'),
                    });
                }
                catch (e) {
                    console.error(chalk_1.default.red('Error while saving route definitions file'), '\n' + e);
                }
                return formatedRoutes;
            });
        }
        catch (e) {
            console.error(chalk_1.default.red('Error while generating routes definitions model'), '\n' + e);
        }
    });
};
module.exports = typedRouterModule;
module.exports.meta = require('../package.json');
