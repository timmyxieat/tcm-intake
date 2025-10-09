/**
 * Local Storage Service
 *
 * Handles all localStorage operations for the TCM Intake App.
 * Provides type-safe methods for storing and retrieving patient data,
 * clinical notes, AI notes, and user preferences.
 *
 * Storage Schema:
 * - tcm_patients: Patient[]
 * - tcm_clinical_notes: Record<patientId, string>
 * - tcm_ai_notes: Record<patientId, AIStructuredNotes>
 * - tcm_preferences: AppPreferences
 */

import { Patient, AIStructuredNotes } from "@/types";

// Storage keys
const KEYS = {
  PATIENTS: "tcm_patients",
  CLINICAL_NOTES: "tcm_clinical_notes",
  AI_NOTES: "tcm_ai_notes",
  PREFERENCES: "tcm_preferences",
} as const;

// Preferences interface
export interface AppPreferences {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  autoUpdate: boolean;
  selectedPatientId: string | null;
}

// Default preferences
const DEFAULT_PREFERENCES: AppPreferences = {
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  autoUpdate: true,
  selectedPatientId: null,
};

/**
 * Generic localStorage getter with error handling
 */
function getItem<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === "undefined") return defaultValue;

    const item = localStorage.getItem(key);
    if (!item) return defaultValue;

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Generic localStorage setter with error handling
 */
function setItem<T>(key: string, value: T): boolean {
  try {
    if (typeof window === "undefined") return false;

    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.error("localStorage quota exceeded!");
    }
    return false;
  }
}

/**
 * Clear all app data from localStorage
 */
function clearAll(): boolean {
  try {
    if (typeof window === "undefined") return false;

    Object.values(KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
}

// ============================================================================
// PATIENTS
// ============================================================================

/**
 * Get all patients from localStorage
 */
export function getPatients(): Patient[] {
  return getItem<Patient[]>(KEYS.PATIENTS, []);
}

/**
 * Save patients array to localStorage
 */
export function savePatients(patients: Patient[]): boolean {
  return setItem(KEYS.PATIENTS, patients);
}

/**
 * Add a new patient
 */
export function addPatient(patient: Patient): boolean {
  const patients = getPatients();
  patients.push(patient);
  // Sort by time
  patients.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  return savePatients(patients);
}

/**
 * Update an existing patient
 */
export function updatePatient(patientId: string, updates: Partial<Patient>): boolean {
  const patients = getPatients();
  const index = patients.findIndex((p) => p.id === patientId);
  if (index === -1) return false;

  patients[index] = { ...patients[index], ...updates };
  return savePatients(patients);
}

/**
 * Delete a patient and all associated data
 */
export function deletePatient(patientId: string): boolean {
  try {
    // Remove from patients array
    const patients = getPatients();
    const filtered = patients.filter((p) => p.id !== patientId);
    savePatients(filtered);

    // Remove clinical notes
    const clinicalNotes = getClinicalNotes();
    delete clinicalNotes[patientId];
    saveClinicalNotes(clinicalNotes);

    // Remove AI notes
    const aiNotes = getAINotes();
    delete aiNotes[patientId];
    saveAINotes(aiNotes);

    return true;
  } catch (error) {
    console.error("Error deleting patient:", error);
    return false;
  }
}

// ============================================================================
// CLINICAL NOTES
// ============================================================================

/**
 * Get all clinical notes (keyed by patient ID)
 */
export function getClinicalNotes(): Record<string, string> {
  return getItem<Record<string, string>>(KEYS.CLINICAL_NOTES, {});
}

/**
 * Save all clinical notes
 */
export function saveClinicalNotes(notes: Record<string, string>): boolean {
  return setItem(KEYS.CLINICAL_NOTES, notes);
}

/**
 * Get clinical notes for a specific patient
 */
export function getPatientClinicalNotes(patientId: string): string {
  const notes = getClinicalNotes();
  return notes[patientId] || "";
}

/**
 * Save clinical notes for a specific patient
 */
export function savePatientClinicalNotes(patientId: string, notes: string): boolean {
  const allNotes = getClinicalNotes();
  allNotes[patientId] = notes;
  return saveClinicalNotes(allNotes);
}

// ============================================================================
// AI NOTES
// ============================================================================

/**
 * Get all AI notes (keyed by patient ID)
 */
export function getAINotes(): Record<string, AIStructuredNotes> {
  return getItem<Record<string, AIStructuredNotes>>(KEYS.AI_NOTES, {});
}

/**
 * Save all AI notes
 */
export function saveAINotes(notes: Record<string, AIStructuredNotes>): boolean {
  return setItem(KEYS.AI_NOTES, notes);
}

/**
 * Get AI notes for a specific patient
 */
export function getPatientAINotes(patientId: string): AIStructuredNotes | null {
  const notes = getAINotes();
  return notes[patientId] || null;
}

/**
 * Save AI notes for a specific patient
 */
export function savePatientAINotes(patientId: string, notes: AIStructuredNotes): boolean {
  const allNotes = getAINotes();
  allNotes[patientId] = notes;
  return saveAINotes(allNotes);
}

// ============================================================================
// PREFERENCES
// ============================================================================

/**
 * Get user preferences
 */
export function getPreferences(): AppPreferences {
  return getItem<AppPreferences>(KEYS.PREFERENCES, DEFAULT_PREFERENCES);
}

/**
 * Save user preferences
 */
export function savePreferences(preferences: AppPreferences): boolean {
  return setItem(KEYS.PREFERENCES, preferences);
}

/**
 * Update specific preference
 */
export function updatePreference<K extends keyof AppPreferences>(
  key: K,
  value: AppPreferences[K]
): boolean {
  const preferences = getPreferences();
  preferences[key] = value;
  return savePreferences(preferences);
}

// ============================================================================
// UTILITY
// ============================================================================

/**
 * Export all data as JSON (for backup)
 */
export function exportData() {
  return {
    patients: getPatients(),
    clinicalNotes: getClinicalNotes(),
    aiNotes: getAINotes(),
    preferences: getPreferences(),
    exportedAt: new Date().toISOString(),
  };
}

/**
 * Import data from JSON (for restore)
 */
export function importData(data: {
  patients?: Patient[];
  clinicalNotes?: Record<string, string>;
  aiNotes?: Record<string, AIStructuredNotes>;
  preferences?: AppPreferences;
}): boolean {
  try {
    if (data.patients) savePatients(data.patients);
    if (data.clinicalNotes) saveClinicalNotes(data.clinicalNotes);
    if (data.aiNotes) saveAINotes(data.aiNotes);
    if (data.preferences) savePreferences(data.preferences);
    return true;
  } catch (error) {
    console.error("Error importing data:", error);
    return false;
  }
}

/**
 * Clear all app data
 */
export function clearAllData(): boolean {
  return clearAll();
}

/**
 * Get storage usage statistics
 */
export function getStorageStats() {
  if (typeof window === "undefined") return null;

  try {
    let totalSize = 0;
    const sizes: Record<string, number> = {};

    Object.entries(KEYS).forEach(([name, key]) => {
      const item = localStorage.getItem(key);
      const size = item ? new Blob([item]).size : 0;
      sizes[name] = size;
      totalSize += size;
    });

    return {
      totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      sizes,
      itemCount: Object.keys(KEYS).length,
    };
  } catch (error) {
    console.error("Error calculating storage stats:", error);
    return null;
  }
}
