import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * SectionHeader Component
 *
 * Reusable header for sections throughout the app.
 * Used in medical history sections, AI note cards, etc.
 *
 * @param title - Section title text
 * @param icon - Optional Lucide icon component
 * @param className - Optional additional CSS classes
 *
 * @example
 * <SectionHeader title="Chief Complaint" icon={FileText} />
 * <SectionHeader title="History of Present Illness" />
 */

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  className?: string;
}

export function SectionHeader({ title, icon: Icon, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Icon && <Icon className="h-4 w-4 text-teal-600" />}
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
  );
}
