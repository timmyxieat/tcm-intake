const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('TCM Intake Visual Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the local HTML file
    const filePath = 'file://' + path.resolve(__dirname, '../index.html');
    await page.goto(filePath);
    await page.waitForLoadState('networkidle');
  });

  test('full page visual check', async ({ page }) => {
    // Set viewport to match design
    await page.setViewportSize({ width: 1440, height: 900 });

    // Take screenshot
    await page.screenshot({
      path: 'tests/screenshots/current.png',
      fullPage: false
    });

    console.log('Screenshot saved to tests/screenshots/current.png');
  });

  test('check left sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const leftColumn = page.locator('.column-left');
    await leftColumn.screenshot({
      path: 'tests/screenshots/left-sidebar.png'
    });
  });

  test('check middle column', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const middleColumn = page.locator('.column-middle');
    await middleColumn.screenshot({
      path: 'tests/screenshots/middle-column.png'
    });
  });

  test('check right sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const rightColumn = page.locator('.column-right');
    await rightColumn.screenshot({
      path: 'tests/screenshots/right-sidebar.png'
    });
  });

  test('interactive - open in browser for manual checking', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Keep the browser open for 30 seconds
    await page.waitForTimeout(30000);
  });
});
