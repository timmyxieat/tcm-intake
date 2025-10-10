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
      size="icon"
      onClick={handleCopy}
      className={`h-6 w-6 hover:bg-teal-50 ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-teal-600" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-teal-600" />
      )}
    </Button>
  );
}
