import { InfoCard } from "./InfoCard";
import { Eye } from "lucide-react";

/**
 * TongueExaminationCard Component
 *
 * Displays AI-generated tongue examination with Body and Coating sections.
 * Features purple text highlights for key findings.
 *
 * @param body - Tongue body description
 * @param bodyHighlights - Keywords to highlight in purple
 * @param coating - Tongue coating description
 * @param coatingHighlights - Keywords to highlight in purple
 *
 * @example
 * <TongueExaminationCard
 *   body="Pale tongue body with thin white coating, slightly swollen with tooth marks on edges"
 *   bodyHighlights={["Pale", "swollen", "tooth marks", "edges"]}
 *   coating="Thin white coating"
 *   coatingHighlights={["Thin white coating"]}
 * />
 */

interface TongueExaminationCardProps {
  body: string;
  bodyHighlights?: string[];
  coating: string;
  coatingHighlights?: string[];
}

// Helper function to highlight keywords in purple
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

    // Add highlighted match in purple
    parts.push(
      <span key={i} className="text-purple-600 font-medium">
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

export function TongueExaminationCard({
  body,
  bodyHighlights = [],
  coating,
  coatingHighlights = []
}: TongueExaminationCardProps) {
  // Check if any content exists
  const hasBody = body && body.trim() !== "";
  const hasCoating = coating && coating.trim() !== "";
  const hasAnyContent = hasBody || hasCoating;

  // Don't render card if no content
  if (!hasAnyContent) return null;

  // Build copy text only for sections that have content
  let allText = "";
  if (hasBody) allText += `Body:\n${body}\n\n`;
  if (hasCoating) allText += `Coating:\n${coating}`;

  return (
    <InfoCard
      title="Tongue Examination"
      icon={Eye}
      hasCopy={true}
      textToCopy={allText.trim()}
    >
      <div className="space-y-3">
        {/* Body */}
        {hasBody && (
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Body</h4>
            <p className="text-sm text-gray-800 leading-relaxed">
              {highlightText(body, bodyHighlights)}
            </p>
          </div>
        )}

        {/* Coating */}
        {hasCoating && (
          <div>
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Coating</h4>
            <p className="text-sm text-gray-800 leading-relaxed">
              {highlightText(coating, coatingHighlights)}
            </p>
          </div>
        )}
      </div>
    </InfoCard>
  );
}
