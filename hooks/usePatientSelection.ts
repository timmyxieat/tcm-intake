/**
 * usePatientSelection Hook
 *
 * Manages current patient selection and navigation
 */

import { useState, useEffect } from 'react';
import { Patient } from '@/types';
import * as storage from '@/lib/storage';

export function usePatientSelection(
  patients: Patient[],
  initialPatientId?: string
) {
  const [currentPatientId, setCurrentPatientId] = useState<string>('');

  useEffect(() => {
    const prefs = storage.getPreferences();

    if (prefs.selectedPatientId && patients.find(p => p.id === prefs.selectedPatientId)) {
      setCurrentPatientId(prefs.selectedPatientId);
    } else if (initialPatientId && patients.find(p => p.id === initialPatientId)) {
      setCurrentPatientId(initialPatientId);
    } else if (patients.length > 0) {
      setCurrentPatientId(patients[0].id);
    }
  }, [patients, initialPatientId]);

  useEffect(() => {
    if (currentPatientId) {
      storage.updatePreference('selectedPatientId', currentPatientId);
    }
  }, [currentPatientId]);

  const currentPatient = patients.find(p => p.id === currentPatientId) || patients[0] || null;

  const selectPatient = (patient: Patient) => {
    setCurrentPatientId(patient.id);
  };

  const nextPatient = () => {
    const currentIndex = patients.findIndex(p => p.id === currentPatientId);
    if (currentIndex < patients.length - 1) {
      setCurrentPatientId(patients[currentIndex + 1].id);
    }
  };

  const previousPatient = () => {
    const currentIndex = patients.findIndex(p => p.id === currentPatientId);
    if (currentIndex > 0) {
      setCurrentPatientId(patients[currentIndex - 1].id);
    }
  };

  return {
    currentPatient,
    currentPatientId,
    selectPatient,
    nextPatient,
    previousPatient,
  };
}
