# TCM Intake App - Work Summary (Phase 8 Complete + Refinements)

## Current Status: Phase 8 Complete ✅

All major UI components are built and working. The application has proper data/presentation separation, conditional rendering, and proper time formatting.

---

## Complete Feature List

### Phase 1-7 (Previous Work)
- ✅ Next.js 14 + TypeScript + Tailwind CSS + Shadcn UI
- ✅ Type definitions for all data structures
- ✅ All atomic components (StatusBadge, CopyButton, SectionHeader, PatientAvatar)
- ✅ CollapsibleSidebar with fullWidth support
- ✅ Left Sidebar with patient list (expanded and collapsed states)
- ✅ Middle Column with section navigation and clinical notes textarea
- ✅ Right Sidebar with 8 AI structured notes cards
- ✅ All cards with smart conditional rendering

### Phase 8 (Current - Complete)
- ✅ MainLayout component with global state management
- ✅ Patient switching functionality
- ✅ Sidebar collapse/expand for both left and right
- ✅ AI toggle to show/hide right sidebar
- ✅ Clinical notes persistence per patient
- ✅ Mock data for 5 patients (empty AI notes)
- ✅ Proper time formatting with moment.js

---

## Recent Updates (This Session)

### 1. Conditional AI Cards ✅
**All 8 AI cards now intelligently hide when empty:**

- `ChiefComplaintCard` - Returns null if no complaints
- `HPICard` - Returns null if no HPI text
- `SubjectiveCard` - Hides empty sections (PMH, FH, SH, ES, TCM Review), returns null if all empty
- `TongueExaminationCard` - Hides empty Body/Coating sections
- `PulseExaminationCard` - Returns null if no pulse text
- `DiagnosisCard` - Hides empty TCM diagnosis and ICD codes
- `TreatmentCard` - Returns null if no treatment principle
- `AcupunctureCard` - **Removed "Treatment Side" label**, returns null if no points

**Result:** With empty mock data, right sidebar shows no cards (clean UI until AI generates data)

### 2. Sidebar Collapse Improvements ✅
**Right Sidebar:**
- No longer disappears completely when collapsed
- Shows collapsed state with Sparkles icon
- Can be reopened by clicking collapse button
- `components/layout/MainLayout.tsx:196` - Removed `&& rightOpen` condition
- `components/right/RightSidebar.tsx:142-146` - Added `collapsedContent`

**Left Sidebar:**
- Collapsed patients now top-aligned (added `pt-4`)
- Shows appointment times below each avatar in collapsed state
- Time format: "9:30A" (short form for space efficiency)
- `components/left/LeftSidebar.tsx:68-91` - Updated collapsedContent structure

### 3. Time Formatting with Moment.js ✅
**Data Layer (Separation of Concerns):**
- Times stored as ISO strings: `"2025-10-09T09:30:00"`
- `data/mockPatients.ts` - No formatting in data layer

**Display Layer (Frontend Formatting):**
- **Collapsed sidebar:** `moment().format("h:mmA").slice(0, -1)` → "9:30A"
  - `components/left/LeftSidebar.tsx:71`
- **Expanded sidebar:** `moment().format("h:mm A")` → "9:30 AM"
  - `components/left/PatientCard.tsx:32`
- **TopNavigation:** `moment().format("h:mm A")` → "9:30 AM"
  - `components/middle/TopNavigation.tsx:54`

### 4. Development Guidelines ✅
- Created `CLAUDE.md` with testing requirements
- Emphasizes using headless Playwright for testing before marking work complete
- Catches runtime errors before users discover them

---

## File Structure

```
components/
├── atomic/          ✅ 4 components
│   ├── StatusBadge.tsx
│   ├── CopyButton.tsx (icon-only, h-6 w-6)
│   ├── SectionHeader.tsx
│   └── PatientAvatar.tsx
├── layout/          ✅ 2 components
│   ├── CollapsibleSidebar.tsx (supports fullWidth for right sidebar)
│   └── MainLayout.tsx (global state management)
├── left/            ✅ 3 components
│   ├── PatientCard.tsx (formats time: "9:30 AM")
│   ├── PatientList.tsx
│   └── LeftSidebar.tsx (collapsed formats time: "9:30A")
├── middle/          ✅ 5 components
│   ├── TopNavigation.tsx (formats time: "9:30 AM")
│   ├── SectionLabel.tsx
│   ├── TCMSection.tsx
│   ├── NotesTextarea.tsx
│   └── MiddleColumn.tsx
└── right/           ✅ 9 components
    ├── InfoCard.tsx (reusable wrapper)
    ├── ChiefComplaintCard.tsx (conditional)
    ├── HPICard.tsx (conditional)
    ├── SubjectiveCard.tsx (conditional sections + TCM Review)
    ├── TongueExaminationCard.tsx (conditional)
    ├── PulseExaminationCard.tsx (conditional)
    ├── DiagnosisCard.tsx (conditional)
    ├── TreatmentCard.tsx (conditional)
    ├── AcupunctureCard.tsx (conditional, no treatment side label)
    └── RightSidebar.tsx (with collapsedContent)

data/
└── mockPatients.ts  ✅ 5 patients with ISO time strings, empty AI notes

types/
└── index.ts         ✅ Complete type definitions

app/
└── page.tsx         ✅ Uses MainLayout with mock data
```

