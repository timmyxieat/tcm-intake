"use client";

import { PatientAvatar } from "@/components/atomic/PatientAvatar";
import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import { Patient } from "@/types";
import moment from "moment";

/**
 * TopNavigation Component
 *
 * Top navigation bar for the middle column showing:
 * - Previous/Next patient navigation
 * - Current patient initials and time
 * - Auto-saving status with timestamp
 * - AI toggle switch
 *
 * @param patient - Current patient data
 * @param onPrevious - Callback for previous patient button
 * @param onNext - Callback for next patient button
 * @param aiEnabled - Whether AI is enabled
 * @param onAIToggle - Callback when AI toggle is changed
 * @param lastSaved - Last saved timestamp
 *
 * @example
 * <TopNavigation
 *   patient={currentPatient}
 *   onPrevious={() => goToPrevPatient()}
 *   onNext={() => goToNextPatient()}
 *   aiEnabled={true}
 *   onAIToggle={(enabled) => setAIEnabled(enabled)}
 *   lastSaved="15:23"
 * />
 */

interface TopNavigationProps {
  patient: Patient;
  onPrevious?: () => void;
  onNext?: () => void;
  aiEnabled?: boolean;
  onAIToggle?: (enabled: boolean) => void;
  lastSaved?: string;
}

export function TopNavigation({
  patient,
  onPrevious,
  onNext,
  aiEnabled = true,
  onAIToggle,
  lastSaved = "15:23"
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

      {/* Right: Auto-saving Status and AI Toggle */}
      <div className="flex items-center gap-6">
        {/* Auto-saving Status */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Check className="h-4 w-4 text-green-600" />
          <span>Auto-saving</span>
          <span className="text-gray-400">⏰ {lastSaved}</span>
        </div>

        {/* AI Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">AI</span>
          <Switch
            checked={aiEnabled}
            onCheckedChange={onAIToggle}
          />
        </div>
      </div>
    </div>
  );
}
