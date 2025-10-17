/**
 * OpenAI Structured Outputs JSON Schema for AIStructuredNotes
 *
 * This schema enforces strict validation of AI outputs to prevent:
 * - Invalid ICD-10 codes (must be strings ending in "0")
 * - Missing durations in chief complaints
 * - Invalid enum values for sides/methods
 * - Malformed data structures
 *
 * OpenAI will guarantee outputs match this schema when using response_format with json_schema.
 */

export const AI_NOTES_JSON_SCHEMA = {
  name: "tcm_clinical_notes",
  strict: false,
  schema: {
    type: "object",
    properties: {
      note_summary: {
        type: ["string", "null"],
        description: "Brief summary of the clinical note"
      },
      chiefComplaints: {
        type: "array",
        description: "List of chief complaints with ICD-10 codes (1-2 complaints required)",
        items: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "Chief complaint text MUST include duration (e.g., 'Lower back pain for 10 months')"
            },
            icdCode: {
              type: "string",
              description: "ICD-10 code as STRING (e.g., 'M54.5'). Must be symptom-based, never null."
            },
            icdLabel: {
              type: "string",
              description: "ICD-10 description (e.g., 'Low back pain, unspecified'). Must always be provided."
            }
          },
          required: ["text", "icdCode", "icdLabel"],
          additionalProperties: false
        }
      },
      hpi: {
        type: "string",
        description: "History of Present Illness narrative"
      },
      subjective: {
        type: "object",
        properties: {
          pmh: {
            type: "string",
            description: "Past Medical History. Includes other ongoing issues, chronic conditions, past surgeries/hospitalizations, allergies, current medications, supplements, and herbal medicines."
          },
          fh: {
            type: "string",
            description: "Family History. Includes conditions that blood related relatives have including grandparents, parents, and siblings."
          },
          sh: {
            type: "string",
            description: "Social History. Includes Relationship Status, Children, Occupation, Smoking (pack/years), Alcohol (freq/amount), Caffeine, Exercise, Diet"
          },
          es: {
            type: "string",
            description: "Emotional Status. Includes predominant emotional states (e.g., Anxiety / Depression / Anger / Worry / Fear / Sadness / Mania / Happiness / Content) and stress level."
          }
        },
        required: ["pmh", "fh", "sh", "es"],
        additionalProperties: false
      },
      tcmReview: {
        type: "object",
        description: "TCM Review of Systems. Categories are lowercase keys with string values describing the symptoms found in notes.",
        properties: {
          appetite: { type: ["string", "null"] },
          taste: { type: ["string", "null"] },
          stool: { type: ["string", "null"] },
          thirst: { type: ["string", "null"] },
          urine: { type: ["string", "null"] },
          sleep: { type: ["string", "null"] },
          energy: { type: ["string", "null"] },
          temperature: { type: ["string", "null"] },
          sweat: { type: ["string", "null"] },
          head: { type: ["string", "null"] },
          ear: { type: ["string", "null"] },
          eye: { type: ["string", "null"] },
          nose: { type: ["string", "null"] },
          throat: { type: ["string", "null"] },
          pain: { type: ["string", "null"] },
          libido: { type: ["string", "null"] },
          pregnancies: { type: ["string", "null"] },
          menstruation: { type: ["string", "null"] },
          discharge: { type: ["string", "null"] }
        },
        required: [],
        additionalProperties: false
      },
      tongue: {
        type: "object",
        description: "Tongue examination findings",
        properties: {
          body: {
            type: "string",
            description: "Tongue body description including color, shape, texture, and movement"
          },
          coating: {
            type: "string",
            description: "Tongue coating description including color, thickness, distribution, and quality"
          }
        },
        required: ["body", "coating"],
        additionalProperties: false
      },
      pulse: {
        type: "object",
        description: "Pulse examination findings",
        properties: {
          text: {
            type: "string",
            description: "Full pulse description including speed, depth, strength, rhythm, and qualities"
          }
        },
        required: ["text"],
        additionalProperties: false
      },
      diagnosis: {
        type: "object",
        description: "TCM diagnosis with ICD codes",
        properties: {
          tcmDiagnosis: {
            type: "string",
            description: "TCM pattern diagnosis (e.g., 'Liver Qi Stagnation')"
          },
          icdCodes: {
            type: "array",
            description: "List of ICD-10 codes for diagnosis",
            items: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  description: "ICD-10 code as STRING"
                },
                label: {
                  type: "string",
                  description: "ICD-10 label"
                }
              },
              required: ["code", "label"],
              additionalProperties: false
            }
          }
        },
        required: ["tcmDiagnosis", "icdCodes"],
        additionalProperties: false
      },
      treatment: {
        type: "string",
        description: "Treatment strategy and principle"
      },
      acupunctureTreatmentSide: {
        type: "string",
        enum: ["Left", "Right", "Both"],
        description: "Overall treatment side preference. Defaults to 'Both' if not specified."
      },
      acupuncturePoints: {
        type: "array",
        description: "Flat list of acupuncture points used in treatment. Do not organize by region - just list all points.",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Acupuncture point code or name (e.g., 'BL-20', 'LV-3', 'Yin Tang', 'ST-36')"
            },
            side: {
              type: ["string", "null"],
              enum: ["Left", "Right", "Both", null],
              description: "Which side to needle (only specify if differs from acupunctureTreatmentSide)"
            },
            method: {
              type: ["string", "null"],
              enum: ["T", "R", "E", null],
              description: "Needling method: T=Tonify, R=Reduce/Sedate, E=Even/Balance"
            }
          },
          required: ["name", "side", "method"],
          additionalProperties: false
        }
      }
    },
    required: [
      "note_summary",
      "chiefComplaints",
      "hpi",
      "subjective",
      "tcmReview",
      "tongue",
      "pulse",
      "diagnosis",
      "treatment",
      "acupunctureTreatmentSide",
      "acupuncturePoints"
    ],
    additionalProperties: false
  }
} as const;

/**
 * Type helper to ensure the schema matches OpenAI's requirements
 */
export type AINotesSchemaType = typeof AI_NOTES_JSON_SCHEMA;
