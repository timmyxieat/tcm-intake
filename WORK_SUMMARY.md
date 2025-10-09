# TCM Intake App - Work Summary

**Last Updated:** October 9, 2025
**Current Status:** Phases 1-4 Complete ✅

---

## Project Overview

TCM (Traditional Chinese Medicine) Intake application built with Next.js 14, TypeScript, and Tailwind CSS. Single-page app for iPad use with localStorage persistence and OpenAI GPT-4o integration for automated TCM diagnosis.

**Tech Stack:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI components
- Moment.js for dates
- localStorage for data persistence
- OpenAI GPT-4o for AI diagnosis
- Playwright for testing

---

## Current State (Phases 1-4 Complete)

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

### ✅ Phase 4: AI Integration with GPT-4o
**Files:** `app/api/analyze/route.ts`, `hooks/useAIAnalysis.ts`, `lib/aiTransformer.ts`, `lib/clinicalNotesParser.ts`, `data/mockMedicalData.ts`, `.env.local`

**Features:**
- **"Generate Structured Notes" Button:**
  - Positioned in TopNavigation next to save status
  - Teal color scheme with Sparkles icon
  - Shows "Generating..." during analysis
  - Button disabled during processing

- **Clinical Notes Parser:**
  - Parses free-text clinical notes into structured format
  - Recognizes section labels: CC, HPI, PMH, FH, SH, ES, TCM categories
  - Intelligent symptom matching for TCM categories
  - Extracts stress level from ES section
  - Returns MedicalHistory and TCMAssessmentData

- **OpenAI API Integration:**
  - API route: `/api/analyze` (POST)
  - Model: GPT-4o with JSON response format
  - Comprehensive TCM-focused prompt
  - Generates full AIStructuredNotes structure
  - Error handling with user-friendly messages

- **AI Analysis Features:**
  - Chief complaints with ICD-10 codes
  - Detailed HPI narrative
  - Subjective information (PMH, FH, SH, ES)
  - TCM symptom review organized by category
  - Tongue examination (body + coating)
  - Pulse examination
  - TCM diagnosis with Western ICD-10 codes
  - Treatment principles
  - Acupuncture point selections with bilateral/unilateral variants

- **Loading States:**
  - Right sidebar shows "Analyzing patient data..." overlay
  - Spinning refresh icon
  - Button disabled during generation
  - Auto-save to localStorage on completion
  - Patient status updates to "completed"

**Testing:**
- ✅ Successfully tested with insomnia case (mock data)
- ✅ Successfully tested with knee pain case (parsed clinical notes)
- ✅ No console errors
- ✅ All structured note cards populate correctly
- ✅ Loading states work properly
- ✅ Data persists to localStorage

---

## Key Code Patterns

### Auto-Save Implementation (MainLayout.tsx:201-229)
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

### AI Generation Handler (MainLayout.tsx:307-358)
```typescript
const handleGenerateNotes = async () => {
  if (!currentPatient?.id) return;

  const currentNotes = getCurrentNotes();
  if (!currentNotes || currentNotes.trim().length === 0) {
    alert("Please enter clinical notes before generating structured notes.");
    return;
  }

  setIsAnalyzing(true);
  clearError();

  try {
    // Parse clinical notes into structured format
    const { medicalHistory, tcmAssessment } = parseClinicalNotes(currentNotes);

    // Validate that we have some content
    if (!medicalHistory.chiefComplaint && !medicalHistory.hpi) {
      alert("Please include at least a Chief Complaint (CC) or HPI section.");
      setIsAnalyzing(false);
      return;
    }

    // Call AI analysis with parsed data
    const aiNotes = await analyzePatient(medicalHistory, tcmAssessment);

    if (aiNotes) {
      const transformedNotes = transformAINotesToSidebarFormat(aiNotes);
      // Save to localStorage and update patient status
      setAINotesData({ ...aiNotesData, [currentPatient.id]: transformedNotes });
      storage.savePatientAINotes(currentPatient.id, transformedNotes);
      storage.updatePatient(currentPatient.id, { status: 'completed' });
      setPatients(storage.getPatients());
    }
  } catch (error) {
    console.error("AI analysis failed:", error);
    alert("Failed to generate AI notes. Please check your API key and try again.");
  } finally {
    setIsAnalyzing(false);
  }
};
```

### Clinical Notes Parsing (lib/clinicalNotesParser.ts)
```typescript
export function parseClinicalNotes(clinicalNotes: string): ParsedNotes {
  // Split notes into lines and detect section headers
  const lines = clinicalNotes.split('\n');
  let currentSection = '';
  let currentContent: string[] = [];

  const knownSections = [
    'CC', 'HPI', 'PMH', 'FH', 'SH', 'ES',
    'Appetite', 'Taste', 'Stool', 'Thirst', 'Urine',
    'Sleep', 'Energy', 'Temp', 'Sweat',
    'Head', 'Ear', 'Eye', 'Nose', 'Throat', 'Pain', 'Libido',
    'Tongue', 'Pulse', 'Diagnosis', 'Points', 'Plan'
  ];

  // Parse line by line, accumulate content under section headers
  // Mark TCM symptoms as checked if mentioned in text
  // Extract stress level from ES section
  // Return structured MedicalHistory and TCMAssessmentData
}
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

## User Flow: Generate Structured Notes

1. **User types clinical notes** with section labels (CC, HPI, PMH, etc.)
2. **Notes auto-save** (2-second debounce)
3. **User clicks "Generate Structured Notes"** button
4. **Parser extracts structured data** from free text
5. **AI analyzes** and generates TCM diagnosis (~15 seconds)
6. **Right sidebar populates** with AI structured notes
7. **Patient status updates** to "completed"
8. **Data persists** to localStorage

**Example Input:**
```
CC
Right knee pain for 2 weeks

