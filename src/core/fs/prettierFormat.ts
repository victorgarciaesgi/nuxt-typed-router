import chalk from 'chalk';
import logSymbols from 'log-symbols';

const defaultPrettierOptions = {
  printWidth: 100,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'strict',
} as const;

// export function formatOutputWithPrettier(template: string): string {
// try {
//   let prettierFoundOptions = await resolveConfig(process.cwd());

//   if (!prettierFoundOptions) {
//     prettierFoundOptions = defaultPrettierOptions;
//   }

//   const formatedTemplate = format(template, {
//     ...prettierFoundOptions,
//     parser: 'typescript',
//   });

//   return template;
// } catch (e) {
//   console.error(logSymbols.error, chalk.red('Error while formatting the output'), '\n' + e);
//   return Promise.reject(e);
// }
// }
