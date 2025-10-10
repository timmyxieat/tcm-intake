import { AIStructuredNotes, TCMReviewItem, AcupunctureRegion } from "@/types";

/**
 * Transform AI response format to RightSidebar data format
 *
 * Converts the AIStructuredNotes type from the API to the format
 * expected by RightSidebar component
 */
export function transformAINotesToSidebarFormat(aiNotes: AIStructuredNotes) {
  // Transform TCM review array to object format
  const tcmReview: Record<string, string[]> = {};
  aiNotes.tcmReview.forEach((item: TCMReviewItem) => {
    tcmReview[item.category] = item.symptoms;
  });

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
    chiefComplaints: aiNotes.chiefComplaints.map((cc) => ({
      text: cc.text,
      icdCode: cc.icdCode,
      icdLabel: cc.icdLabel,  // Changed from icdDescription to icdLabel
    })),
    hpi: aiNotes.hpi,
    subjective: {
      pmh: aiNotes.subjective.pmh,
      fh: aiNotes.subjective.fh,
      sh: aiNotes.subjective.sh,
      es: aiNotes.subjective.es,
      stressLevel: aiNotes.subjective.stressLevel || "0/10",
    },
    tcmReview,
    tongue: {
      body: aiNotes.tongueExam.body,
      bodyHighlights: aiNotes.tongueExam.bodyHighlights || [],
      coating: aiNotes.tongueExam.coating || "",
      coatingHighlights: aiNotes.tongueExam.coatingHighlights || [],
      shape: aiNotes.tongueExam.shape || "",
    },
    pulse: {
      text: aiNotes.pulseExam.text,
      highlights: aiNotes.pulseExam.highlights || [],
    },
    diagnosis: {
      tcmDiagnosis: aiNotes.diagnosis.map((d) => d.tcm).join(", "),
      icdCodes: aiNotes.diagnosis.map((d) => ({
        code: d.icdCode,
        label: d.icdLabel,  // Changed from icdDescription to icdLabel
      })),
    },
    treatment: aiNotes.treatmentPrinciple,
    acupunctureTreatmentSide: aiNotes.acupunctureTreatmentSide,
    acupuncture,
  };
}
