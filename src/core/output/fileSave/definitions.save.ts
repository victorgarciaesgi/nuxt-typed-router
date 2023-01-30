import logSymbols from 'log-symbols';
import { GeneratorOutput } from '../../../types';
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
} from '../generators/files';

import { watermarkTemplate } from '../static';

let previousGeneratedRoutes = '';

type SaveGeneratedFiles = {
  outputData: GeneratorOutput;
};

export async function saveGeneratedFiles({
  outputData: { routesDeclTemplate, routesList, routesObjectTemplate, routesParams },
}: SaveGeneratedFiles): Promise<void> {
  const filesMap: Array<{ fileName: string; content: string }> = [
    {
      fileName: '__useTypedRouter.ts',
      content: createUseTypedRouterFile(routesDeclTemplate),
    },
    {
      fileName: '__useTypedRoute.ts',
      content: createUseTypedRouteFile(routesDeclTemplate),
    },
    {
      fileName: `__routes.ts`,
      content: createRoutesTypesFile({
        routesList,
        routesObjectTemplate,
        routesDeclTemplate,
        routesParams,
      }),
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

  await Promise.all(
    filesMap.map(({ content, fileName }) => {
      const waterMakeredContent = `
        ${watermarkTemplate}

        ${content}
      `;
      return processPathAndWriteFile({ content: waterMakeredContent, fileName });
    })
  );
  if (previousGeneratedRoutes !== routesList.join(',')) {
    previousGeneratedRoutes = routesList.join(',');
    console.log(logSymbols.success, `Router autocompletions generated 🚦`);
  }
}
