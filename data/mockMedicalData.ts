import { MedicalHistory, TCMAssessmentData } from "@/types";

/**
 * Mock medical history data for testing AI integration
 */
export const mockMedicalHistory: Record<string, MedicalHistory> = {
  "2": {
    chiefComplaint: "Insomnia for 3 months",
    hpi: "38-year-old patient presents with difficulty falling asleep for the past 3 months. Patient reports lying awake for 1-2 hours before falling asleep. Wakes frequently throughout the night (3-4 times). Work stress has increased significantly during this period. Tried over-the-counter melatonin without improvement. Morning fatigue affecting work performance.",
    pmh: "No significant past medical history. Occasional tension headaches. No current medications besides melatonin.",
    fh: "Mother has history of anxiety disorder. Father healthy.",
    sh: "Works as financial analyst, high-stress environment. Married with 2 children. Social drinker (2-3 drinks per week). Non-smoker. Exercises irregularly, 1-2x per week.",
    es: "Exercise: 1-2x per week, walking or light jogging. Sleep: 5-6 hours per night, poor quality. Work schedule: 8am-7pm typically, brings work home.",
    stressLevel: "8/10"
  },
  "3": {
    chiefComplaint: "Migraines 2-3 times per week",
    hpi: "52-year-old patient with migraine headaches occurring 2-3 times weekly for the past 6 months. Headaches are left-sided, throbbing in nature, lasting 4-8 hours. Associated photophobia and mild nausea. Stress is a major trigger. No aura. Previously had migraines in 30s but resolved. Recent recurrence coincides with new job position.",
    pmh: "Hypertension controlled on lisinopril 10mg daily. Previous history of migraines in 30s (resolved spontaneously). No other significant medical history.",
    fh: "Mother has history of migraines. Father deceased (cardiovascular disease). No family history of stroke.",
    sh: "Recently promoted to management position, increased stress. Married, 3 adult children. Non-smoker. Drinks wine socially, 3-4 glasses per week. Coffee consumption: 3-4 cups daily.",
    es: "Exercise: Yoga 2x per week. Sleep: 6-7 hours, wakes with headache 2-3x per week. Works 9am-6pm, commutes 1 hour each way.",
    stressLevel: "7/10"
  },
  "4": {
    chiefComplaint: "Knee pain for 2 weeks",
    hpi: "55-year-old patient presents with right knee pain for 2 weeks. Pain is medial, worse with stairs and prolonged standing. No acute injury recalled. Patient is a runner, recently increased mileage for upcoming marathon. Swelling noted after runs. Pain improves with rest and ice.",
    pmh: "Type 2 diabetes mellitus controlled with metformin. Hyperlipidemia on atorvastatin. Previous left knee meniscus repair 5 years ago.",
    fh: "Father with osteoarthritis. Mother with type 2 diabetes.",
    sh: "Accountant, sedentary work. Divorced. Runs 4-5x per week, recently increased from 20 to 35 miles per week. Non-smoker. Rare alcohol use.",
    es: "Exercise: Running 4-5x per week, 35 miles total. Sleep: 7-8 hours, good quality. Works typical office hours.",
    stressLevel: "4/10"
  },
  "5": {
    chiefComplaint: "Digestive issues for 4 months",
    hpi: "28-year-old patient with bloating, gas, and irregular bowel movements for 4 months. Alternates between constipation and loose stools. Cramping abdominal pain, better after bowel movement. Symptoms worse with stress. No blood in stool, no weight loss. Appetite decreased due to bloating. Previous colonoscopy 1 year ago was normal.",
    pmh: "IBS diagnosed 2 years ago. Tried low-FODMAP diet with minimal improvement. No other significant medical history.",
    fh: "Sister has Crohn's disease. Mother has IBS. Father healthy.",
    sh: "Graduate student, high stress. Lives alone. Diet: irregular meal times, high coffee intake (4-5 cups daily), frequent fast food. Non-smoker. Social drinker (2-3 drinks per week).",
    es: "Exercise: Minimal, walks to campus. Sleep: 6-7 hours, frequently interrupted. Studying late nights, irregular schedule.",
    stressLevel: "9/10"
  }
};

