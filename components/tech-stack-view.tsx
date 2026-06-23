"use client";

import { Terminal, FileText, Palette, Zap, Database, Server, Code, Shield, CheckCircle, CloudUpload, Cloud, Wrench } from "lucide-react";
import { GlassPanel } from "./glass-panel";
import type { AnalysisResult } from "@/lib/analysis-types";

export function TechStackView({ analysisResult }: { analysisResult: AnalysisResult }) {
  const { frameworks, languages, dependencies, insights, statistics } = analysisResult;

  const frontendStack = [
    ...(frameworks.frontend ? [[frameworks.frontend, "Frontend Framework"]] : []),
    ...(frameworks.database ? [[frameworks.database, "Database"]] : []),
  ];

  const backendItems = [
    ...(frameworks.backend ? [[frameworks.backend, "Backend"]] : []),
    ...(frameworks.deployment ? [[frameworks.deployment, "Deployment"]] : []),
  ];

  const techCount = languages.length + Object.values(frameworks).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-outline-variant pb-8 md:flex-row md:items-end">
        <div>
          <p className="mb-1 text-xs text-primary">AUTOMATED ANALYSIS</p>
          <h2 className="text-5xl font-black uppercase tracking-tight">System Architecture</h2>
          <p className="mt-2 max-w-2xl text-lg text-on-surface-variant">
            Identified {techCount} distinct technologies across {statistics.files} files in this repository.
          </p>
        </div>
        <GlassPanel className="flex items-center gap-3 border border-outline-variant bg-surface-container-high px-4 py-2">
          <span className="text-2xl font-bold text-white">{insights.health}%</span>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-on-surface-variant">Health</span>
            <span className="text-xs">{insights.health >= 80 ? "Production Ready" : "Needs Attention"}</span>
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <GlassPanel className="relative col-span-1 overflow-hidden border border-outline-variant bg-surface-container p-6 lg:col-span-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="mb-1 text-2xl font-bold text-on-surface">Languages & Frameworks</h3>
              <p className="text-sm text-on-surface-variant">Core technologies detected</p>
            </div>
            <Terminal size={32} className="text-white" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {languages.slice(0, 6).map((lang) => (
              <div
                key={lang}
                className="flex cursor-pointer items-center gap-4 rounded-xl border border-outline-variant bg-surface-container-low p-3 transition-all hover:border-white/50"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-white/10">
                  <Code size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xs text-on-surface">{lang}</h4>
                  <p className="text-[11px] text-on-surface-variant">Detected language</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 flex flex-col border border-outline-variant bg-surface-container p-6 lg:col-span-4">
          <div className="mb-6">
            <h3 className="mb-1 text-2xl font-bold text-on-surface">Frameworks</h3>
            <p className="text-sm text-on-surface-variant">Identified from config files</p>
          </div>
          <div className="flex-1 space-y-4">
            {frontendStack.length ? frontendStack.map(([name, desc]) => (
              <div
                key={name}
                className="cursor-pointer rounded-xl border border-outline-variant bg-surface-container-high p-4 transition-colors hover:bg-surface-variant/30"
              >
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-white" />
                  <span className="text-xs text-on-surface">{name}</span>
                </div>
                <p className="mt-2 text-[10px] text-on-surface-variant">{desc}</p>
              </div>
            )) : (
              <p className="text-xs text-on-surface-variant">No frameworks detected</p>
            )}
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 border border-outline-variant bg-surface-container p-6 lg:col-span-6">
          <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-on-surface">
            <Server size={24} className="text-white" />
            Backend & Infrastructure
          </h3>
          <div className="space-y-3">
            {backendItems.length ? backendItems.map(([name, tag]) => (
              <div key={name} className="flex items-start gap-4 rounded-lg border border-outline-variant bg-surface-container-low p-4">
                <div className="rounded bg-zinc-800 p-2 text-zinc-300">
                  <Code size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-on-surface">{name}</span>
                    <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-white">{tag}</span>
                  </div>
                  <p className="mt-1 text-xs text-on-surface-variant">Detected from configuration</p>
                </div>
              </div>
            )) : (
              <p className="text-xs text-on-surface-variant">No backend frameworks detected</p>
            )}
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 border border-outline-variant bg-surface-container p-6 lg:col-span-6">
          <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-on-surface">
            <Shield size={24} className="text-white" />
            Dependencies
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {dependencies.slice(0, 8).map((dep) => (
              <div
                key={dep}
                className="truncate rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-center"
              >
                <span className="block text-xs text-on-surface">{dep}</span>
              </div>
            ))}
            {dependencies.length > 8 ? (
              <div className="flex items-center justify-center rounded-xl border border-outline-variant bg-surface-container-lowest p-4">
                <span className="text-xs text-on-surface-variant">+{dependencies.length - 8} more</span>
              </div>
            ) : null}
          </div>
        </GlassPanel>

        <div className="col-span-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-12">
          <GlassPanel className="border border-outline-variant bg-surface-container p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-on-surface">Entry Points</h3>
              <CheckCircle size={20} className="text-on-surface-variant" />
            </div>
            <div className="space-y-2">
              {analysisResult.entryPoints.length ? analysisResult.entryPoints.map((ep) => (
                <div key={ep} className="flex items-center justify-between rounded-lg bg-surface-container-low p-3">
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-white" />
                    <span className="text-xs font-mono">{ep}</span>
                  </div>
                </div>
              )) : (
                <p className="text-xs text-on-surface-variant">No entry points detected</p>
              )}
            </div>
          </GlassPanel>

          <GlassPanel className="border border-outline-variant bg-surface-container p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-on-surface">Project Stats</h3>
              <CloudUpload size={20} className="text-on-surface-variant" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: `${statistics.files}`, label: "Files", icon: <FileText size={32} className="text-white" /> },
                { value: `${statistics.folders}`, label: "Folders", icon: <Server size={32} className="text-zinc-400" /> },
              ].map(({ value, label, icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <div className="mb-2">{icon}</div>
                  <span className="text-xs font-bold">{value}</span>
                  <span className="text-[10px] text-on-surface-variant">{label}</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      <GlassPanel className="border border-outline-variant bg-surface-container-low p-6">
        <div className="mb-6 flex items-center gap-3">
          <Wrench size={24} className="text-white" />
          <h3 className="text-2xl font-bold text-on-surface">All Languages Detected</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <span
              key={lang}
              className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-on-surface font-mono"
            >
              {lang}
            </span>
          ))}
        </div>
      </GlassPanel>

      <div className="h-8" />
    </div>
  );
}
