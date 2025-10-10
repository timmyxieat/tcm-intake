"use client";

import { PatientAvatar } from "@/components/atomic/PatientAvatar";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types";
import moment from "moment";
import { HEADER_HEIGHT } from "@/lib/utils/constants";
import { Sparkles } from "lucide-react";

/**
 * TopNavigation Component
 *
 * Top navigation bar for the middle column showing:
 * - Current patient initials and time
 * - Generate Structured Notes button
 *
 * @param patient - Current patient data
 * @param onGenerateNotes - Callback for Generate Structured Notes button
 *
 * @example
 * <TopNavigation
 *   patient={currentPatient}
 *   onGenerateNotes={() => generateStructuredNotes()}
 * />
 */

interface TopNavigationProps {
  patient: Patient;
  saveStatus?: "saved" | "saving" | "unsaved";
  onGenerateNotes?: () => void;
  isGenerating?: boolean;
}

export function TopNavigation({
  patient,
  saveStatus = "saved",
  onGenerateNotes,
  isGenerating = false
}: TopNavigationProps) {
  // Format time as "9:30 AM" (with space)
  const formattedTime = moment(patient.time).format("h:mm A");

  // Save status text and styling
  const getSaveStatusDisplay = () => {
    switch (saveStatus) {
      case "saving":
        return { text: "Saving...", className: "text-gray-500" };
      case "unsaved":
        return { text: "Not saved", className: "text-orange-500" };
      case "saved":
        return { text: "Saved", className: "text-teal-600" };
    }
  };

  const statusDisplay = getSaveStatusDisplay();

  return (
    <div className={`flex items-center justify-between px-4 bg-white border-b ${HEADER_HEIGHT}`}>
      {/* Left: Patient Info */}
      <div className="flex items-center gap-2">
        <PatientAvatar
          initials={patient.initials}
          status={patient.status}
          size="sm"
        />
        <span className="text-sm text-gray-500">
          {formattedTime}
        </span>
      </div>

      {/* Right: Save Status & Generate Button */}
      <div className="flex items-center gap-4">
        {/* Save Status Indicator */}
        <div className="flex items-center gap-2">
          {saveStatus === "saving" && (
            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          <span className={`text-sm font-medium ${statusDisplay.className}`}>
            {statusDisplay.text}
          </span>
        </div>

        {/* Generate Structured Notes Button */}
        <Button
          onClick={onGenerateNotes}
          disabled={isGenerating}
          size="sm"
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Sparkles className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Generate Structured Notes'}
        </Button>
      </div>
    </div>
  );
}
