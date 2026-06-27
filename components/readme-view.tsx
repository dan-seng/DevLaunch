"use client";

import { useState } from "react";
import { Copy, Download, RefreshCw, Eye, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "./glass-panel";
import { MarkdownRenderer } from "./markdown-renderer";
import type { AnalysisResult } from "@/lib/analysis-types";

export function ReadmeView({ analysisResult }: { analysisResult: AnalysisResult }) {
  const [markdown, setMarkdown] = useState(analysisResult.readme || "");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"preview" | "raw">("preview");

  async function fetchReadme() {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/analysis/${analysisResult.analysisId}/readme`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setMarkdown(data.markdown);
      } else {
        const err = await res.json().catch(() => ({}));
        if (err.error?.includes("RESOURCE_EXHAUSTED") || err.error?.includes("quota")) {
          setMarkdown(`# ${analysisResult.projectName}\n\n> ⚠️ AI generation is temporarily unavailable (free-tier quota exceeded). Please wait and try again later.\n\n---\n\n*Files:* ${analysisResult.statistics.files} | *Folders:* ${analysisResult.statistics.folders} | *Lines of Code:* ${analysisResult.statistics.linesOfCode.toLocaleString()}\n\n*Languages:* ${analysisResult.languages.join(", ")}\n\n*Frameworks:* ${Object.values(analysisResult.frameworks).filter(Boolean).join(", ") || "None detected"}`);
        } else {
          setMarkdown(`# ${analysisResult.projectName}\n\nAnalysis complete. AI generation is temporarily unavailable.`);
        }
      }
    } catch {
      setMarkdown(`# ${analysisResult.projectName}\n\nAnalysis complete. AI generation is temporarily unavailable.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassPanel className="border border-outline-variant">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-outline-variant bg-surface-container-high px-6 py-3 md:flex-row md:items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-mono">
          README.md
        </span>
        <div className="flex items-center gap-2">
          {markdown ? (
            <>
              <div className="flex overflow-hidden rounded-lg border border-outline-variant/50 bg-surface-container/80 p-0.5">
                <button
                  onClick={() => setMode("preview")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    mode === "preview"
                      ? "bg-on-surface text-surface"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <Eye size={14} />
                  Preview
                </button>
                <button
                  onClick={() => setMode("raw")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    mode === "raw"
                      ? "bg-on-surface text-surface"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <Code2 size={14} />
                  Raw
                </button>
              </div>
              <div className="w-px h-5 bg-outline-variant/50" />
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(markdown)}>
                <Copy size={14} />
                Copy
              </Button>
              <Button size="sm" onClick={() => {
                const blob = new Blob([markdown], { type: "text/markdown" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "README.md";
                a.click();
                URL.revokeObjectURL(url);
              }}>
                <Download size={14} />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={fetchReadme} disabled={loading}>
                <RefreshCw size={14} />
                Regenerate
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={fetchReadme} disabled={loading}>
              <Sparkles size={14} className={loading ? "animate-spin" : ""} />
              {loading ? "Generating..." : "Generate README"}
            </Button>
          )}
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center p-16">
          <div className="flex items-center gap-3 text-sm text-on-surface-variant font-mono">
            <RefreshCw size={16} className="animate-spin" />
            Generating README with AI...
          </div>
        </div>
      ) : markdown ? (
        mode === "preview" ? (
          <div className="overflow-auto p-8">
            <MarkdownRenderer text={markdown} />
          </div>
        ) : (
          <pre className="overflow-auto p-8 font-mono text-sm leading-7 text-on-surface-variant whitespace-pre-wrap">
            {markdown}
          </pre>
        )
      ) : !loading ? (
        <div className="flex flex-col items-center justify-center gap-4 p-16 text-on-surface-variant/50">
          <Code2 size={32} className="text-on-surface-variant/30" />
          <p className="text-sm font-mono">Click &quot;Generate README&quot; to create a project README with AI.</p>
        </div>
      ) : null}
    </GlassPanel>
  );
}
