"use client";

import { StatusBadge } from "@/components/atomic/StatusBadge";
import { CopyButton } from "@/components/atomic/CopyButton";
import { SectionHeader } from "@/components/atomic/SectionHeader";
import { PatientAvatar } from "@/components/atomic/PatientAvatar";
import { FileText, Activity } from "lucide-react";

/**
 * Component Showcase Page
 * Displays all built components for visual verification during development
 */

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Component Showcase</h1>

        {/* Phase 3: Atomic Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Phase 3: Atomic Components</h2>

          {/* Components will be added here as they're built */}
          <div className="space-y-8">

            {/* StatusBadge */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">StatusBadge</h3>
              <p className="text-sm text-gray-600 mb-4">Reusable badge for all status indicators</p>
              <div className="flex flex-wrap gap-3">
                <StatusBadge variant="completed" label="Completed" />
                <StatusBadge variant="active" label="Active" />
                <StatusBadge variant="waiting" label="Waiting" />
                <StatusBadge variant="scheduled" label="Scheduled" />
                <StatusBadge variant="icd" label="R53.83" />
                <StatusBadge variant="stress" label="7/10" />
                <StatusBadge variant="tcm" label="TCM" />
              </div>
            </div>

            {/* CopyButton */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">CopyButton</h3>
              <p className="text-sm text-gray-600 mb-4">Copy text to clipboard with visual feedback</p>
              <div className="flex gap-4">
                <CopyButton textToCopy="Sample medical text to copy" />
              </div>
            </div>

            {/* SectionHeader */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">SectionHeader</h3>
              <p className="text-sm text-gray-600 mb-4">Reusable section headers with optional icons</p>
              <div className="space-y-4">
                <SectionHeader title="Chief Complaint" icon={FileText} />
                <SectionHeader title="History of Present Illness" icon={Activity} />
                <SectionHeader title="Without Icon" />
              </div>
            </div>

            {/* PatientAvatar */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">PatientAvatar</h3>
              <p className="text-sm text-gray-600 mb-4">Patient initials with status-based colors (3 sizes)</p>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Small</p>
                  <div className="flex gap-3">
                    <PatientAvatar initials="DP" status="completed" size="sm" />
                    <PatientAvatar initials="MS" status="active" size="sm" />
                    <PatientAvatar initials="MR" status="waiting" size="sm" />
                    <PatientAvatar initials="ET" status="scheduled" size="sm" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Medium</p>
                  <div className="flex gap-3">
                    <PatientAvatar initials="DP" status="completed" size="md" />
                    <PatientAvatar initials="MS" status="active" size="md" />
                    <PatientAvatar initials="MR" status="waiting" size="md" />
                    <PatientAvatar initials="ET" status="scheduled" size="md" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Large</p>
                  <div className="flex gap-3">
                    <PatientAvatar initials="DP" status="completed" size="lg" />
                    <PatientAvatar initials="MS" status="active" size="lg" />
                    <PatientAvatar initials="MR" status="waiting" size="lg" />
                    <PatientAvatar initials="ET" status="scheduled" size="lg" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Phase 4: Layout Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Phase 4: Layout Components</h2>
          <div className="space-y-8">
            <p className="text-gray-500 italic">Coming soon...</p>
          </div>
        </section>

        {/* Phase 5-7: Feature Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Phase 5-7: Feature Components</h2>
          <div className="space-y-8">
            <p className="text-gray-500 italic">Coming soon...</p>
          </div>
        </section>
      </div>
    </div>
  );
}
