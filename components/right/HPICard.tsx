import { InfoCard } from "./InfoCard";
import { FileText } from "lucide-react";

/**
 * HPICard Component
 *
 * Displays AI-generated History of Present Illness as a single paragraph.
 * Includes one copy button for the entire text.
 *
 * @param text - HPI narrative text
 *
 * @example
 * <HPICard text="Symptoms began gradually 6 months ago..." />
 */

interface HPICardProps {
  text: string;
}

export function HPICard({ text }: HPICardProps) {
  // Check if any content exists
  const hasContent = text && text.trim() !== "";

  // Don't render card if no content
  if (!hasContent) return null;

  return (
    <InfoCard
      title="History of Present Illness (HPI)"
      icon={FileText}
      hasCopy={true}
      textToCopy={text}
    >
      <p className="text-sm text-gray-800 leading-relaxed">{text}</p>
    </InfoCard>
  );
}
