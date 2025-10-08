import { cn } from "@/lib/utils";
import type { PatientStatus } from "@/types";

/**
 * PatientAvatar Component
 *
 * Displays patient initials with status-based color coding.
 * Reused in patient list and collapsed sidebar view.
 *
 * @param initials - Patient initials (2 letters)
 * @param status - Patient status for color coding
 * @param size - Avatar size: 'sm' | 'md' | 'lg'
 * @param className - Optional additional CSS classes
 *
 * @example
 * <PatientAvatar initials="DP" status="completed" size="md" />
 */

interface PatientAvatarProps {
  initials: string;
  status: PatientStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusColors = {
  completed: 'bg-teal-100 text-teal-700',
  active: 'bg-blue-100 text-blue-700',
  waiting: 'bg-orange-100 text-orange-700',
  scheduled: 'bg-purple-100 text-purple-700',
};

const sizeStyles = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

export function PatientAvatar({
  initials,
  status,
  size = 'md',
  className
}: PatientAvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-medium",
        statusColors[status],
        sizeStyles[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
