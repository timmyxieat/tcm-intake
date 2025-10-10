import { PatientDemographicsCard } from "./PatientDemographicsCard";
import { Thermometer } from "lucide-react";
import { StatusBadge } from "@/components/atomic/StatusBadge";

/**
 * DiagnosisCard Component
 *
 * Displays AI-generated TCM diagnosis with badge and multiple ICD codes.
 * Shows TCM diagnosis badge followed by ICD code badges.
 *
 * @param tcmDiagnosis - TCM diagnosis text
 * @param icdCodes - Array of ICD codes with labels
 *
 * @example
 * <DiagnosisCard
 *   tcmDiagnosis="Spleen Qi Deficiency with Dampness"
 *   icdCodes={[
 *     { code: "R53.83", label: "Other fatigue" },
 *     { code: "R14.0", label: "Abdominal distension (gaseous)" }
 *   ]}
 * />
 */

interface IcdCode {
  code: string;
  label: string;
}

interface DiagnosisCardProps {
  tcmDiagnosis: string;
  icdCodes: IcdCode[];
}

export function DiagnosisCard({ tcmDiagnosis, icdCodes }: DiagnosisCardProps) {
  // Check if any content exists
  const hasTCM = tcmDiagnosis && tcmDiagnosis.trim() !== "";
  const hasICD = icdCodes && icdCodes.length > 0;
  const hasAnyContent = hasTCM || hasICD;

  // Don't render card if no content
  if (!hasAnyContent) return null;

  // Build copy text only for sections that have content
  let allText = "";
  if (hasTCM) allText += `TCM Diagnosis: ${tcmDiagnosis}\n\n`;
  if (hasICD) allText += `ICD-10 Codes:\n${icdCodes.map(icd => `${icd.code} - ${icd.label}`).join('\n')}`;

  return (
    <PatientDemographicsCard
      title="Diagnosis"
      icon={Thermometer}
      hasCopy={true}
      textToCopy={allText.trim()}
    >
      <div className="space-y-3">
        {/* TCM Diagnosis */}
        {hasTCM && (
          <div>
            <StatusBadge variant="tcm" label={tcmDiagnosis} />
          </div>
        )}

        {/* ICD Codes */}
        {hasICD && (
          <div className="space-y-2">
            {icdCodes.map((icd, index) => (
              <div key={index} className="flex items-center gap-2">
                <StatusBadge variant="icd" label={icd.code} />
                <span className="text-xs text-gray-600">- {icd.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </PatientDemographicsCard>
  );
}
