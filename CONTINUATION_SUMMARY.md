# TCM Intake - Continuation Summary
## Date: October 10, 2025 (Session 2)

---

## URGENT FIXES NEEDED

### 1. ❌ ICD-10 Code Still Wrong
**Problem**: AI returns `M54.5` instead of `M54.50`

**Root Cause**:
- Code stored as number → truncates to M54.5
- M54.5 = "Other intervertebral disc degeneration" (DIAGNOSIS - WRONG!)
- Should be: "M54.50" = "Low back pain, unspecified" (SYMPTOM - CORRECT!)

**Solution**:
- AI prompt MUST search: "[symptom] unspecified ICD-10"
- AI prompt MUST validate code ends in "0"
- AI prompt MUST store as STRING: "M54.50"
- See: `docs/ICD10_SYMPTOM_CODES_GUIDE.md` for full rules

**File to Update**: AI prompt (location TBD - check `app/api/analyze/route.ts`)

### 2. ❌ Chief Complaint Missing Duration in Display
**Problem**: CC card shows "Lower back pain" without "for 10 months"

**Expected**: "Lower back pain for 10 months"

**Solution**:
- Verify `ChiefComplaintCard.tsx` displays full `text` field
- Ensure AI returns text WITH duration: "[Problem] for [Duration]"

**File to Check**: `components/right/ChiefComplaintCard.tsx`

---

## SESSION 2 WORK COMPLETED

### ✅ 1. Fixed Acupuncture [object Object] Issue
**File**: `components/right/AcupunctureCard.tsx`

**Changes**:
- Added point object interface: `{ name: string, side?: string, method?: string }`
- Created `formatPoint()` function for string and object handling
- Implements side inheritance (points inherit treatment side unless overridden)
- Smart display logic (only shows side if differs from treatment side)

**Parsing Rules**:
- `[Bi-Reduce]` → `{ side: "Both", method: "R" }`
- `[Bi•Neutral]` → `{ side: "Both", method: "E" }`
- `[Bi]` → `{ side: "Both", method: undefined }`
- `[L]` → `{ side: "Left", method: undefined }`
- `Bilateral: Xiong Wu` → `{ side: "Both", method: undefined }`

### ✅ 2. Added TCM Review System Name Badges
**File**: `components/right/SubjectiveCard.tsx`

**Changes**:
- Display system names as teal badges (Appetite, Sleep, Energy, etc.)
- Shows badges for systems with findings
- Below badges, detailed breakdown shows category with symptoms

### ✅ 3. Added 20-Minute Treatment Time
**File**: `components/right/AcupunctureCard.tsx`

**Added**: "Set 1: 20 mins" at top in teal color

### ✅ 4. Fixed Header Alignment
**File**: `lib/constants.ts`

**Changed**: `HEADER_HEIGHT = "h-[60px]"` (was 53px)

### ✅ 5. Updated NotesTextarea with Formatted Headers
**File**: `components/middle/NotesTextarea.tsx`

**Feature**: Headers (CC, HPI, etc.) display as smaller, bold text when blurred
- Removed `font-mono`, uses app font

---

## DOCUMENTATION CREATED

### 1. Section Mapping Schema
**File**: `docs/SECTION_MAPPING.md`

**Complete structure for ALL sections**:

**Chief Complaint (CC)**:
- Format: `[Problem] for [Duration]` - NOTHING ELSE
- ICD-10 MUST be string with trailing zero: "M54.50"
- ICD-10 MUST be "unspecified" symptom code
- NO descriptive details (go to HPI)

**HPI Structure**:
- Single CC: Direct narrative
- Multiple CCs: Use "Chief Complaint 1" headers with full text

**Subjective** (grouped together):
- PMH, FH, OB/GYN, SH, ES, TCM Review (16 systems)

**Tongue Examination** (complete criteria):
- Body color, coating, shape, moisture, cracks, teeth marks
- Regional mapping (tip=Heart, middle=Spleen, sides=Liver, root=Kidney)
- Sublingual veins

