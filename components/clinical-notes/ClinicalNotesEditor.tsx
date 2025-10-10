"use client";

import { Textarea } from "@/components/ui/textarea";
import * as React from "react";

/**
 * NotesTextarea Component
 *
 * Large textarea for comprehensive notes that takes up entire column height.
 * Used in the right portion of the middle column for detailed clinical notes.
 *
 * Features:
 * - Formats section headers (CC, HPI, PMH, etc.) on their own line as smaller, bold text
 * - Maintains editable textarea for input
 * - Synchronized scrolling between input and formatted display
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

// Section labels that should be formatted when on their own line
const SECTION_LABELS = [
  "CC", "HPI", "PMH", "FH", "SH", "ES",
  "Pain", "Sleep", "Energy", "Appetite", "Thirst", "Digestion",
  "Urination", "BM", "Sweating", "Temperature", "Breathing", "Emotions",
  "Tongue", "Pulse", "Diagnosis", "Points", "Plan"
];

export const ClinicalNotesEditor = React.forwardRef<HTMLTextAreaElement, NotesTextareaProps>(
  function ClinicalNotesEditor({ value = "", onChange, placeholder = "Enter clinical notes..." }, ref) {
    const [isFocused, setIsFocused] = React.useState(false);
    const displayRef = React.useRef<HTMLDivElement>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Combine refs to handle both internal and forwarded refs
    React.useImperativeHandle(ref, () => textareaRef.current!);

    // Format text with headers styled
    const formatText = (text: string) => {
      if (!text) return null;

      const lines = text.split('\n');
      return lines.map((line, index) => {
        const trimmedLine = line.trim();
        const isHeader = SECTION_LABELS.includes(trimmedLine);

        if (isHeader) {
          return (
            <div key={index} className="font-semibold text-xs text-gray-700 my-1">
              {line}
            </div>
          );
        }

        return (
          <div key={index} className="text-sm">
            {line || '\u00A0'} {/* Non-breaking space for empty lines */}
          </div>
        );
      });
    };

    // Sync scroll position between textarea and display
    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
      if (displayRef.current && e.currentTarget) {
        displayRef.current.scrollTop = e.currentTarget.scrollTop;
      }
    };

    return (
      <div className="relative h-full w-full">
        {/* Formatted Display (shown when not focused or when there's content) */}
        {!isFocused && value && (
          <div
            ref={displayRef}
            className="absolute inset-0 border border-gray-200 rounded-md p-4 overflow-auto whitespace-pre-wrap pointer-events-none bg-white z-10"
            style={{
              lineHeight: '1.5',
              letterSpacing: 'normal'
            }}
          >
            {formatText(value)}
          </div>
        )}

        {/* Editable Textarea */}
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onScroll={handleScroll}
          placeholder={placeholder}
          className="h-full w-full resize-none border border-gray-200 rounded-md p-4 focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
          style={{
            lineHeight: '1.5',
            letterSpacing: 'normal'
          }}
        />
      </div>
    );
  }
);
