# ICD-10 Symptom Code Selection Guide

## For Acupuncturists (NOT Western Medical Doctors)

**CRITICAL RULE**: Always use **SYMPTOM/SIGN codes**, NEVER diagnosis codes.
Always prefer codes ending in **"unspecified"** or general symptom descriptions.

---

## Why This Matters

As **acupuncturists**, we:
- ✅ Treat **symptoms** and **signs**
- ❌ DO NOT diagnose **diseases** or **structural conditions**

**Examples**:
- ✅ "Low back pain" (symptom we can treat)
- ❌ "Lumbar disc herniation" (structural diagnosis we cannot make)
- ✅ "Headache" (symptom we can treat)
- ❌ "Migraine with aura" (medical diagnosis we cannot make)

---

## ICD-10 Code Format

ICD-10 codes have this format: `[Letter][Number].[Number][Number]`

Example: **M54.50**
- M = Chapter (Musculoskeletal)
- 54 = Category (Dorsalgia - back pain)
- .5 = Subcategory (Low back pain)
- 0 = Specific type (Unspecified)

**IMPORTANT**: Always store ICD-10 codes as **STRINGS**, never as numbers!
- ✅ Correct: "M54.50" (string)
- ❌ Wrong: M54.5 (number - truncates the trailing zero)

---

## Selection Rules

### Rule 1: Always Choose "Unspecified"
When multiple codes exist for the same symptom, **always choose the one ending in 0** (unspecified).

