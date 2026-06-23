"use client";

import {
  Terminal,
  FileText,
  Palette,
  Zap,
  Database,
  RefreshCcw,
  Server,
  Code,
  Shield,
  Fingerprint,
  Key,
  Unlock,
  CheckCircle,
  CloudUpload,
  Cloud,
  Wrench,
} from "lucide-react";
import { GlassPanel } from "./glass-panel";

export function TechStackView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-outline-variant pb-8 md:flex-row md:items-end">
        <div>
          <p className="mb-1 text-xs text-primary">AUTOMATED ANALYSIS</p>
          <h2 className="text-5xl font-black uppercase tracking-tight">System Architecture</h2>
          <p className="mt-2 max-w-2xl text-lg text-on-surface-variant">
            We&apos;ve identified 24 distinct technologies powering this repository. The stack is optimized for high-throughput data processing and modern reactive interfaces.
          </p>
        </div>
        <GlassPanel className="flex items-center gap-3 border border-outline-variant bg-surface-container-high px-4 py-2">
          <span className="text-2xl font-bold text-white">84%</span>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-on-surface-variant">Health</span>
            <span className="text-xs">Production Ready</span>
          </div>
        </GlassPanel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <GlassPanel className="relative col-span-1 overflow-hidden border border-outline-variant bg-surface-container p-6 lg:col-span-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="mb-1 text-2xl font-bold text-on-surface">Frontend Ecosystem</h3>
              <p className="text-sm text-on-surface-variant">Client-side rendering & interaction layer</p>
            </div>
            <Terminal size={32} className="text-white" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["Next.js 14", "App Router & Server Actions", <FileText key="n" size={20} className="text-white" />],
              ["Tailwind CSS", "Utility-First Framework", <Palette key="t" size={20} className="text-zinc-400" />],
              ["Framer Motion", "Animations", <Zap key="f" size={20} className="text-zinc-400" />],
              ["TanStack Query", "State Management", <Database key="q" size={20} className="text-white" />],
            ].map(([name, desc, icon]) => (
              <div
                key={name as string}
                className="flex cursor-pointer items-center gap-4 rounded-xl border border-outline-variant bg-surface-container-low p-3 transition-all hover:border-white/50"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-white/10">
                  {icon}
                </div>
                <div>
                  <h4 className="text-xs text-on-surface">{name as string}</h4>
                  <p className="text-[11px] text-on-surface-variant">{desc as string}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 flex flex-col border border-outline-variant bg-surface-container p-6 lg:col-span-4">
          <div className="mb-6">
            <h3 className="mb-1 text-2xl font-bold text-on-surface">CI/CD & DevOps</h3>
            <p className="text-sm text-on-surface-variant">Automated pipeline</p>
          </div>
          <div className="flex-1 space-y-4">
            {[
              ["GitHub Actions", "90", "Avg. Build Time: 1m 42s"],
              ["Terraform", "", "Infrastructure as Code"],
              ["Sentry", "", "Error Tracking"],
            ].map(([name, progress, desc]) => (
              <div
                key={name}
                className="cursor-pointer rounded-xl border border-outline-variant bg-surface-container-high p-4 transition-colors hover:bg-surface-variant/30"
              >
                <div className="flex items-center gap-3">
                  <RefreshCcw size={20} className="text-white" />
                  <span className="text-xs text-on-surface">{name}</span>
                </div>
                {progress ? (
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full w-[90%] rounded-full bg-white" />
                  </div>
                ) : null}
                <p className="mt-2 text-[10px] text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 border border-outline-variant bg-surface-container p-6 lg:col-span-6">
          <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-on-surface">
            <Server size={24} className="text-white" />
            Core Backend
          </h3>
          <div className="space-y-3">
            {[
              ["Node.js / TypeScript", "Runtime", "Strict type checking with tRPC for end-to-end type safety."],
              ["PostgreSQL", "Database", "Primary relational store managed via Prisma ORM."],
              ["Redis", "Cache", "High-performance caching and message queuing layer."],
            ].map(([name, tag, desc]) => (
              <div key={name} className="flex items-start gap-4 rounded-lg border border-outline-variant bg-surface-container-low p-4">
                <div className="rounded bg-zinc-800 p-2 text-zinc-300">
                  <Code size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-on-surface">{name}</span>
                    <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-white">{tag}</span>
                  </div>
                  <p className="mt-1 text-xs text-on-surface-variant">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-1 border border-outline-variant bg-surface-container p-6 lg:col-span-6">
          <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-on-surface">
            <Shield size={24} className="text-white" />
            Auth & Security
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Clerk Auth", "User Management", <Fingerprint key="1" size={24} className="text-white" />],
              ["Zod", "Schema Validation", <Shield key="2" size={24} className="text-zinc-400" />],
              ["Iron Session", "Signed Cookies", <Key key="3" size={24} className="text-zinc-400" />],
              ["RBAC", "Access Control", <Unlock key="4" size={24} className="text-white" />],
            ].map(([name, desc, icon]) => (
              <div
                key={name as string}
                className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-center"
              >
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-zinc-800">
                  {icon}
                </div>
                <span className="block text-xs text-on-surface">{name as string}</span>
                <span className="text-[10px] text-on-surface-variant">{desc as string}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="col-span-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-12">
          <GlassPanel className="border border-outline-variant bg-surface-container p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-on-surface">Testing Frameworks</h3>
              <CheckCircle size={20} className="text-on-surface-variant" />
            </div>
            <div className="space-y-2">
              {[
                ["Playwright", "E2E Testing"],
                ["Vitest", "Unit Testing"],
                ["Testing Library", "UI Verification"],
              ].map(([name, tag]) => (
                <div key={name} className="flex items-center justify-between rounded-lg bg-surface-container-low p-3">
                  <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-white" />
                    <span className="text-xs">{name}</span>
                  </div>
                  <span className="text-xs text-on-surface-variant">{tag}</span>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="border border-outline-variant bg-surface-container p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-on-surface">Deployment Strategy</h3>
              <CloudUpload size={20} className="text-on-surface-variant" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Vercel", "Edge Network", <Cloud key="v" size={32} className="text-white" />],
                ["Docker", "Containerization", <Server key="d" size={32} className="text-zinc-400" />],
              ].map(([name, desc, icon]) => (
                <div
                  key={name as string}
                  className="flex flex-col items-center justify-center rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
                >
                  <div className="mb-2">{icon}</div>
                  <span className="text-xs">{name as string}</span>
                  <span className="text-[10px] text-on-surface-variant">{desc as string}</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      <GlassPanel className="border border-outline-variant bg-surface-container-low p-6">
        <div className="mb-6 flex items-center gap-3">
          <Wrench size={24} className="text-white" />
          <h3 className="text-2xl font-bold text-on-surface">Developer Tooling & Utilities</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {["ESLint", "Prettier", "Husky", "Storybook", "PostCSS", "Turborepo", "Lighthouse", "pnpm", "SWC"].map(
            (tool) => (
              <span
                key={tool}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-on-surface font-mono"
              >
                {tool}
              </span>
            ),
          )}
        </div>
      </GlassPanel>

      <div className="h-8" />
    </div>
  );
}
