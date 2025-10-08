"use client";

import { Textarea } from "@/components/ui/textarea";

/**
 * NotesTextarea Component
 *
 * Large textarea for comprehensive notes that takes up entire column height.
 * Used in the right portion of the middle column for detailed clinical notes.
 *
 * @param value - Current notes text
 * @param onChange - Callback when notes change
 * @param placeholder - Placeholder text
 *
 * @example
 * <NotesTextarea
 *   value={clinicalNotes}
 *   onChange={setNotes}
 *   placeholder="Clinical notes..."
 * />
 */

interface NotesTextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function NotesTextarea({
  value = "",
  onChange,
  placeholder = "Enter clinical notes..."
}: NotesTextareaProps) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="h-full w-full resize-none border-0 focus-visible:ring-0 text-sm"
    />
  );
}
