// Patient status types
export type PatientStatus = 'completed' | 'active' | 'scheduled';

// Patient interface
export interface Patient {
  id: string;
  initials: string;
  time: string;
  status: PatientStatus;
}

// Medical history data
export interface MedicalHistory {
  chiefComplaint: string;
  hpi: string;
  pmh: string;
  fh: string;
  sh: string;
  es: string;
  stressLevel?: string;
}

// TCM Assessment data
export interface TCMSymptom {
  label: string;
  checked: boolean;
}

export interface TCMAssessmentData {
  appetite: TCMSymptom[];
  taste: TCMSymptom[];
  stool: TCMSymptom[];
  thirst: TCMSymptom[];
  urine: TCMSymptom[];
  sleep: TCMSymptom[];
  energy: TCMSymptom[];
  temp: TCMSymptom[];
  sweat: TCMSymptom[];
  head: TCMSymptom[];
  ear: TCMSymptom[];
  eye: TCMSymptom[];
  nose: TCMSymptom[];
  throat: TCMSymptom[];
  pain: TCMSymptom[];
  libido: TCMSymptom[];
}

// AI Structured Notes - Chief Complaint
export interface ChiefComplaint {
  text: string;
  icdCode: string;
  icdDescription: string;
}

// AI Structured Notes - TCM Review
export interface TCMReviewItem {
  category: string;
  symptoms: string[];
}

// AI Structured Notes - Examination
export interface Examination {
  body: string;
  coating?: string;
}

// AI Structured Notes - Diagnosis
export interface Diagnosis {
  tcm: string;
  icdCode: string;
  icdDescription: string;
}

// AI Structured Notes - Acupuncture Points
export interface AcupuncturePoint {
  code: string;
  note?: string;
  variant?: 'right' | 'both';
}

export interface AcupunctureRegion {
  region: string;
  points: AcupuncturePoint[];
}

// AI Structured Notes - Complete Data
export interface AIStructuredNotes {
  note_summary?: string; // Triggers "Completed" status when generated
  chiefComplaints: ChiefComplaint[];
  hpi: string;
  subjective: {
    pmh: string;
    fh: string;
    sh: string;
    es: string;
    stressLevel?: string;
  };
  tcmReview: TCMReviewItem[];
  tongueExam: Examination;
  pulseExam: string;
  diagnosis: Diagnosis[];
  treatmentPrinciple: string;
  acupunctureTreatmentSide?: 'Left side treatment' | 'Right side treatment' | 'Both sides treatment';
  acupuncture: AcupunctureRegion[];
}

// Sidebar state
export interface SidebarState {
  leftOpen: boolean;
  rightOpen: boolean;
}

// Complete patient data
export interface PatientData {
  patient: Patient;
  medicalHistory: MedicalHistory;
  tcmAssessment: TCMAssessmentData;
  aiNotes: AIStructuredNotes;
}
