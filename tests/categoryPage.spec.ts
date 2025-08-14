import { expect, test } from '@playwright/test';
import { deals } from '../src/mocks/fixturesDeals';

test.describe('Deals Category Pages ', () => {
  test('all products ', async ({ page }) => {
    // navigation links
    const navLinks = page.getByTestId('navLinks').locator('a');
    await expect(navLinks).toHaveCount(6);

    // heading
    await page.goto('/c/sale');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /Alle SALE Produkte/i,
    );

    // product cards
    const productLinks = page.getByTestId('productCards').locator('a');
    await expect(productLinks).toHaveCount(9);

    const productCount = await productLinks.count();
    for (let i = 0; i < productCount; i++) {
      await expect(productLinks.nth(i)).toHaveAttribute(
        'href',
        expect.stringContaining(`${deals[i].product_url}`),
      );
    }
  });
});
