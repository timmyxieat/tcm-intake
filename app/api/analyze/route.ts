import { NextRequest, NextResponse } from 'next/server';
import { analyzeClinicalNotes } from '@/lib/aiPipeline';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { medicalHistory, tcmAssessment, clinicalNotes } = body;

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Prefer clinicalNotes if provided (new flow)
    if (clinicalNotes) {
      console.log('[API] Using new pipeline with clinical notes');
      const aiNotes = await analyzeClinicalNotes(clinicalNotes);
      return NextResponse.json({ aiNotes }, { status: 200 });
    }

    // Legacy flow: structured input
    if (!medicalHistory || !tcmAssessment) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }

    // Convert structured data to text for pipeline
    const notesText = `
CC
${medicalHistory.chiefComplaint || 'Not provided'}

HPI
${medicalHistory.hpi || 'Not provided'}

PMH
${medicalHistory.pmh || 'Not provided'}

FH
${medicalHistory.fh || 'Not provided'}

SH
${medicalHistory.sh || 'Not provided'}

ES
${medicalHistory.es || 'Not provided'}
`;

    console.log('[API] Using pipeline with structured input (converted to text)');
    const aiNotes = await analyzeClinicalNotes(notesText);
    return NextResponse.json({ aiNotes }, { status: 200 });
  } catch (error) {
    console.error('[API] Analysis Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to analyze patient data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
