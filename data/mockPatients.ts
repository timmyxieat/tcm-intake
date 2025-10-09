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
  // Patient 1: COMPLETED - has AI note summary and full structured notes
  "1": {
    aiNotes: {
      note_summary: "Patient presents with lower back pain radiating to left leg. History of L4-L5 herniation. Physical exam shows limited ROM and positive straight leg raise. Diagnosed with lumbar radiculopathy. Treatment plan includes acupuncture points BL23, BL40, GB30 with electrostimulation.",
      chiefComplaints: [
        {
          text: "Lower back pain radiating to left leg",
          icdCode: "M54.16",
          icdLabel: "Radiculopathy, lumbar region"
        }
      ],
      hpi: "45-year-old patient presents with lower back pain for 2 weeks. Pain radiates down the left leg to the knee. Pain is worse with sitting and prolonged standing, better with walking. Patient reports numbness and tingling in left foot. No recent trauma.",
      subjective: {
        pmh: "L4-L5 disc herniation diagnosed in 2019. Hypertension controlled with medication.",
        pmhHighlights: ["L4-L5 disc herniation", "Hypertension"],
        fh: "Father with history of degenerative disc disease. Mother healthy.",
        fhHighlights: ["Degenerative disc disease"],
        sh: "Works as software engineer, sits 8+ hours daily. Non-smoker, occasional alcohol use.",
        shHighlights: ["Sedentary work", "Prolonged sitting"],
        es: "Stress level 6/10 due to work deadlines and pain affecting sleep.",
        stressLevel: "6/10",
      },
      tcmReview: {
        "Pain": ["Lower back", "Left leg", "Left foot numbness"],
        "Sleep": ["Difficulty due to pain"],
        "Energy": ["Fatigue from poor sleep"],
      },
      tongue: {
        body: "Pale with red tip",
        bodyHighlights: ["Pale", "Red tip"],
        coating: "Thin white",
        coatingHighlights: ["Thin", "White"],
      },
      pulse: {
        text: "Wiry and deep on left side, moderate on right",
        highlights: ["Wiry", "Deep left"],
      },
      diagnosis: {
        tcmDiagnosis: "Kidney Deficiency with Qi and Blood Stagnation in the Lower Back and Leg Channels",
        icdCodes: [
          { code: "M54.16", label: "Radiculopathy, lumbar region" },
          { code: "M51.26", label: "Other intervertebral disc displacement, lumbar region" },
        ],
      },
      treatment: "Tonify Kidney, move Qi and Blood in the channels, relieve pain",
      acupuncture: [
        {
          name: "Back",
          points: ["BL23", "BL25 (T)", "BL26"],
        },
        {
          name: "Leg",
          points: ["BL40 (R)", "BL57", "GB30 (Right side only)", "GB34 (E)"],
        },
        {
          name: "Distal",
          points: ["SI3", "BL62"],
          note: "Left side treatment only",
        },
      ],
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
