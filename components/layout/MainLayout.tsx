"use client";

import { useState, useEffect } from "react";
import { LeftSidebar } from "@/components/left/LeftSidebar";
import { MiddleColumn } from "@/components/middle/MiddleColumn";
import { RightSidebar } from "@/components/right/RightSidebar";
import { Patient } from "@/types";
import * as storage from "@/lib/localStorage";

/**
 * MainLayout Component
 *
 * Main application layout with three columns:
 * - Left: Patient list (collapsible)
 * - Middle: Clinical notes and section navigation
 * - Right: AI structured notes (collapsible, full-width)
 *
 * Manages global state for:
 * - Current patient selection
 * - Sidebar open/closed state
 * - AI toggle state
 * - Clinical notes
 *
 * @param patients - Array of all patients
 * @param patientsData - Map of patient ID to their full data (medical history, AI notes, etc.)
 * @param initialPatientId - ID of initially selected patient
 *
 * @example
 * <MainLayout
 *   patients={allPatients}
 *   patientsData={mockPatientsData}
 *   initialPatientId="1"
 * />
 */

interface PatientFullData {
  aiNotes: {
    note_summary?: string; // Triggers "Completed" status
    chiefComplaints: Array<{
      text: string;
      icdCode: string;
      icdLabel: string;
    }>;
    hpi: string;
    subjective: {
      pmh: string;
      pmhHighlights?: string[];
      fh: string;
      fhHighlights?: string[];
      sh: string;
      shHighlights?: string[];
      es: string;
      stressLevel: string;
    };
    tcmReview: {
      [key: string]: string[];
    };
    tongue: {
      body: string;
      bodyHighlights?: string[];
      coating: string;
      coatingHighlights?: string[];
    };
    pulse: {
      text: string;
      highlights?: string[];
    };
    diagnosis: {
      tcmDiagnosis: string;
      icdCodes: Array<{
        code: string;
        label: string;
      }>;
    };
    treatment: string;
    acupuncture: Array<{
      name: string;
      points: string[];
      note?: string;
      noteColor?: "orange" | "purple";
    }>;
  };
  clinicalNotes?: string;
}

interface MainLayoutProps {
  patients: Patient[];
  patientsData: Record<string, PatientFullData>;
  initialPatientId?: string;
}

