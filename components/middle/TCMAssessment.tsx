"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TCMChecklistItem } from "@/components/middle/TCMChecklistItem";
import { ChevronDown } from "lucide-react";

/**
 * TCMAssessment Component
 *
 * Complete TCM symptom checklist with accordion categories.
 * Categories: Appetite, Taste, Stool, Thirst, Urine, Sleep, Energy,
 * Temp, Sweat, Head, Ear, Eye, Nose, Throat, Pain, Libido
 *
 * @param symptoms - Object containing symptom categories and their items
 * @param onSymptomChange - Callback when a symptom is toggled
 *
 * @example
 * <TCMAssessment
 *   symptoms={tcmData}
 *   onSymptomChange={(category, label, checked) => updateSymptom(category, label, checked)}
 * />
 */

interface TCMSymptom {
  label: string;
  checked: boolean;
}

interface TCMAssessmentProps {
  symptoms: Record<string, TCMSymptom[]>;
  onSymptomChange?: (category: string, label: string, checked: boolean) => void;
}

const categoryLabels: Record<string, string> = {
  appetite: "Appetite",
  taste: "Taste",
  stool: "Stool",
  thirst: "Thirst",
  urine: "Urine",
  sleep: "Sleep",
  energy: "Energy",
  temp: "Temp",
  sweat: "Sweat",
  head: "Head",
  ear: "Ear",
  eye: "Eye",
  nose: "Nose",
  throat: "Throat",
  pain: "Pain",
  libido: "Libido"
};

export function TCMAssessment({
  symptoms,
  onSymptomChange
}: TCMAssessmentProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-gray-700">TCM</h3>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </div>

      <Accordion type="single" collapsible className="w-full">
        {Object.entries(symptoms).map(([category, items]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="text-sm text-gray-700">
              {categoryLabels[category] || category}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {items.map((symptom) => (
                  <TCMChecklistItem
                    key={symptom.label}
                    label={symptom.label}
                    checked={symptom.checked}
                    onCheckedChange={(checked) =>
                      onSymptomChange?.(category, symptom.label, checked as boolean)
                    }
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
