# TCM Intake App - Work Summary

**Last Updated:** October 9, 2025
**Current Status:** Phases 1-3 Complete, Ready for Phase 4

---

## Project Overview

TCM (Traditional Chinese Medicine) Intake application built with Next.js 14, TypeScript, and Tailwind CSS. Single-page app for iPad use with localStorage persistence (no database).

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI components
- Moment.js for dates
- localStorage for data persistence
- Playwright for testing

---

## Current State (Phases 1-3 Complete)

### ✅ Phase 1: localStorage Service
**Files:** `lib/localStorage.ts`, `app/test/page.tsx`

**Features:**
- Type-safe CRUD operations for patients, notes, AI notes, preferences
- Test page at `/test` for visual verification
- Export/import functionality
- Storage statistics

### ✅ Phase 2: localStorage Integration + Auto-Save
**Files:** `components/layout/MainLayout.tsx`, `components/middle/MiddleColumn.tsx`, `components/middle/TopNavigation.tsx`, `components/middle/SectionLabel.tsx`, `components/middle/TCMSection.tsx`

**Features:**
- Auto-save clinical notes (2-second debounce)
- Save status indicator: "Saving..." (spinner) → "Saved" (teal)
- Selected patient persists across refreshes
- Sidebar preferences persist (left/right open state)
- Keyboard shortcuts: Cmd+[ (left sidebar), Cmd+] (right sidebar)
- Dynamic patient status: scheduled → active → completed

**Category Completion Tracking:**
- Detects when category labels appear on own line in notes
- Crosses out completed categories (gray + strikethrough)
- Works for all sections: CC, HPI, PMH, FH, SH, ES, Tongue, Pulse, Diagnosis, Points, Plan
- Works for all 17 TCM subcategories: Appetite, Taste, Stool, Thirst, Urine, Sleep, Energy, Temp, Sweat, Head, Ear, Eye, Nose, Throat, Pain, Libido
- TCM header crosses out when all subcategories complete

### ✅ Phase 3: Add Patient Functionality
**File:** `components/left/LeftSidebar.tsx`

**Features:**
- Add patient with initials (2 letters) and time
- Patient immediately appears in sorted list
- New patient auto-selected
- Data persists across refreshes

---

## Key Code Patterns

### Auto-Save Implementation (MainLayout.tsx:169-197)
```typescript
// Debounced auto-save with 2-second delay
useEffect(() => {
  if (!currentPatient?.id) return;
  setSaveStatus("saving");

  const timeout = setTimeout(() => {
    storage.savePatientClinicalNotes(currentPatient.id, notes);
    storage.updatePatient(currentPatient.id, { status: newStatus });
    setPatients(storage.getPatients());
    setSaveStatus("saved");
  }, 2000);

  return () => clearTimeout(timeout);
}, [clinicalNotes, currentPatient?.id, aiNotesData]);
```

### Category Completion Detection (MiddleColumn.tsx:54-60)
```typescript
const isSectionCompleted = (label: string): boolean => {
  if (!clinicalNotes) return false;
  const lines = clinicalNotes.split('\n');
  return lines.some(line => line.trim() === label);
};
```

### localStorage Schema
```typescript
{
  tcm_patients: Patient[],
  tcm_clinical_notes: Record<patientId, string>,
  tcm_ai_notes: Record<patientId, AIStructuredNotes>,
  tcm_preferences: {
    leftSidebarOpen: boolean,
    rightSidebarOpen: boolean,
    autoUpdate: boolean,
    selectedPatientId: string | null
  }
}
```

---

## Next: Phase 4 - AI Generation API

**Goal:** Create OpenAI integration to generate structured TCM notes from clinical notes.

**Tasks:**
1. Create `.env.local` with OpenAI API key (not committed)
2. Create `.env.local.example` template (committed)
3. Install openai package: `npm install openai`
4. Create `app/api/generate-notes/route.ts` API endpoint
5. Build TCM extraction prompt matching `AIStructuredNotes` type
6. Parse and return JSON response
7. Add error handling

