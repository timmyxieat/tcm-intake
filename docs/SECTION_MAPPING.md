# TCM Intake Section Mapping Schema

Comprehensive mapping of all sections in the AI Structured Notes, defining the exact data structure, format, and requirements for each section.

## Important Context

**We are acupuncturists, NOT Western medical doctors.** All ICD-10 codes should be **symptom/sign codes only**, NOT formal Western diagnoses. Focus on clinical presentations and symptoms rather than disease diagnoses.

---

## 1. Chief Complaint (CC)

### CRITICAL RULES

1. **Format**: `[Problem] for [Duration]` - **NOTHING ELSE**
2. **Concise**: Only the main symptom and how long
3. **NO descriptions**: All quality/character/details go to HPI
4. **ICD-10 Code**: MUST be stored as **STRING** (include trailing zeros)
5. **ICD-10 Type**: MUST be **"unspecified"** symptom code, NEVER diagnosis

### Structure
Each chief complaint follows this exact format:
```
"[symptom/complaint] for [duration]"
```

### Correct Examples
- ✅ "Lower back pain for 6 months"
- ✅ "Insomnia for 3 months"
- ✅ "Headaches for 2 weeks"
- ✅ "Knee pain for 1 year"

### Incorrect Examples (TOO DETAILED)
- ❌ "Chronic lower back pain with a dull quality, worsened by weak core" (details belong in HPI)
- ❌ "Severe migraine headaches with aura" (details belong in HPI)
- ❌ "Insomnia with difficulty falling asleep and frequent waking" (details belong in HPI)

### User Input
User types: **Problem + Duration**
- Input: "lower back pain for 10 months"
- CC Output: "Lower back pain for 10 months"
- HPI Output: "Patient reports dull pain, worsened by sitting, radiates to left leg..." (all details here)

### AI Responsibility

AI must search for the most relevant **ICD-10 symptom/sign code ending in "0" (unspecified)**:

**CORRECT (Symptom codes with trailing zeros)**:
- ✅ M54.50 - "Low back pain, unspecified"
- ✅ R51.9 - "Headache, unspecified"
- ✅ G47.00 - "Insomnia, unspecified"
- ✅ M25.569 - "Pain in unspecified knee"

**INCORRECT (Diagnoses or truncated codes)**:
- ❌ M54.5 - "Other intervertebral disc degeneration" (diagnosis + truncated)
- ❌ M51.26 - "Lumbar disc displacement" (diagnosis)
- ❌ G43.909 - "Migraine, unspecified" (diagnosis)
- ❌ F51.01 - "Primary insomnia" (diagnosis)

**Why M54.5 is Wrong**:
1. It's stored as a number, truncating the trailing "0"
2. The full code M54.5 refers to "intervertebral disc degeneration" (diagnosis)
3. Should be M54.50 (string) = "Low back pain, unspecified" (symptom)

### Data Structure
```typescript
{
  text: string,        // "[Problem] for [Duration]" - ONLY
  icdCode: string,     // MUST be string! "M54.50" not M54.5
  icdLabel: string     // "Symptom description, unspecified"
}
```

### Example Data
```typescript
{
  text: "Lower back pain for 10 months",
  icdCode: "M54.50",  // String with trailing zero!
  icdLabel: "Low back pain, unspecified"
}
```

### Display Format
```
Chief Complaint (CC)

Lower back pain for 10 months
ICD-10: M54.50 - Low back pain, unspecified
```

### Multiple Chief Complaints
```typescript
[
  {
    text: "Lower back pain for 10 months",
    icdCode: "M54.50",
    icdLabel: "Low back pain, unspecified"
  },
  {
    text: "Insomnia for 3 months",
    icdCode: "G47.00",
    icdLabel: "Insomnia, unspecified"
  }
]
```

### ICD-10 Selection Process