**Example:**
- ✅ M54.50 - "Low back pain, unspecified"
- ❌ M54.51 - "Vertebrogenic low back pain" (too specific, implies diagnosis)
- ❌ M54.59 - "Other low back pain" (implies we've ruled out other causes)

### Rule 2: Symptom Over Diagnosis
Choose the **symptom** the patient experiences, NOT the underlying cause.

**Example - Back Pain:**
- ✅ M54.50 - "Low back pain, unspecified" (what patient feels)
- ❌ M51.26 - "Lumbar disc displacement" (structural diagnosis)
- ❌ M54.5 - "Other intervertebral disc degeneration" (structural diagnosis)

**Example - Headache:**
- ✅ R51.9 - "Headache, unspecified" (what patient feels)
- ❌ G43.909 - "Migraine, unspecified" (neurological diagnosis)
- ❌ G44.209 - "Tension-type headache" (medical diagnosis)

### Rule 3: General Over Specific
Choose the **most general** code that describes the symptom.

**Example - Insomnia:**
- ✅ G47.00 - "Insomnia, unspecified"
- ❌ G47.01 - "Insomnia due to medical condition"
- ❌ F51.01 - "Primary insomnia" (psychiatric diagnosis)

---

## Common Symptom Codes for Acupuncture

### Musculoskeletal Pain (M Chapter)
| Symptom | Code | Label |
|---------|------|-------|
| Low back pain | M54.50 | Low back pain, unspecified |
| Neck pain | M54.2 | Cervicalgia |
| Shoulder pain | M25.519 | Pain in unspecified shoulder |
| Knee pain | M25.569 | Pain in unspecified knee |
| Hip pain | M25.559 | Pain in unspecified hip |
| Ankle pain | M25.579 | Pain in unspecified ankle |
| Joint pain (general) | M25.50 | Pain in unspecified joint |
| Myalgia (muscle pain) | M79.10 | Myalgia, unspecified site |

### Nervous System Symptoms (R Chapter - Symptoms)
| Symptom | Code | Label |
|---------|------|-------|
| Headache | R51.9 | Headache, unspecified |
| Dizziness | R42 | Dizziness and giddiness |
| Numbness | R20.0 | Anesthesia of skin |
| Tingling | R20.2 | Paresthesia of skin |
| Fatigue | R53.83 | Other fatigue |

### Sleep Disorders (G47 - Symptom-based)
| Symptom | Code | Label |
|---------|------|-------|
| Insomnia | G47.00 | Insomnia, unspecified |
| Difficulty falling asleep | G47.00 | Insomnia, unspecified |
| Difficulty staying asleep | G47.00 | Insomnia, unspecified |

### Digestive Symptoms (R Chapter)
| Symptom | Code | Label |
|---------|------|-------|
| Abdominal pain | R10.9 | Unspecified abdominal pain |
| Nausea | R11.0 | Nausea |
| Constipation | K59.00 | Constipation, unspecified |
| Diarrhea | R19.7 | Diarrhea, unspecified |

### Respiratory Symptoms (R Chapter)
| Symptom | Code | Label |
|---------|------|-------|
| Cough | R05.9 | Cough, unspecified |
| Shortness of breath | R06.00 | Dyspnea, unspecified |
| Chest pain | R07.9 | Chest pain, unspecified |

### Urinary Symptoms (R Chapter)
| Symptom | Code | Label |
|---------|------|-------|
| Painful urination | R30.0 | Dysuria |
| Frequent urination | R35.0 | Frequency of micturition |
| Incontinence | R32 | Unspecified urinary incontinence |

### Emotional/Mental Symptoms (R Chapter)
| Symptom | Code | Label |
|---------|------|-------|
| Anxiety | R45.0 | Nervousness |
| Stress | R45.7 | State of emotional shock and stress |
| Irritability | R45.4 | Irritability and anger |

---

## How to Search for ICD-10 Codes

### Step 1: Identify the Symptom
What does the patient **feel** or **experience**?
- "My lower back hurts" → Low back pain
- "I can't sleep" → Insomnia
- "I have headaches" → Headache

### Step 2: Search for Symptom Code
Search for: `[Symptom] unspecified ICD-10`

Example: "low back pain unspecified ICD-10"

### Step 3: Verify It's a Symptom
Check the code description:
- ✅ Describes what patient feels (pain, ache, discomfort)
- ❌ Names a disease/condition (herniation, degeneration, syndrome)

### Step 4: Use the Full Code
Always include the trailing zero!
- ✅ "M54.50"
- ❌ "M54.5" (missing trailing zero)

---

## Real-World Examples

### Example 1: Lower Back Pain

**Patient says**: "I've had lower back pain for 6 months"

**Chief Complaint**: Lower back pain for 6 months

**Search**: "low back pain unspecified ICD-10"

**Found Codes**:
- M54.50 - "Low back pain, unspecified" ✅
- M54.5 - "Other intervertebral disc degeneration" ❌ (diagnosis)
- M51.26 - "Lumbar disc displacement" ❌ (diagnosis)

**Select**: M54.50

---

### Example 2: Insomnia

**Patient says**: "I can't fall asleep for 3 months"

**Chief Complaint**: Insomnia for 3 months

**Search**: "insomnia unspecified ICD-10"

**Found Codes**:
- G47.00 - "Insomnia, unspecified" ✅
- F51.01 - "Primary insomnia" ❌ (psychiatric diagnosis)
- G47.01 - "Insomnia due to medical condition" ❌ (implies diagnosis)

**Select**: G47.00

---

### Example 3: Headaches

**Patient says**: "Recurring headaches for 2 weeks"

**Chief Complaint**: Headaches for 2 weeks

**Search**: "headache unspecified ICD-10"

**Found Codes**:
- R51.9 - "Headache, unspecified" ✅
- G43.909 - "Migraine, unspecified" ❌ (neurological diagnosis)
- G44.209 - "Tension-type headache" ❌ (medical diagnosis)

**Select**: R51.9

---

## Red Flags - NEVER Use These

### Structural/Anatomical Diagnoses
❌ Herniation, Displacement, Degeneration, Rupture
❌ Stenosis, Spondylosis, Arthritis, Osteoarthritis

### Disease Diagnoses
❌ Migraine, Fibromyalgia, Syndrome (any)
❌ Hypertension, Diabetes, Cancer

### Psychiatric Diagnoses
❌ Depression, Anxiety Disorder, PTSD, Panic Disorder
❌ Use symptom codes instead (R45.0 for nervousness, etc.)

---

## Quick Reference Checklist

Before selecting an ICD-10 code, verify:

- [ ] Code ends in "0" (unspecified)
- [ ] Code describes a **symptom**, not a disease
- [ ] Code is stored as a **string**, not a number
- [ ] Code label says "unspecified" or general symptom
- [ ] Code does NOT imply structural diagnosis
- [ ] Code does NOT require diagnostic equipment (MRI, X-ray, etc.)
- [ ] Code is something we can treat with acupuncture

---

## Summary

**DO**:
- ✅ Use symptom/sign codes
- ✅ Choose "unspecified" versions
- ✅ Store codes as strings (include trailing zeros)
- ✅ Use general descriptions

**DON'T**:
- ❌ Use disease/diagnosis codes
- ❌ Use structural condition codes
- ❌ Truncate trailing zeros
- ❌ Use overly specific codes
