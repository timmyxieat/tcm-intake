// Patient status types
export type PatientStatus = 'completed' | 'active' | 'scheduled' | 'waiting';

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
  icdLabel: string;  // Changed from icdDescription to match prompt
}

// AI Structured Notes - TCM Review
export interface TCMReviewItem {
  category: string;
  symptoms: string[];
}

// AI Structured Notes - Tongue Examination
export interface TongueExamination {
  body: string;
  bodyHighlights?: string[];
  coating?: string;
  coatingHighlights?: string[];
  shape?: string;
}

// AI Structured Notes - Pulse Examination
export interface PulseExamination {
  text: string;
  highlights?: string[];
}

// AI Structured Notes - Diagnosis
export interface Diagnosis {
  tcm: string;
  icdCode: string;
  icdLabel: string;  // Changed from icdDescription to match prompt
}

// AI Structured Notes - Acupuncture Points
export interface AcupuncturePoint {
  name: string;           // Changed from 'code' to 'name' to match implementation
  side?: string;          // Changed from 'variant' to 'side' with more options
  method?: string;        // Added: T=Tonify, R=Reduce, E=Even
}

export interface AcupunctureRegion {
  name: string;           // Changed from 'region' to 'name' to match prompt
  points: (string | AcupuncturePoint)[];  // Can be string or object for flexibility
  note?: string;
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
  tongueExam: TongueExamination;
  pulseExam: PulseExamination;
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
