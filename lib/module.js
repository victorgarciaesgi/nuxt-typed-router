import fs from 'fs';
import * as prettier from 'prettier';
import { camelCase } from 'lodash';
import chalk from 'chalk';
const path = require('path');

function typedRouterModule(moduleOptions) {
  const options = { ...this.options.typedRouter, ...moduleOptions };

  this.addPlugin({
    src: path.resolve(__dirname, './templates/nuxt-typed-router.js'),
  });

  this.nuxt.hook('build:extendRoutes', async routes => {
    let routesInterfaces = '{';
    let routesEnum = [];
    try {
      const recursiveTypedRoutes = route => {
        const name = route.name;
        if (name) routesInterfaces += `'${camelCase(name)}': '${name}',`;
        if (route.children) {
          const [_, name] = route.chunkName.split('pages/');
          routesInterfaces += `${camelCase(name)}:{`;
          route.children.map(recursiveTypedRoutes);
          routesInterfaces += '},';
        }
        if (route.name) routesEnum.push(`'${route.name}'`);
      };
      routes.map(recursiveTypedRoutes);
      routesInterfaces += '}';

      const template = `
      export const routerPagesNames = ${routesInterfaces};`;
      const routesEnumsTemplate = `export type RouteNames = ${routesEnum.join('|')};`;

      try {
        if (options.filePath) {
          const formatedModelsFile = prettier.format(template, {
            config: path.resolve(__dirname, '.prettierrc') || '.prettierrc',
            semicolons: true,
            singleQuote: true,
            printWidth: 100,
            bracketSpacing: true,
            parser: 'typescript',
          });
          await fs.writeFileSync(path.resolve(__dirname, filePath), formatedModelsFile);
        }

        await fs.writeFileSync(
          path.resolve(__dirname, '../types/__generated.ts'),
          routesEnumsTemplate
        );
      } catch (e) {
        console.error(chalk.red('Error while saving route definitions file'), e);
      }
    } catch (e) {
      console.error(chalk.red('Error while generating routes definitions model'), e);
    }
  });
}

module.exports = typedRouterModule;
module.exports.meta = require('../package.json');
