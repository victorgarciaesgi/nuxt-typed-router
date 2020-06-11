// @ts-check
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
      const recursiveTypedRoutes = (route, level) => {
        const routeName = route.name;
        if (route.children) {
          const [parentName, parentName2] = route.path.split('/');
          routesInterfaces += `${camelCase(parentName || parentName2 || 'index')}:{`;
          route.children.map(r => recursiveTypedRoutes(r, level + 1));
          routesInterfaces += '},';
        } else if (routeName) {
          let splitted = routeName.split('-');
          splitted = splitted.slice(level, splitted.length);
          routesInterfaces += `'${camelCase(splitted.join('-')) || 'index'}': '${routeName}',`;
          routesEnum.push(`'${route.name}'`);
        }
      };
      routes.map(r => recursiveTypedRoutes(r, 0));
      routesInterfaces += '}';

      const template = `
      export const ${options.routesObjectName || 'routerPagesNames'} = ${routesInterfaces};`;
      const routesEnumsTemplate = `export type RouteNames = ${routesEnum.join('|')};`;

      try {
        if (options.filePath) {
          let prettierPath = fs.existsSync(path.resolve(process.cwd(), '.prettierrc'))
            ? path.resolve(process.cwd(), '.prettierrc')
            : path.resolve(__dirname, '../.prettierrc');

          const formatedModelsFile = prettier.format(template, {
            config: prettierPath,
            parser: 'typescript',
          });
          const savePath = path.resolve(process.cwd(), options.filePath);
          await fs.writeFileSync(savePath, formatedModelsFile);
          console.log(
            chalk.green(`[nuxt-typed-router] Route definition file generated at ${savePath}`)
          );
        }

        await fs.writeFileSync(
          path.resolve(__dirname, '../types/__generated.ts'),
          routesEnumsTemplate
        );
        console.log(
          chalk.green(
            '[nuxt-typed-router] $typedRouter definitions updated, you may reload your editor to see changes'
          )
        );
      } catch (e) {
        console.error(chalk.red('Error while saving route definitions file'), '\n' + e);
      }
    } catch (e) {
      console.error(chalk.red('Error while generating routes definitions model'), '\n' + e);
    }
  });
}

module.exports = typedRouterModule;
module.exports.meta = require('../package.json');
