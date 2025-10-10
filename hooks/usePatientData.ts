/**
 * usePatientData Hook
 *
 * Manages patient CRUD operations with localStorage persistence
 */

import { useState, useEffect } from 'react';
import { Patient } from '@/types';
import * as storage from '@/lib/storage';

export function usePatientData(initialPatients: Patient[] = []) {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const saved = storage.getPatients();
    if (saved.length > 0) {
      setPatients(saved);
    } else if (initialPatients.length > 0) {
      setPatients(initialPatients);
      storage.savePatients(initialPatients);
    }
  }, [initialPatients]);

  const addPatient = (patient: Patient) => {
    const updated = [...patients, patient];
    setPatients(updated);
    storage.savePatients(updated);
  };

  const updatePatient = (id: string, updates: Partial<Patient>) => {
    const updated = patients.map(p =>
      p.id === id ? { ...p, ...updates } : p
    );
    setPatients(updated);
    storage.savePatients(updated);
  };

  const deletePatient = (id: string) => {
    const updated = patients.filter(p => p.id !== id);
    setPatients(updated);
    storage.savePatients(updated);
    storage.deletePatient(id);
  };

  return {
    patients,
    addPatient,
    updatePatient,
    deletePatient,
  };
}
