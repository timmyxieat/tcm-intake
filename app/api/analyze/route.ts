import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { MedicalHistory, TCMAssessmentData, TCMSymptom, AIStructuredNotes } from '@/types';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Helper function to format TCM symptoms for analysis
function formatTCMSymptoms(tcmAssessment: TCMAssessmentData): string {
  const sections = Object.entries(tcmAssessment)
    .map(([category, symptoms]: [string, TCMSymptom[]]) => {
      const checkedSymptoms = symptoms
        .filter((s) => s.checked)
        .map((s) => s.label);
      if (checkedSymptoms.length > 0) {
        return `${category}: ${checkedSymptoms.join(', ')}`;
      }
      return null;
    })
    .filter(Boolean);

  return sections.join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { medicalHistory, tcmAssessment } = body as {
      medicalHistory: MedicalHistory;
      tcmAssessment: TCMAssessmentData;
    };

    // Validate input
    if (!medicalHistory || !tcmAssessment) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Format the prompt for GPT-4
    const tcmSymptomsText = formatTCMSymptoms(tcmAssessment);

    const prompt = `You are an experienced Traditional Chinese Medicine (TCM) practitioner. Based on the following patient information, provide a comprehensive TCM diagnosis and treatment plan.

PATIENT INFORMATION:

Chief Complaint:
${medicalHistory.chiefComplaint}

History of Present Illness (HPI):
${medicalHistory.hpi}

Past Medical History (PMH):
${medicalHistory.pmh}

Family History (FH):
${medicalHistory.fh}

Social History (SH):
${medicalHistory.sh}

Exercise/Sleep (ES):
${medicalHistory.es}

Stress Level:
${medicalHistory.stressLevel || 'Not specified'}

TCM SYMPTOM REVIEW:
${tcmSymptomsText}

Please provide your analysis in the following JSON structure:
{
  "note_summary": "Brief summary of the case and treatment",
  "chiefComplaints": [
    {
      "text": "Chief complaint description",
      "icdCode": "ICD-10 code",
      "icdDescription": "ICD-10 description"
    }
  ],
  "hpi": "Detailed HPI narrative",
  "subjective": {
    "pmh": "Past medical history summary",
    "fh": "Family history summary",
    "sh": "Social history summary",
    "es": "Exercise and sleep summary",
    "stressLevel": "Stress level assessment"
  },
  "tcmReview": [
    {
      "category": "Category name (e.g., Digestive)",
      "symptoms": ["symptom1", "symptom2"]
    }
  ],
  "tongueExam": {
    "body": "Tongue body description",
    "coating": "Tongue coating description"
  },
  "pulseExam": "Pulse examination findings",
  "diagnosis": [
    {
      "tcm": "TCM diagnosis (e.g., Qi Deficiency)",
      "icdCode": "ICD-10 code",
      "icdDescription": "ICD-10 description"
    }
  ],
  "treatmentPrinciple": "Treatment principle (e.g., Tonify Qi, Nourish Blood)",
  "acupunctureTreatmentSide": "Left side treatment" | "Right side treatment" | "Both sides treatment",
  "acupuncture": [
    {
      "region": "Region name (e.g., Head/Face)",
      "points": [
        {
          "code": "Point code (e.g., ST36)",
          "note": "Optional note about point selection",
          "variant": "right" | "both"
        }
      ]
    }
  ]
}

Important:
1. Base your TCM diagnosis on classical pattern differentiation
2. Provide specific acupuncture point selections with rationale
3. Use proper ICD-10 codes for insurance purposes
4. Consider the patient's constitution and presenting symptoms
5. Keep the note_summary concise but comprehensive
6. Return ONLY valid JSON, no additional text`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert Traditional Chinese Medicine practitioner. Provide comprehensive TCM diagnoses and treatment plans in valid JSON format only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    // Parse and validate the response
    const aiNotes: AIStructuredNotes = JSON.parse(content);

    return NextResponse.json({ aiNotes }, { status: 200 });
  } catch (error) {
    console.error('AI Analysis Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to analyze patient data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
