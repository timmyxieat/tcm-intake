"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * TCMSection Component
 *
 * Collapsible TCM section showing category names only.
 * Displays list of TCM assessment categories without checkboxes.
 *
 * @param categories - Array of TCM category names
 *
 * @example
 * <TCMSection categories={['Appetite', 'Taste', 'Stool', 'Thirst', ...]} />
 */

interface TCMSectionProps {
  categories?: string[];
}

const DEFAULT_CATEGORIES = [
  'Appetite',
  'Taste',
  'Stool',
  'Thirst',
  'Urine',
  'Sleep',
  'Energy',
  'Temp',
  'Sweat',
  'Head',
  'Ear',
  'Eye',
  'Nose',
  'Throat',
  'Pain',
  'Libido'
];

export function TCMSection({ categories = DEFAULT_CATEGORIES }: TCMSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between py-2.5 px-4 cursor-pointer hover:bg-gray-50"
      >
        <span className="text-sm text-gray-700">TCM</span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </div>

      {/* Categories List */}
      {isOpen && (
        <div className="bg-gray-50">
          {categories.map((category) => (
            <div
              key={category}
              className="py-2 px-4 pl-8 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer border-l-2 border-teal-400 ml-4"
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