---

## Key Technical Details

### MainLayout State Management
**File:** `components/layout/MainLayout.tsx`

**State Variables:**
- `currentPatient` - Currently selected patient
- `leftOpen` - Left sidebar expanded/collapsed
- `rightOpen` - Right sidebar expanded/collapsed
- `aiEnabled` - AI toggle (shows/hides right sidebar)
- `autoUpdate` - Auto-update toggle for AI
- `clinicalNotes` - Notes stored per patient ID

**Key Functions:**
- `handlePatientClick(patient)` - Switch patients
- `handlePrevious()` / `handleNext()` - Navigate patients
- `handleNotesChange(value)` - Save notes per patient
- `getCurrentNotes()` - Get notes for current patient

### CollapsibleSidebar Props
**File:** `components/layout/CollapsibleSidebar.tsx`

- `position`: "left" | "right"
- `isOpen`: boolean
- `onToggle`: () => void
- `children`: React.ReactNode (expanded content)
- `collapsedContent?`: React.ReactNode (collapsed content)
- `primary?`: React.ReactNode (header left)
- `secondary?`: React.ReactNode (header right)
- `className?`: string
- `fullWidth?`: boolean (for right sidebar)

**Behavior:**
- Left: `border-r`, fixed `w-64`
- Right: `border-l`, `flex-1` when `fullWidth={true}`

### Mock Data Structure
**File:** `data/mockPatients.ts`

```typescript
export const mockPatients: Patient[] = [
  {
    id: "1",
    initials: "MW",
    time: "2025-10-09T09:30:00",  // ISO string
    status: "completed"
  },
  // ... 4 more patients
];

export const mockPatientsData: Record<string, any> = {
  "1": {
    aiNotes: {
      chiefComplaints: [],
      hpi: "",
      subjective: { pmh: "", fh: "", sh: "", es: "", stressLevel: "0/10" },
      tcmReview: {},
      tongue: { body: "", coating: "" },
      pulse: { text: "" },
      diagnosis: { tcmDiagnosis: "", icdCodes: [] },
      treatment: "",
      acupuncture: []
    },
    clinicalNotes: ""
  },
  // ... 4 more patients
};
```

---

## Color Palette

- **Teal**: `#14B8A6` (teal-500/600) - AI icons, highlights, active states
- **Status colors:**
  - Completed: teal
  - Active: blue
  - Waiting: orange
  - Scheduled: purple
- **ICD badges**: Gray background
- **Stress badge**: Orange (`orange-100/orange-700`)
- **Backgrounds:**
  - Sidebar content: `bg-gray-50`
  - Cards: `bg-white border border-gray-200`
  - Grouped items: `bg-gray-50 border border-gray-200`

---

## What Works Now

### ✅ Patient Management
- View list of 5 patients in left sidebar
- Click to switch between patients
- Previous/Next navigation buttons
- Active patient highlighted with blue ring
- Collapsed sidebar shows first 4 patients with times

### ✅ Clinical Notes
- Type notes in middle column textarea
- Notes persist per patient when switching
- Section labels add text to notes on click
- TCM section expands to show 16 categories

### ✅ Sidebar Controls
- Left sidebar collapse/expand (shows 4 patient avatars when collapsed)
- Right sidebar collapse/expand (shows Sparkles icon when collapsed)
- AI toggle shows/hides entire right sidebar
- Auto-update toggle (UI only, no backend yet)

### ✅ AI Structured Notes
- All 8 cards hide when data is empty
- Copy buttons on all cards
- Chief Complaint has 2 copy buttons per complaint (text + ICD code)
- Smart section hiding (only show sections with content)

---

## What's NOT Implemented Yet

### 🔴 AI Generation
- No actual AI integration yet
- All AI notes are empty
- Refresh button does nothing (logs to console)
- Auto-update toggle has no effect

### 🔴 Data Persistence
- No database or localStorage
- Notes only persist in React state (lost on refresh)
- No save/load functionality

### 🔴 Time Management
- Last saved time is hardcoded ("15:23")
- No actual auto-save functionality
- Patient appointment times are static mock data

### 🔴 Validation & Error Handling
- No form validation
- No error boundaries
- No loading states
- No empty state messages

---

## Next Steps for AI Integration

### Phase 9: AI Backend Integration (Not Started)

**Priority 1: AI Notes Generation**
1. Create API endpoint for AI generation
   - Input: Clinical notes text
   - Output: AIStructuredNotes object
2. Wire up "Refresh AI" button to call API
3. Update mock data with AI-generated content
4. Show loading state during generation

**Priority 2: Auto-Update**
1. Implement debounced auto-generation
2. Wire up auto-update toggle
3. Show "Generating..." indicator
4. Handle API errors gracefully

**Priority 3: Real-time Updates**
1. Update AI cards as notes are typed (with debounce)
2. Show timestamp of last AI generation
3. Add "Regenerate" option per card

---

## Important Code Locations

