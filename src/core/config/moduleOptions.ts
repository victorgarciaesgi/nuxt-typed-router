import { defu } from 'defu';
import { NuxtI18nOptions } from '@nuxtjs/i18n';
import { ModuleOptions, StrictOptions } from '../../types';

interface CustomNuxtConfigOptions {
  autoImport?: boolean;
  rootDir?: string;
  buildDir?: string;
  i18n?: boolean;
  i18nOptions?: NuxtI18nOptions | null;
}

class ModuleOptionsStore {
  plugin: boolean = false;
  strict: boolean | StrictOptions = false;
  pathCheck: boolean = true;
  autoImport: boolean = false;
  rootDir: string = '';
  buildDir: string = '';
  i18n: boolean = false;
  i18nOptions: NuxtI18nOptions | null = null;
  i18nLocales: string[] = [];

  updateOptions(options: ModuleOptions & CustomNuxtConfigOptions) {
    if (options.plugin != null) this.plugin = options.plugin;
    if (options.strict != null) this.strict = options.strict;
    if (options.autoImport != null) this.autoImport = options.autoImport;
    if (options.rootDir != null) this.rootDir = options.rootDir;
    if (options.buildDir != null) this.buildDir = options.buildDir;
    if (options.i18n != null) this.i18n = options.i18n;
    if (options.i18nOptions != null) {
      this.i18nOptions = options.i18nOptions;
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
