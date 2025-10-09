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
  patients,
  patientsData,
  initialPatientId,
}: MainLayoutProps) {
  // Find initial patient or use first patient
  const initialPatient =
    patients.find((p) => p.id === initialPatientId) || patients[0];

  // State management
  const [currentPatientId, setCurrentPatientId] = useState<string>(initialPatient.id);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [aiEnabled, setAIEnabled] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [clinicalNotes, setClinicalNotes] = useState<Record<string, string>>(
    {}
  );

  // Calculate status for each patient dynamically
  const getPatientsWithStatus = () => {
    return patients.map((patient) => {
      const patientData = patientsData[patient.id];
      const hasNotes = clinicalNotes[patient.id]?.trim().length > 0 ||
                       patientData?.clinicalNotes?.trim().length > 0;
      const hasAISummary = patientData?.aiNotes?.note_summary?.trim().length > 0;
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
  const currentPatient = patientsWithStatus.find(p => p.id === currentPatientId) || patientsWithStatus[0];

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
        patients={patientsWithStatus}
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
      {aiEnabled && (
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
