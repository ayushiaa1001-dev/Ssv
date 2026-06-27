import { test, expect } from '@playwright/test';

test.describe('Responsiveness and Regression', () => {
  const pages = [
    '/',
    '/about',
    '/products',
    '/careers',
    '/contact',
    '/events/culture',
    '/events/gallery',
  ];

  for (const pageUrl of pages) {
    test(`Should load ${pageUrl || 'Home'} without errors and look correct`, async ({ page, isMobile }) => {
      await page.goto(pageUrl);
      
      // Basic check: Page title should be present
      await expect(page).toHaveTitle(/Ssv Pharmaceuticals/);

      // Verify Navbar is visible
      const navbar = page.locator('#navbar');
      await expect(navbar).toBeVisible();

      // On mobile, check if hamburger menu works
      if (isMobile) {
        const hamburger = page.locator('#mobile-toggle');
        await expect(hamburger).toBeVisible();
        await hamburger.click();
        const mobileMenu = page.locator('#mobile-menu');
        await expect(mobileMenu).toBeVisible();
        // Close menu
        await page.locator('.navbar__mobile-close').click();
        await expect(mobileMenu).toBeHidden();
      } else {
        // On desktop, ensure mobile toggle is hidden and nav menu is visible
        const hamburger = page.locator('#mobile-toggle');
        await expect(hamburger).toBeHidden();
        const navMenu = page.locator('#nav-menu');
        await expect(navMenu).toBeVisible();
      }

      // Ensure footer is rendered
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // If it's the products page, test the category toggle interaction
      if (pageUrl === '/products') {
        const firstCategory = page.locator('.pp-cat-card__banner').first();
        await firstCategory.click();
        const productPanel = page.locator('.pp-expanded-panel-wrapper').first();
        await expect(productPanel).toBeVisible();
      }
    });
  }
});
