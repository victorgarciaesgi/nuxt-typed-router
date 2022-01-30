import { readFile } from 'fs/promises';
import { createPage, setupTest } from '@nuxt/test-utils';
import 'core-js';

describe('Init route file', () => {
  // setupTest({
  //   browser: true,
  //   build: true,
  //   setupTimeout: 100000,
  //   rootDir: 'test/fixtures/basic',
  //   config: {
  //     server: {
  //       port: 2310,
  //     },
  //   },
  // });
  it('should generate to correct tree for the pages folder', async () => {
    const routeFile = await readFile('playground/generated/__routes.ts', 'utf-8');
    const definitionsFile = await readFile('playground/generated/typed-router.d.ts', 'utf-8');
    expect(routeFile).toMatchSnapshot();
    expect(definitionsFile).toMatchSnapshot();
  });
});
