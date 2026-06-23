"use client";

import { useState, useEffect } from "react";
import { Copy, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "./glass-panel";
import type { AnalysisResult } from "@/lib/analysis-types";

export function ReadmeView({ analysisResult }: { analysisResult: AnalysisResult }) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);

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
        setMarkdown(`# ${analysisResult.projectName}\n\n${analysisResult.summary}`);
      }
    } catch {
      setMarkdown(`# ${analysisResult.projectName}\n\n${analysisResult.summary}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchReadme(); }, [analysisResult.analysisId]);

  return (
    <GlassPanel className="border border-outline-variant">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-outline-variant bg-surface-container-high px-6 py-3 md:flex-row md:items-center">
        <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-mono">
          {loading ? "Generating..." : "Generated Markdown"}
        </span>
        <div className="flex gap-2">
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
        </div>
      </div>
      <pre className="overflow-auto p-8 font-mono text-sm leading-7 text-on-surface-variant whitespace-pre-wrap">
        {loading ? "Generating README with AI..." : markdown || "No content generated."}
      </pre>
    </GlassPanel>
  );
}
