import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { CopyButton } from "@/components/atomic/CopyButton";
import { cn } from "@/lib/utils";

/**
 * InfoCard Component
 *
 * Reusable card wrapper for all AI structured notes cards in the right sidebar.
 * Features a light teal background, rounded corners, icon in header, and optional copy button.
 *
 * @param title - Card title displayed in header
 * @param icon - Lucide icon component to display before title
 * @param children - Card content
 * @param hasCopy - Whether to show copy button in top-right
 * @param textToCopy - Text to copy when copy button is clicked (required if hasCopy=true)
 * @param className - Optional additional CSS classes
 *
 * @example
 * <InfoCard
 *   title="Chief Complaint (CC)"
 *   icon={Stethoscope}
 *   hasCopy={true}
 *   textToCopy="Chronic fatigue for 6 months..."
 * >
 *   <p>Card content here</p>
 * </InfoCard>
 */

interface InfoCardProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  hasCopy?: boolean;
  textToCopy?: string;
  className?: string;
}

export function InfoCard({
  title,
  icon: Icon,
  children,
  hasCopy = false,
  textToCopy = "",
  className
}: InfoCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg p-4 space-y-3 border border-gray-200",
      className
    )}>
      {/* Header with icon, title, and optional copy button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-teal-600" />
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        </div>
        {hasCopy && (
          <CopyButton textToCopy={textToCopy} />
        )}
      </div>

      {/* Card content */}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}
