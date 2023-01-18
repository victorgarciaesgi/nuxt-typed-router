import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';
import { expectNoClientErrors } from './utils';

describe('Root page', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/simple', import.meta.url)),
    setupTimeout: 12000,
  });
  it('should display the root page without error', async () => {
    const html = await $fetch('/');

    expect(html).toContain('Navigate button');
    expect(html).toContain('Navigate link');

    await expectNoClientErrors('/');
  });
});
