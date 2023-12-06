import chalk from 'chalk';
import logSymbols from 'log-symbols';
import prettier from 'prettier';

const defaultPrettierOptions = {
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'strict',
} as const;

export async function formatOutputWithPrettier(template: string): Promise<string> {
  try {
    let prettierFoundOptions = await prettier.resolveConfig(process.cwd());

    if (!prettierFoundOptions) {
      prettierFoundOptions = defaultPrettierOptions;
    }

    const formatedTemplate = prettier.format(template, {
      ...prettierFoundOptions,
      parser: 'typescript',
    });

    return formatedTemplate;
  } catch (e) {
    console.error(logSymbols.error, chalk.red('Error while formatting the output'), '\n' + e);
    return Promise.reject(e);
  }
}
