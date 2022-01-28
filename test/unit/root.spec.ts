import { readFile } from 'fs/promises';
import { createPage, setupTest } from '@nuxt/test-utils';
import 'core-js';

describe('Init route file', () => {
  setupTest({
    browser: true,
    build: true,
    setupTimeout: 100000,
    rootDir: 'test/fixtures/basic',
    config: {
      server: {
        port: 2310,
      },
    },
  });
  it('should generate to correct tree for the pages folder', async () => {
    const routeFile = await readFile('test/fixtures/basic/__routes.js', 'utf-8');
    expect(routeFile).toMatchSnapshot();
  });
});
