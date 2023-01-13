import { staticTypesImports, staticTypeUtils, watermarkTemplate } from '../templates';

export function createDeclarationRoutesFile(): string {
  return `
    ${watermarkTemplate}
    
    ${staticTypesImports}

    ${staticTypeUtils}
  `;
}
