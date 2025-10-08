"use client";

import { PatientCard } from "@/components/left/PatientCard";
import { Patient } from "@/types";

/**
 * PatientList Component
 *
 * Groups and displays patients by their status categories.
 * Categories: Completed, Active, Waiting, Scheduled
 *
 * @param patients - Array of patient data
 * @param activePatientId - ID of currently selected patient
 * @param onPatientClick - Callback when a patient is clicked
 *
 * @example
 * <PatientList
 *   patients={patientData}
 *   activePatientId="2"
 *   onPatientClick={(patient) => handleSelect(patient)}
 * />
 */

interface PatientListProps {
  patients: Patient[];
  activePatientId?: string;
  onPatientClick?: (patient: Patient) => void;
}

export function PatientList({ patients, activePatientId, onPatientClick }: PatientListProps) {
  // Group patients by status
  const groupedPatients = {
    completed: patients.filter(p => p.status === 'completed'),
    active: patients.filter(p => p.status === 'active'),
    waiting: patients.filter(p => p.status === 'waiting'),
    scheduled: patients.filter(p => p.status === 'scheduled'),
  };

  const renderSection = (title: string, patientList: Patient[]) => {
    if (patientList.length === 0) return null;

    return (
      <div key={title} className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {title}
        </h3>
        <div className="space-y-2">
          {patientList.map(patient => (
            <PatientCard
              key={patient.id}
              patient={patient}
              isActive={patient.id === activePatientId}
              onClick={() => onPatientClick?.(patient)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderSection("Completed", groupedPatients.completed)}
      {renderSection("Active", groupedPatients.active)}
      {renderSection("Waiting", groupedPatients.waiting)}
      {renderSection("Scheduled", groupedPatients.scheduled)}
    </div>
  );
}