1. **Extract symptom**: "lower back pain"
2. **Search**: "low back pain unspecified ICD-10"
3. **Find options**:
   - M54.50 - "Low back pain, unspecified" ✅
   - M54.5 - "Other intervertebral disc degeneration" ❌
   - M51.26 - "Lumbar disc displacement" ❌
4. **Select**: M54.50 (includes trailing zero, says "unspecified")
5. **Store as string**: "M54.50"

### Validation Checklist
Before accepting an ICD-10 code:
- [ ] Code ends in "0" (unspecified)
- [ ] Code is stored as **string**
- [ ] Code label says "unspecified"
- [ ] Code describes symptom, not diagnosis
- [ ] Chief complaint is concise (problem + duration only)

---

## 2. History of Present Illness (HPI)

### Structure
Narrative description of the present illness including:
- **Onset**: When did it start?
- **Location**: Where is the problem?
- **Duration**: How long has it lasted?
- **Character**: What does it feel like? (sharp, dull, aching, burning, etc.)
- **Aggravating factors**: What makes it worse?
- **Relieving factors**: What makes it better?
- **Associated symptoms**: Any related symptoms?

### Example
```
45-year-old patient presents with lower back pain for 6 months.
Pain is located in the lumbar region, radiating down the left leg to the knee.
Pain is described as dull and aching, with occasional sharp shooting sensations.
Pain worsens with prolonged sitting and standing, improves with walking and lying down.
Patient reports numbness and tingling in left foot.
No recent trauma or injury.
```

### Data Structure
```typescript
{
  hpi: string  // Paragraph format
}
```

---

## 3. Subjective - Past Medical History (PMH)

### Structure
Relevant medical history including:
- Previous conditions
- Previous injuries
- Surgeries
- Chronic conditions
- Current medications

### Keywords to Highlight
Extract and highlight in teal:
- Specific conditions (e.g., "L4-L5 disc herniation")
- Chronic diseases (e.g., "Hypertension", "Diabetes")
- Surgeries (e.g., "Appendectomy 2015")

### Example
```
L4-L5 disc herniation diagnosed in 2019.
Hypertension controlled with medication.
Appendectomy in 2015.
```

### Data Structure
```typescript
{
  pmh: string,
  pmhHighlights: string[]  // ["L4-L5 disc herniation", "Hypertension"]
}
```

---

## 4. Subjective - Family History (FH)

### Structure
Family medical history including:
- Parents' health conditions
- Siblings' health conditions
- Grandparents' relevant conditions

### Keywords to Highlight
Extract and highlight in teal:
- Specific hereditary conditions
- Cancer history
- Cardiovascular diseases
- Diabetes

### Example
```
Father with history of degenerative disc disease.
Mother with Type 2 diabetes.
Paternal grandmother had breast cancer.
```

### Data Structure
```typescript
{
  fh: string,
  fhHighlights: string[]  // ["Degenerative disc disease", "Type 2 diabetes", "Breast cancer"]
}
```

---

## 5. Subjective - Social History (SH)

### Structure
Social and lifestyle factors including:
- Occupation
- Physical activity level
- Smoking status
- Alcohol use
- Exercise habits
- Sleep patterns
- Stress factors

### Keywords to Highlight
Extract and highlight in teal:
- Occupation type (e.g., "Software engineer")
- Lifestyle factors (e.g., "Sedentary work", "Prolonged sitting")
- Habits (e.g., "Non-smoker", "Occasional alcohol")

### Example
```
Works as software engineer, sits 8+ hours daily.
Non-smoker, occasional alcohol use.
Minimal exercise due to pain.
```

### Data Structure
```typescript
{
  sh: string,
  shHighlights: string[]  // ["Software engineer", "Sedentary work", "Prolonged sitting"]
}
```

---

## 6. Subjective - Emotional Status (ES)

### Structure
Emotional and mental health status including:
- Primary emotions
- Stress level (0-10 scale)
- Mental health concerns
- Emotional triggers

### Example
```
Predominant emotion: Worry and frustration
Stress level: 7/10
Patient reports anxiety related to chronic pain and work deadlines.
Sleep is disrupted, waking at 3am with worry.
```

