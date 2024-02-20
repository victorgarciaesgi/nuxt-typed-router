import { getConfigFromName } from '$$/utils';
import { getBrowser, setup, url, useTestContext, $fetch } from '@nuxt/test-utils';
import { fileURLToPath } from 'url';
import { expect } from 'vitest';

export async function setupNuxtE2ETestForConfig(configName: string, basePath = '') {
  const testConfig = await import(`../samples-config/${configName}.ts`);
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/sample-project', import.meta.url)),
    nuxtConfig: getConfigFromName(configName, testConfig),
  });

  it(
    `should render base buttons for config [${configName}]`,
    async () => {
      const link = `/tests/${basePath}[${configName}]`;
      const html = await $fetch(link);

      expect(html).toContain('Navigate button');
      expect(html).toContain('Navigate link');
      expect(html).toContain('NavigateTo button');

      await expectNoClientErrors(link);
    },
    { sequential: true }
  );
}

// Taken from nuxt/framework repo
export async function renderPage(path = '/') {
  const ctx = useTestContext();
  if (!ctx.options.browser) {
    throw new Error('`renderPage` require `options.browser` to be set');
  }

  const browser = await getBrowser();
  const page = await browser.newPage({});
  const pageErrors: Error[] = [];
  const consoleLogs: { type: string; text: string }[] = [];

  page.on('console', (message: any) => {
    consoleLogs.push({
      type: message.type(),
      text: message.text(),
    });
  });
  page.on('pageerror', (err: any) => {
    pageErrors.push(err);
  });

  if (path) {
    await page.goto(url(path), { waitUntil: 'networkidle' });
  }

  return {
    page,
    pageErrors,
    consoleLogs,
  };
}

// Taken from nuxt/framework repo
export async function expectNoClientErrors(path: string) {
  const ctx = useTestContext();
  if (!ctx.options.browser) {
    return;
  }

  const { pageErrors, consoleLogs } = (await renderPage(path))!;

  const consoleLogErrors = consoleLogs.filter((i) => i.type === 'error');
  const consoleLogWarnings = consoleLogs.filter((i) => i.type === 'warning');

  expect(pageErrors).toEqual([]);
  expect(consoleLogErrors).toEqual([]);
  expect(consoleLogWarnings).toEqual([]);
}
