import { PatientDemographicsCard } from "../PatientDemographicsCard";
import { Activity } from "lucide-react";

/**
 * PulseExaminationCard Component
 *
 * Displays AI-generated pulse examination as a single text description.
 * Includes one copy button for the entire text.
 *
 * @param text - Pulse examination description
 * @param highlights - Keywords to highlight in purple (optional)
 *
 * @example
 * <PulseExaminationCard
 *   text="Deep, slow, and weak pulse bilaterally, particularly weak in the right cun position."
 *   highlights={["Deep", "slow", "weak pulse bilaterally", "weak in the right cun position"]}
 * />
 */

interface PulseExaminationCardProps {
  text: string;
  highlights?: string[];
}

// Helper function to highlight keywords in teal brand color
function highlightText(text: string, highlights: string[] = []) {
  if (!highlights.length) return <span>{text}</span>;

  let lastIndex = 0;
  const parts: React.ReactNode[] = [];

  // Create a regex pattern from all highlight terms
  const pattern = new RegExp(`(${highlights.join('|')})`, 'gi');
  const matches = Array.from(text.matchAll(pattern));

  matches.forEach((match, i) => {
    const matchIndex = match.index!;

    // Add text before the match
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    // Add highlighted match in teal brand color
    parts.push(
      <span key={i} className="text-teal-600 font-medium">
        {match[0]}
      </span>
    );

    lastIndex = matchIndex + match[0].length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
}

export function PulseExaminationCard({ text, highlights = [] }: PulseExaminationCardProps) {
  // Check if any content exists
  const hasContent = text && text.trim() !== "";

  // Don't render card if no content
  if (!hasContent) return null;

  return (
    <PatientDemographicsCard
      title="Pulse Examination"
      icon={Activity}
      hasCopy={true}
      textToCopy={text}
    >
      <p className="text-sm text-gray-800 leading-relaxed">
        {highlightText(text, highlights)}
      </p>
    </PatientDemographicsCard>
  );
}
