import { PatientDemographicsCard } from "./PatientDemographicsCard";
import { FileText } from "lucide-react";

/**
 * HistoryPresentIllnessCard Component
 *
 * Displays AI-generated History of Present Illness as a single paragraph.
 * Includes one copy button for the entire text.
 *
 * @param text - HPI narrative text
 *
 * @example
 * <HistoryPresentIllnessCard text="Symptoms began gradually 6 months ago..." />
 */

interface HistoryPresentIllnessCardProps {
  text: string;
}

export function HistoryPresentIllnessCard({ text }: HistoryPresentIllnessCardProps) {
  // Check if any content exists
  const hasContent = text && text.trim() !== "";

  // Don't render card if no content
  if (!hasContent) return null;

  return (
    <PatientDemographicsCard
      title="History of Present Illness (HPI)"
      icon={FileText}
      hasCopy={true}
      textToCopy={text}
    >
      <p className="text-sm text-gray-800 leading-relaxed">{text}</p>
    </PatientDemographicsCard>
  );
}
