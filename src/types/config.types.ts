export interface ModuleOptions {
  /**
   * ⛔️ Experimental, disable it if you encounter problems
   *
   * Enables path autocomplete and path validity for programmatic validation
   *
   *  @default true
   */
  experimentalPathCheck?: boolean;
  /**
   * Set to false if you don't want a plugin generated
   * @default false
   */
  plugin?: boolean;
  /**
   * Customise Route location arguments strictness for `NuxtLink` or `router`
   * All strict options are disabled by default.
   * You can tweak options to add strict router navigation options.
   *
   * By passing `true` you can enable all of them
   *
   * @default false
   */
  strict?: boolean | StrictOptions;
}

export interface StrictOptions {
  NuxtLink?: StrictParamsOptions;
  router?: StrictParamsOptions;
}

export interface StrictParamsOptions {
  /**
   * Prevent passing string path to the RouteLocation argument.
   *
   * Ex:
   * ```vue
   * <template>
   *   <NuxtLink to='/login'/> // Error ❌
   * </template>
   * ```
   * Or
   * ```ts
   * router.push('/login'); // Error ❌
   * navigateTo('/login'); // Error ❌
   * ```
   *
   * @default false
   */
  strictToArgument?: boolean;
  /**
   * Prevent passing a `params` property in the RouteLocation argument.
   *
   * Ex:
   * ```vue
   * <template>
   *   <NuxtLink :to='{path: "/login"}'/> // Error ❌
   * </template>
   * ```
   * Or
   * ```ts
   * router.push({path: "/login"}); // Error ❌
   * navigateTo({path: "/login"}); // Error ❌
   * ```
   *
   * @default false
   */
  strictRouteLocation?: boolean;
}
