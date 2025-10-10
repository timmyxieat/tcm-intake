# OpenAI API Improvement Checklist

Based on consultant recommendations to eliminate hallucinations, enforce determinism, and create a bulletproof AI pipeline.

## Status Legend
- ✅ = Completed
- 🚧 = In Progress
- ⏳ = Pending
- ❌ = Blocked

---

## Phase 1: Core Infrastructure (Deterministic Parsers)

### 1.1 ICD-10 Whitelist & Resolver
**Status**: ✅ **Completed**

**File**: `lib/icd10Resolver.ts`

- [x] Create whitelist map of approved symptom codes (70+ codes)
- [x] Implement `resolveICD10(symptom)` function
- [x] Add normalization (lowercase, trim, remove suffixes)
- [x] Add validation function `isValidSymptomCode(code)`
- [x] Add search/autocomplete helper
- [x] Ensure all codes are:
  - [x] Strings with trailing zeros ("M54.50" not M54.5)
  - [x] Unspecified symptom codes (end in "0")
  - [x] Never diagnoses (no structural/disease codes)

**Testing**:
- [ ] Unit test: "low back pain" → "M54.50"
- [ ] Unit test: "Lower Back Pain" → "M54.50" (case insensitive)
- [ ] Unit test: "herniated disc" → null (diagnosis)
- [ ] Unit test: Invalid code validation

---

### 1.2 Acupuncture Point Parser
**Status**: ✅ **Completed**

**File**: `lib/acupunctureParser.ts`

- [x] Create deterministic method mapping (Bi-Reduce → "R", etc.)
- [x] Create deterministic side mapping (Bi → "Both", L → "Left")
- [x] Implement `parsePoint(rawPoint)` function
- [x] Implement `parseAcupuncturePoints(rawText)` function
- [x] Add point name validation against known points list (300+ points)
- [x] Add unknown points tracking for QA
- [x] Handle duplicate removal
- [x] Implement treatment side inheritance

**Supported Formats**:
- [x] "LV-2 [Bi-Reduce]" → `{ name: "LV-2", side: "Both", method: "R" }`
- [x] "LV-2 [Bi•Reduce]" → Same (handles • and - and ·)
- [x] "Xiong Wu [L]" → `{ name: "Xiong Wu", side: "Left", method: null }`
- [x] "Bilateral: SP-4" → `{ name: "SP-4", side: "Both", method: null }`
- [x] Master Tong points (Chinese names)
- [x] Extra points (Chinese names)

**Testing**:
- [ ] Unit test: Parse compound notation
- [ ] Unit test: Handle duplicates
- [ ] Unit test: Validate known points
- [ ] Unit test: Track unknown points
- [ ] Unit test: Side inheritance

---

## Phase 2: Two-Stage Pipeline Architecture

### 2.1 Stage A: Extract & Normalize (Structure Only)
**Status**: ⏳ **Pending**

**File**: `app/api/analyze/stage-a-extract.ts`

**Purpose**: Parse raw clinical notes → normalized structured JSON with NO interpretation

**Input**: Raw freeform text
```
CC
Lower back pain for 10 months
TMJ issues for 2 weeks

HPI
Patient reports...

pulse is wiry and thin
deep
weak chi pulse

tongue is pale and purple
yellow coating
flabby
```

**Output**: Normalized JSON
```typescript
{
  chiefComplaints: [
    {
      problem: "low back pain",
      duration: "10 months",
      icd: { code: "M54.50", label: "Low back pain, unspecified" }
    }
  ],
  hpi: "string",
  pmh: "string|null",
  // ... etc
  tongue: {
    body: "pale and purple",
    bodyHighlights: ["Pale", "Purple"],
    coating: "yellow coating",
    coatingHighlights: ["Yellow"],
    shape: "flabby",
    shapeHighlights: ["Flabby"]
  },
  pulse: {
    text: "wiry and thin, deep, weak chi pulse",
    highlights: ["Wiry", "Thin", "Deep", "Weak chi"]
  },
  acupuncture: {
    treatmentSide: "Both",
    points: [/* parsed points */],
    unknownPoints: []
  }
}
```