HPI
55-year-old runner with right knee pain for 2 weeks. Pain is medial, worse with stairs and prolonged standing. Recently increased mileage for marathon training.

PMH
Type 2 diabetes controlled with metformin. Previous left knee meniscus repair 5 years ago.

Sleep
Good

Energy
Tired after long runs

Pain
Right knee medial pain
```

**Example Output:**
- Chief Complaint: "Right knee pain for 2 weeks" (ICD-10: M25.561)
- Diagnosis: "Qi and Blood Stagnation with underlying Qi Deficiency"
- Treatment: "Invigorate Qi and Blood, alleviate pain, and tonify Qi"
- Acupuncture: ST35, SP9, GB34 (right), ST36, BL23 (both)

---

## Important Files Reference

**Core Data:**
- `types/index.ts` - TypeScript interfaces (Patient, MedicalHistory, TCMAssessmentData, AIStructuredNotes)
- `lib/localStorage.ts` - Storage utility with CRUD operations
- `data/mockPatients.ts` - Initial mock patients
- `data/mockMedicalData.ts` - Mock medical history and TCM assessments for testing

**AI Integration:**
- `app/api/analyze/route.ts` - OpenAI API endpoint (POST /api/analyze)
- `hooks/useAIAnalysis.ts` - React hook for AI operations
- `lib/aiTransformer.ts` - Transforms AI response to RightSidebar format
- `lib/clinicalNotesParser.ts` - Parses free-text notes to structured format
- `.env.local` - OpenAI API key (NOT committed)
- `.env.local.example` - API key template (committed)

**Main Components:**
- `components/layout/MainLayout.tsx` - Main app state, logic, AI generation
- `components/left/LeftSidebar.tsx` - Patient list & add patient
- `components/middle/MiddleColumn.tsx` - Clinical notes & section nav
- `components/middle/TopNavigation.tsx` - Patient header, save status, Generate button
- `components/right/RightSidebar.tsx` - AI structured notes cards with loading state

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

## Environment Setup

```bash
# .env.local (NOT committed to git)
OPENAI_API_KEY=your_openai_api_key_here
```

---

## Git Commit History

**Latest Commits:**
1. `0d8bc60` - feat: Add Generate Structured Notes button with clinical notes parser
   - "Generate Structured Notes" button in TopNavigation
   - Clinical notes parser utility
   - Integration with AI analysis
   - Tested with knee pain case

2. `1f21b30` - feat: Phase 4 - AI Integration with GPT-4o for TCM Diagnosis
   - OpenAI API integration
   - API route for AI diagnosis analysis
   - AI analysis hook and transformer
   - Loading states and error handling
   - Tested with insomnia case

3. `5ffc475` - docs: Add project work summary and UI documentation
4. `1746cfc` - feat: Complete Phase 2-3 - localStorage integration and category tracking

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
- Catch errors like "missing required error components"

---

## Known Issues / Notes

- ✅ All features working as expected
- ✅ AI integration tested and working
- ✅ Parser correctly handles section labels
- ✅ Loading states working properly
- OpenAI API key is stored in `.env.local` (not committed)
- Refresh button in RightSidebar uses mock data (demo only)
- Generate button in TopNavigation uses real parser + AI

---

## Next Steps (Future Enhancements)

**Potential Phase 5 Ideas:**
1. **Form-based data entry** - Replace free-text with structured forms
2. **Auto-update on notes change** - Show red dot when notes edited after generation
3. **Multiple AI model support** - Allow model selection (GPT-4o, GPT-4-turbo, etc.)
4. **Export functionality** - Export structured notes to PDF or clipboard
5. **Voice dictation** - Add speech-to-text for clinical notes
6. **Image analysis** - Add tongue/pulse image upload with GPT-4 Vision
7. **Treatment templates** - Pre-defined treatment protocols
8. **Patient history** - Track multiple visits per patient

**Current Status:**
- ✅ Core MVP complete
- ✅ AI integration working end-to-end
- ✅ All testing requirements met
- Ready for production use or further enhancements

---

## Quick Start for New Session

1. **Environment Check:**
   ```bash
   # Verify dev server running
   npm run dev

   # Check .env.local exists with OpenAI key
   cat .env.local
   ```

2. **Test AI Integration:**
   - Navigate to http://localhost:3000
   - Type sample clinical notes with CC, HPI, PMH sections
   - Click "Generate Structured Notes"
   - Verify AI generates structured notes (~15 seconds)
   - Check localStorage persistence

3. **Common Issues:**
   - Missing API key: Check `.env.local` file
   - API errors: Check console for error messages
   - Parser issues: Ensure section labels are on their own lines

---

## Implementation Complete ✅

All phases (1-4) are complete and tested. The application is fully functional with:
- ✅ Patient management
- ✅ Auto-save clinical notes
- ✅ Category tracking
- ✅ AI-powered TCM diagnosis generation
- ✅ localStorage persistence
- ✅ Loading states and error handling
- ✅ Comprehensive testing with Playwright
