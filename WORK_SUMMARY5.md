# TCM Intake App - Work Summary (Phase 7 Complete + TCM Review Refinements)

## Current Status: Phase 7 Complete ✅ (with pending TCM Review formatting fix)

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
  - **Left column**: Section navigation with light gray background
  - **Right column**: Full-height clinical notes textarea

#### Phase 7: Right Sidebar ✅ **[RECENTLY UPDATED]**
- **InfoCard**: Reusable wrapper for all AI cards (white background, gray border, icon, copy button)
- **8 AI Cards**: ChiefComplaint, HPI, Subjective (includes TCM Review), Tongue, Pulse, Diagnosis, Treatment, Acupuncture
- **RightSidebar**: Complete sidebar with full-width mode
  - Auto-updating toggle and refresh button
  - Light gray background (`bg-gray-50`)
  - **Left border** (`border-l`)
  - All 8 cards displayed

### Latest Changes (Session Summary)

#### 1. Right Sidebar Full-Width Mode
**Files Modified:**
- `components/layout/CollapsibleSidebar.tsx:44,56,70-71,123`
  - Added `fullWidth` prop (boolean)
  - When `fullWidth={true}` and `position="right"`: uses `flex-1` instead of fixed `w-96`
  - Changed border logic: left sidebar gets `border-r`, right sidebar gets `border-l`
  - Removed default padding from content wrapper

**Files Modified:**
- `components/right/RightSidebar.tsx:116,144-145`
  - Added `fullWidth={true}` to CollapsibleSidebar
  - Added `bg-gray-50` background to ScrollArea
  - Added padding to content wrapper (`p-4`)

**Files Modified:**
- `components/left/LeftSidebar.tsx:86`
  - Added padding back to left sidebar content (`px-4 py-4`)

#### 2. Right Sidebar Visual Refinements
**Files Modified:**
- `components/right/RightSidebar.tsx:8,119`
  - Imported `Sparkles` icon from lucide-react
  - Replaced dot indicator with Sparkles icon next to "AI Structured Notes"

**Files Modified:**
- `components/right/InfoCard.tsx:49`
  - Changed from `bg-teal-50` to `bg-white border border-gray-200`
  - All AI cards now have white background with gray border

**Files Modified:**
- `components/atomic/CopyButton.tsx:39-51`
  - Changed to icon-only button (`size="icon"`)
  - Removed "Copy" text label
  - Reduced size to `h-6 w-6`
  - Smaller icon size `h-3.5 w-3.5`
  - Added hover effect `hover:bg-teal-50`

#### 3. Chief Complaint Card Restructure
**Files Modified:**
- `components/right/ChiefComplaintCard.tsx:32-62`
  - Removed section-level copy button (`hasCopy={false}`)
  - Wrapped each complaint in gray container (`bg-gray-50 border border-gray-200 rounded-lg p-3`)
  - Added two copy buttons per complaint:
    1. Copy button for complaint text only (copies just the complaint text)
    2. Copy button for ICD-10 code only (copies just the code, e.g., "R53.83")
  - Removed combined copy functionality

**Visual Structure:**
```
┌─ Chief Complaint (CC) ─────────────────────┐
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Chronic Fatigue for 6 months    [📋] │  │
│  │                                       │  │
│  │ ICD-10: R53.83 - Other fatigue  [📋] │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Bloating for 1 year             [📋] │  │
│  │                                       │  │
│  │ ICD-10: R14.0 - Abdominal...    [📋] │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

#### 4. TCM Review of Systems Merged into Subjective
**Files Modified:**
- `components/right/SubjectiveCard.tsx:27-39,78-179`
  - Added `tcmReview` optional prop
  - Integrated TCM Review of Systems as the last section in Subjective card
  - Displays in two-column grid layout
  - Updated copy text to include TCM Review data

**Files Modified:**
- `components/right/RightSidebar.tsx:9-12,145-148`
  - Removed import of `TCMReviewCard`
  - Removed `<TCMReviewCard />` from render
  - Passed `tcmReview={data.tcmReview}` to `SubjectiveCard`

**Current Subjective Card Structure:**
1. Past Medical History (PMH) - with teal highlights
2. Family History (FH) - with teal highlights
3. Social History (SH) - with teal highlights
4. Emotional Status (ES) - with stress level badge
5. **TCM Review of Systems** - two-column grid layout

### ⚠️ PENDING ISSUE: TCM Review Formatting

**Problem:**
The TCM Review of Systems section needs formatting adjustments that are partially complete.

**Current State:**
File: `components/right/SubjectiveCard.tsx:145-175`
- Removed bullet points from category names ✅
- Changed items to `<div>` elements instead of `<li>` ✅

**Still Needed:**
The user reported that the visual output doesn't match expectations. Requirements:
1. Add a blank line/extra spacing after "TCM Review of Systems:" heading before the first category
2. Format should be: `Category: item text` (no bullets, category inline with first item)

**Expected Format:**
```
TCM Review of Systems

Appetite: Poor, especially morning

Stool: Loose, 2-3x daily
Multiple times per day

