import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * StatusBadge Component
 *
 * Reusable badge component for displaying status indicators across the app.
 * Handles multiple variants: patient statuses, ICD codes, stress levels, TCM diagnosis
 *
 * @param variant - Badge type: 'completed' | 'active' | 'waiting' | 'scheduled' | 'icd' | 'stress' | 'tcm'
 * @param label - Text to display in the badge
 * @param className - Optional additional CSS classes
 *
 * @example
 * <StatusBadge variant="completed" label="Completed" />
 * <StatusBadge variant="icd" label="R53.83" />
 * <StatusBadge variant="stress" label="7/10" />
 */

interface StatusBadgeProps {
  variant: 'completed' | 'active' | 'waiting' | 'scheduled' | 'icd' | 'stress' | 'tcm';
  label: string;
  className?: string;
}

const variantStyles = {
  completed: 'bg-teal-100 text-teal-700 border-teal-200',
  active: 'bg-blue-50 text-blue-600 border-blue-200',
  waiting: 'bg-orange-50 text-orange-600 border-orange-200',
  scheduled: 'bg-purple-50 text-purple-600 border-purple-200',
  icd: 'bg-gray-100 text-gray-600 border-gray-300',
  stress: 'bg-orange-100 text-orange-700 border-orange-200',
  tcm: 'bg-teal-100 text-teal-700 border-teal-200',
};

export function StatusBadge({ variant, label, className }: StatusBadgeProps) {
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
