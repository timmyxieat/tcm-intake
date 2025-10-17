/**
 * Patient-related types
 */

export interface Patient {
  id: string;
  initials: string;
  time: string;
  status: PatientStatus;
}

export type PatientStatus = 'scheduled' | 'active' | 'ready-to-copy' | 'completed' | 'waiting';
