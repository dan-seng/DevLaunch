"use client";

import { Download, RefreshCw, Copy, Info, Sparkles, GitBranch, Package, Lightbulb, Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "./glass-panel";

export function SummaryView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-6 border-b border-outline-variant pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="default" className="border-outline bg-surface-container-highest uppercase tracking-tighter">
              Repository Analysis
            </Badge>
            <span className="text-xs text-on-surface-variant/60">v4.2.0-stable</span>
          </div>
          <h3 className="mb-2 text-5xl font-black text-primary">Project Nebula</h3>
          <p className="text-lg text-on-surface-variant">
            Comprehensive technical audit of the central microservices mesh and real-time data ingestion pipeline.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={16} />
            Export PDF
          </Button>
          <Button>
            <RefreshCw size={16} />
            Regenerate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <GlassPanel className="border border-outline-variant overflow-hidden">
          <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-high px-6 py-3">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-mono-label">
              Generated Markdown
            </span>
            <Copy size={16} className="cursor-pointer text-on-surface-variant/40 transition-colors hover:text-primary" />
          </div>
          <div className="space-y-8 p-8">
            <div>
              <h4 className="mb-4 flex items-center gap-3 text-2xl font-bold text-on-surface">
                <Info size={20} className="text-primary" />
                Project Overview
              </h4>
              <p className="text-base leading-relaxed text-on-surface-variant">
                Project Nebula is a high-performance, asynchronous orchestration engine designed to manage distributed data streams across cloud-native environments. It leverages a custom-built event-loop architecture to ensure low-latency processing of telemetry data from over 100k+ concurrent edge nodes. The core codebase is written in Rust for memory safety and execution speed, with a thin TypeScript/React interface for administrative monitoring.
              </p>
            </div>
            <hr className="border-outline-variant/30" />
            <div>
              <h4 className="mb-4 flex items-center gap-3 text-2xl font-bold text-on-surface">
                <Sparkles size={20} className="text-primary" />
                Main Features
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  ["Zero-Copy Ingestion", "Memory-efficient data handling that bypasses traditional serialization bottlenecks."],
                  ["Adaptive Throttling", "Dynamic load balancing that scales consumers based on real-time hardware pressure."],
                  ["Multi-Cloud Sync", "Native support for AWS SQS, Azure Service Bus, and GCP Pub/Sub out of the box."],
                  ["Edge Analytics", "Local pre-processing capabilities using WASM-based worker scripts."],
                ].map(([title, desc]) => (
                  <div key={title as string} className="rounded-lg border border-outline-variant/50 bg-surface-container p-4">
                    <div className="mb-1 font-bold text-primary">{title as string}</div>
                    <p className="text-sm text-on-surface-variant/80">{desc as string}</p>
                  </div>
                ))}
              </div>
            </div>
            <hr className="border-outline-variant/30" />
            <div>
              <h4 className="mb-4 flex items-center gap-3 text-2xl font-bold text-on-surface">
                <GitBranch size={20} className="text-primary" />
                Architecture
              </h4>
              <p className="mb-6 text-base leading-relaxed text-on-surface-variant">
                The system follows a <strong>Modular Monolith</strong> strategy transitioning into{" "}
                <strong>Domain-Driven Microservices</strong>. Communication is facilitated via a gRPC backbone, ensuring strong typing and contract-first development.
              </p>
              <div className="overflow-auto rounded-lg border border-outline-variant bg-[#0e0e0e] p-6 font-mono text-xs text-primary">
                <pre>[ Ingest Layer ] &lt;---&gt; [ Buffer Queue ] &lt;---&gt; [ Logic Engine ]
      |                      |                      |
      v                      v                      v
[ Edge Workers ]      [ Persistent Store ]   [ Metrics & Observability ]</pre>
              </div>
            </div>
            <hr className="border-outline-variant/30" />
            <div>
              <h4 className="mb-4 flex items-center gap-3 text-2xl font-bold text-on-surface">
                <Package size={20} className="text-primary" />
                Key Components
              </h4>
              <div className="space-y-4">
                {[
                  ["Nebula-Core", "The central Rust orchestrator responsible for state management and actor-based task scheduling."],
                  ["Synapse-UI", "A React-based dashboard using Vite and Tailwind CSS for real-time visualization of cluster health."],
                  ["Flux-Driver", "Database abstraction layer providing optimized drivers for ScyllaDB and PostgreSQL."],
                ].map(([name, desc]) => (
                  <div key={name as string} className="flex items-start gap-4 border-l-4 border-white bg-white/5 p-4">
                    <div className="min-w-[140px] font-bold text-on-surface">{name as string}</div>
                    <div className="text-sm text-on-surface-variant">{desc as string}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>

        <div className="space-y-6">
          <GlassPanel className="border border-outline-variant p-6">
            <div className="mb-6 flex items-center justify-between">
              <h5 className="flex items-center gap-2 text-xl font-bold text-on-surface">
                <Lightbulb size={20} className="text-primary" />
                Improvements
              </h5>
              <Badge variant="inverse">AI Choice</Badge>
            </div>
            <div className="space-y-4">
              {[
                ["Optimize Cold Starts", "Current initialization logic in nebula-core adds ~400ms latency on boot. Consider pre-allocating memory pools."],
                ["Dependency Audit", "3 dependencies in synapse-ui are outdated and contain high-severity CVEs. Recommend immediate update."],
                ["Unit Test Coverage", "Critical path in Flux-Driver only has 45% coverage. Logic in data-mapping is prone to edge-case failures."],
              ].map(([title, desc]) => (
                <div key={title as string} className="group cursor-pointer">
                  <div className="flex gap-3">
                    <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/20">
                      <Zap size={14} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-on-surface transition-colors group-hover:text-primary">{title as string}</div>
                      <p className="text-sm text-on-surface-variant/70">{desc as string}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="border border-outline-variant p-6">
            <h5 className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant font-mono-label">
              Detected Tech Stack
            </h5>
            <div className="flex flex-wrap gap-2">
              {["Rust", "React", "TypeScript", "gRPC", "ScyllaDB", "Docker", "Kubernetes"].map((tech) => (
                <span
                  key={tech}
                    className="rounded-full border border-outline bg-surface-container-highest px-3 py-1 text-xs text-primary font-mono-label"
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
            <h5 className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant font-mono-label">
              Analysis Confidence
            </h5>
            <div className="space-y-4">
              {[
                ["Logic Consistency", "94", "bg-primary"],
                ["Code Quality Score", "78", "bg-[#a3a3a3]"],
              ].map(([label, value, barColor]) => (
                <div key={label as string}>
                  <div className="mb-2 flex justify-between text-xs">
                    <span>{label as string}</span>
                    <span className={barColor === "bg-primary" ? "text-primary" : "text-on-surface"}>{value as string}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface-container-highest">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${value}%` }} />
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