### Data Structure
```typescript
{
  es: string,  // Description of emotions
  stressLevel: string  // "7/10"
}
```

### Display Format
Badge showing stress level in teal

---

## 7. TCM Review of Systems

### Structure
Organized by TCM system categories. Each category can have multiple findings.

### Complete List of Systems
1. **Appetite**: Decreased, increased, normal, no appetite
2. **Taste**: Bitter, sweet, bland, metallic
3. **Stool**: Constipation, loose, normal, alternating
4. **Thirst**: Excessive, no thirst, prefers warm/cold drinks
5. **Urine**: Frequent, scanty, clear, dark, nocturia
6. **Sleep**: Insomnia, difficulty falling asleep, frequent waking, restless
7. **Energy**: Fatigue, low energy, normal, exhaustion
8. **Temp**: Hot flashes, cold intolerance, heat intolerance, sweating
9. **Sweat**: Spontaneous, night sweats, no sweat, excessive
10. **Head**: Headaches, dizziness, heaviness, tinnitus
11. **Ear**: Tinnitus, hearing loss, ear infections
12. **Eye**: Blurry vision, dry eyes, floaters, red eyes
13. **Nose**: Congestion, runny nose, sinus issues, nosebleeds
14. **Throat**: Sore throat, dry throat, lump sensation, hoarseness
15. **Pain**: Location and character of pain
16. **Libido**: Decreased, normal, increased

### Example
```typescript
{
  "Pain": ["Lower back", "Left leg", "Left foot numbness"],
  "Sleep": ["Difficulty falling asleep", "Wakes at 3am"],
  "Energy": ["Fatigue", "Low energy in afternoon"],
  "Appetite": ["Decreased due to pain"],
  "Stool": ["Normal"],
  "Urine": ["Frequent nocturia 2x/night"]
}
```

### Display Format
- **Badge row**: Show all system names as teal badges (Appetite, Sleep, Energy, etc.)
- **Detailed breakdown**: Below badges, show category with findings

---

## 8. Tongue Examination

### Structure
- **Body**: Color, shape, size, cracks, coating distribution
- **Coating**: Thickness, color, coverage, root/rootless

### Body Keywords to Highlight
- Pale, red, dark red, purple, blue-purple
- Swollen, thin, normal
- Cracks, teeth marks
- Red tip, red sides

### Coating Keywords to Highlight
- Thin, thick, absent
- White, yellow, gray, black
- Greasy, dry
- Peeled, patchy

### Example
```
Body: Pale with red tip and teeth marks on the sides
Coating: Thin white coating, slightly greasy
```

### Data Structure
```typescript
{
  body: string,
  bodyHighlights: string[],  // ["Pale", "Red tip", "Teeth marks"]
  coating: string,
  coatingHighlights: string[]  // ["Thin", "White", "Greasy"]
}
```

---

## 9. Pulse Examination

### Structure
Descriptive text of pulse qualities on both wrists

### Qualities to Highlight
- Wiry, slippery, choppy, thready, weak, strong
- Deep, superficial, floating
- Fast, slow, normal rate
- Left vs right differences
- Position differences (cun, guan, chi)

### Example
```
Wiry and deep on left side, moderate on right.
Left guan position most wiry.
Overall pulse is slightly rapid.
```

### Data Structure
```typescript
{
  text: string,
  highlights: string[]  // ["Wiry", "Deep left", "Rapid"]
}
```

---

## 10. Diagnosis

### Structure
- **TCM Diagnosis**: Pattern differentiation in TCM terms
- **ICD-10 Codes**: Symptom/sign codes (NOT diagnoses)

### TCM Diagnosis Format
```
[Organ] [Excess/Deficiency] with [Pattern]
```

### Examples of TCM Diagnoses
- "Kidney Deficiency with Qi and Blood Stagnation in the Lower Back and Leg Channels"
- "Liver Qi Stagnation with Blood Stasis"
- "Spleen Qi Deficiency with Dampness Accumulation"
- "Heart Yin Deficiency with Empty Heat"