**API Endpoint Spec:**
- Method: POST
- Body: `{ clinicalNotes: string, patientId: string }`
- Response: `AIStructuredNotes` JSON
- Model: gpt-4o-mini (fast, cheap)

**AIStructuredNotes Type Reference:**
See `types/index.ts` for full structure. Key fields:
- `note_summary`: string (triggers "completed" status)
- `chiefComplaints`: array with text, icdCode, icdLabel
- `hpi`: string
- `subjective`: { pmh, fh, sh, es, stressLevel }
- `tcmReview`: Record<category, string[]>
- `tongue`: { body, coating, highlights }
- `pulse`: { text, highlights }
- `diagnosis`: { tcmDiagnosis, icdCodes }
- `treatment`: string
- `acupuncture`: array with { name, points, note, noteColor }

---

## Phase 5 Preview - Generate & Refresh Buttons

**Workflow:**
1. User types clinical notes → auto-save
2. User clicks "Generate Structured Notes" → calls API → saves to localStorage
3. User edits notes after generation → red dot appears on refresh button
4. User clicks refresh → regenerates AI notes → clears red dot

**Red Dot Logic:**
```typescript
lastEditedTimestamp > lastGeneratedTimestamp
```

---

## Important Files Reference

**Core Data:**
- `types/index.ts` - TypeScript interfaces
- `lib/localStorage.ts` - Storage utility
- `data/mockData.ts` - Initial mock patients

**Main Components:**
- `components/layout/MainLayout.tsx` - Main app state & logic
- `components/left/LeftSidebar.tsx` - Patient list & add patient
- `components/middle/MiddleColumn.tsx` - Clinical notes & section nav
- `components/middle/TopNavigation.tsx` - Patient header & save status
- `components/right/RightSidebar.tsx` - AI structured notes cards

**Testing:**
- `app/test/page.tsx` - localStorage test interface at `/test`
- `.playwright-mcp/` - Playwright screenshots

---

## Development Commands

```bash
# Run dev server
npm run dev

# Open test page
open http://localhost:3000/test

# Open main app
open http://localhost:3000

# Playwright testing (headless mode preferred)
# Use browser tools in Claude Code
```

---

## Git Commit History

**Latest:** `1746cfc` - feat: Complete Phase 2-3 - localStorage integration and category tracking
- Auto-save with status indicator
- Selected patient persistence
- Category completion tracking with strikethrough
- Keyboard shortcuts

**Previous:** Multiple UI commits from other developer

---

## User Preferences & Patterns

**Coding Style:**
- DRY (Don't Repeat Yourself) code
- Reuse existing components
- Clean, simple, easy to follow
- Essential MVP features only
- Always test with headless Playwright before marking complete

**Commit Style:**
- Descriptive feat/fix/refactor prefixes
- Multi-line commits with details
- Always include Claude Code attribution

**Testing Requirements:**
- MUST test with Playwright after changes
- Check console for errors
- Verify persistence across page refresh
- Use headless mode (only headed for screenshots)

---

## Known Issues / Notes

- None currently - all features working as expected
- Auto-save fixed: removed `saveStatus` from dependency array to prevent infinite loop
- Category strikethrough tested and working for all 17 TCM subcategories
- Keyboard shortcuts added by user (Cmd+[ / Cmd+])

---

## Next Session Tasks

1. **Phase 4 - Start AI Integration:**
   - Check if OpenAI key exists in `.env.local`
   - If not, create `.env.local.example` template
   - Install openai package
   - Create API route at `app/api/generate-notes/route.ts`
   - Build TCM extraction prompt (see `types/index.ts` for structure)
   - Test with sample clinical notes

2. **After Phase 4:**
   - Phase 5: Wire up Generate & Refresh buttons
   - Phase 6: Full end-to-end Playwright testing

---

## Implementation Plan Location

See `docs/IMPLEMENTATION_PLAN.md` for detailed task checklists and time estimates.
