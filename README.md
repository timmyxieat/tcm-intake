# TCM Intake - AI Structured Notes Interface

An exact replica of the TCM (Traditional Chinese Medicine) intake interface with AI-powered structured notes, built with HTML, CSS, and vanilla JavaScript.

## Features

- **Patient Management Panel**: Left sidebar showing today's patients categorized by status (Completed, Active, Waiting, Scheduled)
- **Body Systems Navigator**: Center panel with TCM body system categories and dropdown menu
- **AI Structured Notes**: Right panel displaying comprehensive medical notes with:
  - Chief Complaint with ICD-10 codes
  - History of Present Illness
  - Subjective information (PMH, FH, SH, ES)
  - TCM Review of Systems
  - Tongue and Pulse Examinations
  - Diagnosis with TCM and ICD-10 codes
  - Treatment Principles
  - Acupuncture Points by body region

## Interactive Features

- ✅ Smooth scrolling in all panels
- ✅ Patient selection with header updates
- ✅ TCM menu navigation with section highlighting
- ✅ Collapsible TCM dropdown menu
- ✅ Copy-to-clipboard functionality for all sections
- ✅ Auto-saving indicator with animation
- ✅ Real-time clock display
- ✅ Keyboard navigation support

## Getting Started

### View the Interface

Simply open `index.html` in your browser:

```bash
open index.html
```

### Run Tests

The project includes comprehensive Playwright tests to verify all functionality:

```bash
# Install dependencies
npm install

# Run tests in headless mode
npm test

# Run tests with browser visible
npm run test:headed

# Run tests with Playwright UI
npm run test:ui
```

## Project Structure

```
tcm-intake/
├── index.html              # Main HTML structure
├── styles.css              # Complete styling
├── script.js               # Interactive functionality
├── playwright.config.js    # Playwright configuration
├── tests/
│   ├── ui-functionality.spec.js  # Comprehensive UI tests
│   └── screenshot.spec.js        # Screenshot capture
├── docs/
│   └── ui/                       # Original design screenshots
└── README.md
```

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with grid and flexbox layouts
- **Vanilla JavaScript**: No frameworks, pure DOM manipulation
- **Playwright**: End-to-end testing

## Test Coverage

All 23 tests passing ✓

- Layout and structure verification
- Scrollability tests for all panels
- Patient selection and navigation
- Menu interaction and highlighting
- Copy functionality with clipboard API
- Visual styling and color scheme validation
- Dropdown toggle functionality
- Section navigation and scrolling

## Design Fidelity

The implementation is an exact replica of the original design specifications, including:

- Precise color schemes (teal, purple, orange, blue badges)
- Exact spacing and padding
- Proper typography and font weights
- Accurate border radius and shadows
- Responsive scrollable containers
- Matching icon emojis

## Browser Compatibility

Tested and working on:
- Chrome/Chromium (latest)
- Safari (macOS)
- Firefox (latest)

## License

ISC