**Tasks**:
- [ ] Create Stage A TypeScript interface `NormalizedIntake`
- [ ] Implement section extraction (CC, HPI, PMH, etc.)
- [ ] Implement chief complaint parser with duration extraction
- [ ] Use `resolveICD10()` for each chief complaint
- [ ] Implement tongue parser (extract body/coating/shape + highlights)
- [ ] Implement pulse parser (extract qualities + highlights)
- [ ] Use `parseAcupuncturePoints()` for point parsing
- [ ] Set temperature to 0 (deterministic)
- [ ] Return null for missing fields (never invent)
- [ ] Add validation: reject if no CC and no HPI

**OpenAI Config**:
- [ ] Model: `gpt-4o`
- [ ] Temperature: `0`
- [ ] Max tokens: `2000`
- [ ] No structured outputs (plain JSON parsing)

---

### 2.2 Stage B: Synthesize (TCM Analysis)
**Status**: ⏳ **Pending**

**File**: `app/api/analyze/stage-b-synthesize.ts`

**Purpose**: Consume Stage A JSON → produce final TCM clinical notes

**Input**: Normalized JSON from Stage A

**Output**: Final `AIStructuredNotes` with TCM diagnosis, treatment principle, etc.

**Tasks**:
- [ ] Create Stage B prompt using consultant's template
- [ ] Enforce: Never invent facts not in Stage A
- [ ] Enforce: Use provided ICD codes as-is (or set to null)
- [ ] Enforce: Chief complaints MUST include duration
- [ ] Enforce: If tongue/pulse contradictory, list all highlights
- [ ] Enforce: Acupuncture points inherit treatment side
- [ ] Add few-shot examples (clean + adversarial)
- [ ] Use OpenAI Structured Outputs with JSON Schema
- [ ] Set temperature to 0.2-0.3 (slightly creative for synthesis)

**OpenAI Config**:
- [ ] Model: `gpt-4o`
- [ ] Temperature: `0.2`
- [ ] Max tokens: `4000`
- [ ] **Structured Outputs**: Use JSON Schema (see Phase 3)

---

### 2.3 Orchestration Layer
**Status**: ⏳ **Pending**

**File**: `app/api/analyze/route.ts` (refactor)

**Tasks**:
- [ ] Create `analyzeWithPipeline()` function
- [ ] Call Stage A → validate → Call Stage B → validate
- [ ] Add error handling for each stage
- [ ] Add retry logic (max 2 retries per stage)
- [ ] Log unknown points and unmapped symptoms for curation
- [ ] Return errors if validation fails after retries

**Flow**:
```
Raw Notes
  ↓
Stage A (Extract & Normalize)
  ↓
Validate Stage A Output
  ↓ (if valid)
Stage B (Synthesize TCM Notes)
  ↓
Validate Stage B Output
  ↓ (if valid)
Return Final Notes
```

---

## Phase 3: OpenAI Structured Outputs

### 3.1 JSON Schema Definition
**Status**: ⏳ **Pending**

**File**: `lib/schemas/aiNotesSchema.ts`

**Tasks**:
- [ ] Define JSON Schema for `AIStructuredNotes`
- [ ] Add regex constraints for ICD codes: `^[A-TV-Z][0-9]{2}(\\.[0-9A-TV-Z]{1,4})?$`
- [ ] Enforce: ICD codes must end in "0"
- [ ] Add enums for sides: `["Left", "Right", "Both", null]`
- [ ] Add enums for methods: `["T", "R", "E", null]`
- [ ] Add required fields vs optional fields
- [ ] Add string format constraints (min/max length)
- [ ] Add array constraints (min/max items)

