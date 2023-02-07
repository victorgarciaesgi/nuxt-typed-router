import logSymbols from 'log-symbols';
import { GeneratorOutput } from '../../../types';
import { moduleOptionStore } from '../../config';
import { processPathAndWriteFile } from '../../fs';
import {
  createIndexFile,
  createNavigateToFile,
  createTypedRouterFile,
  createRoutesTypesFile,
  createUseTypedRouterFile,
  createTypeUtilsRuntimeFile,
  createUseTypedRouteFile,
  createTypedRouterDefinitionFile,
  createi18nRouterFile,
  createPathsFiles,
} from '../generators/files';

import { watermarkTemplate } from '../static';

let previousGeneratedRoutes = '';

type SaveGeneratedFiles = {
  outputData: GeneratorOutput;
};

export async function saveGeneratedFiles({ outputData }: SaveGeneratedFiles): Promise<void> {
  const { i18n } = moduleOptionStore;
  const filesMap: Array<{ fileName: string; content: string }> = [
    {
      fileName: '__useTypedRouter.ts',
      content: createUseTypedRouterFile(outputData.routesDeclTemplate),
    },
    {
      fileName: '__useTypedRoute.ts',
      content: createUseTypedRouteFile(outputData.routesDeclTemplate),
    },
    {
      fileName: '__paths.d.ts',
      content: createPathsFiles(outputData),
    },
    {
      fileName: `__routes.ts`,
      content: createRoutesTypesFile(outputData),
    },
    {
      fileName: '__navigateTo.ts',
      content: createNavigateToFile(),
    },
    {
      fileName: `__router.d.ts`,
      content: createTypedRouterFile(),
    },
    {
      fileName: `__types_utils.d.ts`,
      content: createTypeUtilsRuntimeFile(),
    },
    {
      fileName: `typed-router.d.ts`,
      content: createTypedRouterDefinitionFile(),
    },
    {
      fileName: 'index.ts',
      content: createIndexFile(),
    },
  ];

  if (i18n) {
    filesMap.push({
      fileName: '__i18n-router.ts',
      content: createi18nRouterFile(),
    });
  }

  await Promise.all(
    filesMap.map(({ content, fileName }) => {
      const waterMakeredContent = `
        ${watermarkTemplate}

        ${content}
      `;
      return processPathAndWriteFile({ content: waterMakeredContent, fileName });
    })
  );
  if (previousGeneratedRoutes !== outputData.routesList.join(',')) {
    previousGeneratedRoutes = outputData.routesList.join(',');
    console.log(logSymbols.success, `Router autocompletions generated 🚦`);
  }
}
