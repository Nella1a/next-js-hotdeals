import { expect, test } from '@playwright/test';
import { mockCategories } from '../src/mocks/fixturesDeals';

const URL = 'http://localhost:3000';

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

  test('make sure links redirect to category pages', async ({ page }) => {
    await page.goto('/');
    const dealCatLinks = await page.locator('section a').all();

    for (let i = 0; i < dealCatLinks.length - 1; i++) {
      const catLinks = await page.locator('section a').all();
      await catLinks[i].click();

      await page.waitForURL(URL + `/c/${mockCategories[i].name}`);
      await expect(page).toHaveURL(URL + `/c/${mockCategories[i].name}`);
      await page.goto('/');
    }
  });
});
