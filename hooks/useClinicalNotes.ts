/**
 * useClinicalNotes Hook
 *
 * Manages clinical notes with auto-save
 */

import { useState, useEffect } from 'react';
import * as storage from '@/lib/storage';

const AUTO_SAVE_DELAY = 2000; // 2 seconds

export function useClinicalNotes(patientId: string | undefined) {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  useEffect(() => {
    const allNotes = storage.getClinicalNotes();
    setNotes(allNotes);
  }, []);

  useEffect(() => {
    if (!patientId) return;

    setSaveStatus('saving');

    const timeout = setTimeout(() => {
      const patientNotes = notes[patientId] || '';
      storage.savePatientClinicalNotes(patientId, patientNotes);
      setSaveStatus('saved');
    }, AUTO_SAVE_DELAY);

    return () => clearTimeout(timeout);
  }, [notes, patientId]);

  const updateNotes = (patientId: string, content: string) => {
    setNotes(prev => ({ ...prev, [patientId]: content }));
  };

  const getCurrentNotes = (patientId: string) => {
    return notes[patientId] || '';
  };

  return {
    notes,
    updateNotes,
    getCurrentNotes,
    saveStatus,
  };
}
