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
  onCategoryClick?: (category: string) => void;
  isSectionCompleted?: (label: string) => boolean;
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

export function TCMSection({ categories = DEFAULT_CATEGORIES, onCategoryClick, isSectionCompleted }: TCMSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Check if all TCM categories are completed
  const allCategoriesCompleted = categories.every(category => isSectionCompleted?.(category) ?? false);

  return (
    <div>
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between py-2.5 px-4 cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-colors"
      >
        <span className={`text-sm transition-colors ${
          allCategoriesCompleted ? 'text-gray-400 line-through' : 'text-gray-700'
        }`}>TCM</span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </div>

      {/* Categories List */}
      {isOpen && (
        <div className="bg-gray-50">
          {categories.map((category) => {
            const completed = isSectionCompleted?.(category) ?? false;
            return (
              <div
                key={category}
                onClick={() => onCategoryClick?.(category)}
                className={`py-2 px-4 pl-8 text-sm hover:bg-gray-100 active:bg-gray-200 cursor-pointer border-l-2 border-teal-400 ml-4 transition-colors ${
                  completed ? 'text-gray-400 line-through' : 'text-gray-600'
                }`}
              >
                {category}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
