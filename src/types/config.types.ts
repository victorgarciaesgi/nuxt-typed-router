export interface ModuleOptions {
  /**
   * Set to false if you don't want a plugin generated
   * @default false
   */
  plugin?: boolean;
  /**
   * Prevent passing a string path to `router` or `<NuxtLink/>`
   * Ex:
   *
   * ```ts
   * router.push('/login'); // Error ❌
   * ```
   * @default false
   */
  strict?: boolean | StrictOptions;
}

export interface StrictOptions {
  NuxtLink: StrictParamsOptions;
  router: StrictParamsOptions;
}

export interface StrictParamsOptions {
  /**
   * @default false
   */
  strictToArgument?: boolean;
  /**
   * @default false
   */
  strictRouteLocation?: boolean;
}