**Pulse Examination** (complete criteria):
- Qualities: Wiry, Slippery, Deep, Superficial, Soft, Weak, Tight
- Positions: Left/Right, Cun/Guan/Chi
- Characteristics: Quality, Strength, Depth, Rate

**Acupuncture Points**:
- Complete object structure with side/method attributes
- Inheritance rules
- Master Tong and Extra points

### 2. ICD-10 Symptom Code Guide
**File**: `docs/ICD10_SYMPTOM_CODES_GUIDE.md`

**Three Selection Rules**:
1. Always choose "unspecified" (ending in 0)
2. Symptom over diagnosis
3. General over specific

**Common Codes Table** (50+ codes):
- M54.50 - Low back pain, unspecified
- R51.9 - Headache, unspecified
- G47.00 - Insomnia, unspecified
- M25.569 - Pain in unspecified knee
- And more...

**Validation Checklist**:
- [ ] Code ends in "0"
- [ ] Code is STRING
- [ ] Label says "unspecified"
- [ ] Describes symptom, not diagnosis

---

## TEST DATA

```
CC
Lower Back pain for 10 months
TMJ Issues for 2 weeks

[HPI details...]

pulse is wiry and thin
weak chi pulse
deep

tongue is pale and purple
yellow tongue coating
flabby

diagnosis
LV GB Qi stagnation

Points
Set 1: 20 mins / Acupoints LV-2 [Bi-Reduce], LV-3 [Bi•Reduce], LV-6 [Bi• Neutral]...
Bilateral: Xiong Wu, SP-4 [Bi]
Wai San Guan [L]
```

---

## EXPECTED OUTPUT

### Chief Complaint
```typescript
[
  {
    text: "Lower back pain for 10 months",  // WITH duration!
    icdCode: "M54.50",  // STRING with trailing zero!
    icdLabel: "Low back pain, unspecified"
  },
  {
    text: "TMJ issues for 2 weeks",
    icdCode: "M26.60",
    icdLabel: "Temporomandibular joint disorder, unspecified"
  }
]
```

### HPI (2 CCs = Structured)
```
Chief Complaint 1
Lower back pain for 10 months

[HPI details for CC1...]

Chief Complaint 2
TMJ issues for 2 weeks

[HPI details for CC2...]
```

### Tongue
```typescript
{
  body: "Pale and purple",
  bodyHighlights: ["Pale", "Purple"],
  coating: "Yellow tongue coating",
  coatingHighlights: ["Yellow"],
  shape: "Flabby"
}
```

### Pulse
```typescript
{
  text: "Wiry and thin, weak chi pulse, deep",
  highlights: ["Wiry", "Thin", "Weak chi", "Deep"]
}
```

### Acupuncture Points
```typescript
{
  acupunctureTreatmentSide: "Both sides treatment",
  acupuncture: [
    {
      name: "Leg",
      points: [
        { name: "LV-2", side: "Both", method: "R" },
        { name: "LV-3", side: "Both", method: "R" },
        { name: "LV-6", side: "Both", method: "E" }
      ]
    },
    {
      name: "Master Tong",
      points: [
        { name: "Xiong Wu", side: "Both", method: undefined },
        { name: "Wai San Guan", side: "Left", method: undefined }
      ]
    }
  ]
}
```

---

## NEXT ACTIONS (Priority Order)

### 1. ❌ URGENT: Fix ICD-10 Code
**File**: `app/api/analyze/route.ts` (AI prompt)

**Required Changes**:
1. Add to prompt: "Search for '[symptom] unspecified ICD-10'"
2. Add to prompt: "Code MUST end in '0' (unspecified)"
3. Add to prompt: "Store code as STRING with trailing zero"
4. Add validation: Reject codes that don't end in "0"
5. Reference: `docs/ICD10_SYMPTOM_CODES_GUIDE.md`

### 2. ❌ URGENT: Fix Chief Complaint Duration Display
**File**: `components/right/ChiefComplaintCard.tsx`

**Check**:
- Does it display full `complaint.text`?
- Or does it parse/truncate the text?
- Should display: "Lower back pain for 10 months" (full text with duration)

### 3. ⚠️ HIGH: Add Tongue/Pulse Parsing
**File**: `lib/clinicalNotesParser.ts`

