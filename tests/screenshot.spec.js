const { test } = require('@playwright/test');
const path = require('path');

test('capture full page screenshot', async ({ page }) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  await page.goto(`file://${htmlPath}`);
  await page.waitForLoadState('networkidle');

  // Take full page screenshot
  await page.screenshot({
    path: 'screenshot-current.png',
    fullPage: false
  });
});
