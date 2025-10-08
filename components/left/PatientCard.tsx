"use client";

import { PatientAvatar } from "@/components/atomic/PatientAvatar";
import { StatusBadge } from "@/components/atomic/StatusBadge";
import { Patient } from "@/types";

/**
 * PatientCard Component
 *
 * Displays individual patient information in the left sidebar.
 * Shows patient avatar, initials, time, and status badge.
 *
 * @param patient - Patient data object
 * @param onClick - Optional click handler for patient selection
 *
 * @example
 * <PatientCard
 *   patient={{ initials: "DP", time: "8:45 AM", status: "completed" }}
 *   onClick={() => handlePatientSelect(patient)}
 * />
 */

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
  isActive?: boolean;
}

export function PatientCard({ patient, onClick, isActive = false }: PatientCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer
        transition-colors duration-200
        hover:bg-gray-50
        ${isActive ? 'bg-blue-50 border border-blue-200' : 'bg-white'}
      `}
    >
      <div className="flex items-center gap-3">
        <PatientAvatar
          initials={patient.initials}
          status={patient.status}
          size="sm"
        />
        <p className="text-sm text-gray-500">
          {patient.time}
        </p>
      </div>
      <StatusBadge
        variant={patient.status}
        label={patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
      />
    </div>
  );
}
