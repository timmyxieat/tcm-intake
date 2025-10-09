import { useState } from 'react';
import { MedicalHistory, TCMAssessmentData, AIStructuredNotes } from '@/types';

interface UseAIAnalysisResult {
  analyzePatient: (medicalHistory: MedicalHistory, tcmAssessment: TCMAssessmentData) => Promise<AIStructuredNotes | null>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useAIAnalysis(): UseAIAnalysisResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzePatient = async (
    medicalHistory: MedicalHistory,
    tcmAssessment: TCMAssessmentData
  ): Promise<AIStructuredNotes | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          medicalHistory,
          tcmAssessment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze patient data');
      }

      const data = await response.json();
      return data.aiNotes;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('AI Analysis Error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    analyzePatient,
    isLoading,
    error,
    clearError,
  };
}