**Add parsing for**:
```
pulse is wiry and thin
weak chi pulse
deep
→ { text: "...", highlights: ["Wiry", "Thin", "Weak chi", "Deep"] }

tongue is pale and purple
yellow tongue coating
flabby
→ { body: "Pale and purple", coating: "Yellow", shape: "Flabby" }
```

### 4. ⚠️ HIGH: Update AI Prompt
**File**: `app/api/analyze/route.ts`

**Include**:
- Chief Complaint rules (problem + duration only)
- ICD-10 selection rules (unspecified, symptom, string)
- HPI structure (single vs multiple CCs)
- Tongue/Pulse extraction
- Acupuncture point object format

---

## KEY PRINCIPLES

**We are acupuncturists, NOT Western medical doctors**:
- ✅ Use symptom/sign ICD-10 codes
- ❌ NEVER use diagnosis codes
- ✅ Always choose "unspecified" codes
- ✅ Store ICD-10 codes as STRINGS

**Chief Complaint Format**:
- ✅ "[Problem] for [Duration]" ONLY
- ❌ NO descriptive details
- ✅ All details go to HPI

**Data Storage**:
- ✅ ICD-10 codes as strings: "M54.50"
- ❌ NOT as numbers: M54.5
- ✅ Include trailing zeros

---

## FILE LOCATIONS

### Components
- `components/right/ChiefComplaintCard.tsx` - **CHECK DURATION DISPLAY**
- `components/right/AcupunctureCard.tsx` - ✅ Updated for objects
- `components/right/SubjectiveCard.tsx` - ✅ Updated with badges
- `components/middle/NotesTextarea.tsx` - ✅ Formatted headers

### Libraries
- `lib/clinicalNotesParser.ts` - **ADD TONGUE/PULSE PARSING**
- `lib/constants.ts` - ✅ HEADER_HEIGHT = 60px
- `lib/localStorage.ts` - Storage utilities

### API & AI
- `app/api/analyze/route.ts` - **UPDATE AI PROMPT**
- `hooks/useAIAnalysis.ts` - AI analysis hook
- `lib/aiTransformer.ts` - Transform AI response

### Documentation
- `docs/SECTION_MAPPING.md` - ✅ Complete schema
- `docs/ICD10_SYMPTOM_CODES_GUIDE.md` - ✅ Selection guide
- `docs/ui/WORK_SUMMARY_HEADERS.md` - Previous UI work
- `WORK_SUMMARY.md` - Session 1 summary
- `CONTINUATION_SUMMARY.md` - This file (Session 2)

---

## TESTING CHECKLIST

After fixes:
- [ ] Chief Complaint shows "Lower back pain for 10 months" (with duration)
- [ ] ICD-10 code is "M54.50" (string with trailing zero)
- [ ] ICD-10 label says "Low back pain, unspecified"
- [ ] Tongue section extracts and displays
- [ ] Pulse section extracts and displays
- [ ] Acupuncture points display correctly (no [object Object])
- [ ] TCM Review shows system name badges
- [ ] Headers aligned at 60px

---

## COMMANDS

```bash
# Start dev server
npm run dev

# Test with Playwright
npx playwright test
```

---

## CONTEXT FOR NEXT SESSION

This is a **TCM (Traditional Chinese Medicine) intake app** for acupuncturists. Three columns:
1. Left: Patient list
2. Middle: Clinical notes textarea
3. Right: AI-generated structured notes

**Current Issues**:
1. ICD-10 codes truncating (M54.5 instead of M54.50)
2. Chief Complaint missing duration in display
3. Tongue/Pulse not being parsed from clinical notes

**Key Files to Update**:
1. `app/api/analyze/route.ts` - Fix AI prompt for ICD-10
2. `components/right/ChiefComplaintCard.tsx` - Verify duration display
3. `lib/clinicalNotesParser.ts` - Add Tongue/Pulse parsing

**Documentation Created**:
- `docs/SECTION_MAPPING.md` - Complete section schema
- `docs/ICD10_SYMPTOM_CODES_GUIDE.md` - ICD-10 selection rules
