# Claude Development Guidelines

## Testing Requirements

### Always Use Headless Playwright for Testing
When making UI changes or completing a phase, **always test with headless Playwright** before considering the work complete.

**Why:** Catch runtime errors, missing components, and rendering issues that won't be discovered until the user tries to run the app.

**How:**
```bash
# Start the dev server if not already running
npm run dev

# Use Playwright to navigate and check for errors
# Check browser console for errors
# Verify all components render without issues
```

**What to Check:**
- [ ] Page loads without errors
- [ ] No missing component errors in console
- [ ] No "missing required error" messages
- [ ] All expected UI elements are present
- [ ] No TypeScript compilation errors
- [ ] Console shows no warnings or errors

**Example Error to Catch:**
```
"missing required error components, refreshing..."
```

This type of error should be caught by Playwright testing, not discovered by the user.

### When to Test:
1. After completing any phase
2. After making changes to card components
3. After updating layout or routing
4. Before committing major changes
5. When adding new features

### Browser Testing Note:
Use headless mode for automated testing. Only use headed mode when you need to visually inspect the UI or take screenshots for documentation.
