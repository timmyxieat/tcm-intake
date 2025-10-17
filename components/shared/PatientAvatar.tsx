import { cn } from "@/lib/utils/cn";
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
 * @param isActive - Whether this patient is currently selected (adds outline)
 * @param className - Optional additional CSS classes
 *
 * @example
 * <PatientAvatar initials="DP" status="completed" size="md" isActive={true} />
 */

interface PatientAvatarProps {
  initials: string;
  status: PatientStatus;
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  className?: string;
}

const statusColors = {
  scheduled: 'bg-purple-500 text-white',
  active: 'bg-blue-500 text-white',
  'ready-to-copy': 'bg-green-500 text-white',
  completed: 'bg-gray-400 text-white',
  waiting: 'bg-orange-500 text-white',
};

const statusOutlineColors = {
  scheduled: 'ring-purple-600',
  active: 'ring-blue-600',
  'ready-to-copy': 'ring-green-600',
  completed: 'ring-gray-500',
  waiting: 'ring-orange-600',
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
  isActive = false,
  className
}: PatientAvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-medium",
        statusColors[status],
        sizeStyles[size],
        isActive && "ring-2",
        isActive && statusOutlineColors[status],
        className
      )}
    >
      {initials}
    </div>
  );
}
