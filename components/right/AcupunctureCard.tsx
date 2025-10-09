import { InfoCard } from "./InfoCard";
import { Map } from "lucide-react";

/**
 * AcupunctureCard Component
 *
 * Displays acupuncture points grouped by body regions.
 * Point names in black, annotations (Right side only, Left side only, T, R, E) in teal brand color.
 *
 * @param regions - Array of body regions with points and optional notes
 *
 * @example
 * <AcupunctureCard
 *   regions={[
 *     {
 *       name: "Head/Neck",
 *       points: ["GV-20", "EX-HN3"]
 *     },
 *     {
 *       name: "Hand",
 *       points: ["LI-4"],
 *       note: "Right side only"
 *     }
 *   ]}
 * />
 */

interface AcupunctureRegion {
  name: string;
  points: string[];
  note?: string;
}

interface AcupunctureCardProps {
  regions: AcupunctureRegion[];
}

// Helper function to parse point and extract annotation in parentheses
function parsePoint(pointText: string) {
  const match = pointText.match(/^(.+?)\s*\((.+?)\)$/);
  if (match) {
    return {
      point: match[1].trim(),
      annotation: match[2].trim()
    };
  }
  return {
    point: pointText,
    annotation: null
  };
}

export function AcupunctureCard({ regions }: AcupunctureCardProps) {
  // Check if any content exists
  const hasContent = regions && regions.length > 0;

  // Don't render card if no content
  if (!hasContent) return null;

  // Legend for copy text
  const legend = `Legend:
T = Tonification
R = Reducing
E = Even method

`;

  // Convert regions to text format for copying with legend
  const pointsText = legend + regions
    .flatMap(region => {
      return region.points.map(point => {
        const note = region.note ? ` (${region.note})` : '';
        return point + note;
      });
    })
    .join('\n');

  return (
    <InfoCard
      title="Acupuncture Points"
      icon={Map}
      hasCopy={true}
      textToCopy={pointsText}
    >
      <div className="space-y-3">
        {regions.map((region, index) => (
          <div key={index}>
            <h4 className="text-xs font-semibold text-gray-700 mb-1">{region.name}</h4>
            <div className="space-y-0.5">
              {region.points.map((point, idx) => {
                const { point: pointName, annotation } = parsePoint(point);
                return (
                  <p key={idx} className="text-sm text-gray-900">
                    {pointName}
                    {annotation && <span className="ml-1 text-teal-600 font-medium">({annotation})</span>}
                    {region.note && <span className="ml-1 text-teal-600 font-medium">({region.note})</span>}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </InfoCard>
  );
}
