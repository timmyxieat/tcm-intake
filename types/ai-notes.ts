/**
 * AI-generated structured notes types
 */

export interface ChiefComplaint {
  text: string;
  icdCode: string | null;
  icdLabel: string | null;
}

export interface SubjectiveData {
  pmh: string;
  pmhHighlights?: string[];
  fh: string;
  fhHighlights?: string[];
  sh: string;
  shHighlights?: string[];
  es: string;
  stressLevel: string;
}

export interface TongueExam {
  body: string;
  bodyHighlights?: string[];
  coating: string;
  coatingHighlights?: string[];
}

export interface PulseExam {
  text: string;
  highlights?: string[];
}

export interface Diagnosis {
  tcmDiagnosis: string;
  icdCodes: Array<{
    code: string;
    label: string;
  }>;
}

export interface AcupuncturePoint {
  name: string;
  side: "Left" | "Right" | "Both" | null;
  method: "T" | "R" | "E" | null;
}

export interface AcupunctureRegion {
  name: string;
  points: string[] | AcupuncturePoint[];
  note?: string;
  noteColor?: "orange" | "purple";
}

export interface AIStructuredNotes {
  note_summary?: string;
  chiefComplaints: ChiefComplaint[];
  hpi: string;
  subjective: SubjectiveData;
  tcmReview: { [key: string]: string[] };
  tongue: TongueExam;
  pulse: PulseExam;
  diagnosis: Diagnosis;
  treatment: string;
  acupunctureTreatmentSide?: 'Left side treatment' | 'Right side treatment' | 'Both sides treatment';
  acupuncture: AcupunctureRegion[];
}
