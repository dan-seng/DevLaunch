"use client";

import { Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "./glass-panel";

export function ReadmeView() {
  return (
    <GlassPanel className="border border-outline-variant">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-outline-variant bg-surface-container-high px-6 py-3 md:flex-row md:items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-mono">
          Generated Markdown
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Copy size={14} />
            Copy
          </Button>
          <Button size="sm">
            <Download size={14} />
            Download
          </Button>
        </div>
      </div>
      <pre className="overflow-auto p-8 font-mono text-sm leading-7 text-on-surface-variant">
{`# DevLaunch

AI-powered repository intelligence for public GitHub projects.

## Features

- Repository cloning and deterministic metadata extraction
- Framework, language, and structure analysis
- AI summary, grounded chat, and README generation
- In-memory analysis sessions for fast dashboard navigation

## Getting Started

npm install
npm run dev

## Architecture

[ Ingest Layer ] <--> [ Buffer Queue ] <--> [ Logic Engine ]
      |                      |                      |
      v                      v                      v
[ Edge Workers ]      [ Persistent Store ]   [ Metrics & Observability ]

## Tech Stack

- **Framework:** Next.js 16 + TypeScript
- **Styling:** Tailwind CSS v4
- **AI Provider:** Gemini API
- **Database:** PostgreSQL via Prisma`}
      </pre>
    </GlassPanel>
  );
}
