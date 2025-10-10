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
  completed?: boolean;
}

export function ClinicalSectionLabel({ label, onClick, completed = false }: SectionLabelProps) {
  return (
    <div
      onClick={onClick}
      className={`py-2.5 px-4 text-sm hover:bg-gray-100 active:bg-gray-200 cursor-pointer transition-colors ${
        completed ? 'text-gray-400 line-through' : 'text-gray-700'
      }`}
    >
      {label}
    </div>
  );
}
