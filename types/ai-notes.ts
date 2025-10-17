/**
 * AI-generated structured notes types
 */

export interface ChiefComplaint {
  text: string;
  icdCode: string;
  icdLabel: string;
}

export interface SubjectiveData {
  pmh: string;
  fh: string;
  sh: string;
  es: string;
}

export interface TongueExam {
  body: string;
  coating: string;
}

export interface PulseExam {
  text: string;
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
  region: string;
  points: AcupuncturePoint[];
}

export interface AIStructuredNotes {
  note_summary?: string;
  chiefComplaints: ChiefComplaint[];
  hpi: string;
  subjective: SubjectiveData;
  tcmReview: { [key: string]: string | null };
  tongue: TongueExam;
  pulse: PulseExam;
  diagnosis: Diagnosis;
  treatment: string;
  acupunctureTreatmentSide: 'Left' | 'Right' | 'Both';
  acupuncture: AcupunctureRegion[];
}
