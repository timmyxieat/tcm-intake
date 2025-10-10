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
            type: ["string", "null"],
            description: "Past Medical History"
          },
          fh: {
            type: ["string", "null"],
            description: "Family History"
          },
          sh: {
            type: ["string", "null"],
            description: "Social History"
          },
          es: {
            type: ["string", "null"],
            description: "Exercise/Diet/Stress"
          },
          stressLevel: {
            type: ["string", "null"],
            description: "Stress level if mentioned"
          }
        },
        required: ["pmh", "fh", "sh", "es"],
        additionalProperties: false
      },
      tcmReview: {
        type: "array",
        description: "TCM Review of Systems organized by category",
        items: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Category name (e.g., 'Appetite', 'Sleep', 'Digestion')"
            },
            symptoms: {
              type: "array",
              description: "List of symptoms in this category",
              items: {
                type: "string"
              }
            }
          },
          required: ["category", "symptoms"],
          additionalProperties: false
        }
      },
      tongueExam: {
        type: "object",
        description: "Tongue examination findings",
        properties: {
          body: {
            type: ["string", "null"],
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
            type: ["string", "null"],
            description: "Tongue coating description"
          },
          coatingHighlights: {
            type: ["array", "null"],
            description: "Key coating characteristics (e.g., ['Yellow', 'Thick'])",
            items: {
              type: "string"
            }
          },
          shape: {
            type: ["string", "null"],
            description: "Tongue shape description"
          }
        },
        required: ["body"],
        additionalProperties: false
      },
      pulseExam: {
        type: "object",
        description: "Pulse examination findings",
        properties: {
          text: {
            type: ["string", "null"],
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
        type: "array",
        description: "TCM diagnoses with optional ICD codes",
        items: {
          type: "object",
          properties: {
            tcm: {
              type: "string",
              description: "TCM pattern diagnosis (e.g., 'Liver Qi Stagnation')"
            },
            icdCode: {
              type: ["string", "null"],
              description: "ICD-10 code for diagnosis if applicable"
            },
            icdLabel: {
              type: ["string", "null"],
              description: "ICD-10 label for diagnosis if applicable"
            }
          },
          required: ["tcm", "icdCode", "icdLabel"],
          additionalProperties: false
        }
      },
      treatmentPrinciple: {
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
                    required: ["name"],
                    additionalProperties: false
                  }
                ]
              }
            },
            note: {
              type: ["string", "null"],
              description: "Additional notes for this region"
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
      "tongueExam",
      "pulseExam",
      "diagnosis",
      "treatmentPrinciple",
      "acupuncture"
    ],
    additionalProperties: false
  }
} as const;

/**
 * Type helper to ensure the schema matches OpenAI's requirements
 */
export type AINotesSchemaType = typeof AI_NOTES_JSON_SCHEMA;
