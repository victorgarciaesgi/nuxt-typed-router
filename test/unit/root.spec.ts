import { readFile } from 'fs/promises';

describe('Init route file', () => {
  it('should generate to correct tree for the pages folder', async () => {
    const routeFile = await readFile('playground/generated/__routes.ts', 'utf-8');
    const definitionsFile = await readFile('playground/generated/typed-router.d.ts', 'utf-8');
    const hookFile = await readFile('playground/generated/__useTypedRouter.ts', 'utf-8');
    const pluginFile = await readFile('playground/plugins/__typed-router.ts', 'utf-8');
    expect(routeFile).toMatchSnapshot();
    expect(definitionsFile).toMatchSnapshot();
    expect(hookFile).toMatchSnapshot();
    expect(pluginFile).toMatchSnapshot();
  });
});
