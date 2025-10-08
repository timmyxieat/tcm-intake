"use client";

import { useState } from "react";

/**
 * MedicalSection Component
 *
 * Reusable section for medical information display/editing.
 * Used for CC, HPI, PMH, FH, SH, and ES sections.
 *
 * @param title - Section title (e.g., "CC", "HPI", "PMH")
 * @param content - Section content text
 * @param editable - Whether the section is editable
 * @param onChange - Callback when content changes
 *
 * @example
 * <MedicalSection
 *   title="CC"
 *   content="Chronic fatigue..."
 *   editable={true}
 *   onChange={(value) => updateSection(value)}
 * />
 */

interface MedicalSectionProps {
  title: string;
  content: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export function MedicalSection({
  title,
  content,
  editable = false,
  onChange
}: MedicalSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  const handleBlur = () => {
    setIsEditing(false);
    onChange?.(localContent);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">{title}</h3>
      {editable && isEditing ? (
        <textarea
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          onBlur={handleBlur}
          className="w-full min-h-[80px] text-sm text-gray-700 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
          autoFocus
        />
      ) : (
        <p
          className={`text-sm text-gray-700 leading-relaxed whitespace-pre-wrap ${
            editable ? 'cursor-pointer hover:bg-gray-50 rounded p-2 -m-2' : ''
          }`}
          onClick={() => editable && setIsEditing(true)}
        >
          {localContent || content}
        </p>
      )}
    </div>
  );
}