### ICD-10 Codes
**IMPORTANT**: Use symptom/sign codes ONLY, NOT disease diagnoses

**Correct Examples**:
- M54.5 - Low back pain (symptom)
- R51.9 - Headache (symptom)
- R53.83 - Other fatigue (symptom)
- G47.00 - Insomnia (symptom)

**Incorrect Examples** (These are diagnoses, NOT symptoms):
- M51.26 - Lumbar disc displacement (diagnosis)
- G43.909 - Migraine (diagnosis)
- I10 - Essential hypertension (diagnosis)

### Data Structure
```typescript
{
  tcmDiagnosis: string,
  icdCodes: Array<{
    code: string,    // "M54.5"
    label: string    // "Low back pain"
  }>
}
```

---

## 11. Treatment Principle

### Structure
Clear statement of treatment strategy using TCM principles

### Common Principles
- Tonify [Organ/Substance]
- Drain/Clear [Pathogen]
- Move [Qi/Blood]
- Regulate [Function]
- Harmonize [Relationship]
- Resolve [Stagnation/Phlegm/Damp]

### Example
```
Tonify Kidney Qi, move Qi and Blood in the channels,
resolve stagnation, relieve pain
```

### Data Structure
```typescript
{
  treatment: string
}
```

---

## 12. Acupuncture Points

### Structure
Points organized by body region with treatment details. Each point is an **object** with attributes.

### Treatment Details
- **Treatment Time**: "Set 1: 20 mins" (standard)
- **Treatment Side**: "Left side treatment" | "Right side treatment" | "Both sides treatment"
- All points **inherit** the treatment side unless explicitly overridden

### Point Data Structure

Each point is an object with these attributes:

```typescript
interface AcupuncturePoint {
  name: string;           // "LV-2" or "Xiong Wu" or "Yin Tang"
  side?: string;          // "Left" | "Right" | "Both" | undefined (inherits from treatment side)
  method?: string;        // "T" | "R" | "E" | undefined (no method)
}
```

### Point Types

#### 1. Standard Meridian Points
Format: `[Meridian Abbreviation]-[Number]`
- Examples: LV-2 (Liver 2), ST-36 (Stomach 36), BL-23 (Bladder 23)
- Can have side and method attributes

#### 2. Master Tong Points
Special points with Chinese names:
- **Xiong Wu** (Chest Five)
- **Wai San Guan** (Outer Three Gates)
- **Da Bai** (Great White)
- Can have side and method attributes

#### 3. Extra Points
Non-meridian points with Chinese names:
- **Yin Tang** (Third Eye point)
- **Si Shen Cong** (Four Alert Spirit)
- **Bai Hui** (GV-20, but may use Chinese name)
- Can have side and method attributes

### Attribute Rules

#### Side Attribute
- **Inherits** from `acupunctureTreatmentSide` by default
- Can be **overridden** for specific points:
  - "Left" - Left side only
  - "Right" - Right side only
  - "Both" - Both sides (explicitly stated)
  - `undefined` - Uses treatment side

#### Method Attribute
- **Optional** - not all points have methods
- Values:
  - "T" - Tonification
  - "R" - Reducing
  - "E" - Even method
  - `undefined` - No specific method

### Region Organization
Common regions:
1. **Head/Neck**: GV-20, GB-20, Yin Tang, etc.
2. **Back**: BL-23, BL-40, Hua Tuo Jia Ji, etc.
3. **Leg**: GB-34, ST-36, SP-6, etc.
4. **Hand/Arm**: LI-4, LI-11, PC-6, etc.
5. **Distal**: SI-3, BL-62, etc.
6. **Master Tong**: Xiong Wu, Wai San Guan, etc.

### Complete Data Structure Example

