const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('TCM Intake UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    const htmlPath = path.join(__dirname, '..', 'index.html');
    await page.goto(`file://${htmlPath}`);
    await page.waitForLoadState('networkidle');
  });

  test('should load the page with all main sections visible', async ({ page }) => {
    // Check left sidebar
    await expect(page.locator('.sidebar-left')).toBeVisible();
    await expect(page.locator('text=Today\'s Patients')).toBeVisible();

    // Check main content area
    await expect(page.locator('.main-content')).toBeVisible();
    await expect(page.locator('.dropdown-item:has-text("TCM")')).toBeVisible();

    // Check right sidebar
    await expect(page.locator('.sidebar-right')).toBeVisible();
    await expect(page.locator('text=AI Structured Notes')).toBeVisible();
  });

  test('should have scrollable patient list', async ({ page }) => {
    const patientSection = page.locator('.patients-section');
    await expect(patientSection).toBeVisible();

    // Check if element is scrollable (or at least has overflow-y: auto)
    const hasOverflow = await patientSection.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.overflowY === 'auto' || el.scrollHeight > el.clientHeight;
    });

    expect(hasOverflow).toBeTruthy();
  });

  test('should display patient categories correctly', async ({ page }) => {
    // Check all patient categories
    await expect(page.locator('text=Completed').first()).toBeVisible();
    await expect(page.locator('text=Active').first()).toBeVisible();
    await expect(page.locator('text=Waiting').first()).toBeVisible();
    await expect(page.locator('text=Scheduled').first()).toBeVisible();

    // Count patients in each category
    const completedPatients = await page.locator('.patient-category:has-text("Completed") .patient-item').count();
    expect(completedPatients).toBe(2);

    const activePatients = await page.locator('.patient-category:has-text("Active") .patient-item').count();
    expect(activePatients).toBe(1);

    const waitingPatients = await page.locator('.patient-category:has-text("Waiting") .patient-item').count();
    expect(waitingPatients).toBe(2);

    const scheduledPatients = await page.locator('.patient-category:has-text("Scheduled") .patient-item').count();
    expect(scheduledPatients).toBe(2);
  });

  test('should allow patient selection and update header', async ({ page }) => {
    // Get initial patient name
    const initialName = await page.locator('.patient-name').textContent();
    expect(initialName).toBe('SC');

    // Click on a different patient
    await page.locator('.patient-item').filter({ hasText: 'DP' }).click();

    // Wait a bit for the update
    await page.waitForTimeout(100);

    // Check if patient name updated
    const updatedName = await page.locator('.patient-name').textContent();
    expect(updatedName).toBe('DP');
  });

  test('should display TCM body systems menu', async ({ page }) => {
    const bodySystemsMenu = page.locator('.body-systems-menu');
    await expect(bodySystemsMenu).toBeVisible();

    // Check some menu items
    await expect(page.locator('.menu-item:has-text("Tongue")')).toBeVisible();
    await expect(page.locator('.menu-item:has-text("Pulse")')).toBeVisible();
    await expect(page.locator('.menu-item:has-text("Appetite")')).toBeVisible();

    // Check if Tongue is active
    const tongueItem = page.locator('.menu-item:has-text("Tongue")');
    await expect(tongueItem).toHaveClass(/active/);
  });

  test('should have scrollable body systems menu', async ({ page }) => {
    const bodySystemsMenu = page.locator('.body-systems-menu');

    // Check if scrollable or has overflow-y auto
    const hasScroll = await bodySystemsMenu.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return el.scrollHeight > el.clientHeight || style.overflowY === 'auto';
    });

    expect(hasScroll).toBeTruthy();
  });

  test('should allow menu item selection', async ({ page }) => {
    // Click on a menu item
    const pulseItem = page.locator('.menu-item:has-text("Pulse")');
    await pulseItem.click();

    // Check if it becomes active
    await expect(pulseItem).toHaveClass(/active/);

    // Check if Tongue is no longer active
    const tongueItem = page.locator('.menu-item:has-text("Tongue")');
    await expect(tongueItem).not.toHaveClass(/active/);
  });

  test('should display AI Structured Notes sections', async ({ page }) => {
    // Check main sections
    await expect(page.locator('.section-header:has-text("Chief Complaint (CC)")')).toBeVisible();
    await expect(page.locator('.section-header:has-text("History of Present Illness (HPI)")')).toBeVisible();
    await expect(page.locator('.section-header:has-text("Subjective")')).toBeVisible();
    await expect(page.locator('.section-header:has-text("Tongue Examination")')).toBeVisible();
    await expect(page.locator('.section-header:has-text("Pulse Examination")')).toBeVisible();
    await expect(page.locator('.section-header:has-text("Diagnosis")')).toBeVisible();
    await expect(page.locator('.section-header:has-text("Treatment Principle")')).toBeVisible();
    await expect(page.locator('.section-header:has-text("Acupuncture Points")')).toBeVisible();
  });

  test('should have scrollable notes content', async ({ page }) => {
    const notesContent = page.locator('.notes-content');
    await expect(notesContent).toBeVisible();

    // Check if scrollable
    const isScrollable = await notesContent.evaluate((el) => {
      return el.scrollHeight > el.clientHeight;
    });

    expect(isScrollable).toBeTruthy();
  });

  test('should display chief complaint items with ICD codes', async ({ page }) => {
    // Check first chief complaint
    await expect(page.locator('text=Chronic Fatigue for 6 months')).toBeVisible();
    await expect(page.locator('text=ICD-10 : R53.83 - Other fatigue')).toBeVisible();

    // Check second chief complaint
    await expect(page.locator('text=Bloating for 1 year')).toBeVisible();
    await expect(page.locator('text=ICD-10 : R14.0 - Abdominal distension (gaseous)')).toBeVisible();
  });

  test('should display copy buttons', async ({ page }) => {
    const copyButtons = page.locator('.copy-button');
    const count = await copyButtons.count();

    expect(count).toBeGreaterThan(5); // Multiple copy buttons throughout
    await expect(copyButtons.first()).toBeVisible();
  });

  test('should copy text when copy button is clicked', async ({ page }) => {
    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

    // Find and click a copy button
    const copyButton = page.locator('.note-section:has-text("Chief Complaint") .copy-button').first();
    await copyButton.click();

    // Wait for the success message
    await expect(copyButton).toHaveText('✓ Copied');

    // Wait for it to revert
    await page.waitForTimeout(2100);
    await expect(copyButton).toHaveText(/Copy/);
  });

  test('should display diagnosis items with badges', async ({ page }) => {
    // Scroll to diagnosis section
    const diagnosisSection = page.locator('.note-section:has-text("Diagnosis")');
    await diagnosisSection.scrollIntoViewIfNeeded();

    // Check TCM diagnosis
    await expect(page.locator('text=Spleen Qi Deficiency with Dampness')).toBeVisible();
    await expect(page.locator('.tcm-badge')).toBeVisible();

    // Check ICD diagnoses
    await expect(page.locator('.diagnosis-text:has-text("R53.83 - Other fatigue")')).toBeVisible();
    const icdBadges = page.locator('.icd-badge');
    expect(await icdBadges.count()).toBeGreaterThan(0);
  });

  test('should display acupuncture points by category', async ({ page }) => {
    // Scroll to acupuncture points section
    const acupunctureSection = page.locator('.note-section:has-text("Acupuncture Points")');
    await acupunctureSection.scrollIntoViewIfNeeded();

    // Check categories
    await expect(page.locator('text=Head/Neck')).toBeVisible();
    await expect(page.locator('text=Hand')).toBeVisible();
    await expect(page.locator('text=Forearm')).toBeVisible();
    await expect(page.locator('text=Foot')).toBeVisible();

    // Check specific points
    await expect(page.locator('text=GV-20')).toBeVisible();
    await expect(page.locator('text=LI-4 - Right side only')).toBeVisible();
    await expect(page.locator('text=ST-36')).toBeVisible();
  });

  test('should display auto-saving indicator', async ({ page }) => {
    const autoSaving = page.locator('.auto-saving-text, .auto-saving-badge');
    await expect(autoSaving.first()).toBeVisible();

    // Check for pulse dot
    const pulseDot = page.locator('.pulse-dot');
    await expect(pulseDot).toBeVisible();
  });

  test('should display time badge', async ({ page }) => {
    const timeBadge = page.locator('.time-badge');
    await expect(timeBadge).toBeVisible();
    await expect(timeBadge).toHaveText(/\d{1,2}:\d{2}/);
  });

  test('should display stress level badge', async ({ page }) => {
    await expect(page.locator('text=Predominant emotion: Worry and frustration')).toBeVisible();
    await expect(page.locator('.stress-level')).toBeVisible();
    await expect(page.locator('.stress-level')).toHaveText('Stress Level: 7/10');
  });

  test('should display TCM Review of Systems grid', async ({ page }) => {
    const systemsGrid = page.locator('.systems-grid');
    await systemsGrid.scrollIntoViewIfNeeded();

    await expect(systemsGrid).toBeVisible();

    // Check some system items within the grid
    await expect(systemsGrid.locator('text=• Appetite:')).toBeVisible();
    await expect(systemsGrid.locator('text=• Sleep:')).toBeVisible();
    await expect(systemsGrid.locator('text=• Energy:')).toBeVisible();
    await expect(systemsGrid.locator('text=• Temperature:')).toBeVisible();
  });

  test('should scroll notes content smoothly', async ({ page }) => {
    const notesContent = page.locator('.notes-content');

    // Get initial scroll position
    const initialScroll = await notesContent.evaluate(el => el.scrollTop);

    // Scroll down
    await notesContent.evaluate(el => el.scrollBy(0, 500));
    await page.waitForTimeout(300);

    // Get new scroll position
    const newScroll = await notesContent.evaluate(el => el.scrollTop);

    expect(newScroll).toBeGreaterThan(initialScroll);
  });

  test('should toggle TCM dropdown menu', async ({ page }) => {
    const dropdownItem = page.locator('.dropdown-item');
    const bodySystemsMenu = page.locator('.body-systems-menu');

    // Initially should be visible
    await expect(bodySystemsMenu).toBeVisible();

    // Click to collapse
    await dropdownItem.click();
    await page.waitForTimeout(300);

    // Check if collapsed (max-height: 0)
    const maxHeight = await bodySystemsMenu.evaluate(el => {
      return window.getComputedStyle(el).maxHeight;
    });
    expect(maxHeight).toBe('0px');

    // Click to expand again
    await dropdownItem.click();
    await page.waitForTimeout(300);

    const expandedMaxHeight = await bodySystemsMenu.evaluate(el => {
      return window.getComputedStyle(el).maxHeight;
    });
    expect(expandedMaxHeight).toBe('300px');
  });

  test('should navigate to section when menu item is clicked', async ({ page }) => {
    // Click on Pulse menu item
    const pulseMenuItem = page.locator('.menu-item:has-text("Pulse")');
    await pulseMenuItem.click();

    // Wait for scroll
    await page.waitForTimeout(500);

    // Check if Pulse Examination section is in view
    const pulseSection = page.locator('.note-section:has-text("Pulse Examination")');
    const isInViewport = await pulseSection.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight;
    });

    expect(isInViewport).toBeTruthy();
  });

  test('should have correct color scheme and styling', async ({ page }) => {
    // Check active patient has purple background
    const activePatient = page.locator('.patient-item.active');
    const bgColor = await activePatient.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // rgb(245, 243, 255) is #f5f3ff
    expect(bgColor).toContain('245, 243, 255');

    // Check auto-saving badge has teal background
    const autoSavingBadge = page.locator('.auto-saving-badge');
    const autoSavingBg = await autoSavingBadge.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Should be teal/green
    expect(autoSavingBg).toContain('224, 247, 244');
  });
});
