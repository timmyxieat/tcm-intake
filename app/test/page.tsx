"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as storage from "@/lib/storage/local-storage";
import { Patient } from "@/types";

/**
 * LocalStorage Testing Page
 *
 * Visual testing interface for localStorage functionality.
 * Access at: http://localhost:3000/test
 *
 * Features:
 * - View all stored data
 * - Test CRUD operations
 * - Storage statistics
 * - Export/Import/Clear data
 */

export default function TestPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState<Record<string, string>>({});
  const [aiNotes, setAINotes] = useState<Record<string, any>>({});
  const [preferences, setPreferences] = useState<storage.AppPreferences | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [testResult, setTestResult] = useState<string>("");

  // Load all data
  const loadData = () => {
    setPatients(storage.getPatients());
    setClinicalNotes(storage.getClinicalNotes());
    setAINotes(storage.getAINotes());
    setPreferences(storage.getPreferences());
    setStats(storage.getStorageStats());
    setTestResult("Data loaded successfully!");
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  // Test: Add mock patient
  const testAddPatient = () => {
    const newPatient: Patient = {
      id: Date.now().toString(),
      initials: "TP",
      time: new Date().toISOString(),
      status: "scheduled",
    };

    const success = storage.addPatient(newPatient);
    setTestResult(success ? "✅ Patient added successfully!" : "❌ Failed to add patient");
    loadData();
  };

  // Test: Save clinical notes
  const testSaveClinicalNotes = () => {
    if (patients.length === 0) {
      setTestResult("❌ No patients found. Add a patient first.");
      return;
    }

    const patientId = patients[0].id;
    const notes = `Test notes for patient ${patientId} - ${new Date().toLocaleTimeString()}`;
    const success = storage.savePatientClinicalNotes(patientId, notes);

    setTestResult(
      success ? "✅ Clinical notes saved successfully!" : "❌ Failed to save clinical notes"
    );
    loadData();
  };

  // Test: Save AI notes
  const testSaveAINotes = () => {
    if (patients.length === 0) {
      setTestResult("❌ No patients found. Add a patient first.");
      return;
    }

    const patientId = patients[0].id;
    const aiData = {
      note_summary: "Test AI summary",
      chiefComplaints: [
        {
          text: "Test complaint for 3 weeks",
          icdCode: "M54.50",
          icdLabel: "Low back pain, unspecified",
        },
      ],
      hpi: "Test HPI content",
      subjective: {
        pmh: "Test PMH",
        fh: "Test FH",
        sh: "Test SH",
        es: "Test ES",
        stressLevel: "5/10",
      },
      tcmReview: {
        Pain: ["Lower back", "Radiating"],
      },
      tongue: {
        body: "Pale",
        bodyHighlights: ["Pale"],
        coating: "Thin white",
        coatingHighlights: ["Thin", "White"],
      },
      pulse: {
        text: "Wiry",
        highlights: ["Wiry"],
      },
      diagnosis: {
        tcmDiagnosis: "Kidney Deficiency",
        icdCodes: [
          {
            code: "M54.50",
            label: "Low back pain, unspecified",
          },
        ],
      },
      treatment: "Tonify Kidney",
      acupunctureTreatmentSide: "Both sides treatment" as const,
      acupuncture: [
        {
          name: "Back",
          points: ["BL-23", "BL-25"],
        },
      ],
    };

    const success = storage.savePatientAINotes(patientId, aiData);
    setTestResult(success ? "✅ AI notes saved successfully!" : "❌ Failed to save AI notes");
    loadData();
  };

  // Test: Update preferences
  const testUpdatePreferences = () => {
    const success = storage.updatePreference("autoUpdate", false);
    setTestResult(
      success ? "✅ Preferences updated successfully!" : "❌ Failed to update preferences"
    );
    loadData();
  };

  // Export data
  const handleExport = () => {
    const data = storage.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tcm-backup-${Date.now()}.json`;
    a.click();
    setTestResult("✅ Data exported successfully!");
  };

  // Clear all data
  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear ALL data? This cannot be undone.")) {
      const success = storage.clearAllData();
      setTestResult(success ? "✅ All data cleared!" : "❌ Failed to clear data");
      loadData();
    }
  };

  // Delete patient
  const handleDeletePatient = (patientId: string) => {
    if (confirm("Delete this patient and all associated data?")) {
      const success = storage.deletePatient(patientId);
      setTestResult(success ? "✅ Patient deleted!" : "❌ Failed to delete patient");
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">LocalStorage Test Page</h1>
          <p className="text-gray-600 mt-2">
            Visual testing interface for localStorage functionality
          </p>
        </div>

        {/* Test Result Banner */}
        {testResult && (
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm font-medium">{testResult}</p>
          </Card>
        )}

        {/* Storage Stats */}
        {stats && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Storage Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Size</p>
                <p className="text-2xl font-bold text-teal-600">{stats.totalSizeKB} KB</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Patients</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Notes Count</p>
                <p className="text-2xl font-bold">{Object.keys(clinicalNotes).length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">AI Notes</p>
                <p className="text-2xl font-bold">{Object.keys(aiNotes).length}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={testAddPatient} className="bg-teal-600 hover:bg-teal-700">
              Add Test Patient
            </Button>
            <Button onClick={testSaveClinicalNotes} variant="outline">
              Save Clinical Notes
            </Button>
            <Button onClick={testSaveAINotes} variant="outline">
              Save AI Notes
            </Button>
            <Button onClick={testUpdatePreferences} variant="outline">
              Toggle Auto-Update
            </Button>
            <Button onClick={loadData} variant="outline">
              Refresh Data
            </Button>
            <Button onClick={handleExport} variant="outline">
              Export Data
            </Button>
            <Button onClick={handleClearAll} variant="destructive">
              Clear All Data
            </Button>
          </div>
        </Card>

        {/* Patients List */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Patients ({patients.length})</h2>
          <ScrollArea className="h-64">
            {patients.length === 0 ? (
              <p className="text-gray-500 text-sm">No patients found. Add a test patient.</p>
            ) : (
              <div className="space-y-2">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-medium">
                        {patient.initials}
                      </div>
                      <div>
                        <p className="font-medium">{patient.initials}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(patient.time).toLocaleTimeString()} - {patient.status}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDeletePatient(patient.id)}
                      variant="ghost"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>

        {/* Clinical Notes */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Clinical Notes ({Object.keys(clinicalNotes).length})
          </h2>
          <ScrollArea className="h-64">
            {Object.keys(clinicalNotes).length === 0 ? (
              <p className="text-gray-500 text-sm">
                No clinical notes found. Save some test notes.
              </p>
            ) : (
              <div className="space-y-3">
                {Object.entries(clinicalNotes).map(([patientId, notes]) => {
                  const patient = patients.find((p) => p.id === patientId);
                  return (
                    <div key={patientId} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium mb-1">
                        {patient?.initials || patientId} - Notes
                      </p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{notes}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </Card>

        {/* AI Notes */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">AI Notes ({Object.keys(aiNotes).length})</h2>
          <ScrollArea className="h-64">
            {Object.keys(aiNotes).length === 0 ? (
              <p className="text-gray-500 text-sm">No AI notes found. Save some test AI notes.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(aiNotes).map(([patientId, notes]) => {
                  const patient = patients.find((p) => p.id === patientId);
                  return (
                    <div key={patientId} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium mb-1">
                        {patient?.initials || patientId} - AI Notes
                      </p>
                      <pre className="text-xs text-gray-700 overflow-auto">
                        {JSON.stringify(notes, null, 2)}
                      </pre>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </Card>

        {/* Preferences */}
        {preferences && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Left Sidebar Open:</span>{" "}
                {preferences.leftSidebarOpen ? "✅ Yes" : "❌ No"}
              </p>
              <p className="text-sm">
                <span className="font-medium">Right Sidebar Open:</span>{" "}
                {preferences.rightSidebarOpen ? "✅ Yes" : "❌ No"}
              </p>
              <p className="text-sm">
                <span className="font-medium">Auto-Update:</span>{" "}
                {preferences.autoUpdate ? "✅ Enabled" : "❌ Disabled"}
              </p>
            </div>
          </Card>
        )}

        {/* Back to App */}
        <Card className="p-6">
          <a href="/" className="text-teal-600 hover:underline font-medium">
            ← Back to Main App
          </a>
        </Card>
      </div>
    </div>
  );
}
