"use client";

import {
  Activity,
  FileText,
  GitBranch,
  Shield,
  Package,
  RefreshCw,
  CheckCircle,
  FolderArchive,
} from "lucide-react";
import { GlassPanel } from "./glass-panel";
import type { AnalysisResult } from "@/lib/analysis-types";

export function InsightsView({ analysisResult }: { analysisResult: AnalysisResult }) {
  const { insights, statistics, dependencies, entryPoints, structure } = analysisResult;

  const topFolders = structure
    .filter((n) => n.type === "folder")
    .slice(0, 5)
    .map((n) => n.name);

  const healthColor = insights.health >= 80 ? "text-primary" : insights.health >= 50 ? "text-on-surface" : "text-error";
  const healthLabel = insights.health >= 80 ? "Optimal" : insights.health >= 50 ? "Fair" : "Needs Work";
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (insights.health / 100) * circumference;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <GlassPanel className="col-span-1 flex flex-col justify-between rounded-xl border border-outline-variant p-6 lg:col-span-4 lg:row-span-2">
          <div>
            <div className="mb-4 flex items-start justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Global Status</span>
              <Activity size={20} className="text-primary" />
            </div>
            <h3 className="mb-1 text-3xl font-black">Overall Health Score</h3>
            <p className="mb-6 text-sm text-on-surface-variant">
              Aggregate index of codebase quality based on structural analysis.
            </p>
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="relative flex size-40 items-center justify-center">
              <svg className="size-full -rotate-90">
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-surface-variant" />
                <circle
                  cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="8"
                  strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="text-primary"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-5xl font-black leading-none ${healthColor}`}>{insights.health}</span>
                <span className="text-xs text-on-surface-variant">{healthLabel}</span>
              </div>
            </div>
          </div>
          <div className="border-t border-outline-variant/30 pt-4">
            <div className="flex justify-between text-xs">
              <span className="text-on-surface-variant">ARCHITECTURE SCORE</span>
              <span className="font-bold text-primary">{insights.architecture}/100</span>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 rounded-xl border border-outline-variant p-6 lg:col-span-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-on-surface-variant">Documentation Quality</p>
              <h4 className="text-2xl font-bold text-on-surface">{insights.documentation >= 70 ? "Good" : "Needs Work"}</h4>
            </div>
            <FileText size={20} className="text-primary" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-on-surface-variant">Score</span>
                <span className="text-on-surface">{insights.documentation}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-variant">
                <div className="h-full rounded-full bg-primary" style={{ width: `${insights.documentation}%` }} />
              </div>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 rounded-xl border border-outline-variant p-6 lg:col-span-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-on-surface-variant">Maintainability</p>
              <h4 className="text-2xl font-bold text-on-surface">{insights.maintainability} / 100</h4>
            </div>
            <GitBranch size={20} className="text-on-surface-variant" />
          </div>
          <div className="mb-4 flex gap-2">
            <span className="rounded border border-outline-variant bg-surface-variant px-2 py-0.5 text-[10px] font-bold text-on-surface">
              {insights.maintainability >= 70 ? "HEALTHY" : "MONITOR"}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-on-surface-variant">
            Based on {statistics.files} files across {statistics.folders} directories with {statistics.linesOfCode.toLocaleString()} lines of code.
          </p>
        </GlassPanel>

        <GlassPanel className="col-span-1 rounded-xl border border-outline-variant p-6 lg:col-span-7">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-surface-variant">
                <Shield size={20} className="text-error" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-on-surface">Dependencies</h4>
                <p className="text-xs text-on-surface-variant">{dependencies.length} packages detected</p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {dependencies.slice(0, 6).map((dep) => (
              <div
                key={dep}
                className="flex items-center justify-between rounded-lg border border-outline-variant bg-surface-container-low p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-on-surface-variant" />
                  <span className="font-mono text-xs">{dep}</span>
                </div>
              </div>
            ))}
            {dependencies.length > 6 ? (
              <p className="text-xs text-on-surface-variant pt-2">+{dependencies.length - 6} more packages</p>
            ) : null}
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 rounded-xl border border-outline-variant p-6 lg:col-span-5">
          <h4 className="mb-4 text-xs uppercase text-on-surface-variant">Repository Stats</h4>
          <div className="space-y-4">
            {[
              { label: "Total Files", value: `${statistics.files}`, icon: <Package size={16} /> },
              { label: "Lines of Code", value: `${statistics.linesOfCode.toLocaleString()}`, icon: <RefreshCw size={16} /> },
              { label: "Entry Points", value: `${entryPoints.length}`, icon: <CheckCircle size={16} className="text-primary" /> },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 rounded-xl border border-outline-variant p-6 lg:col-span-12">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h4 className="text-2xl font-bold text-on-surface">Structural Overview</h4>
              <p className="text-xs text-on-surface-variant">Top-level directories in this repository</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-4">
              <p className="mb-2 text-xs text-on-surface-variant">Folder Count</p>
              <p className="text-2xl font-bold">{statistics.folders}</p>
            </div>
            <div className="col-span-3 space-y-4">
              {topFolders.map((name) => (
                <div
                  key={name}
                  className="flex cursor-pointer items-center justify-between rounded border border-transparent p-3 transition-all hover:border-outline-variant/30 hover:bg-surface-variant/20"
                >
                  <div className="flex items-center gap-4">
                    <FolderArchive size={18} className="text-on-surface-variant" />
                    <div>
                      <p className="text-sm font-bold font-mono">{name}</p>
                    </div>
                  </div>
                </div>
              ))}
              {!topFolders.length ? (
                <p className="text-xs text-on-surface-variant">No top-level folders detected</p>
              ) : null}
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
