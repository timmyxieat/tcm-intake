# TCM Intake App - Work Summary (Phase 7 Complete)

## Current Status: Phase 7 Complete ✅

### What's Been Completed (All Phases)

#### Phase 1-4: Foundation ✅
- Next.js 14, TypeScript, Tailwind CSS, Shadcn UI setup
- Type definitions (Patient, MedicalData, TCMData, AIStructuredNotes)
- Constants file for symptoms, ICD codes, statuses
- **Atomic components**: StatusBadge, CopyButton, SectionHeader, PatientAvatar
- **Layout component**: CollapsibleSidebar (with primary/secondary header props, fullWidth support)

#### Phase 5: Left Sidebar ✅
- **PatientCard**: Individual patient item with avatar, time, status badge
- **PatientList**: Flat list of patients (no status grouping)
- **LeftSidebar**: Complete sidebar with CollapsibleSidebar wrapper
  - Expanded: "Today's Patients" header + PatientList
  - Collapsed: First 4 patient avatars (clickable, show active ring)

#### Phase 6: Middle Column ✅
- **TopNavigation**: Patient avatar/time, auto-saving status, AI toggle
- **SectionLabel**: Simple navigation labels for sections
- **TCMSection**: Collapsible section with category list
- **NotesTextarea**: Large textarea for clinical notes
- **MiddleColumn**: Two-column layout
  - **Left column**: Section navigation (CC, HPI, PMH, FH, SH, ES, TCM, Tongue, Pulse, Diagnosis, Points, Plan)
    - Light gray background (`bg-gray-50`)
    - TCM categories have teal left border line
  - **Right column**: Full-height clinical notes textarea

#### Phase 7: Right Sidebar ✅ **[RECENTLY UPDATED]**
- **InfoCard**: Reusable wrapper for all AI cards (white background, gray border, icon, copy button)
- **8 AI Cards**: ChiefComplaint, HPI, Subjective (includes TCM Review), Tongue, Pulse, Diagnosis, Treatment, Acupuncture
- **RightSidebar**: Complete sidebar with full-width mode
  - Auto-updating toggle and refresh button
  - Light gray background (`bg-gray-50`)
  - **Left border** (`border-l`)
  - All 8 cards displayed

### Latest Design Updates (Phase 7 Refinements)

#### Right Sidebar Styling:
- ✅ Sparkles icon next to "AI Structured Notes" header
- ✅ Light gray background for main content area (`bg-gray-50`)
- ✅ White cards with light gray borders (`bg-white border border-gray-200`)
- ✅ Left border on the entire sidebar (`border-l`)
- ✅ Full-width mode - sidebar takes up all available horizontal space
- ✅ Icon-only copy buttons (no text label)

#### Chief Complaint Card Structure:
- ✅ Each complaint grouped in gray box (`bg-gray-50 border border-gray-200 rounded-lg p-3`)
- ✅ Complaint text with individual copy button (copies text only)
- ✅ ICD-10 code with individual copy button (copies code only)
- ✅ No copy button on section header

#### Subjective Card Structure:
- ✅ Combined card containing:
  - Past Medical History (PMH) with highlighted keywords
  - Family History (FH) with highlighted keywords
  - Social History (SH) with highlighted keywords
  - Emotional Status (ES) with stress level badge
  - **TCM Review of Systems** (two-column bullet grid layout)
- ✅ TCMReviewCard has been removed as a separate component

#### Color Palette:
- **Teal**: `#14B8A6` (teal-500/teal-600) - AI notes, icons, highlights
- **Status colors**:
  - Completed: teal
  - Active: blue
  - Waiting: orange
  - Scheduled: purple
- **ICD badges**: Gray background
- **Stress badge**: Orange background (`orange-100/orange-700`)
- **Gray backgrounds**: `bg-gray-50` for sidebar content, `bg-gray-50` for grouped items

### File Structure
```
components/
├── atomic/          ✅ 4 components (StatusBadge, CopyButton, SectionHeader, PatientAvatar)
├── layout/          ✅ 1 component (CollapsibleSidebar - supports fullWidth)
├── left/            ✅ 3 components (PatientCard, PatientList, LeftSidebar)
├── middle/          ✅ 5 components (TopNavigation, SectionLabel, TCMSection, NotesTextarea, MiddleColumn)
└── right/           ✅ 10 components (InfoCard + 8 specific cards + RightSidebar)
                     Note: TCMReviewCard removed - functionality moved to SubjectiveCard
```

## Next Phase: Phase 8 - Integration & Final Assembly

### Remaining Work

