"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * CollapsibleSidebar Component
 *
 * Reusable sidebar wrapper with collapse/expand functionality.
 * Used for both left (patient list) and right (AI notes) sidebars.
 *
 * @param position - Sidebar position: 'left' | 'right'
 * @param isOpen - Whether sidebar is expanded
 * @param onToggle - Callback when toggle button is clicked
 * @param children - Sidebar content when expanded
 * @param collapsedContent - Content to show when collapsed (vertical text, initials, etc.)
 * @param className - Optional additional CSS classes
 *
 * @example
 * <CollapsibleSidebar
 *   position="left"
 *   isOpen={leftOpen}
 *   onToggle={() => setLeftOpen(!leftOpen)}
 *   collapsedContent={<VerticalInitials />}
 * >
 *   <PatientList />
 * </CollapsibleSidebar>
 */

interface CollapsibleSidebarProps {
  position: 'left' | 'right';
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  collapsedContent?: React.ReactNode;
  className?: string;
}

export function CollapsibleSidebar({
  position,
  isOpen,
  onToggle,
  children,
  collapsedContent,
  className
}: CollapsibleSidebarProps) {
  const ChevronIcon = position === 'left'
    ? (isOpen ? ChevronLeft : ChevronRight)
    : (isOpen ? ChevronRight : ChevronLeft);

  return (
    <div
      className={cn(
        "relative bg-white border-r transition-all duration-300 ease-in-out",
        isOpen ? (position === 'left' ? 'w-64' : 'w-96') : 'w-12',
        className
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className={cn(
          "absolute top-4 z-10",
          position === 'left' ? 'left-4' : 'right-4'
        )}
      >
        <ChevronIcon className="h-4 w-4" />
      </Button>

      {/* Content */}
      <div className="h-full overflow-hidden">
        {isOpen ? (
          <div className="h-full pt-12 px-4">{children}</div>
        ) : (
          <div className="h-full flex items-center justify-center pt-16">
            {collapsedContent}
          </div>
        )}
      </div>
    </div>
  );
}
