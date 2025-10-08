"use client";

import { Textarea } from "@/components/ui/textarea";
import * as React from "react";

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

export const NotesTextarea = React.forwardRef<HTMLTextAreaElement, NotesTextareaProps>(
  function NotesTextarea({ value = "", onChange, placeholder = "Enter clinical notes..." }, ref) {
    return (
      <Textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-full w-full resize-none border border-gray-200 rounded-md p-4 focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
      />
    );
  }
);
