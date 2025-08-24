import { expect, test } from '@playwright/test';
import { mockCategories } from '../src/mocks/fixturesDeals';

test.describe('Deals Index-Page', () => {
  test('should render the heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /Die besten Angebote.Für dich zusammengestellt!/i,
    );
  });

  test('should render category links correctly', async ({ page }) => {
    await page.goto('/');
    const categoryLinks = page.locator('section a');
    const catLinksCount = await categoryLinks.count();
    expect(catLinksCount).toBe(3);

    for (let i = 0; i < catLinksCount; i++) {
      await expect(categoryLinks.nth(i)).toHaveText(
        `${mockCategories[i].name}`,
      );
      await expect(categoryLinks.nth(i)).toHaveAttribute(
        'href',
        `/c/${mockCategories[i].name}`,
      );
    }
  });

  test('hover state changes opacity', async ({ page }) => {
    await page.goto('/');
    const firstLink = page.locator('section a').first();

    const initialOpacity = await firstLink.evaluate(
      (el) => window.getComputedStyle(el).opacity,
    );

    expect(initialOpacity).toBe('1');

    await firstLink.hover();
    const hoverOpacity = await firstLink.evaluate(
      (el) => window.getComputedStyle(el).opacity,
    );

    expect(hoverOpacity).toBe('0.8');
  });
});
