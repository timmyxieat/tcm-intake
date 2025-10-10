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
