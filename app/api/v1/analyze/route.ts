import { NextRequest, NextResponse } from "next/server";
import { analyzeRepository } from "@/services/analysis.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'url' field" }, { status: 400 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        function send(data: unknown) {
          controller.enqueue(encoder.encode(JSON.stringify(data) + "\n"));
        }

        try {
          const result = await analyzeRepository(url, (step) => {
            send({ type: "progress", step });
          });
          send({ type: "result", data: result });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Analysis failed";
          send({ type: "error", message });
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: { "Content-Type": "application/x-ndjson" },
    });
  } catch {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
