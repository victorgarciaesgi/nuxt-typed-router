import path from 'path';
import { defu } from 'defu';
import type { NuxtI18nOptions } from '@nuxtjs/i18n/dist/module';
import type { ModuleOptions, StrictOptions } from '../../types';
import logSymbols from 'log-symbols';
import { isDynamicPattern, globbySync } from 'globby';

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
  autoImport: boolean = false;
  rootDir: string = '';
  buildDir: string = '';
  srcDir: string = '';
  pagesDir: string = '';
  i18n: boolean = false;
  i18nOptions: NuxtI18nOptions | null = null;
  i18nLocales: string[] = [];
  ignoreRoutes: string[] = [];

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

    if (options.isDocumentDriven) {
      this.ignoreRoutes.push('[...slug].vue');
    }

    // Ignore route related
    const catchAllRegex = /\[...*].*/;
    const relativeRoot = path.relative(process.cwd(), this.pagesDir);

    const dynamicGlobs = this.ignoreRoutes
      .filter((f) => isDynamicPattern(f) && !catchAllRegex.test(f))
      .map((file) => path.join(relativeRoot, file));

    const normalGlobs = this.ignoreRoutes.filter(
      (f) => !(isDynamicPattern(f) && !catchAllRegex.test(f))
    );
    const resolvedGlobs = globbySync(dynamicGlobs, { expandDirectories: true });

    this.resolvedIgnoredRoutes = [
      ...normalGlobs.map((m) => path.join(this.pagesDir, m)),
      ...resolvedGlobs.map((m) => path.join(process.cwd(), m)),
    ];
  }

  public resolvedIgnoredRoutes: string[] = [];

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
