// Patient status options
export const PATIENT_STATUSES = {
  COMPLETED: 'completed',
  ACTIVE: 'active',
  WAITING: 'waiting',
  SCHEDULED: 'scheduled',
} as const;

// TCM Symptom categories and options
export const TCM_SYMPTOMS = {
  appetite: ['Poor, especially morning', 'Good', 'Excessive'],
  taste: ['No unusual taste'],
  stool: ['Loose, 2-3x daily'],
  thirst: ['Minimal, prefers warm drinks'],
  urine: ['Pale, frequent'],
  sleep: ['Light, frequent waking'],
  energy: ['Very low, worse afternoon'],
  temp: ['Feels cold easily'],
  sweat: ['Minimal, no night sweats'],
  head: [],
  ear: [],
  eye: [],
  nose: [],
  throat: [],
  pain: [],
  libido: [],
};

// ICD-10 Codes
export const ICD_CODES = {
  R53_83: 'Other fatigue',
  R14_0: 'Abdominal distension (gaseous)',
  R19_7: 'Diarrhea, unspecified',
};

// Acupuncture point regions
export const ACUPUNCTURE_REGIONS = [
  'Head/Neck',
  'Hand',
  'Forearm',
  'Upper Arm',
  'Abdomen/Back',
  'Upper Leg',
  'Lower Leg',
  'Foot',
];

// Medical section types
export const MEDICAL_SECTIONS = {
  CC: 'Chief Complaint',
  HPI: 'History of Present Illness',
  PMH: 'Past Medical History',
  FH: 'Family History',
  SH: 'Social History',
  ES: 'Emotional Status',
} as const;

// Badge variant color mappings
export const BADGE_VARIANTS = {
  completed: 'bg-teal-100 text-teal-700',
  active: 'bg-blue-50 text-blue-600',
  waiting: 'bg-orange-50 text-orange-600',
  scheduled: 'bg-purple-50 text-purple-600',
  icd: 'bg-gray-100 text-gray-600',
  stress: 'bg-yellow-100 text-yellow-800',
  tcm: 'bg-teal-100 text-teal-700',
} as const;
