import { Patient } from "@/types";

/**
 * Mock patient data for testing and development
 *
 * Contains 5 patients - statuses are calculated dynamically:
 * - "scheduled": Default state, no notes
 * - "active": Currently open OR has clinical notes
 * - "completed": Has AI-generated note_summary
 *
 * Times are stored as ISO strings and formatted on the frontend
 */

export const mockPatients: Patient[] = [
  {
    id: "1",
    initials: "MW",
    time: "2025-10-09T09:30:00",
    status: "scheduled", // Will be "completed" (has AI summary)
  },
  {
    id: "2",
    initials: "JD",
    time: "2025-10-09T10:00:00",
    status: "scheduled", // Will be "active" (has clinical notes)
  },
  {
    id: "3",
    initials: "SA",
    time: "2025-10-09T11:00:00",
    status: "scheduled", // Will be "active" (has clinical notes)
  },
  {
    id: "4",
    initials: "LT",
    time: "2025-10-09T13:30:00",
    status: "scheduled", // Stays "scheduled" (no notes)
  },
  {
    id: "5",
    initials: "BC",
    time: "2025-10-09T14:30:00",
    status: "scheduled", // Stays "scheduled" (no notes)
  },
];

/**
 * Mock patient data for testing 3-status system
 *
 * Patient 1 (MW): Completed - has AI-generated note_summary
 * Patient 2 (JD): Active - has clinical notes
 * Patient 3 (SA): Active - has clinical notes
 * Patient 4 (LT): Scheduled - no notes
 * Patient 5 (BC): Scheduled - no notes
 */

const emptyAINotes = {
  chiefComplaints: [],
  hpi: "",
  subjective: {
    pmh: "",
    fh: "",
    sh: "",
    es: "",
    stressLevel: "0/10",
  },
  tcmReview: {},
  tongue: {
    body: "",
    coating: "",
  },
  pulse: {
    text: "",
  },
  diagnosis: {
    tcmDiagnosis: "",
    icdCodes: [],
  },
  treatment: "",
  acupuncture: [],
};

export const mockPatientsData: Record<string, any> = {
  // Patient 1: COMPLETED - has AI note summary
  "1": {
    aiNotes: {
      ...emptyAINotes,
      note_summary: "Patient presents with lower back pain radiating to left leg. History of L4-L5 herniation. Physical exam shows limited ROM and positive straight leg raise. Diagnosed with lumbar radiculopathy. Treatment plan includes acupuncture points BL23, BL40, GB30 with electrostimulation.",
    },
    clinicalNotes: "45yo patient c/o lower back pain x 2 weeks, radiating to left leg. PMH: L4-L5 herniation 2019. Pain worsens with sitting, improves with walking.",
  },
  // Patient 2: ACTIVE - has clinical notes, no AI summary
  "2": {
    aiNotes: { ...emptyAINotes },
    clinicalNotes: "38yo presents with insomnia x 3 months. Difficulty falling asleep, wakes frequently. Stress from work. Tried melatonin without improvement.",
  },
  // Patient 3: ACTIVE - has clinical notes, no AI summary
  "3": {
    aiNotes: { ...emptyAINotes },
    clinicalNotes: "52yo c/o migraines 2-3x/week. Left-sided, throbbing, photophobia. Stress trigger. PMH: HTN controlled.",
  },
  // Patient 4: SCHEDULED - no notes
  "4": {
    aiNotes: { ...emptyAINotes },
    clinicalNotes: "",
  },
  // Patient 5: SCHEDULED - no notes
  "5": {
    aiNotes: { ...emptyAINotes },
    clinicalNotes: "",
  },
};
