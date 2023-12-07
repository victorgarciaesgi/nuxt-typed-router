import { $fetch, setup, setTestContext, stopServer } from '@nuxt/test-utils';
import { globby } from 'globby';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { expectNoClientErrors } from '../utils';

export async function setupNuxtTestWithConfig(name: string, config: Record<string, any>) {
  describe(`Config: ${name}`, async () => {
    await setup({
      rootDir: fileURLToPath(new URL('../../fixtures/sample-project', import.meta.url)),
      nuxtConfig: config,
    });

    it('should render base buttons', async () => {
      const html = await $fetch('/');

      expect(html).toContain('Navigate button');
      expect(html).toContain('Navigate link');
      expect(html).toContain('NavigateTo button');

      await expectNoClientErrors('/');
    });
  });
}