/**
 * Mock TCM assessment data for testing AI integration
 */
export const mockTCMAssessment: Record<string, TCMAssessmentData> = {
  "2": {
    appetite: [
      { label: "Good", checked: true },
      { label: "Poor", checked: false },
      { label: "Excessive", checked: false }
    ],
    taste: [
      { label: "Normal", checked: true },
      { label: "Bitter", checked: false },
      { label: "Bland", checked: false }
    ],
    stool: [
      { label: "Normal", checked: true },
      { label: "Loose", checked: false },
      { label: "Constipated", checked: false }
    ],
    thirst: [
      { label: "Normal", checked: true },
      { label: "Excessive", checked: false },
      { label: "No thirst", checked: false }
    ],
    urine: [
      { label: "Normal", checked: true },
      { label: "Dark", checked: false },
      { label: "Pale", checked: false }
    ],
    sleep: [
      { label: "Good", checked: false },
      { label: "Difficulty falling asleep", checked: true },
      { label: "Wakes frequently", checked: true },
      { label: "Dreams excessively", checked: true }
    ],
    energy: [
      { label: "Good", checked: false },
      { label: "Tired", checked: true },
      { label: "Fatigued", checked: true }
    ],
    temp: [
      { label: "Normal", checked: true },
      { label: "Cold", checked: false },
      { label: "Hot", checked: false }
    ],
    sweat: [
      { label: "Normal", checked: true },
      { label: "Excessive", checked: false },
      { label: "Night sweats", checked: false }
    ],
    head: [
      { label: "None", checked: true },
      { label: "Headache", checked: false },
      { label: "Dizziness", checked: false }
    ],
    ear: [
      { label: "Normal", checked: true },
      { label: "Tinnitus", checked: false },
      { label: "Hearing loss", checked: false }
    ],
    eye: [
      { label: "Normal", checked: true },
      { label: "Dry", checked: false },
      { label: "Blurry vision", checked: false }
    ],
    nose: [
      { label: "Normal", checked: true },
      { label: "Congestion", checked: false },
      { label: "Runny", checked: false }
    ],
    throat: [
      { label: "Normal", checked: true },
      { label: "Sore", checked: false },
      { label: "Dry", checked: false }
    ],
    pain: [
      { label: "None", checked: true },
      { label: "Back", checked: false },
      { label: "Joint", checked: false }
    ],
    libido: [
      { label: "Normal", checked: true },
      { label: "Decreased", checked: false },
      { label: "Increased", checked: false }
    ]
  },
  "3": {
    appetite: [
      { label: "Good", checked: true },
      { label: "Poor", checked: false },
      { label: "Excessive", checked: false }
    ],
    taste: [
      { label: "Normal", checked: false },
      { label: "Bitter", checked: true },
      { label: "Bland", checked: false }
    ],
    stool: [
      { label: "Normal", checked: true },
      { label: "Loose", checked: false },
      { label: "Constipated", checked: false }
    ],
    thirst: [
      { label: "Normal", checked: false },
      { label: "Excessive", checked: true },
      { label: "No thirst", checked: false }
    ],
    urine: [
      { label: "Normal", checked: false },
      { label: "Dark", checked: true },
      { label: "Pale", checked: false }
    ],
    sleep: [
      { label: "Good", checked: false },
      { label: "Difficulty falling asleep", checked: false },
      { label: "Wakes frequently", checked: true },
      { label: "Dreams excessively", checked: false }
    ],
    energy: [
      { label: "Good", checked: false },
      { label: "Tired", checked: true },
      { label: "Fatigued", checked: false }
    ],
    temp: [
      { label: "Normal", checked: false },
      { label: "Cold", checked: false },
      { label: "Hot", checked: true }
    ],
    sweat: [
      { label: "Normal", checked: true },
      { label: "Excessive", checked: false },
      { label: "Night sweats", checked: false }
    ],
    head: [
      { label: "None", checked: false },
      { label: "Headache", checked: true },
      { label: "Dizziness", checked: false }
    ],
    ear: [
      { label: "Normal", checked: true },
      { label: "Tinnitus", checked: false },
      { label: "Hearing loss", checked: false }
    ],
    eye: [
      { label: "Normal", checked: false },
      { label: "Dry", checked: false },
      { label: "Blurry vision", checked: true }
    ],
    nose: [
      { label: "Normal", checked: true },
      { label: "Congestion", checked: false },
      { label: "Runny", checked: false }
    ],
    throat: [
      { label: "Normal", checked: true },
      { label: "Sore", checked: false },
      { label: "Dry", checked: false }
    ],
    pain: [
      { label: "None", checked: false },
      { label: "Back", checked: false },
      { label: "Joint", checked: false },
      { label: "Headache", checked: true }
    ],
    libido: [
      { label: "Normal", checked: false },
      { label: "Decreased", checked: true },
      { label: "Increased", checked: false }
    ]
  },
  // Empty TCM assessment for patients without data
  "4": {
    appetite: [{ label: "Good", checked: false }],
    taste: [{ label: "Normal", checked: false }],
    stool: [{ label: "Normal", checked: false }],
    thirst: [{ label: "Normal", checked: false }],
    urine: [{ label: "Normal", checked: false }],
    sleep: [{ label: "Good", checked: false }],
    energy: [{ label: "Good", checked: false }],
    temp: [{ label: "Normal", checked: false }],
    sweat: [{ label: "Normal", checked: false }],
    head: [{ label: "None", checked: false }],
    ear: [{ label: "Normal", checked: false }],
    eye: [{ label: "Normal", checked: false }],
    nose: [{ label: "Normal", checked: false }],
    throat: [{ label: "Normal", checked: false }],
    pain: [{ label: "None", checked: false }],
    libido: [{ label: "Normal", checked: false }]
  },
  "5": {
    appetite: [
      { label: "Good", checked: false },
      { label: "Poor", checked: true },
      { label: "Excessive", checked: false }
    ],
    taste: [
      { label: "Normal", checked: false },
      { label: "Bitter", checked: false },
      { label: "Bland", checked: true }
    ],
    stool: [
      { label: "Normal", checked: false },
      { label: "Loose", checked: true },
      { label: "Constipated", checked: true }
    ],
    thirst: [
      { label: "Normal", checked: true },
      { label: "Excessive", checked: false },
      { label: "No thirst", checked: false }
    ],
    urine: [
      { label: "Normal", checked: true },
      { label: "Dark", checked: false },
      { label: "Pale", checked: false }
    ],
    sleep: [
      { label: "Good", checked: false },
      { label: "Difficulty falling asleep", checked: false },
      { label: "Wakes frequently", checked: true },
      { label: "Dreams excessively", checked: false }
    ],
    energy: [
      { label: "Good", checked: false },
      { label: "Tired", checked: true },
      { label: "Fatigued", checked: false }
    ],
    temp: [
      { label: "Normal", checked: true },
      { label: "Cold", checked: false },
      { label: "Hot", checked: false }
    ],
    sweat: [
      { label: "Normal", checked: true },
      { label: "Excessive", checked: false },
      { label: "Night sweats", checked: false }
    ],
    head: [
      { label: "None", checked: true },
      { label: "Headache", checked: false },
      { label: "Dizziness", checked: false }
    ],
    ear: [
      { label: "Normal", checked: true },
      { label: "Tinnitus", checked: false },
      { label: "Hearing loss", checked: false }
    ],
    eye: [
      { label: "Normal", checked: true },
      { label: "Dry", checked: false },
      { label: "Blurry vision", checked: false }
    ],
    nose: [
      { label: "Normal", checked: true },
      { label: "Congestion", checked: false },
      { label: "Runny", checked: false }
    ],
    throat: [
      { label: "Normal", checked: true },
      { label: "Sore", checked: false },
      { label: "Dry", checked: false }
    ],
    pain: [
      { label: "None", checked: false },
      { label: "Back", checked: false },
      { label: "Joint", checked: false },
      { label: "Abdominal", checked: true }
    ],
    libido: [
      { label: "Normal", checked: true },
      { label: "Decreased", checked: false },
      { label: "Increased", checked: false }
    ]
  }
};
