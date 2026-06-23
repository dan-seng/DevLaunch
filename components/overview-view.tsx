"use client";

import type { AnalysisResult } from "@/lib/analysis-types";
import {
  Activity,
  TrendingUp,
  FolderArchive,
  Clock,
  LayoutDashboard,
  Sparkles,
  Layers,
  GitBranch,
  MessageSquare,
  FileText,
  BarChart3,
} from "lucide-react";
import { GlassPanel } from "./glass-panel";
import { Badge } from "@/components/ui/badge";
import type { DashboardView } from "@/data/types";

export function OverviewView({
  analysisResult,
  setActiveView,
}: {
  analysisResult: AnalysisResult;
  setActiveView: (view: DashboardView) => void;
}) {
  const { projectName, summary, frameworks, languages, statistics, languageDistribution, insights } = analysisResult;

  const mainLang = languages[0] || "Unknown";
  const frontendFramework = frameworks.frontend || "—";
  const backendFramework = frameworks.backend || "—";

  const totalWeight = languageDistribution.reduce((sum, l) => sum + l.weight, 0);
  const colors = ["#ffffff", "#a3a3a3", "#737373", "#404040"];
  const fileDist = languageDistribution.slice(0, 4).map((lang, i) => [
    lang.name,
    `${totalWeight > 0 ? Math.round((lang.weight / totalWeight) * 100) : 0}`,
    colors[i] || "#404040",
  ] as [string, string, string]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <GlassPanel className="relative col-span-2 flex items-center justify-between overflow-hidden p-6">
          <div className="absolute -bottom-4 -right-4 opacity-5">
            <Activity size={120} />
          </div>
          <div>
            <p className="mb-1 text-xs text-on-surface-variant">Project Score</p>
            <h2 className="text-5xl font-black text-primary">
              {insights.health}<span className="text-xl text-on-surface-variant">/100</span>
            </h2>
            <p className="mt-2 flex items-center gap-1 text-xs text-on-surface">
              <TrendingUp size={14} />
              {insights.maintainability} maintainability
            </p>
          </div>
          <svg className="size-24" viewBox="0 0 36 36">
            <path className="stroke-current text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
            <path className="stroke-current text-white" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray={`${insights.health}, 100`} strokeLinecap="round" strokeWidth="3" />
          </svg>
        </GlassPanel>
        <GlassPanel className="flex flex-col justify-between p-6">
          <div>
            <p className="mb-1 text-xs text-on-surface-variant">Size & Density</p>
            <h3 className="text-2xl font-bold text-on-surface">{statistics.totalSize ? `${(statistics.totalSize / 1024 / 1024).toFixed(1)} MB` : `${statistics.files} files`}</h3>
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-0.5">
              <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">Total Files</p>
              <p className="text-xs text-white">{statistics.files} Files</p>
            </div>
            <FolderArchive size={20} className="text-outline-variant" />
          </div>
        </GlassPanel>
        <GlassPanel className="flex flex-col justify-between p-6">
          <div>
            <p className="mb-1 text-xs text-on-surface-variant">Code Volume</p>
            <h3 className="text-2xl font-bold text-on-surface">{statistics.linesOfCode.toLocaleString()} <span className="text-sm font-normal text-on-surface-variant">lines</span></h3>
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-0.5">
              <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">Folders</p>
              <p className="text-xs text-white">{statistics.folders} Directories</p>
            </div>
            <Clock size={20} className="text-outline-variant" />
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <GlassPanel className="border border-outline-variant p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white">{projectName}</h3>
              <p className="max-w-2xl leading-relaxed text-on-surface-variant">
                {summary
                  ? `${summary.slice(0, 300)}...`
                  : `${statistics.files} files across ${statistics.folders} directories with ${statistics.linesOfCode.toLocaleString()} lines of code. ${languages.length} languages detected. View the AI Summary tab for a full AI-generated report.`}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="default" className="border-outline-variant bg-surface-variant uppercase">Analyzed</Badge>
              <Badge variant="inverse" className="flex items-center gap-1">
                <span className="size-1.5 animate-pulse rounded-full bg-black" />
                Active
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 border-t border-outline-variant pt-6">
            {[
              ["Main Language", mainLang],
              ["Frontend", frontendFramework],
              ["Backend", backendFramework],
              ["Dependencies", `${analysisResult.dependencies.length}`],
            ].map(([label, value]) => (
              <div key={label as string}>
                <p className="text-[10px] font-bold uppercase text-on-surface-variant">{label as string}</p>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-high px-3 py-1.5">
                  <span className="size-2 rounded-full bg-white" />
                  <span className="text-xs text-white">{value as string}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="border border-outline-variant p-6">
          <h4 className="mb-4 text-xs uppercase tracking-wider text-on-surface">Languages</h4>
          <div className="space-y-4">
            {fileDist.map(([label, value, color]) => (
              <div key={label}>
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="text-on-surface-variant">{label}</span>
                  <span className="text-on-surface">{value}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-variant">
                  <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {(["AI Summary", "Project Structure", "AI Chat"] as DashboardView[]).map((view) => {
          const icons: Record<DashboardView, React.ReactNode> = {
            Overview: <LayoutDashboard size={24} />,
            "AI Summary": <Sparkles size={24} />,
            "Tech Stack": <Layers size={24} />,
            "Project Structure": <GitBranch size={24} />,
            "AI Chat": <MessageSquare size={24} />,
            "README Generator": <FileText size={24} />,
            Insights: <BarChart3 size={24} />,
          };
          return (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className="group cursor-pointer rounded-xl border border-outline-variant/40 bg-[rgba(31,31,31,0.7)] p-6 text-left backdrop-blur-[12px] transition-all hover:border-white/30 hover:bg-[#2a2a2a]"
            >
              <div className="mb-8">{icons[view]}</div>
              <h3 className="text-xl font-bold text-on-surface">{view}</h3>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">AI-powered insights and documentation for your codebase.</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
