import { Patient } from "@/types";
import moment from "moment";

/**
 * Mock patient data for testing and development
 *
 * Contains 5 patients with different statuses and schedules
 * Times are formatted using moment.js with format "h:mmA" (e.g., "9:30A")
 */

export const mockPatients: Patient[] = [
  {
    id: "1",
    initials: "MW",
    time: moment("09:30", "HH:mm").format("h:mmA"),
    status: "completed",
  },
  {
    id: "2",
    initials: "JD",
    time: moment("10:00", "HH:mm").format("h:mmA"),
    status: "active",
  },
  {
    id: "3",
    initials: "SA",
    time: moment("11:00", "HH:mm").format("h:mmA"),
    status: "waiting",
  },
  {
    id: "4",
    initials: "LT",
    time: moment("13:30", "HH:mm").format("h:mmA"),
    status: "scheduled",
  },
  {
    id: "5",
    initials: "BC",
    time: moment("14:30", "HH:mm").format("h:mmA"),
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
