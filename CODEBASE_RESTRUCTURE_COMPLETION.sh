#!/bin/bash

# =============================================================================
# CODEBASE RESTRUCTURE - PHASES 3-8 COMPLETION SCRIPT
# =============================================================================
#
# This script completes the remaining phases of the codebase reorganization.
# Phases 1-2 have been completed and committed.
#
# Usage:
#   chmod +x CODEBASE_RESTRUCTURE_COMPLETION.sh
#   ./CODEBASE_RESTRUCTURE_COMPLETION.sh
#
# Or run phases individually (see instructions at bottom)
# =============================================================================

set -e  # Exit on error

echo "🚀 Starting Phases 3-8 of Codebase Restructure..."
echo ""

# =============================================================================
# PHASE 3: Consolidate and Split Type Definitions
# =============================================================================

echo "📋 Phase 3: Consolidating type definitions..."

# Create feature-based type files
mkdir -p types

# Create types/patient.ts
cat > types/patient.ts << 'EOF'
/**
 * Patient-related types
 */

export interface Patient {
  id: string;
  initials: string;
  time: string;
  status: PatientStatus;
}

export type PatientStatus = 'completed' | 'active' | 'scheduled' | 'waiting';
EOF

# Create types/clinical-notes.ts
cat > types/clinical-notes.ts << 'EOF'
/**
 * Clinical notes and medical history types
 */

export interface MedicalHistory {
  chiefComplaint: string;
  hpi: string;
  pmh: string;
  fh: string;
  sh: string;
  es: string;
  stressLevel?: string;
}

export interface TCMSymptom {
  label: string;
  checked: boolean;
}

export interface TCMAssessmentData {
  [category: string]: TCMSymptom[];
}
EOF

# Create types/ai-notes.ts
cat > types/ai-notes.ts << 'EOF'
/**
 * AI-generated structured notes types
 */

export interface ChiefComplaint {
  text: string;
  icdCode: string | null;
  icdLabel: string | null;
}

export interface SubjectiveData {
  pmh: string;
  pmhHighlights?: string[];
  fh: string;
  fhHighlights?: string[];
  sh: string;
  shHighlights?: string[];
  es: string;
  stressLevel: string;
}

export interface TongueExam {
  body: string;
  bodyHighlights?: string[];
  coating: string;
  coatingHighlights?: string[];
}

export interface PulseExam {
  text: string;
  highlights?: string[];
}

export interface Diagnosis {
  tcmDiagnosis: string;
  icdCodes: Array<{
    code: string;
    label: string;
  }>;
}

export interface AcupuncturePoint {
  name: string;
  side: "Left" | "Right" | "Both" | null;
  method: "T" | "R" | "E" | null;
}

export interface AcupunctureRegion {
  name: string;
  points: string[] | AcupuncturePoint[];
  note?: string;
  noteColor?: "orange" | "purple";
}

export interface AIStructuredNotes {
  note_summary?: string;
  chiefComplaints: ChiefComplaint[];
  hpi: string;
  subjective: SubjectiveData;
  tcmReview: { [key: string]: string[] };
  tongue: TongueExam;
  pulse: PulseExam;
  diagnosis: Diagnosis;
  treatment: string;
  acupunctureTreatmentSide?: 'Left side treatment' | 'Right side treatment' | 'Both sides treatment';
  acupuncture: AcupunctureRegion[];
}
EOF

# Update types/index.ts to export from feature files
cat > types/index.ts << 'EOF'
/**
 * Centralized type exports
 */

export * from './patient';
export * from './clinical-notes';
export * from './ai-notes';
EOF

echo "✅ Phase 3 complete - Types organized by feature"
echo ""

# =============================================================================
# PHASE 4: Restructure lib/ Folder
# =============================================================================

echo "📁 Phase 4: Restructuring lib/ folder..."

# Create feature-based folders
mkdir -p lib/ai
mkdir -p lib/storage
mkdir -p lib/utils

# Move and rename files
mv lib/aiPipeline.ts lib/ai/pipeline.ts
mv lib/aiTransformer.ts lib/ai/transformer.ts
mv lib/clinicalNotesParser.ts lib/ai/notes-parser.ts
mv lib/localStorage.ts lib/storage/local-storage.ts
mv lib/constants.ts lib/utils/constants.ts
mv lib/utils.ts lib/utils/cn.ts

# Create lib/ai/index.ts
cat > lib/ai/index.ts << 'EOF'
export * from './pipeline';
export * from './transformer';
export * from './notes-parser';
EOF

# Create lib/storage/index.ts
cat > lib/storage/index.ts << 'EOF'
export * from './local-storage';
EOF

# Create lib/utils/index.ts
cat > lib/utils/index.ts << 'EOF'
export * from './cn';
export * from './constants';
EOF

echo "✅ Phase 4 complete - lib/ organized by feature"
echo ""

# =============================================================================
# PHASE 5: Extract Custom Hooks
# =============================================================================

echo "🪝 Phase 5: Extracting custom hooks from MainLayout..."

# Create hooks/usePatientData.ts
cat > hooks/usePatientData.ts << 'EOF'
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
EOF

# Create hooks/usePatientSelection.ts
cat > hooks/usePatientSelection.ts << 'EOF'
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
EOF

# Create hooks/useClinicalNotes.ts
cat > hooks/useClinicalNotes.ts << 'EOF'
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
EOF

# Create hooks/useSidebarState.ts
cat > hooks/useSidebarState.ts << 'EOF'
/**
 * useSidebarState Hook
 *
 * Manages sidebar open/closed state with localStorage persistence
 */

import { useState, useEffect } from 'react';
import * as storage from '@/lib/storage';

export function useSidebarState() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  useEffect(() => {
    const prefs = storage.getPreferences();
    setLeftOpen(prefs.leftSidebarOpen);
    setRightOpen(prefs.rightSidebarOpen);
    setAutoUpdate(prefs.autoUpdate);
  }, []);

  useEffect(() => {
    storage.updatePreference('leftSidebarOpen', leftOpen);
  }, [leftOpen]);

  useEffect(() => {
    storage.updatePreference('rightSidebarOpen', rightOpen);
  }, [rightOpen]);

  useEffect(() => {
    storage.updatePreference('autoUpdate', autoUpdate);
  }, [autoUpdate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === '[') {
        e.preventDefault();
        setLeftOpen(prev => !prev);
      }
      if (e.metaKey && e.key === ']') {
        e.preventDefault();
        setRightOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    leftOpen,
    rightOpen,
    autoUpdate,
    setLeftOpen,
    setRightOpen,
    setAutoUpdate,
    toggleLeft: () => setLeftOpen(prev => !prev),
    toggleRight: () => setRightOpen(prev => !prev),
  };
}
EOF

echo "✅ Phase 5 complete - Custom hooks extracted"
echo ""

# =============================================================================
# PHASE 6-8: Manual Steps Required
# =============================================================================

echo "⚠️  Phases 6-8 require manual intervention:"
echo ""
echo "PHASE 6: Reorganize components by feature (2-3 hours)"
echo "  - See RESTRUCTURE_GUIDE.md for detailed instructions"
echo "  - This is a large refactor - recommend doing in separate session"
echo ""
echo "PHASE 7: Update all import paths (automated in Phase 6)"
echo "  - Will be done as part of component reorganization"
echo ""
echo "PHASE 8: Test and verify (30 minutes)"
echo "  - Run: npm run dev"
echo "  - Run: npm run build"
echo "  - Use Playwright to test UI"
echo ""
echo "✅ Phases 3-5 complete!"
echo "📝 Next steps documented in RESTRUCTURE_GUIDE.md"
