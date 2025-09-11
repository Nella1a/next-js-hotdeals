import { expect, Locator, test } from '@playwright/test';
import { upperCaseFirstLetter } from '../src/app/components/Navigation';
import { mockCategories, mockDeals } from '../src/mocks/fixturesDeals';

const URL = 'http://localhost:3000';

const assertNavLinks = async (navLinks: Locator[]) => {
  for (let i = 0; i < navLinks.length - 1; i++) {
    if (i == 0) {
      await expect(navLinks[i]).toHaveText(/Produkte/i);
      await expect(navLinks[i]).toHaveAttribute('href', '/c/sale');
    } else {
      await expect(navLinks[i]).toHaveText(
        `${upperCaseFirstLetter(mockCategories[i - 1].name)}`,
      );
      await expect(navLinks[i]).toHaveAttribute(
        'href',
        `/c/${mockCategories[i - 1].name}`,
      );
    }
  }
};
test.describe('Deals Category Pages ', () => {
  test('all products ', async ({ page }) => {
    await page.goto(URL + '/c/sale');

    // navigation links
    const navLinks = await page
      .getByTestId('navigationLinks')
      .locator('a')
      .all();

    expect(navLinks.length).toBe(4);
    await assertNavLinks(navLinks);

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
      `${mockDeals.length} Artikel`,
    );

    // product cards
    const productLinks = page.getByTestId('productCards').locator('a');
    const productCount = await productLinks.count();
    expect(productCount).toBe(9);

    for (let i = 0; i < productCount; i++) {
      await expect(productLinks.nth(i)).toHaveAttribute(
        'href',
        expect.stringContaining(`${mockDeals[i].product_url}`),
      );
    }
  });

  test('product category ', async ({ page }) => {
    await page.goto(URL + '/c/mock-category-3/');

    // navigation links
    const navLinks = await page
      .getByTestId('navigationLinks')
      .locator('a')
      .all();
    expect(navLinks.length).toBe(4);
    await assertNavLinks(navLinks);

    await expect(
      page.getByText(/Angebote zuletzt aktualisiert/i),
    ).toBeVisible();

    // heading
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      /mock-category-3 SALE/i,
    );

    // filters and sort buttons
    await expect(page.getByTestId('filterDeals')).toBeVisible();
    await expect(page.getByTestId('sortDiscount')).toBeVisible();

    // product sum
    const productsCatThree = mockDeals.filter((deal) => deal.category_id === 3);
    await expect(page.getByTestId('productSum')).toHaveText(
      `${productsCatThree.length} Artikel`,
    );

    // product cards
    const productLinks = page.getByTestId('productCards').locator('a');
    await expect(productLinks).toHaveCount(3);

    for (let i = 0; i < productsCatThree.length - 1; i++) {
      await expect(productLinks.nth(i)).toHaveAttribute(
        'href',
        expect.stringContaining(`${mockDeals[i].product_url}`),
      );
    }
  });
});
