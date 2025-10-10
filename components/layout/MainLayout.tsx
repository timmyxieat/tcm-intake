"use client";

import { useState, useEffect } from "react";
import { LeftSidebar } from "@/components/layout/PatientListPanel";
import { MiddleColumn } from "@/components/layout/NotesEditorPanel";
import { RightSidebar } from "@/components/ai-notes/AINotesPanel";
import { Patient } from "@/types";
import * as storage from "@/lib/storage/local-storage";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";
import { transformAINotesToSidebarFormat } from "@/lib/ai/transformer";
import { parseClinicalNotes } from "@/lib/ai/notes-parser";

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
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // AI Analysis hook
  const { analyzePatient, isLoading: aiLoading, error: aiError, clearError } = useAIAnalysis();

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedPatients = storage.getPatients();
    const savedNotes = storage.getClinicalNotes();
    const savedAINotes = storage.getAINotes();
    const prefs = storage.getPreferences();

    // Use saved patients if they exist, otherwise use initial patients
    if (savedPatients.length > 0) {
      setPatients(savedPatients);
      setClinicalNotes(savedNotes);
      setAINotesData(savedAINotes);

      // Restore last selected patient if it exists, otherwise use first patient
      if (prefs.selectedPatientId && savedPatients.find(p => p.id === prefs.selectedPatientId)) {
        setCurrentPatientId(prefs.selectedPatientId);
      } else {
        setCurrentPatientId(savedPatients[0].id);
      }
    } else {
      // Load initial patients and their data into localStorage
      setPatients(initialPatients);
      setCurrentPatientId(initialPatientId || initialPatients[0]?.id || "");

      // Initialize localStorage with initial data
      storage.savePatients(initialPatients);

      // Extract and save data from initial state
      const initialClinicalNotes: Record<string, string> = {};
      const initialAINotes: Record<string, any> = {};

      Object.entries(patientsData).forEach(([patientId, data]) => {
        if (data.clinicalNotes) {
          storage.savePatientClinicalNotes(patientId, data.clinicalNotes);
          initialClinicalNotes[patientId] = data.clinicalNotes;
        }
        // aiNotes are in transformed format (for display), use directly
        if (data.aiNotes) {
          initialAINotes[patientId] = data.aiNotes;
        }
      });

      // Use initial data (don't reload since we didn't save AI notes)
      setClinicalNotes(initialClinicalNotes);
      setAINotesData(initialAINotes);
    }

    // Set preferences
    setLeftOpen(prefs.leftSidebarOpen);
    setRightOpen(prefs.rightSidebarOpen);
    setAutoUpdate(prefs.autoUpdate);
  }, [initialPatients, initialPatientId, patientsData]);

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

  // Save selected patient when it changes
  useEffect(() => {
    if (currentPatientId) {
      storage.updatePreference("selectedPatientId", currentPatientId);
    }
  }, [currentPatientId]);

  // Keyboard shortcuts for toggling sidebars
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+[ to toggle left sidebar
      if (e.metaKey && e.key === '[') {
        e.preventDefault();
        setLeftOpen(prev => !prev);
      }
      // Cmd+] to toggle right sidebar
      if (e.metaKey && e.key === ']') {
        e.preventDefault();
        setRightOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

    // Set status to saving when notes change
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
  }, [clinicalNotes, currentPatient?.id, aiNotesData]);

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

    // Update notes immediately (status will be set to "saving" by useEffect)
    setClinicalNotes((prev) => ({
      ...prev,
      [currentPatient.id]: value,
    }));
  };

  const getCurrentNotes = () => {
    return clinicalNotes[currentPatient?.id] || "";
  };

  // Generate AI notes from clinical notes text
  const handleGenerateNotes = async () => {
    if (!currentPatient?.id) return;

    const currentNotes = getCurrentNotes();
    if (!currentNotes || currentNotes.trim().length === 0) {
      alert("Please enter clinical notes before generating structured notes.");
      return;
    }

    setIsAnalyzing(true);
    clearError();

    try {
      // Parse clinical notes into structured format
      const { medicalHistory, tcmAssessment } = parseClinicalNotes(currentNotes);

      // Validate that we have some content
      if (!medicalHistory.chiefComplaint && !medicalHistory.hpi) {
        alert("Please include at least a Chief Complaint (CC) or History of Present Illness (HPI) section in your notes.");
        setIsAnalyzing(false);
        return;
      }

      // Call AI analysis with parsed data
      const aiNotes = await analyzePatient(medicalHistory, tcmAssessment);

      if (aiNotes) {
        // Transform AI notes to sidebar format
        const transformedNotes = transformAINotesToSidebarFormat(aiNotes);

        // Update state and localStorage
        const updatedAINotes = {
          ...aiNotesData,
          [currentPatient.id]: transformedNotes,
        };
        setAINotesData(updatedAINotes);
        storage.savePatientAINotes(currentPatient.id, aiNotes);

        // Update patient status to completed
        storage.updatePatient(currentPatient.id, { status: 'completed' });
        setPatients(storage.getPatients());

        console.log("AI analysis completed successfully from clinical notes");
      }
    } catch (error) {
      console.error("AI analysis failed:", error);
      alert("Failed to generate AI notes. Please check your API key and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // AI refresh handler - regenerates notes from current clinical notes
  const handleRefresh = async () => {
    if (!currentPatient?.id) return;

    const currentNotes = getCurrentNotes();
    if (!currentNotes || currentNotes.trim().length === 0) {
      alert("Please enter clinical notes before refreshing AI analysis.");
      return;
    }

    // Use the same logic as handleGenerateNotes
    await handleGenerateNotes();
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
          onGenerateNotes={handleGenerateNotes}
          isGenerating={isAnalyzing}
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
          isLoading={isAnalyzing}
          data={currentPatientAINotes}
        />
      )}
    </div>
  );
}
