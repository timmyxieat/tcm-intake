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
  strict: true,
  schema: {
    type: "object",
    properties: {
      note_summary: {
        type: ["string", "null"],
        description: "Brief summary of the clinical note"
      },
      chiefComplaints: {
        type: "array",
        description: "List of chief complaints with ICD-10 codes",
        items: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "Chief complaint text MUST include duration (e.g., 'Lower back pain for 10 months')"
            },
            icdCode: {
              type: ["string", "null"],
              description: "ICD-10 code as STRING ending in '0' (e.g., 'M54.50') or null if unknown"
            },
            icdLabel: {
              type: ["string", "null"],
              description: "ICD-10 description (e.g., 'Low back pain, unspecified') or null if unknown"
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
            description: "Past Medical History"
          },
          pmhHighlights: {
            type: ["array", "null"],
            description: "Key highlights from PMH",
            items: {
              type: "string"
            }
          },
          fh: {
            type: "string",
            description: "Family History"
          },
          fhHighlights: {
            type: ["array", "null"],
            description: "Key highlights from FH",
            items: {
              type: "string"
            }
          },
          sh: {
            type: "string",
            description: "Social History"
          },
          shHighlights: {
            type: ["array", "null"],
            description: "Key highlights from SH",
            items: {
              type: "string"
            }
          },
          es: {
            type: "string",
            description: "Exercise/Diet/Stress"
          },
          stressLevel: {
            type: "string",
            description: "Stress level if mentioned"
          }
        },
        required: ["pmh", "fh", "sh", "es", "stressLevel"],
        additionalProperties: false
      },
      tcmReview: {
        type: "object",
        description: "TCM Review of Systems as key-value pairs",
        additionalProperties: {
          type: "array",
          items: {
            type: "string"
          }
        }
      },
      tongue: {
        type: "object",
        description: "Tongue examination findings",
        properties: {
          body: {
            type: "string",
            description: "Tongue body description"
          },
          bodyHighlights: {
            type: ["array", "null"],
            description: "Key body characteristics (e.g., ['Pale', 'Purple'])",
            items: {
              type: "string"
            }
          },
          coating: {
            type: "string",
            description: "Tongue coating description"
          },
          coatingHighlights: {
            type: ["array", "null"],
            description: "Key coating characteristics (e.g., ['Yellow', 'Thick'])",
            items: {
              type: "string"
            }
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
            description: "Full pulse description"
          },
          highlights: {
            type: ["array", "null"],
            description: "Key pulse qualities (e.g., ['Wiry', 'Deep', 'Weak chi'])",
            items: {
              type: "string"
            }
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
        type: ["string", "null"],
        enum: ["Left side treatment", "Right side treatment", "Both sides treatment", null],
        description: "Overall treatment side preference"
      },
      acupuncture: {
        type: "array",
        description: "Acupuncture points organized by anatomical region",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Anatomical region name (e.g., 'Head', 'Lower Extremities')"
            },
            points: {
              type: "array",
              description: "List of acupuncture points (can be strings or objects)",
              items: {
                anyOf: [
                  {
                    type: "string",
                    description: "Simple point name (e.g., 'LV-2')"
                  },
                  {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "Acupuncture point name (e.g., 'LV-2', 'ST-36')"
                      },
                      side: {
                        type: ["string", "null"],
                        enum: ["Left", "Right", "Both", null],
                        description: "Which side to needle"
                      },
                      method: {
                        type: ["string", "null"],
                        enum: ["T", "R", "E", null],
                        description: "Needling method: T=Tonify, R=Reduce, E=Even"
                      }
                    },
                    required: ["name", "side", "method"],
                    additionalProperties: false
                  }
                ]
              }
            },
            note: {
              type: ["string", "null"],
              description: "Additional notes for this region"
            },
            noteColor: {
              type: ["string", "null"],
              enum: ["orange", "purple", null],
              description: "Color coding for the note"
            }
          },
          required: ["name", "points"],
          additionalProperties: false
        }
      }
    },
    required: [
      "chiefComplaints",
      "hpi",
      "subjective",
      "tcmReview",
      "tongue",
      "pulse",
      "diagnosis",
      "treatment",
      "acupuncture"
    ],
    additionalProperties: false
  }
} as const;

/**
 * Type helper to ensure the schema matches OpenAI's requirements
 */
export type AINotesSchemaType = typeof AI_NOTES_JSON_SCHEMA;
