import { NextRequest, NextResponse } from "next/server";
import { generateProjectReadme } from "@/services/analysis.service";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const apiKey = _request.headers.get("x-api-key") || undefined;
    const markdown = await generateProjectReadme(id, apiKey);
    return NextResponse.json({ markdown }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "README generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
