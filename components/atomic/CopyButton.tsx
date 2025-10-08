"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

/**
 * CopyButton Component
 *
 * Reusable button for copying text to clipboard with visual feedback.
 * Shows checkmark on successful copy, used across all AI structured note cards.
 *
 * @param textToCopy - The text content to copy to clipboard
 * @param className - Optional additional CSS classes
 *
 * @example
 * <CopyButton textToCopy="Patient medical history text..." />
 */

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export function CopyButton({ textToCopy, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className={className}
    >
      {copied ? (
        <Check className="h-4 w-4 text-teal-600" />
      ) : (
        <Copy className="h-4 w-4 text-teal-600" />
      )}
      <span className="ml-1 text-teal-600 text-sm">Copy</span>
    </Button>
  );
}
