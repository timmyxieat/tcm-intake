"use client";

import { TopNavigation } from "@/components/middle/TopNavigation";
import { SectionLabel } from "@/components/middle/SectionLabel";
import { TCMSection } from "@/components/middle/TCMSection";
import { NotesTextarea } from "@/components/middle/NotesTextarea";
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
 * @param onPrevious - Previous patient callback
 * @param onNext - Next patient callback
 * @param aiEnabled - AI toggle state
 * @param onAIToggle - AI toggle callback
 * @param onNotesChange - Notes change callback
 *
 * @example
 * <MiddleColumn
 *   patient={currentPatient}
 *   clinicalNotes={notes}
 *   onNotesChange={setNotes}
 * />
 */

interface MiddleColumnProps {
  patient: Patient;
  clinicalNotes?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  aiEnabled?: boolean;
  onAIToggle?: (enabled: boolean) => void;
  onNotesChange?: (value: string) => void;
}

export function MiddleColumn({
  patient,
  clinicalNotes = "",
  onPrevious,
  onNext,
  aiEnabled = true,
  onAIToggle,
  onNotesChange
}: MiddleColumnProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSectionClick = (label: string) => {
    const newText = clinicalNotes + (clinicalNotes ? "\n\n" : "") + label + "\n";
    onNotesChange?.(newText);
    textareaRef.current?.focus();
  };

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

      {/* Two Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Section Navigation Labels */}
        <ScrollArea className="w-44 border-r bg-gray-50">
          <div className="py-2">
            <SectionLabel label="CC" onClick={() => handleSectionClick("CC")} />
            <SectionLabel label="HPI" onClick={() => handleSectionClick("HPI")} />
            <SectionLabel label="PMH" onClick={() => handleSectionClick("PMH")} />
            <SectionLabel label="FH" onClick={() => handleSectionClick("FH")} />
            <SectionLabel label="SH" onClick={() => handleSectionClick("SH")} />
            <SectionLabel label="ES" onClick={() => handleSectionClick("ES")} />

            {/* TCM Section with Categories */}
            <TCMSection onCategoryClick={handleSectionClick} />

            <SectionLabel label="Tongue" onClick={() => handleSectionClick("Tongue")} />
            <SectionLabel label="Pulse" onClick={() => handleSectionClick("Pulse")} />
            <SectionLabel label="Diagnosis" onClick={() => handleSectionClick("Diagnosis")} />
            <SectionLabel label="Points" onClick={() => handleSectionClick("Points")} />
            <SectionLabel label="Plan" onClick={() => handleSectionClick("Plan")} />
          </div>
        </ScrollArea>

        {/* Right Column: Clinical Notes Textarea */}
        <div className="flex-1 p-6">
          <NotesTextarea
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
