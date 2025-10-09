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
 * @param primary - Primary header content (appears next to chevron when expanded)
 * @param secondary - Secondary header content (appears on opposite side when expanded)
 * @param className - Optional additional CSS classes
 *
 * @example
 * <CollapsibleSidebar
 *   position="left"
 *   isOpen={leftOpen}
 *   onToggle={() => setLeftOpen(!leftOpen)}
 *   collapsedContent={<VerticalInitials />}
 *   primary={<h3>AI Structured Notes</h3>}
 *   secondary={<CopyButton />}
 * >
 *   <PatientList />
 * </CollapsibleSidebar>
 */

interface CollapsibleSidebarProps {
  position: "left" | "right";
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  collapsedContent?: React.ReactNode;
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  className?: string;
  fullWidth?: boolean; // Allow right sidebar to take full available space
}

export function CollapsibleSidebar({
  position,
  isOpen,
  onToggle,
  children,
  collapsedContent,
  primary,
  secondary,
  className,
  fullWidth = false,
}: CollapsibleSidebarProps) {
  const ChevronIcon =
    position === "left"
      ? isOpen
        ? ChevronLeft
        : ChevronRight
      : isOpen
      ? ChevronRight
      : ChevronLeft;

  return (
    <div
      className={cn(
        "relative bg-white transition-all duration-300 ease-in-out",
        position === "left" ? "border-r" : "border-l",
        isOpen
          ? position === "left"
            ? "w-64"
            : fullWidth
            ? "flex-1"
            : "w-96"
          : "w-12",
        className
      )}
    >
      {isOpen ? (
        <>
          {/* Header with Chevron, Primary, and Secondary */}
          <div
            className={cn(
              "flex items-center px-4 py-3 border-b",
              primary || secondary ? "justify-between" : "justify-end"
            )}
          >
            {position === "left" ? (
              <>
                {/* Left sidebar: Primary on left, Chevron + Secondary on right */}
                {primary && <div>{primary}</div>}
                <div className="flex items-center gap-2">
                  {secondary && <div>{secondary}</div>}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggle}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronIcon className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Right sidebar: Chevron + Primary on left, Secondary on right */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggle}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronIcon className="h-4 w-4" />
                  </Button>
                  {primary && <div>{primary}</div>}
                </div>
                {secondary && <div>{secondary}</div>}
              </>
            )}
          </div>

          {/* Content */}
          <div className="h-[calc(100%-53px)]">{children}</div>
        </>
      ) : (
        <>
          {/* Toggle Button (Collapsed) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-10"
          >
            <ChevronIcon className="h-4 w-4" />
          </Button>

          {/* Collapsed Content */}
          {position === "left" && collapsedContent && (
            <div className="h-full flex flex-col items-center justify-start pt-16">
              {collapsedContent}
            </div>
          )}
        </>
      )}
    </div>
  );
}
