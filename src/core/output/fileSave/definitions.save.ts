import logSymbols from 'log-symbols';
import { GeneratorOutput } from '../../../types';
import { processPathAndWriteFile } from '../../fs';
import {
  createDeclarationRoutesFile,
  createRuntimeIndexFile,
  createRuntimeNavigateToFunction,
  createRuntimeRouterTypes,
  createRuntimeRoutesFile,
  createRuntimeUseTypedRouterFile,
  createUseTypedRouteFile,
} from '../runtime';

let previousGeneratedRoutes = '';

type SaveGeneratedFiles = {
  rootDir: string;
  outputData: GeneratorOutput;
  autoImport: boolean;
};

export async function saveGeneratedFiles({
  rootDir,
  autoImport,
  outputData: { routesDeclTemplate, routesList, routesObjectTemplate, routesParams },
}: SaveGeneratedFiles): Promise<void> {
  const filesMap: Array<{ fileName: string; content: string }> = [
    {
      fileName: '__useTypedRouter.ts',
      content: createRuntimeUseTypedRouterFile(routesDeclTemplate),
    },
    {
      fileName: '__useTypedRoute.ts',
      content: createUseTypedRouteFile(routesDeclTemplate),
    },
    {
      fileName: `__routes.ts`,
      content: createRuntimeRoutesFile({
        routesList,
        routesObjectTemplate,
        routesDeclTemplate,
        routesParams,
      }),
    },
    {
      fileName: '__utils.ts',
      content: createRuntimeNavigateToFunction(),
    },
    {
      fileName: `__router.d.ts`,
      content: createRuntimeRouterTypes(),
    },
    {
      fileName: `typed-router.d.ts`,
      content: createDeclarationRoutesFile(autoImport),
    },
    {
      fileName: 'index.ts',
      content: createRuntimeIndexFile(),
    },
  ];

  await Promise.all(
    filesMap.map(({ content, fileName }) => processPathAndWriteFile({ rootDir, content, fileName }))
  );
  if (previousGeneratedRoutes !== routesList.join(',')) {
    previousGeneratedRoutes = routesList.join(',');
    console.log(logSymbols.success, `Router autocompletions generated 🚦`);
  }
}
