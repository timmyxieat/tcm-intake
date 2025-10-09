"use client";

import { PatientAvatar } from "@/components/atomic/PatientAvatar";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types";
import moment from "moment";
import { HEADER_HEIGHT } from "@/lib/constants";

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
  onSaveNotes?: () => void;
  hasUnsavedChanges?: boolean;
}

export function TopNavigation({
  patient,
  onSaveNotes,
  hasUnsavedChanges = false
}: TopNavigationProps) {
  // Format time as "9:30 AM" (with space)
  const formattedTime = moment(patient.time).format("h:mm A");

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

      {/* Right: Save Button */}
      <Button
        onClick={onSaveNotes}
        size="sm"
        className="bg-teal-600 hover:bg-teal-700 text-white h-8 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasUnsavedChanges}
      >
        Save Notes
      </Button>
    </div>
  );
}
