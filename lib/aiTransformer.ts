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
    const points = region.points.map((point) => {
      let pointCode = point.code;

      // Add variant suffix if present
      if (point.variant === 'right') {
        pointCode += ' (R)';
      } else if (point.variant === 'both') {
        pointCode += ' (B)';
      }

      return pointCode;
    });

    // Determine note and color based on points
    let note = undefined;
    let noteColor: "orange" | "purple" | undefined = undefined;

    // Check if any point has a variant (this determines the note)
    const hasRightOnly = region.points.some((p) => p.variant === 'right');
    const hasBoth = region.points.some((p) => p.variant === 'both');

    if (hasRightOnly) {
      note = 'Right side only';
      noteColor = 'orange';
    } else if (hasBoth) {
      note = 'Both sides';
      noteColor = 'purple';
    }

    return {
      name: region.region,
      points,
      note,
      noteColor,
    };
  });

  return {
    chiefComplaints: aiNotes.chiefComplaints.map((cc) => ({
      text: cc.text,
      icdCode: cc.icdCode,
      icdLabel: cc.icdDescription,
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
      coating: aiNotes.tongueExam.coating || "",
    },
    pulse: {
      text: aiNotes.pulseExam,
    },
    diagnosis: {
      tcmDiagnosis: aiNotes.diagnosis.map((d) => d.tcm).join(", "),
      icdCodes: aiNotes.diagnosis.map((d) => ({
        code: d.icdCode,
        label: d.icdDescription,
      })),
    },
    treatment: aiNotes.treatmentPrinciple,
    acupunctureTreatmentSide: aiNotes.acupunctureTreatmentSide,
    acupuncture,
  };
}
