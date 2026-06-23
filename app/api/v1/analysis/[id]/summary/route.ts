import { NextRequest, NextResponse } from "next/server";
import { generateSummaryForAnalysis } from "@/services/analysis.service";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const summary = await generateSummaryForAnalysis(id);
    return NextResponse.json({ summary }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Summary generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
