import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { setup, $fetch, createPage } from '@nuxt/test-utils';
import { expectNoClientErrors } from './utils';

describe('Simple config behaviour', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/simple', import.meta.url)),
    setupTimeout: 120000,
  });

  it('should display the root page without error', async () => {
    const html = await $fetch('/');

    expect(html).toContain('Navigate button');
    expect(html).toContain('Navigate link');
    expect(html).toContain('NavigateTo button');

    await expectNoClientErrors('/');
  });

  it('should navigate correctly with useRouter', async () => {
    const page = await createPage('/');
    await page.click('#useRouter');
    const html = await page.innerHTML('body');

    expect(html).toContain('Navigate back');

    await expectNoClientErrors('/');
  });

  it('should navigate correctly with nuxtLink', async () => {
    const page = await createPage('/');
    await page.click('#nuxtLink');
    const html = await page.innerHTML('body');

    expect(html).toContain('Navigate back');

    await expectNoClientErrors('/');
  });

  it('should navigate correctly with navigateTo', async () => {
    const page = await createPage('/');
    await page.click('#navigateTo');
    const html = await page.innerHTML('body');

    expect(html).toContain('Navigate back');

    await expectNoClientErrors('/');
  });
});
