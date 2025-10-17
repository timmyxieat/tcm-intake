import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

/**
 * StatusBadge Component
 *
 * Reusable badge component for displaying status indicators across the app.
 * Handles multiple variants: patient statuses, ICD codes, stress levels, TCM diagnosis
 *
 * @param variant - Badge type: 'completed' | 'active' | 'waiting' | 'scheduled' | 'icd' | 'stress' | 'tcm'
 * @param label - Text to display in the badge
 * @param dotOnly - Show only a colored dot instead of badge with text (for patient status)
 * @param className - Optional additional CSS classes
 *
 * @example
 * <StatusBadge variant="completed" label="Completed" />
 * <StatusBadge variant="active" dotOnly />
 * <StatusBadge variant="icd" label="R53.83" />
 */

interface StatusBadgeProps {
  variant: 'scheduled' | 'active' | 'ready-to-copy' | 'completed' | 'waiting' | 'icd' | 'stress' | 'tcm';
  label?: string;
  dotOnly?: boolean;
  className?: string;
}

const variantStyles = {
  scheduled: 'bg-purple-50 text-purple-600 border-purple-200',
  active: 'bg-blue-50 text-blue-600 border-blue-200',
  'ready-to-copy': 'bg-green-50 text-green-600 border-green-200',
  completed: 'bg-gray-50 text-gray-600 border-gray-200',
  waiting: 'bg-orange-50 text-orange-600 border-orange-200',
  icd: 'bg-gray-100 text-gray-600 border-gray-300',
  stress: 'bg-teal-100 text-teal-700 border-teal-200',
  tcm: 'bg-teal-100 text-teal-700 border-teal-200',
};

const dotStyles = {
  scheduled: 'bg-purple-500',
  active: 'bg-blue-500',
  'ready-to-copy': 'bg-green-500',
  completed: 'bg-gray-400',
  waiting: 'bg-orange-500',
  icd: 'bg-gray-500',
  stress: 'bg-teal-500',
  tcm: 'bg-teal-500',
};

export function StatusBadge({ variant, label, dotOnly = false, className }: StatusBadgeProps) {
  // Dot-only mode for patient status indicators
  if (dotOnly) {
    return (
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          dotStyles[variant],
          className
        )}
        aria-label={`Status: ${variant}`}
      />
    );
  }

  // Regular badge mode
  return (
    <Badge
      variant="outline"
      className={cn(
        variantStyles[variant],
        "font-medium",
        className
      )}
    >
      {label}
    </Badge>
  );
}
