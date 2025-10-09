import { InfoCard } from "./InfoCard";
import { User } from "lucide-react";
import { StatusBadge } from "@/components/atomic/StatusBadge";

/**
 * SubjectiveCard Component
 *
 * Displays AI-generated subjective data with 4 sections: PMH, FH, SH, ES.
 * Features highlighted keywords in teal color and stress level badge.
 *
 * @param pmh - Past Medical History text with highlighted keywords
 * @param fh - Family History text with highlighted keywords
 * @param sh - Social History text with highlighted keywords
 * @param es - Emotional Status text
 * @param stressLevel - Stress level (e.g., "7/10")
 *
 * @example
 * <SubjectiveCard
 *   pmh="No significant past medical history."
 *   fh="Mother: Type 2 diabetes, hypertension."
 *   sh="Works as software engineer, sedentary lifestyle."
 *   es="Worry and frustration"
 *   stressLevel="7/10"
 * />
 */

interface SubjectiveCardProps {
  pmh: string;
  pmhHighlights?: string[]; // Keywords to highlight in teal
  fh: string;
  fhHighlights?: string[];
  sh: string;
  shHighlights?: string[];
  es: string;
  stressLevel: string;
  tcmReview?: {
    [key: string]: string[];
  };
}

// Helper function to highlight keywords in text
function highlightText(text: string, highlights: string[] = []) {
  if (!highlights.length) return <span>{text}</span>;

  let lastIndex = 0;
  const parts: React.ReactNode[] = [];

  // Create a regex pattern from all highlight terms
  const pattern = new RegExp(`(${highlights.join("|")})`, "gi");
  const matches = Array.from(text.matchAll(pattern));

  matches.forEach((match, i) => {
    const matchIndex = match.index!;

    // Add text before the match
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    // Add highlighted match
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

export function SubjectiveCard({
  pmh,
  pmhHighlights = [],
  fh,
  fhHighlights = [],
  sh,
  shHighlights = [],
  es,
  stressLevel,
  tcmReview,
}: SubjectiveCardProps) {
  let allText = `Past Medical History (PMH):\n${pmh}\n\nFamily History (FH):\n${fh}\n\nSocial History (SH):\n${sh}\n\nEmotional Status (ES):\n${es}\nStress Level: ${stressLevel}`;

  if (tcmReview) {
    const tcmText = Object.entries(tcmReview)
      .map(
        ([category, items]) =>
          `${category}:\n${items.map((item) => `${item}`).join("\n")}`
      )
      .join("\n\n");
    allText += `\n\nTCM Review of Systems:\n\n${tcmText}`;
  }

  // Split TCM review categories into two columns
  const tcmEntries = tcmReview ? Object.entries(tcmReview) : [];
  const midpoint = Math.ceil(tcmEntries.length / 2);
  const leftColumn = tcmEntries.slice(0, midpoint);
  const rightColumn = tcmEntries.slice(midpoint);

  return (
    <InfoCard
      title="Subjective"
      icon={User}
      hasCopy={true}
      textToCopy={allText}
    >
      <div className="space-y-3">
        {/* Past Medical History */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-1">
            Past Medical History (PMH)
          </h4>
          <p className="text-sm text-gray-800 leading-relaxed">
            {highlightText(pmh, pmhHighlights)}
          </p>
        </div>

        {/* Family History */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-1">
            Family History (FH)
          </h4>
          <p className="text-sm text-gray-800 leading-relaxed">
            {highlightText(fh, fhHighlights)}
          </p>
        </div>

        {/* Social History */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-1">
            Social History (SH)
          </h4>
          <p className="text-sm text-gray-800 leading-relaxed">
            {highlightText(sh, shHighlights)}
          </p>
        </div>

        {/* Emotional Status */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 mb-1">
            Emotional Status (ES)
          </h4>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-800">Predominant emotion: {es}</p>
            <StatusBadge variant="stress" label={stressLevel} />
          </div>
        </div>

        {/* TCM Review of Systems */}
        {tcmReview && (
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-2">
              TCM Review of Systems
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {tcmEntries.map(([category, items]) => (
                <div key={category} className="text-sm text-gray-800">
                  • {category}: {items.join(", ")}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </InfoCard>
  );
}
