"use client";

import { PatientCard } from "@/components/patient/PatientCard";
import { Patient } from "@/types";

/**
 * PatientList Component
 *
 * Displays a list of patients without status grouping.
 * Each patient shows their status badge for visual identification.
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
  return (
    <div className="space-y-2">
      {patients.map(patient => (
        <PatientCard
          key={patient.id}
          patient={patient}
          isActive={patient.id === activePatientId}
          onClick={() => onPatientClick?.(patient)}
        />
      ))}
    </div>
  );
}
