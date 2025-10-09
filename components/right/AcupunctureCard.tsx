import { InfoCard } from "./InfoCard";
import { Map } from "lucide-react";

/**
 * AcupunctureCard Component
 *
 * Displays acupuncture points grouped by body regions.
 * Features color-coded notes: orange for "Right side only", purple for point codes and "Both sides".
 *
 * @param regions - Array of body regions with points and optional notes
 *
 * @example
 * <AcupunctureCard
 *   regions={[
 *     {
 *       name: "Head/Neck",
 *       points: ["GV-20", "EX-HN3 (Yintang)"]
 *     },
 *     {
 *       name: "Hand",
 *       points: ["LI-4"],
 *       note: "Right side only",
 *       noteColor: "orange"
 *     }
 *   ]}
 * />
 */

interface AcupunctureRegion {
  name: string;
  points: string[];
  note?: string;
  noteColor?: "orange" | "purple";
}

interface AcupunctureCardProps {
  regions: AcupunctureRegion[];
}

export function AcupunctureCard({ regions }: AcupunctureCardProps) {
  // Convert regions to text format for copying
  const pointsText = regions
    .flatMap(region => {
      return region.points.map(point => {
        const note = region.note ? ` (${region.note})` : '';
        return point + note;
      });
    })
    .join('\n');

  const allText = `Treatment Side: Left side only\n\n${pointsText}`;

  return (
    <InfoCard
      title="Acupuncture Points"
      icon={Map}
      hasCopy={true}
      textToCopy={allText}
    >
      <div className="space-y-3">
        <p className="text-xs text-gray-600 italic">Treatment Side: Left side only</p>

        {regions.map((region, index) => (
          <div key={index}>
            <h4 className="text-xs font-semibold text-gray-700 mb-1">{region.name}</h4>
            <div className="space-y-0.5">
              {region.points.map((point, idx) => (
                <p key={idx} className="text-sm text-purple-600">
                  {point}
                  {region.note && <span className={`ml-1 italic ${
                    region.noteColor === 'orange' ? 'text-orange-600' : 'text-purple-600'
                  }`}>({region.note})</span>}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </InfoCard>
  );
}
