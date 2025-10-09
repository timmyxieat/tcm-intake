import { MedicalHistory, TCMAssessmentData } from "@/types";

/**
 * Parse clinical notes text into structured MedicalHistory and TCMAssessmentData
 *
 * Extracts sections from clinical notes based on common section labels:
 * - CC (Chief Complaint)
 * - HPI (History of Present Illness)
 * - PMH (Past Medical History)
 * - FH (Family History)
 * - SH (Social History)
 * - ES (Exercise/Sleep)
 * - TCM categories (Appetite, Taste, Stool, etc.)
 * - Tongue
 * - Pulse
 * - Diagnosis
 * - Points
 * - Plan
 */

interface ParsedNotes {
  medicalHistory: MedicalHistory;
  tcmAssessment: TCMAssessmentData;
}

export function parseClinicalNotes(clinicalNotes: string): ParsedNotes {
  // Initialize empty structures
  const medicalHistory: MedicalHistory = {
    chiefComplaint: "",
    hpi: "",
    pmh: "",
    fh: "",
    sh: "",
    es: "",
    stressLevel: ""
  };

  // Initialize empty TCM assessment with default unchecked symptoms
  const tcmAssessment: TCMAssessmentData = {
    appetite: [
      { label: "Good", checked: false },
      { label: "Poor", checked: false },
      { label: "Excessive", checked: false }
    ],
    taste: [
      { label: "Normal", checked: false },
      { label: "Bitter", checked: false },
      { label: "Bland", checked: false }
    ],
    stool: [
      { label: "Normal", checked: false },
      { label: "Loose", checked: false },
      { label: "Constipated", checked: false }
    ],
    thirst: [
      { label: "Normal", checked: false },
      { label: "Excessive", checked: false },
      { label: "No thirst", checked: false }
    ],
    urine: [
      { label: "Normal", checked: false },
      { label: "Dark", checked: false },
      { label: "Pale", checked: false },
      { label: "Frequent", checked: false }
    ],
    sleep: [
      { label: "Good", checked: false },
      { label: "Difficulty falling asleep", checked: false },
      { label: "Wakes frequently", checked: false },
      { label: "Dreams excessively", checked: false }
    ],
    energy: [
      { label: "Good", checked: false },
      { label: "Tired", checked: false },
      { label: "Fatigued", checked: false }
    ],
    temp: [
      { label: "Normal", checked: false },
      { label: "Cold", checked: false },
      { label: "Hot", checked: false }
    ],
    sweat: [
      { label: "Normal", checked: false },
      { label: "Excessive", checked: false },
      { label: "Night sweats", checked: false }
    ],
    head: [
      { label: "None", checked: false },
      { label: "Headache", checked: false },
      { label: "Dizziness", checked: false }
    ],
    ear: [
      { label: "Normal", checked: false },
      { label: "Tinnitus", checked: false },
      { label: "Hearing loss", checked: false }
    ],
    eye: [
      { label: "Normal", checked: false },
      { label: "Dry", checked: false },
      { label: "Blurry vision", checked: false }
    ],
    nose: [
      { label: "Normal", checked: false },
      { label: "Congestion", checked: false },
      { label: "Runny", checked: false }
    ],
    throat: [
      { label: "Normal", checked: false },
      { label: "Sore", checked: false },
      { label: "Dry", checked: false }
    ],
    pain: [
      { label: "None", checked: false },
      { label: "Back", checked: false },
      { label: "Joint", checked: false },
      { label: "Headache", checked: false },
      { label: "Abdominal", checked: false }
    ],
    libido: [
      { label: "Normal", checked: false },
      { label: "Decreased", checked: false },
      { label: "Increased", checked: false }
    ]
  };

  // If no notes provided, return empty structures
  if (!clinicalNotes || clinicalNotes.trim().length === 0) {
    return { medicalHistory, tcmAssessment };
  }

  // Split notes into lines
  const lines = clinicalNotes.split('\n');
  let currentSection = '';
  let currentContent: string[] = [];

  // Helper function to save accumulated content to appropriate section
  const saveSection = (section: string, content: string[]) => {
    const text = content.join('\n').trim();
    if (text.length === 0) return;

    switch (section.toUpperCase()) {
      case 'CC':
        medicalHistory.chiefComplaint = text;
        break;
      case 'HPI':
        medicalHistory.hpi = text;
        break;
      case 'PMH':
        medicalHistory.pmh = text;
        break;
      case 'FH':
        medicalHistory.fh = text;
        break;
      case 'SH':
        medicalHistory.sh = text;
        break;
      case 'ES':
        medicalHistory.es = text;
        break;
      // TCM categories - mark symptoms mentioned as checked
      case 'APPETITE':
        markTCMSymptoms(tcmAssessment.appetite, text);
        break;
      case 'TASTE':
        markTCMSymptoms(tcmAssessment.taste, text);
        break;
      case 'STOOL':
        markTCMSymptoms(tcmAssessment.stool, text);
        break;
      case 'THIRST':
        markTCMSymptoms(tcmAssessment.thirst, text);
        break;
      case 'URINE':
        markTCMSymptoms(tcmAssessment.urine, text);
        break;
      case 'SLEEP':
        markTCMSymptoms(tcmAssessment.sleep, text);
        break;
      case 'ENERGY':
        markTCMSymptoms(tcmAssessment.energy, text);
        break;
      case 'TEMP':
        markTCMSymptoms(tcmAssessment.temp, text);
        break;
      case 'SWEAT':
        markTCMSymptoms(tcmAssessment.sweat, text);
        break;
      case 'HEAD':
        markTCMSymptoms(tcmAssessment.head, text);
        break;
      case 'EAR':
        markTCMSymptoms(tcmAssessment.ear, text);
        break;
      case 'EYE':
        markTCMSymptoms(tcmAssessment.eye, text);
        break;
      case 'NOSE':
        markTCMSymptoms(tcmAssessment.nose, text);
        break;
      case 'THROAT':
        markTCMSymptoms(tcmAssessment.throat, text);
        break;
      case 'PAIN':
        markTCMSymptoms(tcmAssessment.pain, text);
        break;
      case 'LIBIDO':
        markTCMSymptoms(tcmAssessment.libido, text);
        break;
    }
  };

  // Parse line by line
  for (const line of lines) {
    const trimmedLine = line.trim();

    // Check if this line is a section header (exact match with known labels)
    const knownSections = [
      'CC', 'HPI', 'PMH', 'FH', 'SH', 'ES',
      'Appetite', 'Taste', 'Stool', 'Thirst', 'Urine',
      'Sleep', 'Energy', 'Temp', 'Sweat',
      'Head', 'Ear', 'Eye', 'Nose', 'Throat', 'Pain', 'Libido',
      'Tongue', 'Pulse', 'Diagnosis', 'Points', 'Plan'
    ];

    const isSectionHeader = knownSections.includes(trimmedLine);

    if (isSectionHeader) {
      // Save previous section
      if (currentSection) {
        saveSection(currentSection, currentContent);
      }
      // Start new section
      currentSection = trimmedLine;
      currentContent = [];
    } else if (trimmedLine.length > 0) {
      // Add content to current section
      currentContent.push(trimmedLine);
    }
  }

  // Save final section
  if (currentSection) {
    saveSection(currentSection, currentContent);
  }

  // Extract stress level if mentioned in ES section
  if (medicalHistory.es) {
    const stressMatch = medicalHistory.es.match(/stress.*?(\d+)\/10/i);
    if (stressMatch) {
      medicalHistory.stressLevel = `${stressMatch[1]}/10`;
    }
  }

  return { medicalHistory, tcmAssessment };
}

/**
 * Helper function to mark TCM symptoms as checked if mentioned in text
 */
function markTCMSymptoms(symptoms: Array<{label: string, checked: boolean}>, text: string) {
  const lowerText = text.toLowerCase();

  for (const symptom of symptoms) {
    const lowerLabel = symptom.label.toLowerCase();
    // Check if the symptom label appears in the text
    if (lowerText.includes(lowerLabel)) {
      symptom.checked = true;
    }
  }
}