Thirst: Minimal, prefers warm drinks
```

**Current Code Structure:**
```tsx
<h4 className="text-xs font-semibold text-gray-700 mb-2">TCM Review of Systems</h4>
<div className="grid grid-cols-2 gap-4">
  <div className="space-y-2">
    {leftColumn.map(([category, items]) => (
      <div key={category}>
        <span className="text-xs font-semibold text-gray-700">{category}: </span>
        {items.map((item, idx) => (
          <div key={idx} className="text-sm text-gray-800">{item}</div>
        ))}
      </div>
    ))}
  </div>
  ...
</div>
```

**Fix Needed:**
1. Increase `mb-2` to `mb-3` or `mb-4` on the h4 heading to add more space
2. Put category name and first item on the same line if there's only one item, otherwise put items below

### File Structure
```
components/
├── atomic/          ✅ 4 components (StatusBadge, CopyButton, SectionHeader, PatientAvatar)
├── layout/          ✅ 1 component (CollapsibleSidebar - supports fullWidth, dynamic borders)
├── left/            ✅ 3 components (PatientCard, PatientList, LeftSidebar)
├── middle/          ✅ 5 components (TopNavigation, SectionLabel, TCMSection, NotesTextarea, MiddleColumn)
└── right/           ✅ 10 components (InfoCard + 8 specific cards + RightSidebar)
                     Note: TCMReviewCard removed - merged into SubjectiveCard
```

### Color Palette
- **Teal**: `#14B8A6` (teal-500/teal-600) - AI icons, highlights, accents
- **Status colors**: Completed (teal), Active (blue), Waiting (orange), Scheduled (purple)
- **ICD badges**: Gray background
- **Stress badge**: Orange background (`orange-100/orange-700`)
- **Backgrounds**:
  - Sidebar content: `bg-gray-50`
  - Cards: `bg-white border border-gray-200`
  - Grouped items: `bg-gray-50 border border-gray-200`

### Key Component Details

#### CollapsibleSidebar (`components/layout/CollapsibleSidebar.tsx`)
**Props:**
- `position`: "left" | "right"
- `isOpen`: boolean
- `onToggle`: () => void
- `children`: React.ReactNode
- `collapsedContent?`: React.ReactNode
- `primary?`: React.ReactNode (header content)
- `secondary?`: React.ReactNode (header right side)
- `className?`: string
- `fullWidth?`: boolean ⭐ NEW

**Behavior:**
- Left sidebar: `border-r`, fixed width `w-64`
- Right sidebar: `border-l`, width `flex-1` when `fullWidth={true}`, else `w-96`
- Content wrapper has no padding (removed in line 123)

#### SubjectiveCard (`components/right/SubjectiveCard.tsx`)
**Props:**
- `pmh`: string
- `pmhHighlights?`: string[]
- `fh`: string
- `fhHighlights?`: string[]
- `sh`: string
- `shHighlights?`: string[]
- `es`: string
- `stressLevel`: string
- `tcmReview?`: { [key: string]: string[] } ⭐ NEW

**Structure:**
- 5 sections: PMH, FH, SH, ES, TCM Review of Systems
- TCM Review displayed in two-column grid
- Copy button includes all sections
- Highlights keywords in teal color

#### ChiefComplaintCard (`components/right/ChiefComplaintCard.tsx`)
**Props:**
- `complaints`: Array<{ text: string; icdCode: string; icdLabel: string }>

**Structure:**
- Each complaint in gray container (`bg-gray-50 border border-gray-200 rounded-lg p-3`)
- Two copy buttons per complaint:
  1. Complaint text copy button (line 45)
  2. ICD-10 code copy button (line 55)
- No section-level copy button

#### CopyButton (`components/atomic/CopyButton.tsx`)
**Props:**
- `textToCopy`: string
- `className?`: string

**Design:**
- Icon-only (no text label)
- Size: `h-6 w-6`
- Icon size: `h-3.5 w-3.5`
- Shows checkmark on successful copy for 2 seconds
- Hover effect: `hover:bg-teal-50`

### Next Steps (Phase 8)

1. **Fix TCM Review Formatting** ⚠️ PRIORITY
   - Increase spacing after "TCM Review of Systems:" heading
   - Adjust category/item layout for better readability
   - Test with reference images

2. **Build MainLayout Component**
   - Create `components/layout/MainLayout.tsx`
   - Three-column flex layout with proper sizing
   - Global state management for patient, sidebars, AI toggle

3. **Create Mock Data**
   - Create `data/mockPatients.ts`
   - Multiple patients with full AI structured notes

4. **Wire Up Interactivity**
   - Patient switching
   - Sidebar collapse/expand
   - AI toggle
   - Copy functionality verification

5. **Polish & Testing**
   - Compare with reference images in `docs/ui/`
   - Responsive testing
   - Copy button testing

### Development Commands
- Dev server: `npm run dev`
- View showcase: `http://localhost:3000/components`
- Reference images: `docs/ui/*.png`

### Important Notes
- Right sidebar now takes full available width (flex-1)
- TCM Review is part of Subjective, not a separate card
- Each complaint in Chief Complaint has 2 copy buttons
- All cards have white background with gray border
- Copy buttons are icon-only (no text)
- TCM Review formatting needs one more adjustment (spacing after heading)

### Git Status
Current branch: main
Phase 7 complete with pending TCM Review formatting fix.
