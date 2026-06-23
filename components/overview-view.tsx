"use client";

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

export function OverviewView({ setActiveView }: { setActiveView: (view: DashboardView) => void }) {
  const fileDist = [
    ["TypeScript (.ts/tsx)", "74", "#ffffff"],
    ["Styles (.css/scss)", "12", "#a3a3a3"],
    ["Documentation (.md)", "8", "#737373"],
    ["Other", "6", "#404040"],
  ];
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
              94<span className="text-xl text-on-surface-variant">/100</span>
            </h2>
            <p className="mt-2 flex items-center gap-1 text-xs text-on-surface">
              <TrendingUp size={14} />
              +3 points from last week
            </p>
          </div>
          <svg className="size-24" viewBox="0 0 36 36">
            <path className="stroke-current text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
            <path className="stroke-current text-white" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="94, 100" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </GlassPanel>
        <GlassPanel className="flex flex-col justify-between p-6">
          <div>
            <p className="mb-1 text-xs text-on-surface-variant">Size & Density</p>
            <h3 className="text-2xl font-bold text-on-surface">14.2 MB</h3>
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-0.5">
              <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">Total Files</p>
              <p className="text-xs text-white">124 Files</p>
            </div>
            <FolderArchive size={20} className="text-outline-variant" />
          </div>
        </GlassPanel>
        <GlassPanel className="flex flex-col justify-between p-6">
          <div>
            <p className="mb-1 text-xs text-on-surface-variant">Velocity</p>
            <h3 className="text-2xl font-bold text-on-surface">2h <span className="text-sm font-normal text-on-surface-variant">ago</span></h3>
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-0.5">
              <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">Last Commit</p>
              <p className="text-xs text-white">#ae45f9d</p>
            </div>
            <Clock size={20} className="text-outline-variant" />
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <GlassPanel className="border border-outline-variant p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white">DevLaunch Engine v2</h3>
              <p className="max-w-2xl leading-relaxed text-on-surface-variant">
                A high-performance AI-driven code analysis tool designed to help developers navigate complex legacy repositories. It generates semantic dependency graphs, automated README documentation, and performance bottleneck insights using multi-modal LLM processing.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="default" className="border-outline-variant bg-surface-variant uppercase">Production</Badge>
              <Badge variant="inverse" className="flex items-center gap-1">
                <span className="size-1.5 animate-pulse rounded-full bg-black" />
                Active
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 border-t border-outline-variant pt-6">
            {[
              ["Main Language", "TypeScript"],
              ["Framework", "Next.js 16"],
              ["Backend", "PostgreSQL"],
              ["Runtime", "Node.js"],
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
          <h4 className="mb-4 text-xs uppercase tracking-wider text-on-surface">File Distribution</h4>
          <div className="space-y-4">
            {fileDist.map(([label, value, color]) => (
              <div key={label as string}>
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="text-on-surface-variant">{label as string}</span>
                  <span className="text-on-surface">{value as string}%</span>
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
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">Open this analysis workspace.</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
