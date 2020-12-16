import fs from 'fs';
import * as prettier from 'prettier';
import path from 'path';
import logSymbols from 'log-symbols';
import chalk from 'chalk';

const defaultPrettierOptions = {
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'strict',
} as const;

export async function saveRoutesFiles(filePath: string, templateRoutes: string) {
  try {
    let prettierFoundOptions = await prettier.resolveConfig(process.cwd());

    if (!prettierFoundOptions) {
      prettierFoundOptions = defaultPrettierOptions;
    }

    const formatedModelsFile = prettier.format(templateRoutes, {
      ...prettierFoundOptions,
      parser: 'typescript',
    });
    const savePath = path.resolve(process.cwd(), filePath);
    fs.writeFileSync(savePath, formatedModelsFile);

    console.log(logSymbols.success, `Route definition file generated at ${chalk.blue(savePath)}`);
  } catch (e) {
    console.error(chalk.red('Error while saving route definitions file'), '\n' + e);
    return Promise.reject(e);
  }
}
