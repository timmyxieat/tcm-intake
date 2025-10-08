# Remaining Differences to Fix

Based on careful comparison between current implementation and `docs/ui/3.0 - AI Notes Shown.png`:

## ✅ What's Correct
- Overall 4-column layout structure
- Column widths (180px, 140px, fluid, 450px)
- All content sections present
- Color scheme (teal/cyan accents, purple active states, orange badges)
- Font sizes are appropriate
- Scrollable areas working

## 🔧 What Needs Fixing

### 1. **Nav Panel Width** (CRITICAL)
   - **Current**: 140px wide
   - **Original**: Appears to be ~50-60px wide (much narrower)
   - **Fix**: Reduce nav panel width significantly, items should be more compact

### 2. **Nav Panel Item Styling**
   - **Current**: Items have "CC", "HPI", "PMH" etc as centered text with padding
   - **Original**: Items appear more compact, possibly just letters with minimal padding
   - **Fix**: Reduce padding, make items more compact vertically

### 3. **TCM Dropdown Arrow**
   - **Current**: Has a visible dropdown chevron "⌄"
   - **Original**: Dropdown arrow less prominent or positioned differently
   - **Fix**: Review dropdown indicator styling

### 4. **Header Layout Centering**
   - **Current**: "Auto-saving" text is centered with pulse dot
   - **Original**: Header elements may have different spacing/alignment
   - **Fix**: Review header flex justification and spacing

### 5. **Left Sidebar Patient Badge Sizes**
   - **Current**: Patient initials (DP, MS, SC) in 28px circles
   - **Original**: May be slightly smaller or have different proportions
   - **Fix**: Verify badge sizes match exactly

### 6. **Content Area Section Spacing**
   - **Current**: Sections have 24px margin-bottom
   - **Original**: Spacing between Chief Complaint, HPI, TCM Assessment may be different
   - **Fix**: Fine-tune vertical spacing in main content area

### 7. **Right Sidebar Card Shadows/Borders**
   - **Current**: Cards have 1px solid border
   - **Original**: May have subtle shadow instead of or in addition to border
   - **Fix**: Add subtle box-shadow to cards if needed

### 8. **Copy Button Icon**
   - **Current**: Using emoji "📋"
   - **Original**: May be using a different icon style
   - **Fix**: Verify icon matches (consider using unicode or different icon)

### 9. **Section Icons in Right Sidebar**
   - **Current**: Using emojis (📋, 📖, 👤, 👅, 💓, 🔍, 💡, 📍)
   - **Original**: Icons appear similar but may be different style/size
   - **Fix**: Verify icon sizes and spacing match exactly

### 10. **Main Content Font Weight**
   - **Current**: Section titles are 600 weight
   - **Original**: May be 700 (bolder)
   - **Fix**: Check if section titles should be font-weight: 700

### 11. **ICD Code Text Styling**
   - **Current**: "ICD-10 : R53.83 - Other fatigue" in 11px gray
   - **Original**: Text size and color may be slightly different
   - **Fix**: Verify exact font size and color

### 12. **Body Systems Menu Active State**
   - **Current**: "Tongue" has purple background
   - **Original**: Active state styling appears correct
   - **Status**: Likely correct, but verify exact purple shade

### 13. **Treatment List Numbering**
   - **Current**: Standard ordered list with numbers
   - **Original**: Same styling
   - **Status**: Appears correct

### 14. **Stress Level Badge**
   - **Current**: Orange background with "7/10" badge
   - **Original**: Appears similar but verify exact colors
   - **Fix**: Confirm orange shade matches (#FFA940)

### 15. **TCM Review Grid Layout**
   - **Current**: 2-column grid with bullet points
   - **Original**: Same layout
   - **Status**: Appears correct

---

## Priority Fixes (High to Low)

1. **CRITICAL**: Reduce Nav Panel width from 140px to ~50-60px
2. **HIGH**: Adjust nav item padding/styling to be more compact
3. **MEDIUM**: Fine-tune header layout alignment
4. **MEDIUM**: Verify all icon styles and sizes
5. **LOW**: Check subtle color/shadow differences

---

## Measurement Verification Needed

Run these checks in Playwright:
- [ ] Nav panel should be ~50-60px wide (currently 140px)
- [ ] Patient badges should be ~24-28px diameter
- [ ] Header height should match (currently 57px)
- [ ] Font sizes: Title (14px), Text (13px), Notes (12px) - all appear correct
- [ ] Card padding: 14px - appears correct
- [ ] Section spacing: 16-24px between sections

---

## Next Steps

1. Reduce `.nav-panel` width in CSS from 140px to 55px
2. Adjust `.nav-item` padding to be more compact
3. Update grid-template-columns to: `180px 55px 1fr 450px`
4. Test all measurements again with Playwright
5. Take new screenshot and compare pixel-perfect
