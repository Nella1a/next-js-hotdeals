import { expect, test } from '@playwright/test';
import { mockCategories } from '../src/mocks/fixturesDeals';

test.describe('Deals Index-Page', () => {
  test('should render the heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /Die besten Angebote\.\s+Für dich zusammengestellt!/i,
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

  test('hover state changes border color', async ({ page }) => {
    await page.goto('/');
    const firstLink = page.locator('section a').first();
    await firstLink.hover();

    // You can test hover styles by checking computed style, or using visual comparisons (e.g., screenshots).
    const borderColor = await firstLink.evaluate(
      (el) => window.getComputedStyle(el).borderColor,
    );
    expect(borderColor).toBe('rgb(226, 0, 21)'); // #e20015 in RGB
  });
});
