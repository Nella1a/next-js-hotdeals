import { expect, test } from '@playwright/test';
import { deals } from '../src/mocks/fixturesDeals';

test.describe('Deals Category Pages ', () => {
  test('all products ', async ({ page }) => {
    await page.goto('/c/sale');
    // navigation links
    const navLinks = page.getByTestId('navigationLinks').locator('ul li a');
    await expect(navLinks).toHaveCount(4);

    await expect(navLinks.nth(0)).toHaveText(/Produkte/i);
    await expect(navLinks.nth(0)).toHaveAttribute('href', '/c/sale');

    await expect(navLinks.nth(1)).toHaveText(/mock-category-1/i);
    await expect(navLinks.nth(1)).toHaveAttribute('href', '/c/mock-category-1');

    await expect(navLinks.nth(2)).toHaveText(/mock-category-2/i);
    await expect(navLinks.nth(2)).toHaveAttribute('href', '/c/mock-category-2');

    await expect(navLinks.nth(3)).toHaveText(/mock-category-3/i);
    await expect(navLinks.nth(3)).toHaveAttribute('href', '/c/mock-category-3');

    await expect(
      page.getByText(/Angebote zuletzt aktualisiert/i),
    ).toBeVisible();

    // heading
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /Alle SALE Produkte/i,
    );

    // filters and sort buttons
    await expect(page.getByTestId('filterDeals')).toBeVisible();
    await expect(page.getByTestId('sortDiscount')).toBeVisible();

    // product sum
    await expect(page.getByTestId('productSum')).toHaveText(
      `${deals.length} Artikel`,
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
