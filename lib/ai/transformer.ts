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
      name: region.name,  // Changed from region.region to region.name
      points,
      note: region.note,
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
      pmhHighlights: aiNotes.subjective.pmhHighlights,
      fh: aiNotes.subjective.fh,
      fhHighlights: aiNotes.subjective.fhHighlights,
      sh: aiNotes.subjective.sh,
      shHighlights: aiNotes.subjective.shHighlights,
      es: aiNotes.subjective.es,
      stressLevel: aiNotes.subjective.stressLevel || "0/10",
    },
    tcmReview,
    tongue: {
      body: aiNotes.tongue.body,
      bodyHighlights: aiNotes.tongue.bodyHighlights || [],
      coating: aiNotes.tongue.coating || "",
      coatingHighlights: aiNotes.tongue.coatingHighlights || [],
    },
    pulse: {
      text: aiNotes.pulse.text,
      highlights: aiNotes.pulse.highlights || [],
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