export function MainLayout({
  patients: initialPatients,
  patientsData,
  initialPatientId,
}: MainLayoutProps) {
  // Load patients from localStorage or use initial patients
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPatientId, setCurrentPatientId] = useState<string>("");
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [aiEnabled, setAIEnabled] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [clinicalNotes, setClinicalNotes] = useState<Record<string, string>>({});
  const [aiNotesData, setAINotesData] = useState<Record<string, any>>({});
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedPatients = storage.getPatients();
    const savedNotes = storage.getClinicalNotes();
    const savedAINotes = storage.getAINotes();
    const prefs = storage.getPreferences();

    // Use saved patients if they exist, otherwise use initial patients
    if (savedPatients.length > 0) {
      setPatients(savedPatients);
      setCurrentPatientId(savedPatients[0].id);
    } else {
      setPatients(initialPatients);
      setCurrentPatientId(initialPatients[0]?.id || "");
    }

    // Set both current state and saved notes
    setClinicalNotes(savedNotes);
    setAINotesData(savedAINotes);
    setLeftOpen(prefs.leftSidebarOpen);
    setRightOpen(prefs.rightSidebarOpen);
    setAutoUpdate(prefs.autoUpdate);
  }, [initialPatients]);

  // Save preferences when they change
  useEffect(() => {
    storage.updatePreference("leftSidebarOpen", leftOpen);
  }, [leftOpen]);

  useEffect(() => {
    storage.updatePreference("rightSidebarOpen", rightOpen);
  }, [rightOpen]);

  useEffect(() => {
    storage.updatePreference("autoUpdate", autoUpdate);
  }, [autoUpdate]);

  // Calculate status for each patient dynamically
  const getPatientsWithStatus = () => {
    return patients.map((patient) => {
      const hasNotes = clinicalNotes[patient.id]?.trim().length > 0;
      const hasAISummary = aiNotesData[patient.id]?.note_summary?.trim().length > 0;
      const isCurrentlyOpen = patient.id === currentPatientId;

      let status: Patient['status'];
      if (hasAISummary) {
        status = 'completed';
      } else if (isCurrentlyOpen || hasNotes) {
        status = 'active';
      } else {
        status = 'scheduled';
      }

      return { ...patient, status };
    });
  };

  const patientsWithStatus = getPatientsWithStatus();
  const currentPatient = patientsWithStatus.find(p => p.id === currentPatientId) || patientsWithStatus[0] || null;

  // Auto-save effect (debounced 2 seconds) - Must be before early return
  useEffect(() => {
    if (!currentPatient?.id) return;
    if (saveStatus !== "unsaved") return;

    setSaveStatus("saving");

    const timeout = setTimeout(() => {
      const notes = clinicalNotes[currentPatient.id] || "";
      storage.savePatientClinicalNotes(currentPatient.id, notes);

      // Update patient status
      const hasNotes = notes.trim().length > 0;
      const hasAISummary = aiNotesData[currentPatient.id]?.note_summary?.trim().length > 0;

      let newStatus: Patient['status'] = 'scheduled';
      if (hasAISummary) {
        newStatus = 'completed';
      } else if (hasNotes) {
        newStatus = 'active';
      }

      storage.updatePatient(currentPatient.id, { status: newStatus });
      setPatients(storage.getPatients());

      setSaveStatus("saved");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [clinicalNotes, currentPatient?.id, aiNotesData, saveStatus]);

  // Early return if no patients - Must be after all hooks
  if (!currentPatient) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <p className="text-gray-500">No patients found. Please add a patient to get started.</p>
      </div>
    );
  }

  // Get current patient AI data from localStorage
  const currentPatientAINotes = aiNotesData[currentPatient.id] || {
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
    tongue: { body: "", coating: "" },
    pulse: { text: "" },
    diagnosis: { tcmDiagnosis: "", icdCodes: [] },
    treatment: "",
    acupuncture: [],
  };

  // Patient management handlers
  const handlePatientAdded = () => {
    // Reload patients from localStorage
    const updatedPatients = storage.getPatients();
    setPatients(updatedPatients);
  };

  const handlePatientClick = (patient: Patient) => {
    setCurrentPatientId(patient.id);
  };

  const handlePrevious = () => {
    const currentIndex = patientsWithStatus.findIndex((p) => p.id === currentPatient.id);
    if (currentIndex > 0) {
      setCurrentPatientId(patientsWithStatus[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    const currentIndex = patientsWithStatus.findIndex((p) => p.id === currentPatient.id);
    if (currentIndex < patientsWithStatus.length - 1) {
      setCurrentPatientId(patientsWithStatus[currentIndex + 1].id);
    }
  };

  // Notes management with auto-save
  const handleNotesChange = (value: string) => {
    if (!currentPatient?.id) return;

    // Update notes immediately
    setClinicalNotes((prev) => ({
      ...prev,
      [currentPatient.id]: value,
    }));

    // Set status to unsaved
    setSaveStatus("unsaved");
  };

  const getCurrentNotes = () => {
    return clinicalNotes[currentPatient?.id] || "";
  };

  // AI refresh handler
  const handleRefresh = () => {
    console.log("Refreshing AI notes for patient:", currentPatient.id);
    // TODO: Implement AI refresh logic
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Sidebar: Patient List */}
      <LeftSidebar
        patients={patientsWithStatus}
        activePatientId={currentPatient.id}
        onPatientClick={handlePatientClick}
        onPatientAdded={handlePatientAdded}
        isOpen={leftOpen}
        onToggle={() => setLeftOpen(!leftOpen)}
      />

      {/* Middle Column: Clinical Notes */}
      <div className="flex-1">
        <MiddleColumn
          patient={currentPatient}
          clinicalNotes={getCurrentNotes()}
          onNotesChange={handleNotesChange}
          saveStatus={saveStatus}
        />
      </div>

      {/* Right Sidebar: AI Structured Notes */}
      {aiEnabled && (
        <RightSidebar
          isOpen={rightOpen}
          onToggle={() => setRightOpen(!rightOpen)}
          autoUpdate={autoUpdate}
          onAutoUpdateChange={setAutoUpdate}
          onRefresh={handleRefresh}
          data={currentPatientAINotes}
        />
      )}
    </div>
  );
}
