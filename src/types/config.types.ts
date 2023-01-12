export interface ModuleOptions {
  /** Output directory where you cant the files to be saved (ex: "./generated")
   * @default "<srcDir>/generated"
   */
  outDir?: string;
  /**  Name of the routesNames object (ex: "routesTree")
   * @default "routerPagesNames"
   * */
  routesObjectName?: string;
  /**
   * Set to false if you don't want a plugin generated
   * @default false
   */
  plugin?: boolean;
}
