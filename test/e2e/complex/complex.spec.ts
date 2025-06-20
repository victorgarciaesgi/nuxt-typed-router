import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { setup, $fetch, createPage } from '@nuxt/test-utils/e2e';
import { expectNoClientErrors } from '../utils';
import { timeout } from '$$/utils';

const TIME = 2000;

describe('Complex config behaviour', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../../fixtures/complex', import.meta.url)),
    setupTimeout: 120000,
    dev: true,
  });

  it('should display the root page without error', async () => {
    const html = await $fetch('/');

    expect(html).toContain('Navigate button');
    expect(html).toContain('Navigate link');
    expect(html).toContain('NavigateTo button');
    expect(html).toContain('Navigate plugin');

    await expectNoClientErrors('/');
  });

  // // Commented for now because of a Nuxt bug still happening to me

  // it('should navigate correctly with useRouter', async () => {
  //   const page = await createPage('/');
  //   await page.click('#useRouter');
  //   const html = await page.innerHTML('body');
  //   await timeout(TIME);

  //   await expectNoClientErrors('/');
  // });

  // it('should navigate correctly with nuxtLink', async () => {
  //   const page = await createPage('/');
  //   await page.click('#nuxtLink');

  //   await timeout(TIME);
  //   const html = await page.innerHTML('body');

  //   await expectNoClientErrors('/');
  // });

  // it('should navigate correctly with navigateTo', async () => {
  //   const page = await createPage('/');
  //   await page.click('#navigateTo');
  //   const html = await page.innerHTML('body');
  //   await timeout(TIME);

  //   await expectNoClientErrors('/');
  // });
});
