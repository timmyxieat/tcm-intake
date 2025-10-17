"use client";

import { useState } from "react";
import { PatientCard } from "@/components/patient/PatientCard";
import { Patient } from "@/types";

/**
 * PatientList Component
 *
 * Displays patients split into Active and Completed sections.
 * Active section shows scheduled and active patients.
 * Completed section is collapsible and shows last 10 completed patients.
 *
 * @param patients - Array of patient data
 * @param activePatientId - ID of currently selected patient
 * @param onPatientClick - Callback when a patient is clicked
 * @param onPatientDelete - Callback when a patient is deleted
 *
 * @example
 * <PatientList
 *   patients={patientData}
 *   activePatientId="2"
 *   onPatientClick={(patient) => handleSelect(patient)}
 *   onPatientDelete={(id) => handleDelete(id)}
 * />
 */

interface PatientListProps {
  patients: Patient[];
  activePatientId?: string;
  onPatientClick?: (patient: Patient) => void;
  onPatientDelete?: (patientId: string) => void;
}

export function PatientList({ patients, activePatientId, onPatientClick, onPatientDelete }: PatientListProps) {
  const [scheduledExpanded, setScheduledExpanded] = useState(true);
  const [readyExpanded, setReadyExpanded] = useState(true);
  const [completedExpanded, setCompletedExpanded] = useState(false);

  // Split patients into sections
  const scheduledPatients = patients.filter(p => p.status === 'scheduled');
  const activePatients = patients.filter(p => p.status === 'active');
  const readyPatients = patients.filter(p => p.status === 'ready-to-copy');
  const completedPatients = patients
    .filter(p => p.status === 'completed')
    .slice(0, 10); // Limit to last 10

  return (
    <div className="space-y-4">
      {/* Scheduled Section */}
      {scheduledPatients.length > 0 && (
        <div className="space-y-2">
          <button
            onClick={() => setScheduledExpanded(!scheduledExpanded)}
            className="w-full flex items-center gap-2 px-1 hover:bg-gray-50 rounded transition-colors"
          >
            <h5 className="text-xs font-semibold text-purple-700 uppercase tracking-wide">
              Scheduled
            </h5>
            <span className="text-xs text-purple-600">({scheduledPatients.length})</span>
            <svg
              className={`w-3 h-3 text-purple-600 transition-transform ${scheduledExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {scheduledExpanded && (
            <div className="space-y-2">
              {scheduledPatients.map(patient => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  isActive={patient.id === activePatientId}
                  onClick={() => onPatientClick?.(patient)}
                  onDelete={onPatientDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Active Section */}
      {activePatients.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <h5 className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Active
            </h5>
            <span className="text-xs text-blue-600">({activePatients.length})</span>
          </div>
          <div className="space-y-2">
            {activePatients.map(patient => (
              <PatientCard
                key={patient.id}
                patient={patient}
                isActive={patient.id === activePatientId}
                onClick={() => onPatientClick?.(patient)}
                onDelete={onPatientDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Ready to Copy Section */}
      {readyPatients.length > 0 && (
        <div className="space-y-2">
          <button
            onClick={() => setReadyExpanded(!readyExpanded)}
            className="w-full flex items-center gap-2 px-1 hover:bg-gray-50 rounded transition-colors"
          >
            <h5 className="text-xs font-semibold text-green-700 uppercase tracking-wide">
              Ready to Copy
            </h5>
            <span className="text-xs text-green-600">({readyPatients.length})</span>
            <svg
              className={`w-3 h-3 text-green-600 transition-transform ${readyExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {readyExpanded && (
            <div className="space-y-2">
              {readyPatients.map(patient => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  isActive={patient.id === activePatientId}
                  onClick={() => onPatientClick?.(patient)}
                  onDelete={onPatientDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Completed Section */}
      {completedPatients.length > 0 && (
        <div className="space-y-2">
          <button
            onClick={() => setCompletedExpanded(!completedExpanded)}
            className="w-full flex items-center gap-2 px-1 hover:bg-gray-50 rounded transition-colors"
          >
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Completed
            </h5>
            <span className="text-xs text-gray-400">({completedPatients.length})</span>
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform ${completedExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {completedExpanded && (
            <div className="space-y-2">
              {completedPatients.map(patient => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  isActive={patient.id === activePatientId}
                  onClick={() => onPatientClick?.(patient)}
                  onDelete={onPatientDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