### State Management
- `components/layout/MainLayout.tsx:100-107` - All state variables
- `components/layout/MainLayout.tsx:131-169` - Event handlers

### Time Formatting
- `components/left/LeftSidebar.tsx:71` - Collapsed format "9:30A"
- `components/left/PatientCard.tsx:32` - Expanded format "9:30 AM"
- `components/middle/TopNavigation.tsx:54` - Top nav format "9:30 AM"

### Conditional Rendering
- All card components in `components/right/` check for content and return `null` if empty
- Example: `SubjectiveCard.tsx:98` - Returns null if no content

### Sidebar Collapse
- `components/layout/MainLayout.tsx:196` - Right sidebar always renders when AI enabled
- `components/right/RightSidebar.tsx:142-146` - Collapsed content with Sparkles icon
- `components/left/LeftSidebar.tsx:68-91` - Collapsed content with patient avatars + times

---

## Development Commands

```bash
# Start dev server
npm run dev
# Runs on http://localhost:3001 (port 3000 likely in use)

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## Git Commits (This Session)

1. `feat: Phase 8 - Complete integration with MainLayout and mock data`
2. `feat: Update MainLayout flex sizing and remove AI notes from mock data`
3. `feat: Make all AI cards conditional - hide when no data`
4. `docs: Add Claude development guidelines for testing`
5. `fix: Improve sidebar collapse behavior`
6. `style: Shorten time format to H:MMA`
7. `feat: Use moment.js to format times as h:mmA`
8. `refactor: Format times on frontend, store as ISO strings in data`

---

## Known Issues

### ⚠️ Minor Issues
- Webpack cache warnings in stderr (harmless)
- Port 3000 in use, server runs on 3001
- No TypeScript errors in build

### ✅ All Fixed Issues
- ✅ Right sidebar collapse behavior (was disappearing, now shows icon)
- ✅ Left sidebar patient alignment (now top-aligned with times)
- ✅ Time format (properly separated data/presentation)
- ✅ Empty AI cards (all hide properly)
- ✅ TCM Review formatting (proper spacing, no bullets)

---

## Package Dependencies

```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.6",
    "moment": "^2.30.1",
    "next": "14.2.15",
    "react": "^18",
    "react-dom": "^18"
  }
}
```

---

## For the Next Developer

### Quick Start
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Open `http://localhost:3001` in your browser
4. Check `CLAUDE.md` for development guidelines

### Key Files to Understand
1. `components/layout/MainLayout.tsx` - Main app layout and state
2. `data/mockPatients.ts` - Mock patient data (empty AI notes)
3. `types/index.ts` - All TypeScript interfaces
4. `components/right/RightSidebar.tsx` - AI structured notes container

### If You Need to Add AI Integration
1. Create API endpoint that accepts clinical notes text
2. Parse text and generate AIStructuredNotes object
3. Wire up "Refresh AI" button in `MainLayout.handleRefresh()`
4. Update `currentPatientData.aiNotes` with API response
5. Cards will automatically show once data is populated

### Testing Checklist
- [ ] Patient switching works (all 5 patients)
- [ ] Clinical notes persist per patient
- [ ] Left sidebar collapse shows 4 avatars with times ("9:30A" format)
- [ ] Right sidebar collapse shows Sparkles icon
- [ ] AI toggle shows/hides right sidebar
- [ ] All AI cards remain hidden (no data yet)
- [ ] Time displays as "9:30 AM" in expanded views
- [ ] Copy buttons work on all cards
- [ ] No console errors

---

## Architecture Notes

### Data Flow
```
mockPatients.ts (ISO strings)
    ↓
MainLayout (state management)
    ↓
Components (format for display with moment.js)
    ↓
User sees formatted times
```

### Component Hierarchy
```
app/page.tsx
└── MainLayout
    ├── LeftSidebar
    │   ├── PatientList
    │   │   └── PatientCard (formats time)
    │   └── collapsedContent (formats time)
    ├── MiddleColumn
    │   ├── TopNavigation (formats time)
    │   ├── SectionLabel
    │   ├── TCMSection
    │   └── NotesTextarea
    └── RightSidebar (conditional on aiEnabled)
        ├── collapsedContent (Sparkles icon)
        └── 8 AI Cards (all conditional on data)
```

### State Management Pattern
- Centralized in MainLayout
- Props passed down to children
- Callbacks passed for state updates
- No global state library (React useState only)

---

## Summary for AI Agent

**What's Done:**
- Complete UI with 3-column layout
- 5 mock patients with empty AI notes
- Patient switching, notes persistence
- Sidebar collapse/expand
- Smart conditional rendering (cards hide when empty)
- Proper time formatting (data layer = ISO, display layer = moment.js)

**What's Next:**
- Integrate AI backend to generate structured notes
- Wire up auto-update functionality
- Add loading states and error handling
- Implement data persistence (localStorage or database)

**Current State:**
- App is fully functional for manual note-taking
- AI features are UI-only (no backend yet)
- All components are built and tested
- Ready for AI integration phase

---

*Last updated: 2025-10-09*
*Phase: 8 Complete*
*Next Phase: 9 (AI Integration)*
