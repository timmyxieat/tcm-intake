import { Patient } from "@/types";

/**
 * Mock patient data for testing and development
 *
 * Contains 5 patients with different statuses and schedules
 */

export const mockPatients: Patient[] = [
  {
    id: "1",
    initials: "MW",
    time: "9:30 AM",
    status: "completed",
  },
  {
    id: "2",
    initials: "JD",
    time: "10:00 AM",
    status: "active",
  },
  {
    id: "3",
    initials: "SA",
    time: "11:00 AM",
    status: "waiting",
  },
  {
    id: "4",
    initials: "LT",
    time: "1:30 PM",
    status: "scheduled",
  },
  {
    id: "5",
    initials: "BC",
    time: "2:30 PM",
    status: "scheduled",
  },
];

/**
 * Mock AI structured notes data for all patients
 *
 * Each patient has complete AI-generated notes including:
 * - Chief complaints with ICD-10 codes
 * - HPI (History of Present Illness)
 * - Subjective data (PMH, FH, SH, ES)
 * - TCM Review of Systems
 * - Tongue and Pulse examination
 * - TCM diagnosis with ICD-10 codes
 * - Treatment principle
 * - Acupuncture points by region
 */

export const mockPatientsData: Record<string, any> = {
  "1": {
    aiNotes: {
      chiefComplaints: [
        {
          text: "Chronic fatigue for 6 months",
          icdCode: "R53.83",
          icdLabel: "Other fatigue",
        },
      ],
      hpi: "Patient reports progressive fatigue over the past 6 months, worse in the afternoon. No relief with rest. Associated with poor sleep quality and mild digestive issues.",
      subjective: {
        pmh: "No significant past medical history. Occasional headaches.",
        pmhHighlights: ["headaches"],
        fh: "Mother: Type 2 diabetes, hypertension. Father: Healthy.",
        fhHighlights: ["Type 2 diabetes", "hypertension"],
        sh: "Works as software engineer, sedentary lifestyle. Limited exercise. Diet: irregular meals, coffee 3x/day.",
        shHighlights: ["sedentary", "irregular meals", "coffee"],
        es: "Worry and frustration",
        stressLevel: "7/10",
      },
      tcmReview: {
        Appetite: ["Decreased, especially morning"],
        Stool: ["Normal, 1x daily"],
        Thirst: ["Minimal, prefers warm drinks"],
        Sleep: ["Light, wakes 2-3x nightly"],
        Energy: ["Low, worse afternoon"],
      },
      tongue: {
        body: "Pale, slightly swollen with teethmarks on sides",
        bodyHighlights: ["Pale", "swollen", "teethmarks"],
        coating: "Thin white",
        coatingHighlights: ["white"],
      },
      pulse: {
        text: "Deep, weak, slightly slow",
        highlights: ["Deep", "weak", "slow"],
      },
      diagnosis: {
        tcmDiagnosis: "Spleen Qi Deficiency with mild Yang deficiency",
        icdCodes: [
          { code: "R53.83", label: "Other fatigue" },
          { code: "R63.0", label: "Anorexia" },
        ],
      },
      treatment: "Tonify Spleen Qi, warm Yang, harmonize digestion",
      acupuncture: [
        {
          name: "Back",
          points: ["BL-20", "BL-21", "BL-23"],
        },
        {
          name: "Abdomen",
          points: ["CV-12", "CV-6", "ST-36"],
          note: "with moxa",
          noteColor: "orange" as const,
        },
        {
          name: "Legs",
          points: ["SP-6", "ST-36"],
          note: "bilateral",
          noteColor: "purple" as const,
        },
      ],
    },
    clinicalNotes: "CC\nChronic fatigue x 6 months\n\nHPI\nProgressive onset, worse PM, no relief with rest\n",
  },
  "2": {
    aiNotes: {
      chiefComplaints: [
        {
          text: "Bloating for 1 year",
          icdCode: "R14.0",
          icdLabel: "Abdominal distension (gaseous)",
        },
        {
          text: "Loose stools for 3 months",
          icdCode: "R19.7",
          icdLabel: "Diarrhea, unspecified",
        },
      ],
      hpi: "Patient reports chronic bloating after meals for 1 year, worsening in the past 3 months with loose stools 2-3x daily. No blood, no weight loss. Stress from work exacerbates symptoms.",
      subjective: {
        pmh: "IBS diagnosed 2 years ago. No other significant history.",
        pmhHighlights: ["IBS"],
        fh: "Father: Crohn's disease. Mother: Healthy.",
        fhHighlights: ["Crohn's disease"],
        sh: "Accountant, high-stress job. Exercise 2x/week. Diet: skips breakfast, eats quickly.",
        shHighlights: ["high-stress", "skips breakfast", "eats quickly"],
        es: "Anxiety and worry about health",
        stressLevel: "8/10",
      },
      tcmReview: {
        Appetite: ["Poor, especially morning"],
        Stool: ["Loose, 2-3x daily", "Multiple times per day"],
        Thirst: ["Normal"],
        Sleep: ["Difficulty falling asleep"],
        Energy: ["Fluctuating, low after meals"],
        Pain: ["Abdominal cramping before BM"],
      },
      tongue: {
        body: "Pale with red tip, teethmarks bilateral",
        bodyHighlights: ["Pale", "red tip", "teethmarks"],
        coating: "White greasy in center",
        coatingHighlights: ["white", "greasy"],
      },
      pulse: {
        text: "Slippery, wiry in Liver position",
        highlights: ["Slippery", "wiry"],
      },
      diagnosis: {
        tcmDiagnosis: "Spleen Qi Deficiency with Liver Qi Stagnation and Dampness",
        icdCodes: [
          { code: "R14.0", label: "Abdominal distension" },
          { code: "R19.7", label: "Diarrhea, unspecified" },
          { code: "K58.9", label: "Irritable bowel syndrome" },
        ],
      },
      treatment: "Tonify Spleen, regulate Liver Qi, resolve Dampness",
      acupuncture: [
        {
          name: "Back",
          points: ["BL-18", "BL-20", "BL-21"],
        },
        {
          name: "Abdomen",
          points: ["CV-12", "ST-25", "ST-36 (R)"],
          note: "right side only",
          noteColor: "orange" as const,
        },
        {
          name: "Legs",
          points: ["SP-6", "SP-9", "LR-3"],
          note: "bilateral",
          noteColor: "purple" as const,
        },
        {
          name: "Arms",
          points: ["LI-4", "PC-6"],
        },
      ],
    },
    clinicalNotes: "",
  },
  "3": {
    aiNotes: {
      chiefComplaints: [
        {
          text: "Chronic lower back pain for 2 years",
          icdCode: "M54.5",
          icdLabel: "Low back pain",
        },
      ],
      hpi: "Patient reports chronic dull aching in lower back for 2 years, worse with cold weather and in the morning. Improves with movement and heat. No radiation to legs.",
      subjective: {
        pmh: "No significant medical history. Previous back injury from lifting 3 years ago.",
        pmhHighlights: ["back injury", "lifting"],
        fh: "Mother: Osteoarthritis. Father: Healthy.",
        fhHighlights: ["Osteoarthritis"],
        sh: "Construction worker, physically demanding job. Exercises regularly. No smoking or alcohol.",
        shHighlights: ["Construction worker", "physically demanding"],
        es: "Generally positive, occasional frustration with pain",
        stressLevel: "4/10",
      },
      tcmReview: {
        Energy: ["Good overall, slight fatigue PM"],
        Sleep: ["Good, 7-8 hours nightly"],
        Temp: ["Feels cold easily, especially lower back"],
        Pain: ["Lower back, worse AM and cold weather"],
      },
      tongue: {
        body: "Slightly pale, normal shape",
        bodyHighlights: ["Slightly pale"],
        coating: "Thin white",
        coatingHighlights: ["white"],
      },
      pulse: {
        text: "Deep, slightly weak in Kidney position",
        highlights: ["Deep", "weak"],
      },
      diagnosis: {
        tcmDiagnosis: "Kidney Yang Deficiency with Cold-Damp Bi syndrome",
        icdCodes: [{ code: "M54.5", label: "Low back pain" }],
      },
      treatment: "Tonify Kidney Yang, expel Cold-Damp, relieve pain",
      acupuncture: [
        {
          name: "Back",
          points: ["BL-23", "BL-52", "DU-4"],
          note: "with moxa",
          noteColor: "orange" as const,
        },
        {
          name: "Legs",
          points: ["KI-3", "GB-30", "BL-40"],
        },
      ],
    },
    clinicalNotes: "",
  },
  "4": {
    aiNotes: {
      chiefComplaints: [
        {
          text: "Insomnia for 4 months",
          icdCode: "G47.00",
          icdLabel: "Insomnia, unspecified",
        },
        {
          text: "Anxiety",
          icdCode: "F41.9",
          icdLabel: "Anxiety disorder, unspecified",
        },
      ],
      hpi: "Patient reports difficulty falling asleep and frequent waking for 4 months. Stress from new job. Racing thoughts at night. Daytime fatigue and irritability.",
      subjective: {
        pmh: "History of anxiety, no medications. No other medical conditions.",
        pmhHighlights: ["anxiety"],
        fh: "Mother: Depression. Father: Insomnia.",
        fhHighlights: ["Depression", "Insomnia"],
        sh: "Marketing manager, high-pressure job. Exercises occasionally. Wine 2-3x/week.",
        shHighlights: ["high-pressure", "Wine"],
        es: "Anxious and irritable",
        stressLevel: "9/10",
      },
      tcmReview: {
        Sleep: ["Difficulty falling asleep", "Wakes 4-5x nightly", "Dream-disturbed"],
        Energy: ["Tired but wired"],
        Appetite: ["Normal but eats quickly"],
        Thirst: ["Increased, prefers cold"],
        Temp: ["Hot, especially at night"],
        Head: ["Occasional headaches, temple area"],
      },
      tongue: {
        body: "Red, especially tip and sides, slightly dry",
        bodyHighlights: ["Red", "tip", "sides", "dry"],
        coating: "Thin yellow",
        coatingHighlights: ["yellow"],
      },
      pulse: {
        text: "Rapid, wiry, slightly floating",
        highlights: ["Rapid", "wiry", "floating"],
      },
      diagnosis: {
        tcmDiagnosis: "Liver Fire with Heart Yin Deficiency disturbing Shen",
        icdCodes: [
          { code: "G47.00", label: "Insomnia, unspecified" },
          { code: "F41.9", label: "Anxiety disorder, unspecified" },
        ],
      },
      treatment: "Clear Liver Fire, nourish Heart Yin, calm Shen",
      acupuncture: [
        {
          name: "Head",
          points: ["DU-20", "Yintang"],
        },
        {
          name: "Back",
          points: ["BL-15", "BL-18"],
        },
        {
          name: "Legs",
          points: ["HT-7", "SP-6", "LR-3", "KI-6"],
          note: "bilateral",
          noteColor: "purple" as const,
        },
        {
          name: "Ears",
          points: ["Shenmen", "Heart"],
          note: "ear seeds",
          noteColor: "orange" as const,
        },
      ],
    },
    clinicalNotes: "",
  },
  "5": {
    aiNotes: {
      chiefComplaints: [
        {
          text: "Neck pain and stiffness for 1 month",
          icdCode: "M54.2",
          icdLabel: "Cervicalgia",
        },
        {
          text: "Tension headaches",
          icdCode: "G44.209",
          icdLabel: "Tension-type headache, unspecified",
        },
      ],
      hpi: "Patient reports neck pain and stiffness for 1 month after starting work-from-home. Tension headaches 3-4x/week, worse end of day. Pain radiates to shoulders.",
      subjective: {
        pmh: "No significant medical history.",
        fh: "Mother: Migraines. Father: Healthy.",
        fhHighlights: ["Migraines"],
        sh: "Software developer, work-from-home since 1 month ago. Poor desk ergonomics. Minimal exercise.",
        shHighlights: ["work-from-home", "Poor desk ergonomics", "Minimal exercise"],
        es: "Frustrated with pain affecting work",
        stressLevel: "6/10",
      },
      tcmReview: {
        Head: ["Tension headaches, bilateral temples"],
        Pain: ["Neck and shoulder pain, worse PM"],
        Sleep: ["Fair, neck pain disturbs position"],
        Energy: ["Good morning, declines PM"],
      },
      tongue: {
        body: "Normal color, slightly purple on sides",
        bodyHighlights: ["purple on sides"],
        coating: "Thin white",
        coatingHighlights: ["white"],
      },
      pulse: {
        text: "Wiry, especially in Gallbladder position",
        highlights: ["Wiry"],
      },
      diagnosis: {
        tcmDiagnosis: "Qi and Blood stagnation in neck/shoulder channels with Liver Qi constraint",
        icdCodes: [
          { code: "M54.2", label: "Cervicalgia" },
          { code: "G44.209", label: "Tension-type headache" },
        ],
      },
      treatment: "Move Qi and Blood, relax sinews, regulate Liver Qi",
      acupuncture: [
        {
          name: "Neck",
          points: ["GB-20", "GB-21", "SI-3"],
        },
        {
          name: "Back",
          points: ["BL-10", "DU-14"],
        },
        {
          name: "Arms",
          points: ["LI-4", "TE-5"],
        },
        {
          name: "Legs",
          points: ["LR-3", "GB-34"],
        },
      ],
    },
    clinicalNotes: "",
  },
};
