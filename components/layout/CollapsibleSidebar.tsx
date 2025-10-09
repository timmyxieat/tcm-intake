"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HEADER_HEIGHT, HEADER_HEIGHT_PX } from "@/lib/constants";

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
          : "w-16",
        className
      )}
    >
      {isOpen ? (
        <>
          {/* Header with Chevron, Primary, and Secondary */}
          <div
            onClick={onToggle}
            className={cn(
              "flex items-center px-4 border-b cursor-pointer",
              HEADER_HEIGHT,
              primary || secondary ? "justify-between" : "justify-end"
            )}
          >
            {position === "left" ? (
              <>
                {/* Left sidebar: Entire header is clickable */}
                <div className="flex-1 flex items-center justify-between">
                  {primary && <div>{primary}</div>}
                  <div className="flex items-center gap-2">
                    {secondary && <div>{secondary}</div>}
                    <div className="h-8 w-8 p-0 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                      <ChevronIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Right sidebar: Entire header is clickable */}
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 p-0 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                    <ChevronIcon className="h-4 w-4" />
                  </div>
                  {primary && <div>{primary}</div>}
                </div>
                {secondary && <div>{secondary}</div>}
              </>
            )}
          </div>

          {/* Content */}
          <div className={`h-[calc(100%-${HEADER_HEIGHT_PX}px)]`}>{children}</div>
        </>
      ) : (
        <>
          {/* Collapsed Header - matches expanded state positioning */}
          <div
            onClick={onToggle}
            className={cn(
              "flex items-center border-b cursor-pointer",
              HEADER_HEIGHT,
              position === "left" ? "justify-end px-4" : "justify-start px-4"
            )}
          >
            <div className="h-8 w-8 p-0 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              <ChevronIcon className="h-4 w-4" />
            </div>
          </div>

          {/* Collapsed Content */}
          {position === "left" && collapsedContent && (
            <div className={`h-[calc(100%-${HEADER_HEIGHT_PX}px)] flex flex-col items-center justify-start pt-4`}>
              {collapsedContent}
            </div>
          )}
        </>
      )}
    </div>
  );
}