```typescript
{
  acupunctureTreatmentSide: "Both sides treatment",
  acupuncture: [
    {
      name: "Back",
      points: [
        { name: "BL-23", side: undefined, method: undefined },      // Inherits "Both", no method
        { name: "BL-25", side: undefined, method: "T" },            // Inherits "Both", Tonify
        { name: "BL-40", side: "Right", method: "R" }               // Override to Right only, Reduce
      ]
    },
    {
      name: "Leg",
      points: [
        { name: "GB-30", side: "Both", method: "R" },               // Explicitly Both, Reduce
        { name: "GB-34", side: undefined, method: "E" },            // Inherits "Both", Even
        { name: "ST-36", side: undefined, method: undefined }       // Inherits "Both", no method
      ]
    },
    {
      name: "Master Tong",
      points: [
        { name: "Xiong Wu", side: undefined, method: "T" },         // Chinese name, Tonify
        { name: "Wai San Guan", side: "Left", method: undefined }   // Override to Left, no method
      ]
    },
    {
      name: "Extra Points",
      points: [
        { name: "Yin Tang", side: undefined, method: "E" }          // Inherits "Both", Even
      ]
    }
  ]
}
```

### Display Format

Points should be displayed as:
```
[Point Name] ([Side]) ([Method])
```

With these rules:
1. If side equals treatment side → don't show side
2. If side differs from treatment side → show side
3. If no method → don't show method
4. If method exists → show method

**Example Display:**
```
Set 1: 20 mins
Both sides treatment

Back
BL-23
BL-25 (T)
BL-40 (Right) (R)

Leg
GB-30 (R)
GB-34 (E)
ST-36

Master Tong
Xiong Wu (T)
Wai San Guan (Left)

Extra Points
Yin Tang (E)
```

### Parsing from Text

When AI receives text like:
```
Points
Set 1: 20 mins / Acupoints LV-2 (Bi-Reduce), LV-3 (Bi-Reduce), LV-6 (Bi-Neutral), LV-5 (Bi-Reduce), GB-34 (Bi-Reduce), GB-35 (Bi-Neutral), GB-36
```

It should parse as:
```typescript
{
  acupunctureTreatmentSide: "Both sides treatment",
  acupuncture: [
    {
      name: "Leg",  // Inferred from point locations
      points: [
        { name: "LV-2", side: "Both", method: "R" },
        { name: "LV-3", side: "Both", method: "R" },
        { name: "LV-6", side: "Both", method: "E" },
        { name: "LV-5", side: "Both", method: "R" },
        { name: "GB-34", side: "Both", method: "R" },
        { name: "GB-35", side: "Both", method: "E" },
        { name: "GB-36", side: "Both", method: undefined }
      ]
    }
  ]
}
```

---

## Summary: Key Principles

1. **Symptom-focused ICD-10**: Use symptom/sign codes ONLY, never diagnoses
2. **User input simplicity**: User provides minimal info, AI enhances and structures
3. **TCM context**: All interpretations from acupuncturist perspective, not Western medical
4. **Structured data**: Each section has defined structure for consistent parsing
5. **Highlighting**: Extract and highlight clinically relevant keywords in teal
6. **Badges**: Use teal badges for stress levels and TCM system categories
7. **Treatment details**: Always include "Set 1: 20 mins" and treatment side

---

## AI Prompt Requirements

When processing clinical notes, the AI should:

1. **Extract chief complaints** with duration and find symptom/sign ICD-10 codes
2. **Parse narrative into structured sections** (HPI, PMH, FH, SH, ES)
3. **Identify keywords** for highlighting in each subjective section
4. **Organize TCM review** by system categories with badge display
5. **Describe tongue and pulse** with highlighted diagnostic qualities
6. **Generate TCM diagnosis** using proper pattern differentiation
7. **Assign symptom ICD-10 codes** (never diagnosis codes)
8. **State treatment principle** using TCM terminology
9. **Select acupuncture points** organized by region with proper notation
10. **Default to 20-minute treatment time** with specified treatment side
