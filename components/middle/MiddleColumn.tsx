"use client";

import { TopNavigation } from "@/components/middle/TopNavigation";
import { MedicalSection } from "@/components/middle/MedicalSection";
import { TCMAssessment } from "@/components/middle/TCMAssessment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Patient } from "@/types";

/**
 * MiddleColumn Component
 *
 * Complete middle column integrating:
 * - TopNavigation
 * - Medical sections (CC, HPI, PMH, FH, SH, ES)
 * - TCMAssessment
 *
 * @param patient - Current patient data
 * @param medicalData - Medical history sections
 * @param tcmSymptoms - TCM assessment data
 * @param onPrevious - Previous patient callback
 * @param onNext - Next patient callback
 * @param aiEnabled - AI toggle state
 * @param onAIToggle - AI toggle callback
 *
 * @example
 * <MiddleColumn
 *   patient={currentPatient}
 *   medicalData={medicalHistory}
 *   tcmSymptoms={tcmData}
 *   onPrevious={() => goToPrev()}
 *   onNext={() => goToNext()}
 *   aiEnabled={true}
 *   onAIToggle={setAI}
 * />
 */

interface MedicalData {
  cc: string;
  hpi: string;
  pmh: string;
  fh: string;
  sh: string;
  es: string;
}

interface TCMSymptom {
  label: string;
  checked: boolean;
}

interface MiddleColumnProps {
  patient: Patient;
  medicalData: MedicalData;
  tcmSymptoms: Record<string, TCMSymptom[]>;
  onPrevious?: () => void;
  onNext?: () => void;
  aiEnabled?: boolean;
  onAIToggle?: (enabled: boolean) => void;
  onMedicalChange?: (section: string, value: string) => void;
  onSymptomChange?: (category: string, label: string, checked: boolean) => void;
}

export function MiddleColumn({
  patient,
  medicalData,
  tcmSymptoms,
  onPrevious,
  onNext,
  aiEnabled = true,
  onAIToggle,
  onMedicalChange,
  onSymptomChange
}: MiddleColumnProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Navigation */}
      <TopNavigation
        patient={patient}
        onPrevious={onPrevious}
        onNext={onNext}
        aiEnabled={aiEnabled}
        onAIToggle={onAIToggle}
      />

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="px-6">
          {/* Medical Sections */}
          <MedicalSection
            title="CC"
            content={medicalData.cc}
            editable={true}
            onChange={(value) => onMedicalChange?.("cc", value)}
          />
          <MedicalSection
            title="HPI"
            content={medicalData.hpi}
            editable={true}
            onChange={(value) => onMedicalChange?.("hpi", value)}
          />
          <MedicalSection
            title="PMH"
            content={medicalData.pmh}
            editable={true}
            onChange={(value) => onMedicalChange?.("pmh", value)}
          />
          <MedicalSection
            title="FH"
            content={medicalData.fh}
            editable={true}
            onChange={(value) => onMedicalChange?.("fh", value)}
          />
          <MedicalSection
            title="SH"
            content={medicalData.sh}
            editable={true}
            onChange={(value) => onMedicalChange?.("sh", value)}
          />
          <MedicalSection
            title="ES"
            content={medicalData.es}
            editable={true}
            onChange={(value) => onMedicalChange?.("es", value)}
          />

          {/* TCM Assessment */}
          <TCMAssessment
            symptoms={tcmSymptoms}
            onSymptomChange={onSymptomChange}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
