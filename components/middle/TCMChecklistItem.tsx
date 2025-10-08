"use client";

import { Checkbox } from "@/components/ui/checkbox";

/**
 * TCMChecklistItem Component
 *
 * Individual TCM symptom checkbox item.
 * Reused across all TCM assessment categories.
 *
 * @param label - Symptom label text
 * @param checked - Whether the symptom is checked
 * @param onCheckedChange - Callback when checkbox state changes
 *
 * @example
 * <TCMChecklistItem
 *   label="Poor appetite"
 *   checked={true}
 *   onCheckedChange={(checked) => updateSymptom(checked)}
 * />
 */

interface TCMChecklistItemProps {
  label: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function TCMChecklistItem({
  label,
  checked,
  onCheckedChange
}: TCMChecklistItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <label
        htmlFor={label}
        className="text-sm text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}
