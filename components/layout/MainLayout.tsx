"use client";

import { useState } from "react";
import { LeftSidebar } from "@/components/left/LeftSidebar";
import { MiddleColumn } from "@/components/middle/MiddleColumn";
import { RightSidebar } from "@/components/right/RightSidebar";
import { Patient } from "@/types";

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
  patients,
  patientsData,
  initialPatientId,
}: MainLayoutProps) {
  // Find initial patient or use first patient
  const initialPatient =
    patients.find((p) => p.id === initialPatientId) || patients[0];

  // State management
  const [currentPatient, setCurrentPatient] = useState<Patient>(initialPatient);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [aiEnabled, setAIEnabled] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [clinicalNotes, setClinicalNotes] = useState<Record<string, string>>(
    {}
  );

  // Get current patient data
  const currentPatientData = patientsData[currentPatient.id] || {
    aiNotes: {
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
    },
  };

  // Patient navigation handlers
  const handlePatientClick = (patient: Patient) => {
    setCurrentPatient(patient);
  };

  const handlePrevious = () => {
    const currentIndex = patients.findIndex((p) => p.id === currentPatient.id);
    if (currentIndex > 0) {
      setCurrentPatient(patients[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = patients.findIndex((p) => p.id === currentPatient.id);
    if (currentIndex < patients.length - 1) {
      setCurrentPatient(patients[currentIndex + 1]);
    }
  };

  // Notes management
  const handleNotesChange = (value: string) => {
    setClinicalNotes((prev) => ({
      ...prev,
      [currentPatient.id]: value,
    }));
  };

  const getCurrentNotes = () => {
    return (
      clinicalNotes[currentPatient.id] ||
      currentPatientData.clinicalNotes ||
      ""
    );
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
        patients={patients}
        activePatientId={currentPatient.id}
        onPatientClick={handlePatientClick}
        isOpen={leftOpen}
        onToggle={() => setLeftOpen(!leftOpen)}
      />

      {/* Middle Column: Clinical Notes */}
      <div className="flex-1">
        <MiddleColumn
          patient={currentPatient}
          clinicalNotes={getCurrentNotes()}
          onPrevious={handlePrevious}
          onNext={handleNext}
          aiEnabled={aiEnabled}
          onAIToggle={setAIEnabled}
          onNotesChange={handleNotesChange}
        />
      </div>

      {/* Right Sidebar: AI Structured Notes */}
      {aiEnabled && rightOpen && (
        <RightSidebar
          isOpen={rightOpen}
          onToggle={() => setRightOpen(!rightOpen)}
          autoUpdate={autoUpdate}
          onAutoUpdateChange={setAutoUpdate}
          onRefresh={handleRefresh}
          data={currentPatientData.aiNotes}
        />
      )}
    </div>
  );
}
