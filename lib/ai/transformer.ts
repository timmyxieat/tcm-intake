import { AIStructuredNotes, AcupunctureRegion } from "@/types";

/**
 * Transform AI response format to RightSidebar data format
 *
 * Converts the AIStructuredNotes type from the API to the format
 * expected by RightSidebar component
 */
export function transformAINotesToSidebarFormat(aiNotes: AIStructuredNotes) {
  // TCM review is already in object format
  const tcmReview = aiNotes.tcmReview;

  // Transform acupuncture regions to sidebar format
  const acupuncture = aiNotes.acupuncture.map((region: AcupunctureRegion) => {
    // Points can be strings or objects now - pass them through as-is
    // since AcupunctureCard component handles both formats
    const points = region.points;

    return {
      name: region.region,  // Use region.region which matches the type definition
      points,
    };
  });

  return {
    note_summary: aiNotes.note_summary,
    chiefComplaints: aiNotes.chiefComplaints.map((cc) => ({
      text: cc.text,
      icdCode: cc.icdCode,
      icdLabel: cc.icdLabel,
    })),
    hpi: aiNotes.hpi,
    subjective: {
      pmh: aiNotes.subjective.pmh,
      fh: aiNotes.subjective.fh,
      sh: aiNotes.subjective.sh,
      es: aiNotes.subjective.es,
    },
    tcmReview,
    tongue: {
      body: aiNotes.tongue.body,
      coating: aiNotes.tongue.coating,
    },
    pulse: {
      text: aiNotes.pulse.text,
    },
    diagnosis: {
      tcmDiagnosis: aiNotes.diagnosis.tcmDiagnosis,
      icdCodes: aiNotes.diagnosis.icdCodes,
    },
    treatment: aiNotes.treatment,
    acupunctureTreatmentSide: aiNotes.acupunctureTreatmentSide,
    acupuncture,
  };
}
