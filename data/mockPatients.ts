import { Patient } from "@/types";

/**
 * Mock patient data for testing and development
 *
 * Contains 5 patients with different statuses and schedules
 * Times are stored as ISO strings and formatted on the frontend
 */

export const mockPatients: Patient[] = [
  {
    id: "1",
    initials: "MW",
    time: "2025-10-09T09:30:00",
    status: "completed",
  },
  {
    id: "2",
    initials: "JD",
    time: "2025-10-09T10:00:00",
    status: "active",
  },
  {
    id: "3",
    initials: "SA",
    time: "2025-10-09T11:00:00",
    status: "waiting",
  },
  {
    id: "4",
    initials: "LT",
    time: "2025-10-09T13:30:00",
    status: "scheduled",
  },
  {
    id: "5",
    initials: "BC",
    time: "2025-10-09T14:30:00",
    status: "scheduled",
  },
];

/**
 * Mock patient data with empty AI notes
 * AI structured notes will be generated later
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
  "1": {
    aiNotes: { ...emptyAINotes },
    clinicalNotes: "",
  },
  "2": {
    aiNotes: { ...emptyAINotes },
    clinicalNotes: "",
  },
  "3": {
    aiNotes: { ...emptyAINotes },
    clinicalNotes: "",
  },
  "4": {
    aiNotes: { ...emptyAINotes },
    clinicalNotes: "",
  },
  "5": {
    aiNotes: { ...emptyAINotes },
    clinicalNotes: "",
  },
};