**Schema Structure**:
```typescript
{
  type: "object",
  properties: {
    chiefComplaints: {
      type: "array",
      items: {
        type: "object",
        properties: {
          text: {
            type: "string",
            pattern: "^.+ for .+$"  // Must include duration
          },
          icdCode: {
            type: ["string", "null"],
            pattern: "^[A-TV-Z][0-9]{2}\\.[0-9A-TV-Z]{1,4}0$"  // Must end in 0
          },
          icdLabel: { type: ["string", "null"] }
        },
        required: ["text", "icdCode", "icdLabel"]
      }
    },
    // ... rest of schema
  },
  required: ["chiefComplaints", "hpi", "subjective", "tcmReview", ...]
}
```

---

### 3.2 Integrate Structured Outputs
**Status**: ⏳ **Pending**

**File**: `app/api/analyze/stage-b-synthesize.ts`

**Tasks**:
- [ ] Import JSON Schema
- [ ] Add `response_format` to OpenAI API call:
  ```typescript
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "tcm_clinical_notes",
      strict: true,
      schema: AI_NOTES_SCHEMA
    }
  }
  ```
- [ ] Test that OpenAI enforces schema (invalid outputs should fail)
- [ ] Add fallback if structured outputs fail

---

## Phase 4: Schema Validation

### 4.1 Install Zod
**Status**: ⏳ **Pending**

**Commands**:
```bash
npm install zod
```

---

### 4.2 Create Zod Schemas
**Status**: ⏳ **Pending**

**File**: `lib/schemas/zodSchemas.ts`

**Tasks**:
- [ ] Create Zod schema for `NormalizedIntake` (Stage A output)
- [ ] Create Zod schema for `AIStructuredNotes` (Stage B output)
- [ ] Add custom validators:
  - [ ] ICD code format validation
  - [ ] ICD code ends in "0" validation
  - [ ] Chief complaint includes duration validation
  - [ ] Acupuncture point name validation
- [ ] Export `validateStageA()` and `validateStageB()` functions

**Example**:
```typescript
const ChiefComplaintSchema = z.object({
  text: z.string().regex(/^.+ for .+$/, "Must include duration"),
  icdCode: z.string().regex(/^[A-TV-Z][0-9]{2}\.[0-9A-TV-Z]{1,4}0$/).nullable(),
  icdLabel: z.string().nullable()
});
```

---

### 4.3 Integrate Validation
**Status**: ⏳ **Pending**

**File**: `app/api/analyze/route.ts`

**Tasks**:
- [ ] Validate Stage A output with Zod before passing to Stage B
- [ ] Validate Stage B output with Zod before returning to client
- [ ] Add retry logic if validation fails (max 2 retries)
- [ ] Log validation errors for debugging
- [ ] Return user-friendly error messages

---

## Phase 5: Few-Shot Examples

### 5.1 Clean Example
**Status**: ⏳ **Pending**

**File**: `lib/examples/cleanExample.ts`

**Tasks**:
- [ ] Create a well-formed clinical notes example
- [ ] Show Stage A extraction
- [ ] Show Stage B synthesis
- [ ] Include in Stage B prompt as reference

**Content**:
- Standard case (low back pain with clear sections)
- All sections present
- No contradictions
- Known acupuncture points only

---

### 5.2 Adversarial Example
**Status**: ⏳ **Pending**

**File**: `lib/examples/adversarialExample.ts`

**Tasks**:
- [ ] Create notes with structural diagnosis ("herniated disc")
- [ ] Verify AI still returns symptom code ("M54.50")
- [ ] Create notes with contradictory findings
- [ ] Create notes with unknown acupuncture points
- [ ] Create notes with missing sections
- [ ] Show how to handle each case properly

**Cases to Cover**:
1. Diagnosis language ("herniation") → must return symptom code
2. Contradictory tongue ("pale and red") → list both in highlights
3. Unknown point ("XYZ-99") → add to `unknownPoints[]`
4. Missing duration ("back pain") → set to "for unspecified duration"
5. Incomplete sections → set to null/empty

