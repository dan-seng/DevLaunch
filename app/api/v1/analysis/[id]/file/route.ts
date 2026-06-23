import { NextRequest, NextResponse } from "next/server";
import { getAnalysis } from "@/services/analysis.service";
import { readFile } from "@/services/file.service";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const analysis = getAnalysis(id);
    if (!analysis) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    const filePath = request.nextUrl.searchParams.get("path");
    if (!filePath) {
      return NextResponse.json({ error: "Missing path parameter" }, { status: 400 });
    }

    const fullPath = join(analysis.repoPath, filePath);

    // basic path traversal guard
    if (!fullPath.startsWith(analysis.repoPath)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const content = readFile(fullPath);

    if (content === null) {
      return NextResponse.json({ error: "File not found or unreadable" }, { status: 404 });
    }

    return NextResponse.json({ content, path: filePath }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to read file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
