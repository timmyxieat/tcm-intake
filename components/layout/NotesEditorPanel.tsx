"use client";

import { TopNavigation } from "@/components/clinical-notes/TopNavigation";
import { ClinicalSectionLabel } from "@/components/clinical-notes/ClinicalSectionLabel";
import { TCMSection } from "@/components/clinical-notes/TCMSection";
import { ClinicalNotesEditor } from "@/components/clinical-notes/ClinicalNotesEditor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Patient } from "@/types";
import { useRef } from "react";

/**
 * MiddleColumn Component
 *
 * Two-column layout for patient intake:
 * - Left: Section navigation labels (CC, HPI, PMH, FH, SH, ES, TCM, Tongue, Pulse, Diagnosis, Points, Plan)
 * - Right: Clinical notes textarea
 *
 * @param patient - Current patient data
 * @param clinicalNotes - Clinical notes text
 * @param onGenerateNotes - Generate Structured Notes callback
 * @param onNotesChange - Notes change callback
 *
 * @example
 * <MiddleColumn
 *   patient={currentPatient}
 *   clinicalNotes={notes}
 *   onNotesChange={setNotes}
 *   onGenerateNotes={() => generateNotes()}
 * />
 */

interface MiddleColumnProps {
  patient: Patient;
  clinicalNotes?: string;
  onNotesChange?: (value: string) => void;
  saveStatus?: "saved" | "saving" | "unsaved";
  onGenerateNotes?: () => void;
  isGenerating?: boolean;
}

export function MiddleColumn({
  patient,
  clinicalNotes = "",
  onNotesChange,
  saveStatus = "saved",
  onGenerateNotes,
  isGenerating = false
}: MiddleColumnProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSectionClick = (label: string) => {
    const newText = clinicalNotes + (clinicalNotes ? "\n\n" : "") + label + "\n";
    onNotesChange?.(newText);
    textareaRef.current?.focus();
  };

  // Check if a section label appears on its own line in the notes
  const isSectionCompleted = (label: string): boolean => {
    if (!clinicalNotes) return false;

    // Split notes into lines and check if any line exactly matches the label
    const lines = clinicalNotes.split('\n');
    return lines.some(line => line.trim() === label);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Navigation */}
      <TopNavigation
        patient={patient}
        saveStatus={saveStatus}
        onGenerateNotes={onGenerateNotes}
        isGenerating={isGenerating}
      />

      {/* Two Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Section Navigation Labels */}
        <ScrollArea className="w-44 border-r bg-gray-50">
          <div className="py-2">
            <ClinicalSectionLabel label="CC" onClick={() => handleSectionClick("CC")} completed={isSectionCompleted("CC")} />
            <ClinicalSectionLabel label="HPI" onClick={() => handleSectionClick("HPI")} completed={isSectionCompleted("HPI")} />
            <ClinicalSectionLabel label="PMH" onClick={() => handleSectionClick("PMH")} completed={isSectionCompleted("PMH")} />
            <ClinicalSectionLabel label="FH" onClick={() => handleSectionClick("FH")} completed={isSectionCompleted("FH")} />
            <ClinicalSectionLabel label="SH" onClick={() => handleSectionClick("SH")} completed={isSectionCompleted("SH")} />
            <ClinicalSectionLabel label="ES" onClick={() => handleSectionClick("ES")} completed={isSectionCompleted("ES")} />

            {/* TCM Section with Categories */}
            <TCMSection onCategoryClick={handleSectionClick} isSectionCompleted={isSectionCompleted} />

            <ClinicalSectionLabel label="Tongue" onClick={() => handleSectionClick("Tongue")} completed={isSectionCompleted("Tongue")} />
            <ClinicalSectionLabel label="Pulse" onClick={() => handleSectionClick("Pulse")} completed={isSectionCompleted("Pulse")} />
            <ClinicalSectionLabel label="Diagnosis" onClick={() => handleSectionClick("Diagnosis")} completed={isSectionCompleted("Diagnosis")} />
            <ClinicalSectionLabel label="Points" onClick={() => handleSectionClick("Points")} completed={isSectionCompleted("Points")} />
            <ClinicalSectionLabel label="Plan" onClick={() => handleSectionClick("Plan")} completed={isSectionCompleted("Plan")} />
          </div>
        </ScrollArea>

        {/* Right Column: Clinical Notes Textarea */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col">
          <ClinicalNotesEditor
            ref={textareaRef}
            value={clinicalNotes}
            onChange={onNotesChange}
            placeholder="Enter clinical notes, treatment plan, and observations..."
          />
        </div>
      </div>
    </div>
  );
}
