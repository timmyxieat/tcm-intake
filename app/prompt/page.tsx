"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Copy, Download, CheckCircle2 } from "lucide-react";

export default function PromptTestPage() {
  const [notes, setNotes] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!notes.trim()) {
      setError("Please enter some clinical notes");
      return;
    }

    setIsLoading(true);
    setError("");
    setJsonOutput("");
    setResponseTime(null);

    const startTime = Date.now();

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clinicalNotes: notes }),
      });

      const endTime = Date.now();
      setResponseTime(endTime - startTime);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze notes");
      }

      const data = await response.json();
      setJsonOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (jsonOutput) {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (jsonOutput) {
      const blob = new Blob([jsonOutput], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tcm-notes-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const loadExample = () => {
    setNotes(`CC: Lower back pain for 6 months

HPI: Patient reports dull, achy pain in the lumbar region that worsens with prolonged sitting. Pain radiates occasionally to right hip. Started after lifting heavy boxes at work. Has tried ibuprofen with minimal relief.

PMH: Hypertension (controlled with lisinopril 10mg daily), appendectomy 2015
Allergies: NKDA
Medications: Lisinopril 10mg qd, Fish oil 1000mg bid

FH: Mother - diabetes, Father - hypertension, heart disease

SH: Married, 2 children. Works as warehouse manager. Non-smoker. Drinks 2-3 beers on weekends. 2 cups coffee daily. Exercise: walks 20 min 3x/week. Diet: eats out frequently, high carbs.

ES: Reports moderate stress from work deadlines. Feels anxious about job security. Generally content at home.

ROS:
- Appetite: Good, eats 3 meals/day
- Sleep: Difficulty falling asleep, wakes at 3am, feels unrefreshed
- Energy: Low in morning, better after lunch
- Stool: BM daily, formed
- Urination: Normal frequency, clear
- Temperature: Feels cold easily, especially hands and feet

Tongue: Pale body with slight purple tinge, tooth marks on edges. Thin white coating, slightly greasy.

Pulse: Wiry and deep bilaterally. Weak in chi position.

Assessment: Liver Qi Stagnation with underlying Kidney Yang Deficiency

Treatment: Soothe Liver and regulate Qi, tonify Kidney Yang

Acupuncture Points:
- Head: GV-20, Yin Tang
- Back: BL-18, BL-20, BL-23 (bilateral)
- Abdomen: CV-6, ST-25 (bilateral)
- Lower extremities: LV-3, KI-3, ST-36 (bilateral)

Method: Even technique on head points, tonifying on back and abdomen, reducing on LV-3, tonifying on KI-3 and ST-36

Treatment side: Both sides`);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">TCM Notes AI Pipeline Test</h1>
          <p className="text-muted-foreground">
            Test your unstructured clinical notes against the AI pipeline
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Side - Input */}
          <div className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Unstructured Clinical Notes</h2>
                  <Button variant="outline" size="sm" onClick={loadExample}>
                    Load Example
                  </Button>
                </div>

                <Textarea
                  placeholder="Enter your unstructured TCM intake notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[600px] font-mono text-sm"
                />

                <Button
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Notes"
                  )}
                </Button>

                {error && (
                  <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
                    {error}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Side - Output */}
          <div className="space-y-4">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">AI Generated JSON Output</h2>
                    {responseTime && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Response time: {responseTime}ms
                      </p>
                    )}
                  </div>
                  {jsonOutput && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        {copied ? (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>

                <div className="relative">
                  {jsonOutput ? (
                    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[600px] text-xs font-mono">
                      {jsonOutput}
                    </pre>
                  ) : (
                    <div className="bg-muted p-4 rounded-md h-[600px] flex items-center justify-center text-muted-foreground">
                      {isLoading
                        ? "Processing your notes..."
                        : "JSON output will appear here after analysis"}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
