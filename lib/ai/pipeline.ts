/**
 * AI Pipeline for TCM Clinical Notes
 *
 * Transforms unstructured clinical notes into structured TCM intake documentation
 * using OpenAI's Structured Outputs with strict JSON schema validation.
 */

import OpenAI from "openai";
import { AIStructuredNotes } from "@/types";
import { AI_NOTES_JSON_SCHEMA } from "@/lib/schemas/aiNotesSchema";
import { organizePointsByRegion } from "@/lib/utils/acupunctureRegions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function analyzeClinicalNotes(
  clinicalNotes: string
): Promise<AIStructuredNotes> {
  console.log("[Pipeline] Starting analysis with OpenAI Structured Outputs...");

  const prompt = `You are a TCM clinician. Organize the following unstructured clinical notes into a structured intake note according to the schema below.

CRITICAL RULES

Chief Complaints

Each chief complaint must include duration in the format: "[Problem] for [Duration]".

Include at least one and no more than two chief complaints.

For each chief complaint, identify the closest related ICD-10 symptom code (not a disease diagnosis).

ICD-10 Coding

ICD-10 codes must always be symptom-based (unspecified) — never disease diagnoses.
Example: "R51.9" for "Headache, unspecified", not "G43.9" for "Migraine".

ICD-10 codes cannot be null and should always include a label (description).

Prioritize codes that reflect the symptom's presentation, not the cause.

Acupuncture

Extract all acupuncture points as a flat list. Do NOT organize by region.

Each point must include:
- name: Point code or name (e.g., 'BL-20', 'LV-3', 'Yin Tang', 'ST-36')
- side: Set to null UNLESS explicitly stated for this specific point
- method: Set to null UNLESS explicitly stated for this specific point

CRITICAL Method Rules:
- Method descriptors apply ONLY to the immediate point following them
- In lists like "tonifying on BL-20, BL-23" → only BL-20 gets method "T", BL-23 is null
- Each point needs its own explicit method statement to have a method assigned
- If method is not directly stated for that specific point, use null
- Examples:
  ✅ "tonifying on BL-20, BL-23" → BL-20: method "T", BL-23: method null
  ✅ "BL-20 (T), BL-23 (R)" → BL-20: method "T", BL-23: method "R"
  ✅ "reducing on LV-3, tonifying on KI-3" → LV-3: method "R", KI-3: method "T"
  ❌ "BL-20, BL-23" (no methods stated) → BL-20: method null, BL-23: method null

CRITICAL Side Rules:
- side: null means the point uses the overall acupunctureTreatmentSide
- Only specify side if it DIFFERS from the overall treatment side
- If not explicitly stated as different, use null

"acupunctureTreatmentSide" defines the default side for the entire session.
- Values: 'Left', 'Right', 'Both'
- Default to 'Both' if not specified
- Points with side: null will inherit this value

Data Integrity

Never invent information. Only include details explicitly mentioned or clearly implied in the notes.

All information must be placed under the correct schema category:

subjective.pmh → Past medical history

hpi → History of present illness

chiefComplaints.text → Chief complaints

tcmReview.appetite, tongue.body, pulse.text, diagnosis.tcmDiagnosis, treatment, etc.

If a subcategory has no relevant information, omit it.

Output Requirements

Return only valid JSON. No commentary, markdown, or text outside the JSON object.

Include every relevant detail from the clinical notes in its proper field.

The "treatment" field should reflect the opposite or balancing principle of the "tcmDiagnosis" (if not explicitly mentioned).

Clinical Notes:
${clinicalNotes}

Expected JSON Structure:
{
  "note_summary": "Brief summary",
  "chiefComplaints": [
    {
      "text": "[PROBLEM] for [DURATION (e.g., 2 weeks)]",
      "icdCode": "M54.5",
      "icdLabel": "Description, unspecified"
    }
  ],
  "hpi": "History of CC details",
  "subjective": {
    "pmh": "Past medical history. Includes other ongoing inssues, chronic conditions, past surgeries/hospitalizations, allergies, current medications, supplments, and herbal medicines. ",
    "fh": "Family history. Includes conditions that blood related relatives have including grandparents, parents, and siblings.",
    "sh": "Social history. Includes Relationship Status, Children, Occupation, Smoking (pack/years), Alcohol (freq/amount),  Caffeine, Exercise, Diet",
    "es": "Emotional Status. Includes predominant emotional states (e.g., Anxiety  /  Depression  /  Anger  /  Worry  /  Fear  /  Sadness  /  Mania  /  Happiness  /  Content) and and stress level.",
  },
  "tcmReview": {
    "appetite": "Notes related to eating habits or changes in appetite, such as excessive hunger, lack of appetite, cravings, or eating without desire.",
    "taste": "Mentions of taste abnormalities or changes, such as bitterness, sweetness, loss of taste, or other notable sensations of taste.",
    "stool": "Descriptions of bowel movements including frequency, consistency, color, dryness, looseness, or presence of blood.",
    "thirst": "References to thirst patterns or desire for fluids, such as excessive thirst, lack of thirst, or alternating desire and aversion to drinking.",
    "urine": "Information about urination including amount, frequency, difficulty, color, clarity, or unusual qualities (e.g., turbid, scanty, profuse).",
    "sleep": "Notes about sleep quality or patterns, such as insomnia, excessive sleepiness, restless sleep, or vivid dreaming.",
    "energy": "Statements about energy level or vitality, including fatigue, lethargy, hyperactivity, or general stamina.",
    "temperature": "Mentions of body temperature sensations, such as feeling hot, cold, alternating hot and cold, or simultaneous sensations.",
    "sweat": "Comments about sweating patterns, including night sweats, spontaneous sweating, absence of sweat, or excessive perspiration.",
    "head": "Descriptions of head-related symptoms such as headache, dizziness, or vertigo.",
    "ear": "Information about ear symptoms, including tinnitus, hearing loss, pain, or discharge.",
    "eye": "Mentions of eye conditions like blurred vision, dryness, tearing, or irritation.",
    "nose": "Notes about nasal symptoms such as congestion, discharge, dryness, or nosebleeds.",
    "throat": "Descriptions of throat sensations or symptoms including soreness, dryness, or difficulty swallowing.",
    "pain": "Any mention of pain, including its location, nature, intensity, or timing (e.g., sharp, dull, chronic, intermittent).",
    "libido": "Comments related to sexual drive or desire, whether low, normal, or high.",
    "pregnancies": "Information about pregnancy history including live births, miscarriages, or abortions. Applicable only to biologically female patients.",
    "menstruation": "Notes describing menstrual patterns such as cycle length, regularity, duration of flow, amount, color, consistency, cramps, or premenstrual symptoms. Applicable only to biologically female patients.",
    "discharge": "Mentions of genital discharge, including vaginal discharge characteristics (color, thickness, amount, clarity, stickiness, or odor). For male patients, include unusual penile discharge if described. "
  },
  "tongue": {
    "body": "Descriptions of the tongue body itself — its color, shape, texture, and movement. This includes observations such as pale, red, crimson, purple, dusky, or dark coloration; swelling, thinness, stiffness, or trembling; tooth marks (scalloped edges); dryness or moisture level; and any cracks or spots.",
    "coating": "Descriptions of the tongue coating (also called moss or fur) — its color, thickness, distribution, and quality. Includes terms like white, yellow, gray, black, thin, thick, greasy, sticky, dry, or peeled. Mentions of partial or absent coating should also be included here."
  },
  "pulse": {
    "text": "Narrative or structured descriptions of pulse qualities felt during palpation. Includes mentions of speed (rapid, slow), depth (superficial, deep), strength (forceful, weak), rhythm (intermittent, irregular), and qualities such as wiry, slippery, choppy, floating, thready, or full."
  },
  "diagnosis": {
    "tcmDiagnosis": "The Traditional Chinese Medicine (TCM) pattern or syndrome identified (e.g., Liver Qi Stagnation, Spleen Qi Deficiency, Kidney Yin Deficiency). May include multiple patterns if relevant.",
    "icdCodes": [
      { "code": "M54.5", "label": "Low back pain" },
      { "code": "K54.5", "label": "Example ICD description (replace with actual term)" }
    ]
  },
  "treatment": "The treatment principle or strategy derived from the TCM diagnosis. It should represent the therapeutic approach that addresses the identified pattern(s). For example, if the TCM diagnosis is 'Liver Qi Stagnation,' the treatment might be 'Soothe the Liver and regulate Qi.' If not explicitly stated in the notes, infer the appropriate opposite or balancing treatment principle based on the TCM pattern.",
  "acupunctureTreatmentSide": "Overall side for the session. Values: 'Left', 'Right', 'Both'. Default to 'Both' if not specified.",
  "acupuncturePoints": [
    {
      "name": "BL-20",
      "side": null,
      "method": "T"
    },
    {
      "name": "BL-23",
      "side": null,
      "method": null
    },
    {
      "name": "LV-3",
      "side": "Left",
      "method": "R"
    }
  ]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an expert TCM clinician specializing in organizing unstructured clinical notes into structured intake documentation. You have deep knowledge of TCM diagnosis, ICD-10 symptom coding, and proper medical documentation standards. Return only valid JSON that strictly follows the provided schema.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 4000,
      response_format: {
        type: "json_schema",
        json_schema: AI_NOTES_JSON_SCHEMA,
      },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const aiNotes = JSON.parse(content);

    // Post-process: Organize acupuncture points by region
    const organizedAcupuncture = organizePointsByRegion(aiNotes.acupuncturePoints || []);

    const result: AIStructuredNotes = {
      ...aiNotes,
      acupuncture: organizedAcupuncture
    };

    console.log("[Pipeline] Analysis complete");
    return result;
  } catch (error) {
    console.error("[Pipeline] Error:", error);
    throw error;
  }
}
