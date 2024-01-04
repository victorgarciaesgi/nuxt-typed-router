import { timeout } from '$$/utils';
import { NuxtConfig } from '@nuxt/schema';
import { getBrowser, setup, url, useTestContext } from '@nuxt/test-utils';
import { fileURLToPath } from 'node:url';
import { expect } from 'vitest';
import { $ } from 'zx';

export async function setupNuxtTestWithConfig(configName: string) {
  try {
    // await $`NUXT_ROUTER_CONFIG_NAME=${configName} pnpm run test:prepare-fixtures`;
    // await timeout(500);
    await $`NUXT_ROUTER_CONFIG_NAME=${configName} pnpm run test:types-fixtures`;
    await timeout(100);
  } catch (e) {
    return Promise.reject(`Typecheck failed for config: [${configName}]: ${e}`);
  }
  // it('should render base buttons', async () => {
  //   const link = `/[${configName}]`;
  //   const html = await $fetch(link);

  //   expect(html).toContain('Navigate button');
  //   expect(html).toContain('Navigate link');
  //   expect(html).toContain('NavigateTo button');

  //   await expectNoClientErrors(link);
  // });
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
