/**
 * Clinical notes and medical history types
 */

export interface MedicalHistory {
  chiefComplaint: string;
  hpi: string;
  pmh: string;
  fh: string;
  sh: string;
  es: string;
  stressLevel?: string;
}

export interface TCMSymptom {
  label: string;
  checked: boolean;
}

export interface TCMAssessmentData {
  [category: string]: TCMSymptom[];
}
