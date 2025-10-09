# OpenAI Prompt for TCM Clinical Notes Extraction

## API Configuration

```javascript
{
  model: "gpt-4-turbo-preview", // or "gpt-4o"
  response_format: { type: "json_object" },
  temperature: 0.3 // Lower for more consistent structured output
}
```

## System Prompt

```
You are a medical documentation AI assistant specializing in Traditional Chinese Medicine (TCM) and Western medicine integration. Your task is to extract structured clinical information from free-text patient interview notes.

Extract the following information and return it in valid JSON format:

1. **Chief Complaints**: Identify main complaints with appropriate ICD-10 codes
2. **HPI (History of Present Illness)**: Summarize the timeline and progression
3. **Subjective Data**:
   - PMH (Past Medical History)
   - FH (Family History)
   - SH (Social History)
   - ES (Emotional State)
   - Stress Level (X/10 format)
   - For each field, extract key medical terms as highlights
4. **TCM Review of Systems**: Categorize symptoms by: Appetite, Stool, Thirst, Urine, Sleep, Energy, Temperature, Sweat, Pain, Libido
5. **Tongue Examination**: Extract body and coating descriptions with key terms highlighted
6. **Pulse Examination**: Extract pulse qualities with key terms highlighted
7. **Diagnosis**:
   - TCM diagnosis (pattern identification)
   - ICD-10 codes matching chief complaints
8. **Treatment Principle**: TCM treatment strategy
9. **Acupuncture Points**: Organize by body region with standardized point notation

**Point Notation Rules**:
- Use standard abbreviations: DU (Du Mai/GV), RN (Ren Mai/CV), ST, SP, LI, LV, KD, BL, GB
- Extra points: Use names (e.g., "Yintang", "Sishencong")
- Laterality: Add "(R)" or "(L)" for single side, or use note field
- Use "note" and "noteColor" for bilateral vs unilateral:
  - Unilateral: noteColor: "orange", note: "Right side only" or "Left side only"
  - Bilateral: noteColor: "purple", note: "Both sides"

**Highlights Rules**:
- Extract 3-8 key medical terms per section
- Focus on: diagnoses, symptoms, important modifiers, critical details
- Avoid generic words; prioritize medical significance

If information is not present in the notes, omit those fields or use empty arrays/strings. Do not fabricate information.

Return ONLY valid JSON matching the schema provided.
```

## User Prompt Template

```
Extract structured clinical data from the following patient interview notes and return it in the JSON format specified below.

**Clinical Notes:**
{FREE_TEXT_NOTES_HERE}

**Required JSON Schema:**
{PASTE_CONTENTS_OF_ai_structure.json_HERE}

Please extract all available information from the notes above and format it according to the schema. Only include data that is explicitly mentioned or can be reasonably inferred from the notes.
```

## Example API Call (TypeScript/JavaScript)

```typescript
import OpenAI from 'openai';
import aiStructureSchema from '@/docs/json/ai_structure.json';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function extractClinicalNotes(freeTextNotes: string) {
  const systemPrompt = `You are a medical documentation AI assistant specializing in Traditional Chinese Medicine (TCM) and Western medicine integration...`; // Full system prompt from above

  const userPrompt = `Extract structured clinical data from the following patient interview notes and return it in the JSON format specified below.

**Clinical Notes:**
${freeTextNotes}

**Required JSON Schema:**
${JSON.stringify(aiStructureSchema, null, 2)}

Please extract all available information from the notes above and format it according to the schema.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const extractedData = JSON.parse(response.choices[0].message.content);
    return extractedData;
  } catch (error) {
    console.error('OpenAI extraction error:', error);
    throw error;
  }
}

export { extractClinicalNotes };
```

## Example Usage in Your App

```typescript
// In your middle column component or API route
const handleAIExtraction = async (clinicalNotes: string) => {
  try {
    const structuredData = await extractClinicalNotes(clinicalNotes);
    // Update right sidebar with structuredData
    setAiNotes(structuredData);
  } catch (error) {
    console.error('Failed to extract notes:', error);
  }
};
```

## Tips for Better Extraction

1. **More context = Better results**: Even messy conversational notes work if they contain the key info
2. **Iterative refinement**: You can do a follow-up call to fill in missing ICD-10 codes or refine highlights
3. **Validation**: Add TypeScript type checking to ensure the response matches your `AIStructuredNotes` interface
4. **Fallbacks**: Handle partial data gracefully - not every section will always be complete
5. **Streaming**: For real-time updates, consider using streaming mode and parsing JSON incrementally

## Prompt Engineering Tips

- **Be specific about format**: "Use array of strings" vs "comma-separated"
- **Give examples**: Include 1-2 example extractions in system prompt if quality is inconsistent
- **Constrain creativity**: Lower temperature (0.2-0.4) for structured extraction
- **Handle ambiguity**: Tell it what to do when information is unclear or missing
- **ICD-10 accuracy**: Consider a separate validation step or use a medical coding API
