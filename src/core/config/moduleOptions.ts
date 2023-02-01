import { defu } from 'defu';
import { ModuleOptions, StrictOptions } from '../../types';

interface CustomNuxtConfigOptions {
  autoImport?: boolean;
  rootDir?: string;
  i18n?: boolean;
  i18nLocales?: string[];
}

class ModuleOptionsStore {
  plugin: boolean = false;
  strict: boolean | StrictOptions = false;
  autoImport: boolean = false;
  rootDir: string = '';
  i18n: boolean = false;
  i18nLocales: string[] = [];

  updateOptions(options: ModuleOptions & CustomNuxtConfigOptions) {
    if (options.plugin != null) this.plugin = options.plugin;
    if (options.strict != null) this.strict = options.strict;
    if (options.autoImport != null) this.autoImport = options.autoImport;
    if (options.rootDir != null) this.rootDir = options.rootDir;
    if (options.i18n != null) this.i18n = options.i18n;
    if (options.i18nLocales != null) this.i18nLocales = options.i18nLocales;
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
