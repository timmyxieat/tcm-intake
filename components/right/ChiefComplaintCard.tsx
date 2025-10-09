import { InfoCard } from "./InfoCard";
import { Stethoscope } from "lucide-react";
import { StatusBadge } from "@/components/atomic/StatusBadge";
import { CopyButton } from "@/components/atomic/CopyButton";

/**
 * ChiefComplaintCard Component
 *
 * Displays AI-generated chief complaints with ICD codes.
 * Each complaint has text description and ICD badge, with individual copy buttons.
 *
 * @param complaints - Array of chief complaints with text and ICD code
 *
 * @example
 * <ChiefComplaintCard
 *   complaints={[
 *     { text: "Chronic Fatigue for 6 months", icdCode: "R53.83", icdLabel: "Other fatigue" }
 *   ]}
 * />
 */

interface Complaint {
  text: string;
  icdCode: string;
  icdLabel: string;
}

interface ChiefComplaintCardProps {
  complaints: Complaint[];
}

export function ChiefComplaintCard({ complaints }: ChiefComplaintCardProps) {
  return (
    <InfoCard
      title="Chief Complaint (CC)"
      icon={Stethoscope}
      hasCopy={false}
    >
      <div className="space-y-3">
        {complaints.map((complaint, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
            {/* Complaint text with copy button */}
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm text-gray-800 flex-1">{complaint.text}</p>
              <CopyButton textToCopy={complaint.text} />
            </div>

            {/* ICD-10 code with copy button */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">ICD-10:</span>
                <StatusBadge variant="icd" label={complaint.icdCode} />
                <span className="text-xs text-gray-600">- {complaint.icdLabel}</span>
              </div>
              <CopyButton textToCopy={complaint.icdCode} />
            </div>
          </div>
        ))}
      </div>
    </InfoCard>
  );
}
