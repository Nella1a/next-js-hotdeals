import { expect, test } from '@playwright/test';

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

    await expect(categoryLinks).toHaveCount(3);

    await expect(categoryLinks.nth(0)).toHaveText(/mock-category-1/i);
    await expect(categoryLinks.nth(0)).toHaveAttribute(
      'href',
      '/c/mock-category-1',
    );

    await expect(categoryLinks.nth(1)).toHaveText(/mock-category-2/i);
    await expect(categoryLinks.nth(1)).toHaveAttribute(
      'href',
      '/c/mock-category-2',
    );

    await expect(categoryLinks.nth(2)).toHaveText(/mock-category-3/i);
    await expect(categoryLinks.nth(2)).toHaveAttribute(
      'href',
      '/c/mock-category-3',
    );
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
