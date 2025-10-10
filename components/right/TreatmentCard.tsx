import { PatientDemographicsCard } from "./PatientDemographicsCard";
import { Target } from "lucide-react";

/**
 * TreatmentCard Component
 *
 * Displays AI-generated treatment principle as a single text line.
 * Includes one copy button for the entire text.
 *
 * @param principle - Treatment principle text
 *
 * @example
 * <TreatmentCard principle="Tonify Spleen Qi and resolve dampness" />
 */

interface TreatmentCardProps {
  principle: string;
}

export function TreatmentCard({ principle }: TreatmentCardProps) {
  // Check if any content exists
  const hasContent = principle && principle.trim() !== "";

  // Don't render card if no content
  if (!hasContent) return null;

  return (
    <PatientDemographicsCard
      title="Treatment Principle"
      icon={Target}
      hasCopy={true}
      textToCopy={principle}
    >
      <p className="text-sm text-gray-800 leading-relaxed">{principle}</p>
    </PatientDemographicsCard>
  );
}
