"use client";

import { StatusBadge } from "@/components/atomic/StatusBadge";
import { CopyButton } from "@/components/atomic/CopyButton";
import { SectionHeader } from "@/components/atomic/SectionHeader";
import { PatientAvatar } from "@/components/atomic/PatientAvatar";
import { CollapsibleSidebar } from "@/components/layout/CollapsibleSidebar";
import { PatientCard } from "@/components/left/PatientCard";
import { PatientList } from "@/components/left/PatientList";
import { LeftSidebar } from "@/components/left/LeftSidebar";
import { MiddleColumn } from "@/components/middle/MiddleColumn";
import { RightSidebar } from "@/components/right/RightSidebar";
import { FileText, Activity } from "lucide-react";
import { useState } from "react";

/**
 * Component Showcase Page
 * Displays all built components for visual verification during development
 */

export default function ComponentsPage() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState("3");
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [clinicalNotes, setClinicalNotes] = useState(`Chief Complaint
Chronic fatigue and digestive issues for the past 6 months. Patient reports feeling constantly tired despite adequate sleep, along with bloating and irregular bowel movements.

History of Present Illness
Symptoms began gradually 6 months ago following a period of high stress at work. Initially mild fatigue that has progressively worsened. Digestive symptoms started 3 months later. No fever, weight loss, or other concerning symptoms.

TCM Assessment
Tongue: Pale tongue body with thin white coating, slightly swollen with tooth marks on edges
Pulse: Deep, slow, and weak pulse bilaterally, particularly weak in the right cun position

Treatment Plan
1. Acupuncture treatment focusing on Spleen Qi deficiency
2. Herbal formula: Si Jun Zi Tang modified
3. Dietary recommendations for spleen support
4. Follow-up in 2 weeks`);

  // Mock data for MiddleColumn
  const mockPatient = {
    id: "3",
    initials: "SC",
    time: "9:30 AM",
    status: "active" as const
  };

  // Mock data for RightSidebar
  const mockAIData = {
    chiefComplaints: [
      {
        text: "Chronic Fatigue for 6 months",
        icdCode: "R53.83",
        icdLabel: "Other fatigue"
      },
      {
        text: "Bloating for 1 year",
        icdCode: "R14.0",
        icdLabel: "Abdominal distension (gaseous)"
      }
    ],
    hpi: "Symptoms began gradually 6 months ago following a period of high stress at work. Initially manageable, fatigue has progressively worsened. Digestive symptoms started 3 months later. No fever, weight loss, or other concerning symptoms.",
    subjective: {
      pmh: "No significant past medical history. Previous episodes of mild anxiety during college years, resolved without treatment.",
      pmhHighlights: ["No significant past medical history", "mild anxiety", "college years"],
      fh: "Mother: Type 2 diabetes, hypertension. Father: History of digestive issues, gastritis. No family history of autoimmune conditions.",
      fhHighlights: ["Type 2 diabetes", "hypertension", "digestive issues", "gastritis", "autoimmune conditions"],
      sh: "Works as software engineer, sedentary lifestyle. Drinks 2-3 cups coffee daily. Occasional alcohol (1-2 drinks/week). Non-smoker. Lives with partner, supportive relationship.",
      shHighlights: ["software engineer", "sedentary lifestyle", "coffee", "alcohol", "Non-smoker", "partner", "supportive relationship"],
      es: "Worry and frustration",
      stressLevel: "7/10"
    },
    tcmReview: {
      "Appetite": ["Poor, especially morning"],
      "Stool": ["Loose, 2-3x daily"],
      "Thirst": ["Minimal, prefers warm drinks"],
      "Urine": ["Pale, frequent"],
      "Sleep": ["Light, frequent waking"],
      "Energy": ["Very low, worse afternoon"],
      "Temperature": ["Feels cold easily"],
      "Sweat": ["Minimal, no night sweats"],
      "Pain": ["Minimal"],
      "Libido": ["Decreased"]}
    ,
    tongue: {
      body: "Pale tongue body with thin white coating, slightly swollen with tooth marks on edges",
      bodyHighlights: ["Pale", "swollen", "tooth marks", "edges"],
      coating: "Thin white coating",
      coatingHighlights: ["Thin white coating"]
    },
    pulse: {
      text: "Deep, slow, and weak pulse bilaterally, particularly weak in the right cun position.",
      highlights: ["Deep", "slow", "weak pulse bilaterally", "weak in the right cun position"]
    },
    diagnosis: {
      tcmDiagnosis: "Spleen Qi Deficiency with Dampness",
      icdCodes: [
        { code: "R53.83", label: "Other fatigue" },
        { code: "R14.0", label: "Abdominal distension (gaseous)" }
      ]
    },
    treatment: "Tonify Spleen Qi and resolve dampness",
    acupuncture: [
      { name: "Head/Neck", points: ["GV-20", "EX-HN3 (Yintang)"] },
      { name: "Hand", points: ["LI-4"], note: "Right side only", noteColor: "orange" as const },
      { name: "Forearm", points: ["LI-10", "SI-10 (ST-9)"], note: "Both sides", noteColor: "purple" as const },
      { name: "Upper Arm", points: ["LI-11"], note: "Both sides", noteColor: "purple" as const },
      { name: "Abdomen/Back", points: ["CV-12", "ST-25", "BL-20, BL-21"] },
      { name: "Upper Leg", points: ["ST-36", "GB-34 (1)"] },
      { name: "Lower Leg", points: ["SP-6", "SP-9"] },
      { name: "Foot", points: ["LV-3", "KI-3", "ST-44"] }
    ]
  };

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

            {/* CollapsibleSidebar */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">CollapsibleSidebar</h3>
              <p className="text-sm text-gray-600 mb-4">Reusable sidebar with collapse/expand (used for both left & right)</p>
              <div className="flex h-96 border-2 border-gray-300">
                {/* Left Sidebar Example */}
                <div className="border-r-2 border-red-500">
                  <CollapsibleSidebar
                    position="left"
                    isOpen={leftOpen}
                    onToggle={() => setLeftOpen(!leftOpen)}
                    primary={
                      <h4 className="font-semibold text-sm">Today's Patients</h4>
                    }
                    collapsedContent={
                      <div className="flex flex-col gap-2">
                        <PatientAvatar initials="DP" status="completed" size="sm" />
                        <PatientAvatar initials="MS" status="active" size="sm" />
                      </div>
                    }
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <PatientAvatar initials="DP" status="completed" size="sm" />
                        <div>
                          <p className="text-sm font-medium">DP - 8:45 AM</p>
                          <StatusBadge variant="completed" label="Completed" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <PatientAvatar initials="MS" status="active" size="sm" />
                        <div>
                          <p className="text-sm font-medium">MS - 9:00 AM</p>
                          <StatusBadge variant="active" label="Active" />
                        </div>
                      </div>
                    </div>
                  </CollapsibleSidebar>
                </div>

                {/* Middle Content Area */}
                <div className="flex-1 bg-gray-50 p-4 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p className="font-medium">Main Content Area</p>
                    <p className="text-sm mt-2">Toggle sidebars to see them expand/collapse</p>
                  </div>
                </div>

                {/* Right Sidebar Example */}
                <div className="border-l-2 border-red-500">
                  <CollapsibleSidebar
                    position="right"
                    isOpen={rightOpen}
                    onToggle={() => setRightOpen(!rightOpen)}
                    primary={
                      <h3 className="text-teal-600 font-medium text-sm">AI Structured Notes</h3>
                    }
                    secondary={
                      <CopyButton textToCopy="Sample AI notes content" />
                    }
                  >
                    <div className="space-y-4">
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Chief Complaint content goes here...</p>
                      </div>
                    </div>
                  </CollapsibleSidebar>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Phase 5: Left Sidebar Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Phase 5: Left Sidebar Components</h2>
          <div className="space-y-8">

            {/* PatientCard */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">PatientCard</h3>
              <p className="text-sm text-gray-600 mb-4">Individual patient item with avatar, time, and status</p>
              <div className="space-y-3 max-w-sm">
                <PatientCard
                  patient={{ id: "1", initials: "DP", time: "8:45 AM", status: "completed" }}
                />
                <PatientCard
                  patient={{ id: "2", initials: "MS", time: "9:00 AM", status: "active" }}
                  isActive={true}
                />
                <PatientCard
                  patient={{ id: "3", initials: "MR", time: "9:15 AM", status: "waiting" }}
                />
                <PatientCard
                  patient={{ id: "4", initials: "ET", time: "9:30 AM", status: "scheduled" }}
                />
              </div>
            </div>

            {/* PatientList */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">PatientList</h3>
              <p className="text-sm text-gray-600 mb-4">Simple list of patients with status badges (no grouping) - Click to select</p>
              <div className="max-w-sm">
                <PatientList
                  patients={[
                    { id: "1", initials: "DP", time: "8:45 AM", status: "completed" },
                    { id: "2", initials: "JW", time: "9:00 AM", status: "completed" },
                    { id: "3", initials: "MS", time: "9:15 AM", status: "active" },
                    { id: "4", initials: "MR", time: "10:00 AM", status: "waiting" },
                    { id: "5", initials: "SK", time: "10:30 AM", status: "waiting" },
                    { id: "6", initials: "ET", time: "11:00 AM", status: "scheduled" },
                  ]}
                  activePatientId={selectedPatientId}
                  onPatientClick={(patient) => setSelectedPatientId(patient.id)}
                />
              </div>
            </div>

            {/* LeftSidebar */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">LeftSidebar</h3>
              <p className="text-sm text-gray-600 mb-4">Complete left sidebar with collapse/expand - Selected patient shows outline even when collapsed</p>
              <div className="h-96 border-2 border-gray-300">
                <LeftSidebar
                  patients={[
                    { id: "1", initials: "DP", time: "8:45 AM", status: "completed" },
                    { id: "2", initials: "JW", time: "9:00 AM", status: "completed" },
                    { id: "3", initials: "MS", time: "9:15 AM", status: "active" },
                    { id: "4", initials: "MR", time: "10:00 AM", status: "waiting" },
                    { id: "5", initials: "SK", time: "10:30 AM", status: "waiting" },
                    { id: "6", initials: "ET", time: "11:00 AM", status: "scheduled" },
                  ]}
                  activePatientId={selectedPatientId}
                  onPatientClick={(patient) => setSelectedPatientId(patient.id)}
                />
              </div>
            </div>

          </div>
        </section>

        {/* Phase 6: Middle Column Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Phase 6: Middle Column Components</h2>
          <div className="space-y-8">

            {/* MiddleColumn */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">MiddleColumn (Navigation + Notes)</h3>
              <p className="text-sm text-gray-600 mb-4">Two-column layout: Left has section navigation labels only, Right has clinical notes textarea</p>
              <div className="h-[800px] border-2 border-gray-300">
                <MiddleColumn
                  patient={mockPatient}
                  clinicalNotes={clinicalNotes}
                  onPrevious={() => console.log('Previous patient')}
                  onNext={() => console.log('Next patient')}
                  aiEnabled={aiEnabled}
                  onAIToggle={setAiEnabled}
                  onNotesChange={setClinicalNotes}
                />
              </div>
            </div>

          </div>
        </section>

        {/* Phase 7: Right Sidebar Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Phase 7: Right Sidebar Components</h2>
          <div className="space-y-8">

            {/* RightSidebar */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">RightSidebar with All AI Cards (Full Width Mode)</h3>
              <p className="text-sm text-gray-600 mb-4">Complete right sidebar with all structured notes cards - Toggle to see it take full available space</p>
              <div className="h-[800px] border-2 border-gray-300 flex">
                <div className="flex-1 bg-gray-50 flex items-center justify-center min-w-0">
                  <p className="text-gray-500">Main Content Area (shrinks when sidebar expands)</p>
                </div>
                <RightSidebar
                  isOpen={rightOpen}
                  onToggle={() => setRightOpen(!rightOpen)}
                  autoUpdate={autoUpdate}
                  onAutoUpdateChange={setAutoUpdate}
                  onRefresh={() => console.log('Refresh AI notes')}
                  data={mockAIData}
                />
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
