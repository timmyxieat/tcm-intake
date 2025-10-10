import { PatientDemographicsCard } from "./PatientDemographicsCard";
import { Map } from "lucide-react";

/**
 * AcupunctureCard Component
 *
 * Displays acupuncture points grouped by body regions with 20-minute standard treatment time.
 * Parses point notation:
 * - Bi = Both sides
 * - Reduce = Reducing method
 * - Neutral = Even method
 * - T = Tonification, R = Reducing, E = Even
 * - Side annotations (Right side only, Left side only)
 *
 * Master Tong Points: Xiong Wu, Wai San Guan, etc.
 *
 * @param treatmentSide - Default treatment side (Left/Right/Both sides treatment)
 * @param regions - Array of body regions with points
 *
 * @example
 * <AcupunctureCard
 *   treatmentSide="Left side treatment"
 *   regions={[
 *     {
 *       name: "Back",
 *       points: ["BL23", "BL25 (T)", "GB30 (Bi:Reduce)"]
 *     }
 *   ]}
 * />
 */

// Point object structure
interface AcupuncturePoint {
  name: string;        // "LV-2", "Xiong Wu", "Yin Tang"
  side?: string;       // "Left", "Right", "Both", undefined
  method?: string;     // "T", "R", "E", undefined
}

interface AcupunctureRegion {
  name: string;
  points: (string | AcupuncturePoint)[];  // Can be string or object
  note?: string;
}

interface AcupunctureCardProps {
  treatmentSide?: 'Left side treatment' | 'Right side treatment' | 'Both sides treatment';
  regions: AcupunctureRegion[];
}

// Helper to get normalized treatment side (Left, Right, Both)
function getNormalizedTreatmentSide(treatmentSide?: string): string | undefined {
  if (!treatmentSide) return undefined;
  if (treatmentSide.includes('Left')) return 'Left';
  if (treatmentSide.includes('Right')) return 'Right';
  if (treatmentSide.includes('Both')) return 'Both';
  return undefined;
}

// Helper to format a single point for display
function formatPoint(
  point: string | AcupuncturePoint,
  treatmentSide?: string
): { name: string; displayAnnotation: string | null } {
  const normalizedTreatmentSide = getNormalizedTreatmentSide(treatmentSide);

  // Handle string format (legacy): "BL23", "BL25 (T)", "GB30 (Bi:Reduce)"
  if (typeof point === 'string') {
    const match = point.match(/^(.+?)\s*\((.+?)\)$/);
    if (match) {
      const name = match[1].trim();
      let annotation = match[2].trim();

      // Parse Bi:Method format
      if (annotation.includes('Bi:')) {
        const method = annotation.split(':')[1];
        annotation = method === 'Neutral' ? 'E' : method === 'Reduce' ? 'R' : method;
        return { name, displayAnnotation: annotation };
      }

      // Convert Reduce/Neutral
      if (annotation === 'Reduce') annotation = 'R';
      if (annotation === 'Neutral') annotation = 'E';

      return { name, displayAnnotation: annotation };
    }
    return { name: point, displayAnnotation: null };
  }

  // Handle object format: { name, side, method }
  const parts: string[] = [];

  // Show side only if it differs from treatment side
  if (point.side && point.side !== normalizedTreatmentSide) {
    parts.push(point.side);
  }

  // Show method if present
  if (point.method) {
    parts.push(point.method);
  }

  const displayAnnotation = parts.length > 0 ? parts.join(' ') : null;

  return { name: point.name, displayAnnotation };
}

export function AcupunctureCard({ treatmentSide, regions }: AcupunctureCardProps) {
  // Check if any content exists
  const hasContent = regions && regions.length > 0;

  // Don't render card if no content
  if (!hasContent) return null;

  // Standard treatment time
  const treatmentTime = "Set 1: 20 mins";

  // Legend for copy text
  const legend = `Treatment Time: ${treatmentTime}
Legend:
T = Tonification
R = Reducing
E = Even method
Bi = Both sides

`;

  // Add treatment side to copy text if present
  const treatmentSideText = treatmentSide ? `Treatment Side: ${treatmentSide}\n\n` : '';

  // Convert regions to text format for copying with legend
  const pointsText = legend + treatmentSideText + regions
    .flatMap(region => {
      return region.points.map(point => {
        const formatted = formatPoint(point, treatmentSide);
        return formatted.displayAnnotation
          ? `${formatted.name} (${formatted.displayAnnotation})`
          : formatted.name;
      });
    })
    .join('\n');

  return (
    <PatientDemographicsCard
      title="Acupuncture Points"
      icon={Map}
      hasCopy={true}
      textToCopy={pointsText}
    >
      <div className="space-y-3">
        {/* Treatment Time */}
        <div className="pb-1 border-b border-gray-200">
          <p className="text-sm font-medium text-teal-600">{treatmentTime}</p>
        </div>

        {/* Treatment Side Header */}
        {treatmentSide && (
          <div className="pb-1 border-b border-gray-200">
            <p className="text-sm text-gray-700">{treatmentSide}</p>
          </div>
        )}

        {/* Regions */}
        {regions.map((region, index) => (
          <div key={index}>
            <h4 className="text-xs font-semibold text-gray-700 mb-1">{region.name}</h4>
            <div className="space-y-0.5">
              {region.points.map((point, idx) => {
                const formatted = formatPoint(point, treatmentSide);
                return (
                  <p key={idx} className="text-sm text-gray-900">
                    {formatted.name}
                    {formatted.displayAnnotation && (
                      <span className="ml-1 text-teal-600 font-medium">
                        ({formatted.displayAnnotation})
                      </span>
                    )}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </PatientDemographicsCard>
  );
}
