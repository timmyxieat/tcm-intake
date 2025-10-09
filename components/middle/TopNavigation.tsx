"use client";

import { PatientAvatar } from "@/components/atomic/PatientAvatar";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types";
import moment from "moment";

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
  onGenerateNotes?: () => void;
}

export function TopNavigation({
  patient,
  onGenerateNotes
}: TopNavigationProps) {
  // Format time as "9:30 AM" (with space)
  const formattedTime = moment(patient.time).format("h:mm A");

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
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

      {/* Right: Generate Structured Notes Button */}
      <Button onClick={onGenerateNotes} className="bg-teal-600 hover:bg-teal-700 text-white">
        Generate Structured Notes
      </Button>
    </div>
  );
}
