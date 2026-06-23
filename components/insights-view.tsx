"use client";

import {
  Activity,
  FileText,
  GitBranch,
  Shield,
  Package,
  RefreshCw,
  CheckCircle,
  ChevronRight,
  FolderArchive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "./glass-panel";

export function InsightsView() {
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
              Aggregate index of codebase quality, security, and velocity.
            </p>
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="relative flex size-40 items-center justify-center">
              <svg className="size-full -rotate-90">
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-surface-variant" />
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="440" strokeDashoffset="88" strokeLinecap="round" className="text-primary" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-black leading-none">82</span>
                <span className="text-xs text-on-surface-variant">Optimal</span>
              </div>
            </div>
          </div>
          <div className="border-t border-outline-variant/30 pt-4">
            <div className="flex justify-between text-xs">
              <span className="text-on-surface-variant">VS PREVIOUS SPRINT</span>
              <span className="font-bold text-primary">+4.2%</span>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 rounded-xl border border-outline-variant p-6 lg:col-span-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-on-surface-variant">Documentation Quality</p>
              <h4 className="text-2xl font-bold text-on-surface">High</h4>
            </div>
            <FileText size={20} className="text-primary" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-on-surface-variant">Docstring Coverage</span>
                <span className="text-on-surface">94%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-variant">
                <div className="h-full w-[94%] rounded-full bg-primary" />
              </div>
            </div>
            <div className="flex h-10 items-end gap-[2px]">
              {[20, 35, 15, 40, 25, 60, 45, 50, 70, 65].map((val, i) => (
                <div
                  key={i}
                  className="w-1 rounded-t bg-white transition-all"
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 rounded-xl border border-outline-variant p-6 lg:col-span-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-on-surface-variant">Maintainability</p>
              <h4 className="text-2xl font-bold text-on-surface">8.4 / 10</h4>
            </div>
            <GitBranch size={20} className="text-on-surface-variant" />
          </div>
          <div className="mb-4 flex gap-2">
            {["DRY PATTERN", "LOW COMPLEXITY"].map((tag) => (
              <span
                key={tag}
                className="rounded border border-outline-variant bg-surface-variant px-2 py-0.5 text-[10px] font-bold text-on-surface"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-on-surface-variant">
            Cognitive complexity is below threshold. Refactor recommended for{" "}
            <code className="rounded bg-surface-variant px-1 text-on-surface">auth_handler.py</code>.
          </p>
        </GlassPanel>

        <GlassPanel className="col-span-1 rounded-xl border border-outline-variant p-6 lg:col-span-7">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-surface-variant">
                <Shield size={20} className="text-error" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-on-surface">Security Vulnerabilities</h4>
                <p className="text-xs text-on-surface-variant">3 Critical issues detected in local scope</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View Report
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { title: "Hardcoded API Key in .env.example", severity: "Critical", color: "text-error", dot: "bg-error" },
              { title: "Outdated 'axios' dependency (v0.21.1)", severity: "Medium", color: "text-on-surface-variant", dot: "bg-on-surface-variant" },
            ].map((item) => (
              <div
                key={item.title}
                className={`flex items-center justify-between rounded-lg border p-3 ${
                  item.severity === "Critical" ? "border-error/40 bg-surface-container-low" : "border-outline-variant bg-surface-container-low"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`size-2 rounded-full ${item.dot} ${item.severity === "Critical" ? "animate-pulse" : ""}`} />
                  <span className="font-mono text-xs">{item.title}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase ${item.color}`}>{item.severity}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 rounded-xl border border-outline-variant p-6 lg:col-span-5">
          <h4 className="mb-4 text-xs uppercase text-on-surface-variant">Dependency Health</h4>
          <div className="space-y-4">
            {[
              { label: "Total Packages", value: "142", icon: <Package size={16} /> },
              { label: "Outdated", value: "12", icon: <RefreshCw size={16} /> },
              { label: "Trusted Authors", value: "89%", icon: <CheckCircle size={16} className="text-primary" /> },
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
          <div className="mt-6 flex justify-center border-t border-outline-variant/30 pt-6">
            <button className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">
              Run Audit Fix
            </button>
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 rounded-xl border border-outline-variant p-6 lg:col-span-12">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h4 className="text-2xl font-bold text-on-surface">Structural Integrity</h4>
              <p className="text-xs text-on-surface-variant">Visualizing repository depth and module coupling</p>
            </div>
            <div className="flex gap-4">
              {[
                ["Max Nesting", "5 Levels"],
                ["Coupling Factor", "0.42"],
              ].map(([label, value]) => (
                <div key={label} className="text-right">
                  <p className="text-[10px] uppercase text-on-surface-variant">{label}</p>
                  <p className="font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-lg border border-outline-variant/30 bg-surface-container-low p-4">
              <p className="mb-2 text-xs text-on-surface-variant">Folder Balance</p>
              <div className="flex h-20 items-end gap-1">
                {[40, 70, 100, 55, 20].map((h, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i === 2 ? "#ffffff" : i % 2 === 0 ? "#404040" : "#8e9192",
                    }}
                  />
                ))}
              </div>
              <p className="mt-2 text-center text-[10px] text-on-surface-variant">Module Distribution</p>
            </div>
            <div className="col-span-3 space-y-4">
              {[
                { name: "src/core", desc: "High Stability • 12 dependencies" },
                { name: "src/utils", desc: "Utility bloat detected • 45 functions" },
                { name: "src/services", desc: "Optimal coupling • 8 dependencies" },
              ].map((folder) => (
                <div
                  key={folder.name}
                  className="flex cursor-pointer items-center justify-between rounded border border-transparent p-3 transition-all hover:border-outline-variant/30 hover:bg-surface-variant/20"
                >
                  <div className="flex items-center gap-4">
                    <FolderArchive size={18} className="text-on-surface-variant" />
                    <div>
                      <p className="text-sm font-bold">{folder.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{folder.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-on-surface-variant" />
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
