const { test } = require('@playwright/test');
const path = require('path');

test('detailed visual comparison', async ({ page }) => {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  await page.goto(`file://${htmlPath}`);
  await page.waitForLoadState('networkidle');

  console.log('\n=== LAYOUT MEASUREMENTS ===\n');

  // Measure column widths
  const leftSidebar = await page.locator('.sidebar-left').boundingBox();
  const navPanel = await page.locator('.nav-panel').boundingBox();
  const mainContent = await page.locator('.main-content').boundingBox();
  const rightSidebar = await page.locator('.sidebar-right').boundingBox();

  console.log('Column Widths:');
  console.log(`  Left Sidebar: ${leftSidebar.width}px`);
  console.log(`  Nav Panel: ${navPanel.width}px`);
  console.log(`  Main Content: ${mainContent.width}px`);
  console.log(`  Right Sidebar: ${rightSidebar.width}px`);

  console.log('\n=== HEADER ANALYSIS ===\n');

  // Header elements
  const topHeader = await page.locator('.top-header').boundingBox();
  console.log(`Top Header Height: ${topHeader.height}px`);

  // Check header elements
  const autoSavingText = page.locator('.auto-saving-text');
  const autoSavingBadge = page.locator('.auto-saving-badge');
  const aiBadge = page.locator('.ai-badge-header');

  console.log('Header Elements Present:');
  console.log(`  Auto-saving text: ${await autoSavingText.count()}`);
  console.log(`  Auto-saving badge: ${await autoSavingBadge.count()}`);
  console.log(`  AI badge: ${await aiBadge.count()}`);

  console.log('\n=== FONT SIZES ===\n');

  // Check font sizes
  const sectionTitle = page.locator('.section-title').first();
  const sectionText = page.locator('.section-text').first();
  const noteText = page.locator('.note-text').first();

  const titleSize = await sectionTitle.evaluate(el => window.getComputedStyle(el).fontSize);
  const textSize = await sectionText.evaluate(el => window.getComputedStyle(el).fontSize);
  const noteSize = await noteText.evaluate(el => window.getComputedStyle(el).fontSize);

  console.log('Font Sizes:');
  console.log(`  Section Title: ${titleSize}`);
  console.log(`  Section Text: ${textSize}`);
  console.log(`  Note Text: ${noteSize}`);

  console.log('\n=== SPACING ANALYSIS ===\n');

  // Patient items spacing
  const patientItems = page.locator('.patient-item');
  const firstPatient = patientItems.first();
  const firstPatientBox = await firstPatient.boundingBox();

  const patientPadding = await firstPatient.evaluate(el => {
    const style = window.getComputedStyle(el);
    return {
      top: style.paddingTop,
      right: style.paddingRight,
      bottom: style.paddingBottom,
      left: style.paddingLeft
    };
  });

  console.log('Patient Item Padding:', patientPadding);

  // Note sections spacing
  const noteSections = page.locator('.note-section');
  const firstNoteSection = noteSections.first();
  const notePadding = await firstNoteSection.evaluate(el => {
    const style = window.getComputedStyle(el);
    return {
      top: style.paddingTop,
      right: style.paddingRight,
      bottom: style.paddingBottom,
      left: style.paddingLeft,
      marginBottom: style.marginBottom
    };
  });

  console.log('Note Section Padding:', notePadding);

  console.log('\n=== COLOR ANALYSIS ===\n');

  // Check colors
  const activePatient = page.locator('.patient-item.active');
  const activeBg = await activePatient.evaluate(el => window.getComputedStyle(el).backgroundColor);
  const activeBorder = await activePatient.evaluate(el => window.getComputedStyle(el).borderColor);

  console.log('Active Patient:');
  console.log(`  Background: ${activeBg}`);
  console.log(`  Border: ${activeBorder}`);

  const autoSavingBg = await autoSavingBadge.evaluate(el => window.getComputedStyle(el).backgroundColor);
  const autoSavingColor = await autoSavingBadge.evaluate(el => window.getComputedStyle(el).color);

  console.log('\nAuto-saving Badge:');
  console.log(`  Background: ${autoSavingBg}`);
  console.log(`  Color: ${autoSavingColor}`);

  console.log('\n=== MISSING OR EXTRA ELEMENTS ===\n');

  // Check for all expected sections
  const ccSection = page.locator('.section-header:has-text("Chief Complaint (CC)")');
  const hpiSection = page.locator('.section-header:has-text("History of Present Illness (HPI)")');
  const subjectiveSection = page.locator('.section-header:has-text("Subjective")');
  const tongueSection = page.locator('.section-header:has-text("Tongue Examination")');

  console.log('Expected Sections Present:');
  console.log(`  Chief Complaint: ${await ccSection.count()}`);
  console.log(`  HPI: ${await hpiSection.count()}`);
  console.log(`  Subjective: ${await subjectiveSection.count()}`);
  console.log(`  Tongue Examination: ${await tongueSection.count()}`);

  console.log('\n=== COMPARISON WITH ORIGINAL ===\n');
  console.log('Based on original design (docs/ui/3.0 - AI Notes Shown.png):');
  console.log('');
  console.log('Expected Layout:');
  console.log('  - Left Sidebar: ~180px (Patient list)');
  console.log('  - Nav Panel: ~50-60px (CC, HPI, PMH, FH, SH, ES, TCM dropdown)');
  console.log('  - Main Content: Large center area with full text');
  console.log('  - Right Sidebar: ~420px (AI Structured Notes)');
  console.log('');
  console.log('Current vs Expected:');
  console.log(`  Left Sidebar: ${leftSidebar.width}px vs ~180px - ${Math.abs(leftSidebar.width - 180) < 10 ? 'MATCH' : 'DIFF'}`);
  console.log(`  Nav Panel: ${navPanel.width}px vs ~50-60px - ${navPanel.width >= 50 && navPanel.width <= 150 ? 'MATCH' : 'DIFF'}`);
  console.log(`  Right Sidebar: ${rightSidebar.width}px vs ~420-450px - ${Math.abs(rightSidebar.width - 450) < 30 ? 'MATCH' : 'DIFF'}`);
});
