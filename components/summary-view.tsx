"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Download, RefreshCw, Copy, Sparkles, Lightbulb, Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "./glass-panel";
import type { AnalysisResult } from "@/lib/analysis-types";

function formatSummary(text: string) {
  const lines = text.split("\n").filter(Boolean);
  const elements: ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length) {
      elements.push(
        <ul key={elements.length} className="list-disc space-y-2 pl-5 text-on-surface-variant/90">
          {listItems.map((item, i) => (
            <li key={i} className="leading-relaxed">{item.replace(/^[-*]\s*/, "")}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  }

  for (const line of lines) {
    if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true;
      listItems.push(line);
    } else {
      flushList();
      if (line.startsWith("#")) {
        elements.push(
          <h4 key={elements.length} className="mb-3 mt-6 text-xl font-bold text-on-surface first:mt-0">
            {line.replace(/^#+\s*/, "")}
          </h4>
        );
      } else {
        elements.push(
          <p key={elements.length} className="leading-relaxed text-on-surface-variant [&:not(:last-child)]:mb-4">
            {line}
          </p>
        );
      }
    }
  }
  flushList();

  return elements;
}

export function SummaryView({ analysisResult }: { analysisResult: AnalysisResult }) {
  const { projectName, languages, insights, statistics } = analysisResult;
  const [summaryText, setSummaryText] = useState(analysisResult.summary || "");
  const [loading, setLoading] = useState(!analysisResult.summary);

  async function fetchSummary() {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/analysis/${analysisResult.analysisId}/summary`, {
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        setSummaryText(data.summary);
      }
    } catch {
      // keep existing text
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!analysisResult.summary) {
      fetchSummary();
    }
  }, [analysisResult.analysisId]);

  const allTech = [...languages, ...Object.values(analysisResult.frameworks).filter(Boolean) as string[]];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-6 border-b border-outline-variant pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="default" className="border-outline bg-surface-container-highest uppercase tracking-tighter">
              AI Generated Analysis
            </Badge>
          </div>
          <h3 className="mb-2 text-5xl font-black text-primary">{projectName}</h3>
          <p className="text-lg text-on-surface-variant">
            AI-powered summary generated from repository metadata and structure.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" disabled>
            <Download size={16} />
            Export PDF
          </Button>
          <Button disabled={loading} onClick={fetchSummary}>
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            {loading ? "Generating..." : "Regenerate"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <GlassPanel className="border border-outline-variant overflow-hidden">
          <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-high px-6 py-3">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-mono">
              {loading ? "Generating with AI..." : "Generated Report"}
            </span>
            {summaryText ? (
              <Copy
                size={16}
                className="cursor-pointer text-on-surface-variant/40 transition-colors hover:text-primary"
                onClick={() => navigator.clipboard.writeText(summaryText)}
              />
            ) : null}
          </div>
          <div className="p-8">
            {loading && !summaryText ? (
              <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant/60">
                <Sparkles size={32} className="mb-4 animate-pulse" />
                <p className="text-sm font-mono">Reading repository context and generating analysis...</p>
              </div>
            ) : summaryText ? (
              <div className="prose-custom space-y-1">
                {formatSummary(summaryText)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant/40">
                <p className="text-sm font-mono">Click &quot;Regenerate&quot; to generate the AI summary.</p>
              </div>
            )}
          </div>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel className="border border-outline-variant p-6">
            <div className="mb-6 flex items-center justify-between">
              <h5 className="flex items-center gap-2 text-xl font-bold text-on-surface">
                <Lightbulb size={20} className="text-primary" />
                Insights
              </h5>
              <Badge variant="inverse">AI</Badge>
            </div>
            <div className="space-y-4">
              {[
                ["Health Score", `Rated at ${insights.health}/100 based on structural analysis`],
                ["Maintainability", `Scored ${insights.maintainability}/100 — reflects code organization`],
                ["Documentation", `At ${insights.documentation}/100 — based on comments and README presence`],
              ].map(([title, desc]) => (
                <div key={title} className="group cursor-pointer">
                  <div className="flex gap-3">
                    <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/20">
                      <Zap size={14} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-on-surface transition-colors group-hover:text-primary">{title}</div>
                      <p className="text-sm text-on-surface-variant/70">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="border border-outline-variant p-6">
            <h5 className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant font-mono">
              Detected Tech Stack
            </h5>
            <div className="flex flex-wrap gap-2">
              {allTech.slice(0, 12).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-outline bg-surface-container-highest px-3 py-1 text-xs text-primary font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="relative overflow-hidden border border-outline-variant p-6">
            <div className="absolute -bottom-4 -right-4 opacity-5">
              <Activity size={120} />
            </div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant font-mono">
              Repository Stats
            </h5>
            <div className="space-y-4">
              {[
                ["Files", `${statistics.files}`],
                ["Lines of Code", `${statistics.linesOfCode.toLocaleString()}`],
                ["Languages", `${languages.length}`],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span>{label}</span>
                    <span className="text-primary font-bold">{value}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-container-highest">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (statistics.files > 0 ? parseInt(value.replace(/\D/g, "")) || 100 : 50))}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