#### 1. Build MainLayout Component
- Create `components/layout/MainLayout.tsx`
- Three-column grid layout:
  - LeftSidebar (collapsible, `border-r`)
  - MiddleColumn (two internal columns)
  - RightSidebar (collapsible, full-width, `border-l`)
- Manage global state:
  - Active patient selection
  - Left sidebar open/closed
  - Right sidebar open/closed
  - AI toggle state
  - Clinical notes per patient

#### 2. Create Comprehensive Mock Data
- Create `data/mockPatients.ts`
- Full patient dataset with:
  - Patient demographics (initials, time, status)
  - Clinical notes for each patient
  - AI structured notes for each patient (all 8 sections)
- Multiple patients across all statuses (completed, active, waiting, scheduled)

#### 3. Wire Up Main Application
- Update `app/page.tsx` to use MainLayout
- Implement patient switching logic
- Connect all interactive features:
  - Patient selection updates all three columns
  - Notes auto-save
  - AI toggle affects right sidebar
  - Sidebar collapse/expand
  - Copy buttons work across all cards

#### 4. Polish & Testing
- Test all collapse/expand functionality
- Verify copy buttons work across all cards
- Test patient switching updates all data
- Verify styling matches all reference images:
  - `docs/ui/1.0 - AI Structured Notes.png`
  - `docs/ui/2.0 - Hidden AI Notes.png`
  - `docs/ui/3.0 - All Shown.png`
  - `docs/ui/4.0 - Hidden Left Bar.png`
- Responsive behavior testing

### Reference Images
- `docs/ui/1.0 - AI Structured Notes.png` - Right sidebar detail
- `docs/ui/2.0 - Hidden AI Notes.png` - Right sidebar collapsed
- `docs/ui/3.0 - All Shown.png` - Full three-column layout
- `docs/ui/4.0 - Hidden Left Bar.png` - Left sidebar collapsed

### Development Commands
- Dev server: `npm run dev`
- View showcase: `http://localhost:3000/components`
- Reference images: `docs/ui/*.png`

### Important Notes for Next Coder

1. **Right Sidebar Structure**:
   - RightSidebar now uses `fullWidth={true}` to take up all available space
   - Main content has `bg-gray-50` background
   - Each InfoCard has `bg-white border border-gray-200`
   - Sidebar has `border-l` for left border
   - TCM Review of Systems is now part of SubjectiveCard, not a separate card

2. **Chief Complaint Card**:
   - Each complaint is in a grouped container with gray background
   - Two copy buttons per complaint:
     - One for complaint text only
     - One for ICD-10 code only
   - No copy button on the card header

3. **Component Props to Remember**:
   - CollapsibleSidebar: `fullWidth` prop for right sidebar
   - SubjectiveCard: now accepts `tcmReview` prop (optional)
   - InfoCard: `hasCopy` and `textToCopy` props for copy functionality
   - CopyButton: icon-only design (no text label)

4. **Styling Consistency**:
   - All sidebars use CollapsibleSidebar wrapper
   - Left sidebar: `border-r`, Right sidebar: `border-l`
   - Header height: `py-3` (consistent across all three columns)
   - Teal is the primary accent color for AI/TCM features
   - Gray backgrounds for content areas and grouped items

5. **Visual Testing**:
   - Use Playwright MCP to take screenshots
   - Compare with reference images in `docs/ui/`
   - Iterate until pixel-perfect

### Key Implementation Details

#### CollapsibleSidebar Component
- Located: `components/layout/CollapsibleSidebar.tsx`
- Props: `position`, `isOpen`, `onToggle`, `children`, `collapsedContent`, `primary`, `secondary`, `className`, `fullWidth`
- When `fullWidth={true}` and `position="right"`: uses `flex-1` instead of fixed width
- Border direction based on position: left sidebar gets `border-r`, right sidebar gets `border-l`

#### SubjectiveCard Component
- Located: `components/right/SubjectiveCard.tsx`
- Now includes TCM Review of Systems as the last section
- Props include: `pmh`, `pmhHighlights`, `fh`, `fhHighlights`, `sh`, `shHighlights`, `es`, `stressLevel`, `tcmReview` (optional)
- TCM Review displayed in two-column grid layout
- Copy button includes all sections (PMH, FH, SH, ES, and TCM Review)

#### ChiefComplaintCard Component
- Located: `components/right/ChiefComplaintCard.tsx`
- Each complaint wrapped in `bg-gray-50 border border-gray-200 rounded-lg p-3`
- Two copy buttons per complaint:
  - First button copies complaint text only
  - Second button copies ICD-10 code only
- No section-level copy button

### Git Status
Current branch: main
Phase 7 refinements complete and ready for Phase 8 integration.
