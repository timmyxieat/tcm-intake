/**
 * SectionLabel Component
 *
 * Simple text label for section navigation in the left column.
 * Used for CC, HPI, PMH, FH, SH, ES, Tongue, Pulse, Diagnosis, Points, Plan sections.
 *
 * @param label - Section label text
 * @param onClick - Optional click handler for navigation
 *
 * @example
 * <SectionLabel label="CC" />
 * <SectionLabel label="HPI" onClick={() => scrollToSection('hpi')} />
 */

interface SectionLabelProps {
  label: string;
  onClick?: () => void;
}

export function SectionLabel({ label, onClick }: SectionLabelProps) {
  return (
    <div
      onClick={onClick}
      className="py-2.5 px-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
    >
      {label}
    </div>
  );
}
