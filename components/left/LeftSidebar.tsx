"use client";

import { CollapsibleSidebar } from "@/components/layout/CollapsibleSidebar";
import { PatientList } from "@/components/left/PatientList";
import { PatientAvatar } from "@/components/atomic/PatientAvatar";
import { Patient } from "@/types";
import { useState } from "react";

/**
 * LeftSidebar Component
 *
 * Complete left sidebar with collapsible patient list.
 * When collapsed, shows vertical patient initials.
 * When expanded, shows grouped patient list with "Today's Patients" header.
 *
 * @param patients - Array of patient data
 * @param activePatientId - ID of currently selected patient
 * @param onPatientClick - Callback when a patient is clicked
 * @param isOpen - Whether sidebar is expanded
 * @param onToggle - Callback to toggle sidebar state
 *
 * @example
 * <LeftSidebar
 *   patients={patientData}
 *   activePatientId="2"
 *   onPatientClick={handleSelect}
 *   isOpen={true}
 *   onToggle={() => setLeftOpen(!leftOpen)}
 * />
 */

interface LeftSidebarProps {
  patients: Patient[];
  activePatientId?: string;
  onPatientClick?: (patient: Patient) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function LeftSidebar({
  patients,
  activePatientId,
  onPatientClick,
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: LeftSidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true);

  // Use controlled props if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const onToggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  // Format today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <CollapsibleSidebar
      position="left"
      isOpen={isOpen}
      onToggle={onToggle}
      collapsedContent={
        <div className="flex flex-col gap-3 items-center pt-4">
          {patients.slice(0, 4).map(patient => (
            <div
              key={patient.id}
              onClick={() => onPatientClick?.(patient)}
              className="cursor-pointer flex flex-col items-center gap-1"
            >
              <PatientAvatar
                initials={patient.initials}
                status={patient.status}
                size="sm"
                isActive={patient.id === activePatientId}
              />
              <p className="text-xs text-gray-600 text-center whitespace-nowrap">
                {patient.time}
              </p>
            </div>
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-sm">Today's Patients</h4>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
        <PatientList
          patients={patients}
          activePatientId={activePatientId}
          onPatientClick={onPatientClick}
        />
      </div>
    </CollapsibleSidebar>
  );
}
