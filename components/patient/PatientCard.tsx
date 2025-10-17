"use client";

import { PatientAvatar } from "@/components/shared/PatientAvatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Patient } from "@/types";
import moment from "moment";

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
  onDelete?: (patientId: string) => void;
  isActive?: boolean;
}

export function PatientCard({ patient, onClick, onDelete, isActive = false }: PatientCardProps) {
  // Format time as "9:30 AM" (with space) for expanded view
  const formattedTime = moment(patient.time).format("h:mm A");

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onClick
    if (window.confirm(`Delete patient ${patient.initials}?`)) {
      onDelete?.(patient.id);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer
        transition-colors duration-200
        hover:bg-gray-50
        group
        ${isActive ? 'bg-blue-50 border border-blue-200' : 'bg-white'}
        ${patient.status === 'completed' ? 'opacity-60' : ''}
      `}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex-shrink-0">
          <PatientAvatar
            initials={patient.initials}
            status={patient.status}
            size="sm"
          />
        </div>
        <p className="text-sm text-gray-500 whitespace-nowrap">
          {formattedTime}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {onDelete && (
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-600"
            aria-label={`Delete patient ${patient.initials}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
