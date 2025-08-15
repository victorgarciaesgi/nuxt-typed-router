import path from 'path';
import { defu } from 'defu';
import type { NuxtI18nOptions } from '@nuxtjs/i18n';
import type { ModuleOptions, StrictOptions } from '../../types';
import logSymbols from 'log-symbols';
interface CustomNuxtConfigOptions {
  autoImport?: boolean;
  rootDir?: string;
  buildDir?: string;
  srcDir?: string;
  i18n?: boolean;
  i18nOptions?: NuxtI18nOptions | null;
  isDocumentDriven?: boolean;
}

class ModuleOptionsStore {
  plugin: boolean = false;
  strict: boolean | StrictOptions = false;
  pathCheck: boolean = true;
  disablePrettier: boolean = false;
  autoImport: boolean = false;
  rootDir: string = '';
  buildDir: string = '';
  srcDir: string = '';
  pagesDir: string = '';
  i18n: boolean = false;
  i18nOptions: NuxtI18nOptions | null = null;
  i18nLocales: string[] = [];
  ignoreRoutes: string[] = [];
  ignoreI18nModifiers: boolean = false;

  updateOptions(options: ModuleOptions & CustomNuxtConfigOptions) {
    if (options.plugin != null) this.plugin = options.plugin;
    if (options.strict != null) this.strict = options.strict;
    if (options.autoImport != null) this.autoImport = options.autoImport;
    if (options.rootDir != null) this.rootDir = options.rootDir;
    if (options.srcDir != null) this.srcDir = options.srcDir;
    if (options.buildDir != null) this.buildDir = options.buildDir;
    this.pagesDir = path.join(this.srcDir, 'pages');
    if (options.i18n != null) this.i18n = options.i18n;
    if (options.i18nOptions != null) {
      this.i18nOptions = defu(options.i18nOptions, {
        strategy: 'prefix_except_default',
      } satisfies Partial<NuxtI18nOptions>);
      if (
        this.i18nOptions.strategy === 'prefix_except_default' &&
        !options.i18nOptions.defaultLocale
      ) {
        console.error(
          logSymbols.error,
          "You have not set 'i18n.defaultLocale', it's required when using 'prefix_except_default' mode (default one)"
        );
      }
      if (options.i18nOptions.locales) {
        this.i18nLocales = options.i18nOptions.locales.map((l) => {
          if (typeof l === 'string') {
            return l;
          } else {
            return l.code;
          }
        });
      }
    }
    if (options.pathCheck != null) {
      this.pathCheck = options.pathCheck;
    }
    if (options.ignoreRoutes) {
      this.ignoreRoutes = options.ignoreRoutes;
    }
    if (options.ignoreI18nModifier) {
      this.ignoreI18nModifiers = options.ignoreI18nModifier;
    }

    if (options.isDocumentDriven) {
      this.ignoreRoutes.push('[...slug].vue');
    }
  }

  get resolvedIgnoredRoutes(): string[] {
    return this.ignoreRoutes.map((file) => path.join(this.pagesDir, file));
  }

  getResolvedStrictOptions(): Required<StrictOptions> {
    let resolved: Required<StrictOptions>;
    if (typeof this.strict === 'boolean') {
      if (this.strict) {
        resolved = {
          NuxtLink: {
            strictRouteLocation: true,
            strictToArgument: true,
          },
          router: {
            strictRouteLocation: true,
            strictToArgument: true,
          },
        };
      } else {
        resolved = {
          NuxtLink: {
            strictRouteLocation: false,
            strictToArgument: false,
          },
          router: {
            strictRouteLocation: false,
            strictToArgument: false,
          },
        };
      }
    } else {
      resolved = defu(this.strict, {
        NuxtLink: {
          strictRouteLocation: false,
          strictToArgument: false,
        },
        router: {
          strictRouteLocation: false,
          strictToArgument: false,
        },
      } satisfies Required<StrictOptions>);
    }

    return resolved;
  }
}

export const moduleOptionStore = new ModuleOptionsStore();
