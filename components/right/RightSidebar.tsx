"use client";

import { useState } from "react";
import { CollapsibleSidebar } from "@/components/layout/CollapsibleSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";
import { ChiefComplaintCard } from "./ChiefComplaintCard";
import { HPICard } from "./HPICard";
import { SubjectiveCard } from "./SubjectiveCard";
import { TongueExaminationCard } from "./TongueExaminationCard";
import { PulseExaminationCard } from "./PulseExaminationCard";
import { DiagnosisCard } from "./DiagnosisCard";
import { TreatmentCard } from "./TreatmentCard";
import { AcupunctureCard } from "./AcupunctureCard";

/**
 * RightSidebar Component
 *
 * Right sidebar containing all AI structured notes cards.
 * Uses CollapsibleSidebar wrapper with auto-updating toggle and refresh button.
 *
 * @param isOpen - Whether sidebar is expanded
 * @param onToggle - Callback when toggle button is clicked
 * @param autoUpdate - Whether auto-updating is enabled
 * @param onAutoUpdateChange - Callback when auto-update toggle is changed
 * @param onRefresh - Callback when refresh button is clicked
 * @param data - All structured notes data for the cards
 *
 * @example
 * <RightSidebar
 *   isOpen={rightOpen}
 *   onToggle={() => setRightOpen(!rightOpen)}
 *   autoUpdate={autoUpdate}
 *   onAutoUpdateChange={setAutoUpdate}
 *   onRefresh={() => console.log('Refresh AI notes')}
 *   data={mockAIData}
 * />
 */

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  autoUpdate?: boolean;
  onAutoUpdateChange?: (value: boolean) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  data: {
    chiefComplaints: Array<{
      text: string;
      icdCode: string;
      icdLabel: string;
    }>;
    hpi: string;
    subjective: {
      pmh: string;
      pmhHighlights?: string[];
      fh: string;
      fhHighlights?: string[];
      sh: string;
      shHighlights?: string[];
      es: string;
      stressLevel: string;
    };
    tcmReview: {
      [key: string]: string[];
    };
    tongue: {
      body: string;
      bodyHighlights?: string[];
      coating: string;
      coatingHighlights?: string[];
    };
    pulse: {
      text: string;
      highlights?: string[];
    };
    diagnosis: {
      tcmDiagnosis: string;
      icdCodes: Array<{
        code: string;
        label: string;
      }>;
    };
    treatment: string;
    acupunctureTreatmentSide?: 'Left side treatment' | 'Right side treatment' | 'Both sides treatment';
    acupuncture: Array<{
      name: string;
      points: string[];
      note?: string;
      noteColor?: "orange" | "purple";
    }>;
  };
}

export function RightSidebar({
  isOpen,
  onToggle,
  autoUpdate = true,
  onAutoUpdateChange,
  onRefresh,
  isLoading = false,
  data,
}: RightSidebarProps) {
  const [localAutoUpdate, setLocalAutoUpdate] = useState(autoUpdate);

  const handleAutoUpdateChange = (value: boolean) => {
    setLocalAutoUpdate(value);
    onAutoUpdateChange?.(value);
  };

  return (
    <CollapsibleSidebar
      position="right"
      isOpen={isOpen}
      onToggle={onToggle}
      fullWidth={true}
      primary={
        <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-teal-500" />
          AI Structured Notes
        </h2>
      }
      secondary={
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2">
            <span className="text-xs text-teal-600">Auto-updating</span>
            <Switch
              checked={localAutoUpdate}
              onCheckedChange={handleAutoUpdateChange}
              className="data-[state=checked]:bg-teal-500"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 text-teal-600 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      }
      collapsedContent={
        <div className="flex flex-col items-center py-4">
          <Sparkles className="h-5 w-5 text-teal-500" />
        </div>
      }
    >
      <div className="h-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 text-teal-600 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">Analyzing patient data...</p>
            </div>
          </div>
        )}
        <ScrollArea className="h-full">
          <div className="space-y-4 p-4 bg-gray-50">
            <ChiefComplaintCard complaints={data.chiefComplaints} />
            <HPICard text={data.hpi} />
            <SubjectiveCard {...data.subjective} tcmReview={data.tcmReview} />
            <TongueExaminationCard {...data.tongue} />
            <PulseExaminationCard {...data.pulse} />
            <DiagnosisCard {...data.diagnosis} />
            <TreatmentCard principle={data.treatment} />
            <AcupunctureCard
              treatmentSide={data.acupunctureTreatmentSide}
              regions={data.acupuncture}
            />
          </div>
        </ScrollArea>
      </div>
    </CollapsibleSidebar>
  );
}