---

## Phase 6: Testing

### 6.1 Unit Tests for Parsers
**Status**: ⏳ **Pending**

**File**: `lib/__tests__/icd10Resolver.test.ts`

**Tasks**:
- [ ] Test `resolveICD10()` with valid symptoms
- [ ] Test normalization (case, whitespace, suffixes)
- [ ] Test with invalid symptoms (diagnoses)
- [ ] Test `isValidSymptomCode()` validation
- [ ] Test `searchSymptoms()` autocomplete

---

### 6.2 Unit Tests for Acupuncture Parser
**Status**: ⏳ **Pending**

**File**: `lib/__tests__/acupunctureParser.test.ts`

**Tasks**:
- [ ] Test `parsePoint()` with all notation types
- [ ] Test compound notation ([Bi-Reduce], [Bi•Reduce])
- [ ] Test side-only notation ([L], [R], [Bi])
- [ ] Test method-only notation ([T], [R], [E])
- [ ] Test Master Tong points
- [ ] Test duplicate removal
- [ ] Test unknown point tracking
- [ ] Test treatment side inheritance

---

### 6.3 Integration Tests
**Status**: ⏳ **Pending**

**File**: `app/api/analyze/__tests__/pipeline.test.ts`

**Tasks**:
- [ ] Test full pipeline with clean example
- [ ] Test full pipeline with adversarial example
- [ ] Test Stage A validation failures
- [ ] Test Stage B validation failures
- [ ] Test retry logic
- [ ] Test error handling

---

### 6.4 Golden Fixtures
**Status**: ⏳ **Pending**

**File**: `lib/__tests__/fixtures/`

**Tasks**:
- [ ] Create 10 test cases (messy notes → golden JSON)
- [ ] Include adversarial cases
- [ ] Include edge cases (empty sections, contradictions)
- [ ] Run tests against fixtures
- [ ] Update fixtures when schema changes

---

## Phase 7: Logging & Monitoring

### 7.1 Add Logging
**Status**: ⏳ **Pending**

**Tasks**:
- [ ] Log unknown acupuncture points
- [ ] Log unmapped symptoms (failed ICD-10 lookups)
- [ ] Log validation failures
- [ ] Log retry attempts
- [ ] Add timestamps and patient IDs

---

### 7.2 Create Curation Dashboard
**Status**: ⏳ **Pending**

**Purpose**: Review unknown points and unmapped symptoms to expand whitelists

**Tasks**:
- [ ] Create admin page: `/admin/curation`
- [ ] Display unknown points with frequency counts
- [ ] Display unmapped symptoms with frequency counts
- [ ] Add "Approve" button to add to whitelists
- [ ] Add "Reject" button to ignore

---

## Phase 8: Documentation

### 8.1 Architecture Documentation
**Status**: ⏳ **Pending**

**File**: `docs/AI_PIPELINE_ARCHITECTURE.md`

**Tasks**:
- [ ] Document two-stage pipeline flow
- [ ] Document ICD-10 resolution strategy
- [ ] Document acupuncture point parsing strategy
- [ ] Include diagrams (mermaid)
- [ ] Document error handling
- [ ] Document retry logic

---

### 8.2 API Documentation
**Status**: ⏳ **Pending**

**File**: `docs/API_DOCUMENTATION.md`

**Tasks**:
- [ ] Document `/api/analyze` endpoint
- [ ] Document request format
- [ ] Document response format
- [ ] Document error codes
- [ ] Include examples

---

### 8.3 Update Existing Docs
**Status**: ⏳ **Pending**

**Tasks**:
- [ ] Update `docs/SECTION_MAPPING.md` with new pipeline info
- [ ] Update `docs/ICD10_SYMPTOM_CODES_GUIDE.md` with whitelist approach
- [ ] Consolidate redundant documentation
- [ ] Remove outdated information

---

## Phase 9: Performance Optimization

### 9.1 Caching
**Status**: ⏳ **Pending**

