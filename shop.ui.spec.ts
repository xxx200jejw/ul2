import { test, expect } from '@playwright/test';
import { ShopPage } from './shop.page';

// A new page reloads the in-memory application and starts with an empty cart.
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// UI-01 · REQ-UI-01 · all products are displayed
test('UI-01 products page shows all six products', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  await expect(page.getByTestId('product')).toHaveCount(6);
  await expect(page.getByTestId('result-count')).toHaveText('6 products');
});

// UI-02 · REQ-UI-02 · search filters product names
test('UI-02 searching Mouse shows Wireless Mouse', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Search products' }).fill('Mouse');
  await expect(page.getByTestId('product')).toHaveCount(1);
  await expect(page.getByTestId('product')).toContainText('Wireless Mouse');
  await expect(page.getByTestId('result-count')).toHaveText('1 products');
});

// UI-03 · REQ-UI-02 · search ignores letter case
test('UI-03 lowercase search finds Wireless Mouse', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Search products' }).fill('mouse');
  await expect(page.getByTestId('product')).toHaveCount(1);
  await expect(page.getByTestId('product')).toContainText('Wireless Mouse');
});

// UI-04 · REQ-UI-03 · adding a product updates the cart badge
test('UI-04 adding a product updates cart count', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Laptop Stand to cart' }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');
});

// UI-05 · REQ-UI-04 · one item has the correct total
test('UI-05 cart shows one row and the correct total', async ({ page }) => {
  await page.getByRole('button', { name: 'Add USB-C Hub to cart' }).click();
  await page.getByRole('link', { name: /Cart/ }).click();
  await expect(page.getByRole('heading', { name: 'Your cart' })).toBeVisible();
  await expect(page.getByTestId('cart-row')).toHaveCount(1);
  await expect(page.getByTestId('cart-total')).toHaveText('39.00 €');
});

// UI-06 · REQ-UI-04 · quantity two doubles the total (Page Object)
test('UI-06 quantity two doubles the cart total', async ({ page }) => {
  const shop = new ShopPage(page);
  await shop.add('USB-C Hub');
  await shop.add('USB-C Hub');
  await shop.openCart();
  await expect(page.getByTestId('qty')).toHaveText('2');
  await expect(page.getByTestId('line-total')).toHaveText('78.00 €');
  await expect(shop.cartTotal()).toHaveText('78.00 €');
});

// UI-07 · REQ-UI-05 · removing the only item empties the cart
test('UI-07 removing an item empties the cart', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Webcam HD to cart' }).click();
  await page.getByRole('link', { name: /Cart/ }).click();
  await page.getByRole('button', { name: 'Remove Webcam HD' }).click();
  await expect(page.getByTestId('cart-empty')).toHaveText('Your cart is empty');
  await expect(page.getByTestId('cart-count')).toHaveText('0');
});

// UI-08 · REQ-UI-06 · empty checkout shows all validation errors
test('UI-08 empty checkout shows three validation errors', async ({ page }) => {
  await page.getByRole('link', { name: /Cart/ }).click();
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.locator('#name-error')).toHaveText('Enter your full name');
  await expect(page.locator('#email-error')).toHaveText('Enter a valid email address');
  await expect(page.locator('#address-error')).toHaveText('Enter a delivery address');
});

// UI-09 · REQ-UI-06 · malformed email is rejected
test('UI-09 invalid email address is rejected', async ({ page }) => {
  await page.getByRole('button', { name: 'Add USB-C Hub to cart' }).click();
  await page.getByRole('link', { name: /Cart/ }).click();
  await page.getByLabel('Full name').fill('Mari Maasikas');
  await page.getByLabel('Email').fill('mari@');
  await page.getByLabel('Delivery address').fill('Pikk 1, Tallinn');
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page.locator('#email-error')).toHaveText('Enter a valid email address');
});

// UI-10 · REQ-UI-07 · valid order is confirmed and cart is emptied (Page Object)
test('UI-10 valid order shows confirmation and empties cart', async ({ page }) => {
  const shop = new ShopPage(page);
  await shop.add('Wireless Mouse');
  await shop.openCart();
  await shop.checkout('Mari Maasikas', 'mari@example.com', 'Pikk 1, Tallinn');
  await expect(shop.confirmation()).toContainText('Thank you, Mari Maasikas!');
  await expect(shop.cartCount()).toHaveText('0');
});
