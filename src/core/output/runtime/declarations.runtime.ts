import { staticTypesImports, watermarkTemplate } from '../templates';
import { createRuntimeTypeUtils } from './typeUtils.runtime';

export function createDeclarationRoutesFile(autoImport: boolean): string {
  return `
    ${watermarkTemplate}
    
    ${staticTypesImports}

    ${createRuntimeTypeUtils(autoImport)}
  `;
}
