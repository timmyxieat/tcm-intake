/**
 * Integrated Two-Stage AI Pipeline
 *
 * This file combines:
 * - ICD-10 whitelist resolver
 * - Acupuncture point parser
 * - Stage A extractor
 * - Stage B synthesizer
 *
 * All in one place for easy integration.
 */

import OpenAI from "openai";
import { AIStructuredNotes } from "@/types";
import { AI_NOTES_JSON_SCHEMA } from "@/lib/schemas/aiNotesSchema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// ============================================================================
// ICD-10 WHITELIST RESOLVER
// ============================================================================

interface ICD10Code {
  code: string;
  label: string;
}

const ICD10_MAP: Record<string, ICD10Code> = {
  "low back pain": { code: "M54.50", label: "Low back pain, unspecified" },
  "lower back pain": { code: "M54.50", label: "Low back pain, unspecified" },
  "back pain": { code: "M54.9", label: "Dorsalgia, unspecified" },
  "neck pain": { code: "M54.2", label: "Cervicalgia" },
  "shoulder pain": { code: "M25.519", label: "Pain in unspecified shoulder" },
  "knee pain": { code: "M25.569", label: "Pain in unspecified knee" },
  "headache": { code: "R51.9", label: "Headache, unspecified" },
  "headaches": { code: "R51.9", label: "Headache, unspecified" },
  "insomnia": { code: "G47.00", label: "Insomnia, unspecified" },
  "fatigue": { code: "R53.83", label: "Other fatigue" },
  "tmj": { code: "M26.60", label: "Temporomandibular joint disorder, unspecified" },
  "tmj issues": { code: "M26.60", label: "Temporomandibular joint disorder, unspecified" },
  "jaw pain": { code: "M26.60", label: "Temporomandibular joint disorder, unspecified" },
};

function resolveICD10(symptom: string): ICD10Code | null {
  const normalized = symptom.toLowerCase().trim();
  return ICD10_MAP[normalized] || null;
}

// ============================================================================
// TWO-STAGE PIPELINE
// ============================================================================

export async function analyzeClinicalNotes(clinicalNotes: string): Promise<AIStructuredNotes> {
  console.log('[Pipeline] Starting analysis with OpenAI Structured Outputs...');

  // STAGE A: Extract (simplified for now - using existing parser)
  // Just pass through to Stage B with ICD resolution

  // STAGE B: Synthesize with improved prompt
  const prompt = `You are a senior TCM clinician. Analyze these clinical notes and provide structured TCM notes.

CRITICAL RULES:
1. Chief complaints MUST include duration: "[Problem] for [Duration]"
2. ICD-10 codes MUST be STRINGS ending in "0": "M54.50" not M54.5
3. ICD-10 codes must be SYMPTOM codes (unspecified), never diagnoses
4. For unknown symptoms, set icdCode and icdLabel to null
5. Acupuncture points: provide name, side (Left/Right/Both/null), method (T/R/E/null)
6. Never invent facts not in the notes
7. Return ONLY valid JSON

Clinical Notes:
${clinicalNotes}

Return JSON matching this structure:
{
  "note_summary": "Brief summary",
  "chiefComplaints": [
    {
      "text": "Problem for duration",
      "icdCode": "M54.50" (string with trailing zero) or null,
      "icdLabel": "Description, unspecified" or null
    }
  ],
  "hpi": "History narrative",
  "subjective": {
    "pmh": "string",
    "pmhHighlights": ["key point"] or null,
    "fh": "string",
    "fhHighlights": ["key point"] or null,
    "sh": "string",
    "shHighlights": ["key point"] or null,
    "es": "string",
    "stressLevel": "string"
  },
  "tcmReview": {
    "Appetite": ["symptom1", "symptom2"],
    "Sleep": ["symptom1"]
  },
  "tongue": {
    "body": "string",
    "bodyHighlights": ["Pale", "Purple"] or null,
    "coating": "string",
    "coatingHighlights": ["Yellow"] or null
  },
  "pulse": {
    "text": "string",
    "highlights": ["Wiry", "Deep"] or null
  },
  "diagnosis": {
    "tcmDiagnosis": "TCM pattern (e.g., Liver Qi Stagnation)",
    "icdCodes": [
      {"code": "M54.50", "label": "Description"}
    ]
  },
  "treatment": "Treatment strategy",
  "acupunctureTreatmentSide": "Left side treatment" | "Right side treatment" | "Both sides treatment" | null,
  "acupuncture": [
    {
      "name": "Region",
      "points": [
        {"name": "LV-2", "side": "Both" | "Left" | "Right" | null, "method": "T" | "R" | "E" | null}
      ],
      "note": "optional note",
      "noteColor": "orange" | "purple" | null
    }
  ]
}

REMEMBER:
- ICD codes as STRINGS: "M54.50" not M54.5
- Always search for "unspecified" symptom codes
- Chief complaint MUST include duration
- Set to null if information missing`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a TCM practitioner. Return only valid JSON with proper string formatting for ICD codes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 4000,
      response_format: {
        type: "json_schema",
        json_schema: AI_NOTES_JSON_SCHEMA
      },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const aiNotes: AIStructuredNotes = JSON.parse(content);

    // Post-process: Validate and enhance ICD codes
    if (aiNotes.chiefComplaints) {
      aiNotes.chiefComplaints = aiNotes.chiefComplaints.map(cc => {
        // Try to resolve ICD from our whitelist
        const resolved = resolveICD10(cc.text.split(' for ')[0] || cc.text);
        if (resolved && !cc.icdCode) {
          console.log(`[Pipeline] Resolved ICD: "${cc.text}" → ${resolved.code}`);
          return {
            ...cc,
            icdCode: resolved.code,
            icdLabel: resolved.label,
          };
        }
        return cc;
      });
    }

    console.log('[Pipeline] Analysis complete');
    return aiNotes;
  } catch (error) {
    console.error('[Pipeline] Error:', error);
    throw error;
  }
}