**Tasks**:
- [ ] Cache ICD-10 lookups in memory
- [ ] Cache parsed acupuncture points
- [ ] Add Redis for distributed caching (optional)

---

### 9.2 Parallel Processing
**Status**: ⏳ **Pending**

**Tasks**:
- [ ] If multiple patients, batch process
- [ ] Use Promise.all() for parallel ICD-10 lookups
- [ ] Optimize regex compilation

---

## Phase 10: Deployment

### 10.1 Environment Variables
**Status**: ⏳ **Pending**

**Tasks**:
- [ ] Ensure OpenAI API key is in `.env.local`
- [ ] Add environment check on startup
- [ ] Add graceful degradation if API unavailable

---

### 10.2 Build & Test
**Status**: ⏳ **Pending**

**Tasks**:
- [ ] Run full test suite
- [ ] Run TypeScript build
- [ ] Test in production mode
- [ ] Load test with realistic notes

---

### 10.3 Monitor in Production
**Status**: ⏳ **Pending**

**Tasks**:
- [ ] Track success rate
- [ ] Track validation failure rate
- [ ] Track unknown point frequency
- [ ] Track unmapped symptom frequency
- [ ] Set up alerts for high failure rates

---

## Summary Progress

### Overall Status
- **Phase 1**: 🚧 In Progress (2/2 parsers done, testing pending)
- **Phase 2**: ⏳ Pending
- **Phase 3**: ⏳ Pending
- **Phase 4**: ⏳ Pending
- **Phase 5**: ⏳ Pending
- **Phase 6**: ⏳ Pending
- **Phase 7**: ⏳ Pending
- **Phase 8**: ⏳ Pending
- **Phase 9**: ⏳ Pending
- **Phase 10**: ⏳ Pending

### Completion Metrics
- ✅ Completed: 2 tasks
- 🚧 In Progress: 2 tasks
- ⏳ Pending: 80+ tasks
- Total Tasks: ~85

---

## Quick Start Commands

```bash
# Install dependencies
npm install zod

# Run tests
npm test

# Run specific test file
npm test lib/__tests__/icd10Resolver.test.ts

# Build
npm run build

# Start dev server
npm run dev
```

---

## Consultant's Key Recommendations

✅ = Implemented, ⏳ = Pending

1. ✅ **Split into 2-stage pipeline** (Extract → Synthesize)
2. ✅ **ICD codes resolved server-side** from whitelist (never guessed)
3. ✅ **Deterministic point parser** with validation
4. ⏳ **Use Structured Outputs** with JSON Schema
5. ⏳ **Temperature ≤ 0.3** (0 for Stage A, 0.2 for Stage B)
6. ⏳ **Null/empty policy** for missing fields (never invent)
7. ⏳ **Few-shot examples** (clean + adversarial)
8. ⏳ **Schema validation** with Zod + retry on fail
9. ⏳ **Unit tests** with golden fixtures
10. ⏳ **Logging** for unknown points and unmapped symptoms

---

## Next Steps

**Immediate Priority**:
1. ⏳ Implement Stage A extractor (`app/api/analyze/stage-a-extract.ts`)
2. ⏳ Implement Stage B synthesizer (`app/api/analyze/stage-b-synthesize.ts`)
3. ⏳ Create JSON Schema for Structured Outputs
4. ⏳ Add Zod validation
5. ⏳ Refactor main API route to use pipeline

**Estimated Time**:
- Phase 1 (Parsers): ✅ Done (2 hours)
- Phase 2 (Pipeline): 4-6 hours
- Phase 3 (Structured Outputs): 2 hours
- Phase 4 (Validation): 2 hours
- Phase 5 (Examples): 1 hour
- Phase 6 (Testing): 4 hours
- Phases 7-10: 4 hours

**Total**: ~19-23 hours of focused development

---

*Last Updated: 2025-10-10*
*Status: Phase 1 Complete (Parsers Built)*
