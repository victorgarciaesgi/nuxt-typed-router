import logSymbols from 'log-symbols';
import { GeneratorOutput } from '../../../types';
import { processPathAndWriteFile } from '../../fs';
import {
  createDeclarationRoutesFile,
  createRuntimeIndexFile,
  createRuntimeRoutesFile,
  createRuntimeUseTypedRouterFile,
  createUseTypedRouteFile,
} from '../runtime';

let previousGeneratedRoutes = '';

type SaveGeneratedFiles = {
  srcDir: string;
  outputData: GeneratorOutput;
};

export async function saveGeneratedFiles({
  srcDir,
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
      fileName: `typed-router.d.ts`,
      content: createDeclarationRoutesFile(),
    },
    {
      fileName: 'index.ts',
      content: createRuntimeIndexFile(),
    },
  ];

  await Promise.all(
    filesMap.map(({ content, fileName }) => processPathAndWriteFile({ srcDir, content, fileName }))
  );
  if (previousGeneratedRoutes !== routesList.join(',')) {
    previousGeneratedRoutes = routesList.join(',');
    console.log(logSymbols.success, `[typed-router] Routes definitions generated`);
  }
}
